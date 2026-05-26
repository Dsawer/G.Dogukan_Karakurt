import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { IconLink as IconLinkType } from "@/lib/content";

const OrcidGlyph = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 17.45H5.667V7.151H7.37V17.45zM6.518 6.448a.99.99 0 1 1 0-1.98.99.99 0 0 1 0 1.98zM17.561 17.45h-1.667v-5.064c0-1.207-.022-2.76-1.682-2.76-1.683 0-1.941 1.314-1.941 2.672v5.152h-1.667V7.151h1.6v1.408h.022c.222-.422 1.077-1.408 2.215-1.408 2.371 0 2.808 1.56 2.808 3.589v6.71z" />
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

export function IconLink({ link, className }: { link: IconLinkType; className?: string }) {
  const Glyph = glyphFor[link.brand];
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className={cn(buttonVariants({ variant: "outline", size: "md" }), "gap-2", className)}
    >
      <Glyph className="h-4 w-4" />
      <span>{link.label}</span>
    </a>
  );
}
