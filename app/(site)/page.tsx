import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { Timeline } from "@/components/timeline";
import { Research } from "@/components/research";
import { SkillLines } from "@/components/skills-grid";
import { education, experience, profile } from "@/lib/content";

function RowSection({
  id,
  title,
  children
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-12">
      <h2 className="section-title mb-5 inline-flex">{title}</h2>
      {children}
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,_360px)_minmax(0,_1fr)] lg:gap-x-16">
        <Sidebar />

        <main id="main" className="flex flex-col gap-16 py-12 lg:py-24">
          <RowSection id="about" title="About">
            <div className="space-y-4 text-[15.5px] leading-relaxed text-slate lg:text-[16px]">
              {profile.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </RowSection>

          <RowSection id="research" title="Research">
            <Research />
          </RowSection>

          <RowSection id="education" title="Education">
            <Timeline data={education} />
          </RowSection>

          <RowSection id="experience" title="Experience">
            <Timeline data={experience} />
          </RowSection>

          <RowSection id="skills" title="Skills">
            <SkillLines />
          </RowSection>

          <RowSection id="resume" title="Resume">
            <a
              href="/assets/cv.pdf"
              download="Gurkan-Dogukan-Karakurt-CV.pdf"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <Download className="h-4 w-4" />
              Download CV (PDF)
            </a>
          </RowSection>

          <footer className="border-t border-border-soft pt-6 text-[12.5px] text-slate-dim">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js +
            Tailwind. Deployed on Vercel.
          </footer>
        </main>
      </div>
    </div>
  );
}
