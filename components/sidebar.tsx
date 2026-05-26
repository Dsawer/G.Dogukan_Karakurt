"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { iconLinks, navItems, profile } from "@/lib/content";
import { IconLink } from "@/components/icon-link";

export function Sidebar() {
  const [activeId, setActiveId] = React.useState<string>(navItems[0]?.id ?? "");

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
    <aside className="flex w-full flex-col gap-7 py-10 lg:sticky lg:top-0 lg:gap-7 lg:py-12">
      <header className="flex flex-col gap-4">
        <div className="relative h-[108px] w-[108px] shrink-0 overflow-hidden rounded-[14px] glow-portrait">
          <Image
            src="/assets/portrait.png"
            alt={`Portrait of ${profile.name}`}
            width={520}
            height={520}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-balance text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-foreground">
            {profile.name}
          </h1>
          <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-accent">
            MSc Candidate · Research Assistant
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-dim">
            METU Construction Engineering &amp; Management
          </p>
        </div>
      </header>

      <nav aria-label="Section navigation" className="hidden lg:block">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item, idx) => {
            const isActive = activeId === item.id;
            const num = String(idx + 1).padStart(2, "0");
            return (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  data-active={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-md py-1.5 pl-0 pr-3 text-[13.5px] transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-slate-dim hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "block h-px transition-all",
                      isActive
                        ? "w-10 bg-accent"
                        : "w-5 bg-slate-dim group-hover:w-10 group-hover:bg-foreground"
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11.5px] uppercase tracking-widest">
                    {num}
                  </span>
                  <span className="font-medium uppercase tracking-[0.14em]">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-2 flex items-center gap-1 lg:mt-auto">
        {iconLinks.map((link) => (
          <IconLink key={link.brand} link={link} />
        ))}
        <a
          href="/assets/cv.pdf"
          download="Gurkan-Dogukan-Karakurt-CV.pdf"
          className="ml-2 inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-widest text-accent transition-colors hover:bg-[color:var(--accent-soft)]"
          aria-label="Download CV PDF"
        >
          CV ↓
        </a>
      </div>
    </aside>
  );
}
