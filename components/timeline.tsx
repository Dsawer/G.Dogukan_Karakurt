import type { Entry } from "@/lib/content";

export function Timeline({ data }: { data: readonly Entry[] }) {
  return (
    <ol className="-mx-3 flex flex-col gap-1">
      {data.map((entry) => (
        <li
          key={`${entry.period}-${entry.title}`}
          className="row-hover grid gap-1.5 rounded-md px-3 py-3 lg:grid-cols-[125px_1fr] lg:gap-6"
        >
          <span className="pt-0.5 font-mono text-[10.5px] uppercase tracking-widest text-slate-dim">
            {entry.period}
          </span>
          <div>
            <h3 className="text-[14.5px] font-semibold leading-snug text-foreground">
              {entry.title}
            </h3>
            <p className="mt-0.5 text-[13px] text-slate">{entry.org}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate">
              {entry.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
