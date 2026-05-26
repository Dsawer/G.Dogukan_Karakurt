import Image from "next/image";
import { research } from "@/lib/content";

export function Research() {
  return (
    <article className="overflow-hidden rounded-lg border border-border-soft bg-[color:var(--surface)]/40 shadow-[inset_3px_0_0_var(--accent)]">
      <header className="space-y-2.5 px-6 pt-6">
        <p className="font-mono text-[11.5px] uppercase tracking-widest text-accent">
          {research.programme}
        </p>
        <h3 className="text-balance text-[22px] font-bold leading-snug tracking-tight text-foreground">
          {research.title}
        </h3>
        <p className="font-mono text-[11.5px] uppercase tracking-widest text-slate-dim">
          Supervisor: {research.supervisor}  ·  {research.course}  ·  {research.presentedOn}
        </p>
      </header>

      <div className="space-y-6 px-6 py-6">
        <p className="text-pretty text-[15px] leading-relaxed text-slate">
          {research.pitch}
        </p>

        <figure className="overflow-hidden rounded-md border border-border-soft">
          <Image
            src={research.images[0].src}
            alt={research.images[0].alt}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
          <figcaption className="border-t border-border-soft bg-[color:var(--background)]/40 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-dim">
            Fig 1 — {research.images[0].caption}
          </figcaption>
        </figure>

        <div className="space-y-px">
          {research.sections.map((s, i) => (
            <div
              key={s.label}
              className={i === 0 ? "pt-0" : "border-t border-border-soft pt-4"}
            >
              <h4 className="mb-1.5 font-mono text-[11.5px] uppercase tracking-widest text-accent">
                {s.label}
              </h4>
              <p className="pb-4 text-[14.5px] leading-relaxed text-slate">{s.body}</p>
            </div>
          ))}
        </div>

        <figure className="overflow-hidden rounded-md border border-border-soft bg-white">
          <Image
            src={research.images[1].src}
            alt={research.images[1].alt}
            width={800}
            height={400}
            className="h-auto w-full object-contain"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
          <figcaption className="border-t border-border-soft bg-[color:var(--background)]/40 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-dim">
            Fig 2 — {research.images[1].caption}
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
