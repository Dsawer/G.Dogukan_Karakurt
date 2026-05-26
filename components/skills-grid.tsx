import { skills } from "@/lib/content";

const SHORT_LABELS: Record<string, string> = {
  "Research & Engineering": "Research",
  "Backend & Data": "Backend",
  "Frontend & Mobile": "Frontend",
  Design: "Design",
  Languages: "Languages"
};

export function SkillLines() {
  return (
    <div className="flex flex-col gap-7">
      {skills.map((group) => (
        <div
          key={group.name}
          className="grid gap-3 lg:grid-cols-[140px_1fr] lg:gap-6"
        >
          <h3 className="pt-1 font-mono text-[11.5px] uppercase tracking-widest text-accent">
            {SHORT_LABELS[group.name] ?? group.name}
          </h3>
          <ul className="flex flex-col gap-1.5 text-[14.5px] leading-relaxed text-slate">
            {group.pills.map((p) => (
              <li key={p.label} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="select-none pt-[1px] font-mono text-[12px] text-accent"
                >
                  ▸
                </span>
                <span>
                  <span className="text-foreground">{p.label}</span>
                  {p.level && (
                    <span className="text-slate-dim"> — {p.level}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
