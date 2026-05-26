import Image from "next/image";
import { research } from "@/lib/content";

export function Research() {
  return (
    <article className="space-y-7">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="block h-[2px] w-10 bg-accent" aria-hidden="true" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-dim">
            Current Work
          </span>
        </div>
        <h3 className="text-balance text-[24px] font-bold leading-[1.2] tracking-tight text-foreground md:text-[26px]">
          {research.title}
        </h3>
      </header>

      <div className="space-y-4 text-[14.5px] leading-relaxed text-slate">
        {research.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <figure className="overflow-hidden rounded-md border border-border-soft">
          <Image
            src={research.images[0].src}
            alt={research.images[0].alt}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            sizes="(min-width: 768px) 320px, 100vw"
          />
          <figcaption className="border-t border-border-soft bg-[color:var(--surface)]/40 px-3 py-2 font-mono text-[10.5px] uppercase tracking-widest text-slate-dim">
            {research.images[0].caption}
          </figcaption>
        </figure>

        <figure className="overflow-hidden rounded-md border border-border-soft bg-white">
          <Image
            src={research.images[1].src}
            alt={research.images[1].alt}
            width={800}
            height={400}
            className="h-auto w-full object-contain"
            sizes="(min-width: 768px) 320px, 100vw"
          />
          <figcaption className="border-t border-border-soft bg-[color:var(--surface)]/40 px-3 py-2 font-mono text-[10.5px] uppercase tracking-widest text-slate-dim">
            {research.images[1].caption}
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
