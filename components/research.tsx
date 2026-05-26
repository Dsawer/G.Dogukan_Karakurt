import Image from "next/image";
import { research } from "@/lib/content";

export function Research() {
  return (
    <article className="overflow-hidden rounded-lg border border-border-soft bg-[color:var(--surface)]/40 shadow-[inset_3px_0_0_var(--accent)]">
      <header className="px-6 pt-6">
        <h3 className="text-balance text-[22px] font-bold leading-snug tracking-tight text-foreground">
          {research.title}
        </h3>
      </header>

      <div className="space-y-6 px-6 py-6">
        <div className="space-y-4 text-[14.5px] leading-relaxed text-slate">
          {research.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

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
            sizes="(min-width: 1024px) 600px, 100vw"
          />
          <figcaption className="border-t border-border-soft bg-[color:var(--background)]/40 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-dim">
            {research.images[1].caption}
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
