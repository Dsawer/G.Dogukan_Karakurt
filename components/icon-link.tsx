import * as React from "react";
import { cn } from "@/lib/utils";
import type { IconLink as IconLinkType } from "@/lib/content";

const OrcidGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
    <circle cx="128" cy="128" r="128" fill="#A6CE39" />
    <path
      fill="#FFFFFF"
      d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93h-23.7v79.4zM88.7 56.8c0 5.5-4.5 10.1-10.1 10.1s-10.1-4.6-10.1-10.1c0-5.6 4.5-10.1 10.1-10.1s10.1 4.6 10.1 10.1z"
    />
  </svg>
);

const ScholarGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 14l-8-5.27V14l8 5.27L20 14V8.73L12 14zM12 3L1 10l11 7 9-5.73V17h2v-7L12 3z" />
  </svg>
);

const LinkedInGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9H7.12v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const glyphFor: Record<IconLinkType["brand"], React.FC<React.SVGProps<SVGSVGElement>>> = {
  orcid: OrcidGlyph,
  scholar: ScholarGlyph,
  linkedin: LinkedInGlyph
};

export function IconLink({
  link,
  showLabel = false,
  className
}: {
  link: IconLinkType;
  showLabel?: boolean;
  className?: string;
}) {
  const Glyph = glyphFor[link.brand];
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className={cn(
        "inline-flex items-center gap-2 text-slate-dim transition-colors hover:text-accent",
        showLabel ? "text-[13px]" : "p-1.5",
        className
      )}
    >
      <Glyph className="h-[18px] w-[18px]" />
      {showLabel && <span>{link.label}</span>}
    </a>
  );
}
