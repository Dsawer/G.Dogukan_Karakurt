"use client";

import * as React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/content";

export function SiteNav() {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[color:var(--background)]/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center gap-3 px-6">
        <Link
          href="#hero"
          aria-label="Home"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-accent text-[13px] font-bold tracking-tight text-accent-foreground"
        >
          GK
        </Link>

        <nav aria-label="Primary" className="ml-auto mr-1 hidden items-center sm:flex">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  data-active={activeId === item.id ? "true" : undefined}
                  className={cn(
                    "rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-[color:var(--accent-soft)] hover:text-foreground",
                    "data-[active=true]:bg-[color:var(--accent-soft)] data-[active=true]:text-accent"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <a
            href="/assets/cv.pdf"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1.5"
            )}
            aria-label="Download CV PDF"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">CV</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
