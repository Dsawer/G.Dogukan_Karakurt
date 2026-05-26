import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { ProjectCard } from "@/components/project-card";
import { SkillsGrid } from "@/components/skills-grid";
import { Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { education, experience, profile } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="about" title="About">
        <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {profile.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Section>

      <Section id="education" title="Education">
        <Timeline data={education} />
      </Section>

      <Section id="experience" title="Experience">
        <Timeline data={experience} />
      </Section>

      <Section id="project" title="Featured Project">
        <ProjectCard />
      </Section>

      <Section id="skills" title="Skills">
        <SkillsGrid />
      </Section>

      <Section id="resume" title="Resume">
        <div className="space-y-5">
          <p className="text-[15px] leading-relaxed text-muted-foreground md:text-base">
            A printable English copy of my CV is available as a PDF. The on-page
            content above is the canonical version of the same résumé.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/assets/cv.pdf"
              download="Gurkan-Dogukan-Karakurt-CV.pdf"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "gap-2")}
            >
              <Download className="h-4 w-4" />
              Download CV (PDF)
            </a>
            <a
              href="/cv"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
            >
              <FileText className="h-4 w-4" />
              View printable version
            </a>
          </div>
          <p className="text-[13px] text-muted-foreground/80">
            Personal contact details are intentionally omitted from this CV for
            privacy. Please reach out through LinkedIn for academic correspondence.
          </p>
        </div>
      </Section>
    </>
  );
}
