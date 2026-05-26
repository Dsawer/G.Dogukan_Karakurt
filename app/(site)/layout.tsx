import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import "../globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Research Assistant @ METU`,
    template: `%s · ${profile.name}`
  },
  description:
    "Civil Engineer, Software Developer and Graduate Researcher at METU. Construction Management MSc and Research Assistant.",
  authors: [{ name: profile.name }],
  keywords: [
    "Gürkan Doğukan Karakurt",
    "METU",
    "Construction Management",
    "Civil Engineering",
    "BIM",
    "Machine Learning",
    "Software Engineer"
  ],
  openGraph: {
    title: `${profile.name} — Research Assistant @ METU`,
    description:
      "Civil Engineer, Software Developer and Graduate Researcher at METU.",
    type: "profile",
    images: [{ url: "/assets/portrait.png", width: 520, height: 520, alt: profile.name }]
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — Research Assistant @ METU`,
    description:
      "Civil Engineer, Software Developer and Graduate Researcher at METU.",
    images: ["/assets/portrait.png"]
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#0a192f",
  width: "device-width",
  initialScale: 1
};

export default function SiteRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background text-slate antialiased">
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
