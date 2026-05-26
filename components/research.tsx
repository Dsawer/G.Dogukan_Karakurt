import Image from "next/image";
import { ExternalLink } from "lucide-react";
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
        {research.images.map((image) => (
          <figure
            key={image.src}
            className="group overflow-hidden rounded-md border border-border-soft"
          >
            <a
              href={image.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${image.caption} — opens reference in a new tab`}
              className="relative block aspect-[16/10] overflow-hidden bg-white"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                sizes="(min-width: 768px) 320px, 100vw"
              />
              <span className="pointer-events-none absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--background)]/85 text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </a>
            <figcaption className="border-t border-border-soft bg-[color:var(--surface)]/40 px-3 py-2 font-mono text-[10.5px] uppercase tracking-widest text-slate-dim">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}
