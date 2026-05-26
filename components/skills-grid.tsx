import { skills } from "@/lib/content";

const SHORT_LABELS: Record<string, string> = {
  "Research & Engineering": "Research",
  "Software Development": "Software",
  Design: "Design",
  Languages: "Languages"
};

export function SkillLines() {
  return (
    <ul className="flex flex-col">
      {skills.map((group) => (
        <li
          key={group.name}
          className="grid gap-1 border-b border-border-soft py-5 last:border-b-0 lg:grid-cols-[140px_1fr] lg:gap-6"
        >
          <span className="font-mono text-[12px] uppercase tracking-widest text-accent">
            {SHORT_LABELS[group.name] ?? group.name}
          </span>
          <p className="text-[14.5px] leading-relaxed text-slate">
            {group.pills.map((p, i) => (
              <span key={p.label}>
                <span className="text-foreground">{p.label}</span>
                {p.level && (
                  <span className="text-slate-dim"> ({p.level})</span>
                )}
                {i < group.pills.length - 1 && (
                  <span className="text-slate-dim">  ·  </span>
                )}
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
