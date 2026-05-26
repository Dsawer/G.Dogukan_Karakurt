import {
  Brain,
  Code2,
  GraduationCap,
  HardHat,
  Microscope,
  Palette,
  Smartphone,
  TrendingUp,
  type LucideIcon
} from "lucide-react";
import type { Entry, EntryIcon } from "@/lib/content";

const ICON_MAP: Record<EntryIcon, LucideIcon> = {
  graduation: GraduationCap,
  book: Brain,
  hardhat: HardHat,
  finance: TrendingUp,
  research: Microscope,
  code: Code2,
  mobile: Smartphone,
  trading: TrendingUp,
  design: Palette
};

export function Timeline({ data }: { data: readonly Entry[] }) {
  return (
    <ol className="-mx-3 flex flex-col gap-1">
      {data.map((entry) => {
        const Icon = ICON_MAP[entry.icon] ?? GraduationCap;
        return (
          <li
            key={`${entry.period}-${entry.title}`}
            className="row-hover grid gap-1.5 rounded-md px-3 py-4 lg:grid-cols-[140px_1fr] lg:gap-6"
          >
            <span className="pt-0.5 font-mono text-[11.5px] uppercase tracking-widest text-slate-dim">
              {entry.period}
            </span>
            <div>
              <div className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-[color:var(--accent-soft)] text-accent"
                  aria-hidden="true"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold leading-snug text-foreground">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-slate">{entry.org}</p>
                </div>
              </div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate">
                {entry.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
