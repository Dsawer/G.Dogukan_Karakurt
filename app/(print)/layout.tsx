import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "CV — Print View",
  robots: { index: false, follow: false }
};

export default function PrintRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ background: "#ffffff", color: "#111" }}>{children}</body>
    </html>
  );
}
