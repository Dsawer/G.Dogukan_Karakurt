import Image from "next/image";
import { profile, iconLinks } from "@/lib/content";
import { IconLink } from "@/components/icon-link";

export function Hero() {
  return (
    <section
      id="hero"
      className="bg-hero relative w-full overflow-hidden border-b border-border"
    >
      <div className="mx-auto grid w-full max-w-3xl items-center gap-10 px-6 py-20 md:grid-cols-[260px_1fr] md:gap-12 md:py-28">
        <div className="relative mx-auto h-[220px] w-[220px] shrink-0 md:mx-0 md:h-[260px] md:w-[260px]">
          <div className="absolute inset-0 -z-10 rounded-[24px] bg-[color:var(--accent-soft)] blur-2xl" />
          <Image
            src="/assets/portrait.png"
            alt={`Portrait of ${profile.name}`}
            width={520}
            height={520}
            priority
            className="h-full w-full rounded-[20px] object-cover ring-1 ring-border"
          />
        </div>

        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {profile.eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
            {profile.name}
          </h1>
          <p className="text-pretty text-sm font-medium text-muted-foreground md:text-base">
            {profile.roles.map((r, i) => (
              <span key={r}>
                {r}
                {i < profile.roles.length - 1 && (
                  <span className="mx-2 text-accent">·</span>
                )}
              </span>
            ))}
          </p>
          <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {profile.headline}. Research interests:{" "}
            {profile.researchInterests.map((interest, i) => (
              <span key={interest}>
                <span className="text-foreground/90">{interest}</span>
                {i < profile.researchInterests.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {iconLinks.map((link) => (
              <IconLink key={link.brand} link={link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
