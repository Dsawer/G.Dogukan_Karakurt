// Render /cv to PDF via Chrome headless.
// Usage: npm run pdf
// Requires the production build (`npm run build`) to exist.

import { spawn } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { setTimeout as wait } from "node:timers/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const pdfOut = resolve(repoRoot, "public", "assets", "cv.pdf");

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
];

function findBrowser() {
  for (const p of CHROME_CANDIDATES) if (existsSync(p)) return p;
  throw new Error(
    "No Chrome / Edge install found. Looked at:\n" +
      CHROME_CANDIDATES.map((p) => "  " + p).join("\n")
  );
}

async function waitFor200(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const r = await fetch(url);
      if (r.status === 200) return;
    } catch {
      /* not yet */
    }
    await wait(500);
  }
  throw new Error(`Server did not return 200 from ${url} in time.`);
}

function run(cmd, args, opts = {}) {
  return new Promise((resolveProc, reject) => {
    // Default: no shell. The shell on Windows breaks paths with spaces
    // (e.g. "C:/Program Files/..."). Callers that need a shell (like npm
    // for its .cmd shim) pass { shell: true } explicitly.
    const child = spawn(cmd, args, {
      stdio: "inherit",
      ...opts
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolveProc() : reject(new Error(`${cmd} exited ${code}`))
    );
  });
}

async function main() {
  const browser = findBrowser();

  // Start `next start` in the background.
  const server = spawn("npm", ["run", "start"], {
    cwd: repoRoot,
    stdio: ["ignore", "inherit", "inherit"],
    shell: process.platform === "win32",
    env: { ...process.env, PORT: "3000" }
  });

  let killed = false;
  const killServer = () => {
    if (killed) return;
    killed = true;
    try {
      if (process.platform === "win32") {
        spawn("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
          stdio: "ignore",
          shell: true
        });
      } else {
        server.kill("SIGTERM");
      }
    } catch {
      /* ignore */
    }
  };

  process.on("exit", killServer);
  process.on("SIGINT", () => { killServer(); process.exit(130); });
  process.on("SIGTERM", () => { killServer(); process.exit(143); });

  try {
    console.log("→ Waiting for Next server on http://localhost:3000/cv ...");
    await waitFor200("http://localhost:3000/cv");
    console.log("→ Server is up. Rendering PDF ...");

    await run(
      browser,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        `--print-to-pdf=${pdfOut}`,
        "http://localhost:3000/cv"
      ],
      { shell: false }
    );

    if (!existsSync(pdfOut)) throw new Error("PDF was not written to " + pdfOut);
    const { size } = statSync(pdfOut);
    console.log(`✓ Wrote ${pdfOut} (${Math.round(size / 1024)} KB)`);
  } finally {
    killServer();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
