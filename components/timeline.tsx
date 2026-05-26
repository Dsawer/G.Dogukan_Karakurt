import type { Entry } from "@/lib/content";

export function Timeline({ data }: { data: readonly Entry[] }) {
  return (
    <ol className="space-y-7">
      {data.map((entry) => (
        <li
          key={`${entry.period}-${entry.title}`}
          className="grid gap-1.5 md:grid-cols-[140px_1fr] md:gap-6"
        >
          <span className="pt-0.5 font-mono text-xs uppercase tracking-wide text-muted-foreground md:text-[11px]">
            {entry.period}
          </span>
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
              {entry.title}
            </h3>
            <p className="mt-0.5 text-[13.5px] text-muted-foreground">
              {entry.org}
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
              {entry.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
