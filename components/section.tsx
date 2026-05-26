import * as React from "react";
import { cn } from "@/lib/utils";
import { MotionSection } from "@/components/motion-section";

type SectionProps = {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, title, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-3xl px-6 py-16 scroll-mt-24 md:py-20",
        className
      )}
    >
      <MotionSection>
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </h2>
        {children}
      </MotionSection>
    </section>
  );
}
