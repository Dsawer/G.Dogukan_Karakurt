import { featuredProject } from "@/lib/content";

export function FeaturedProject() {
  const p = featuredProject;
  return (
    <article className="overflow-hidden rounded-lg border border-border-soft bg-[color:var(--surface)]/40 shadow-[inset_3px_0_0_var(--accent)] transition-colors hover:bg-[color:var(--surface)]/70">
      <header className="space-y-1.5 px-6 pt-6">
        <h3 className="text-[19px] font-bold tracking-tight text-foreground">
          {p.title}
        </h3>
        <p className="text-[13.5px] text-slate">{p.subtitle}</p>
        <p className="font-mono text-[10.5px] uppercase tracking-widest text-slate-dim">
          {p.meta.join("  ·  ")}
        </p>
      </header>

      <div className="space-y-5 px-6 py-5">
        <p className="text-[13.5px] leading-relaxed text-slate">{p.summary}</p>

        <div className="space-y-px">
          {p.highlights.map((h, i) => (
            <div
              key={h.title}
              className={
                i === 0
                  ? "pt-0"
                  : "border-t border-border-soft pt-3"
              }
            >
              <h4 className="mb-1 text-[13px] font-semibold text-foreground">
                {h.title}
              </h4>
              <p className="pb-3 text-[13px] leading-relaxed text-slate">{h.body}</p>
            </div>
          ))}
        </div>

        <dl className="grid grid-cols-3 gap-x-4 gap-y-3 border-t border-border-soft pt-4 text-left">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-dim">
                {m.label}
              </dt>
              <dd className="mt-1 font-mono text-[13px] font-semibold tabular-nums text-foreground">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-border-soft pt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-dim">
            Stack
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate">
            {p.stack.join("  ·  ")}
          </p>
        </div>
      </div>
    </article>
  );
}
