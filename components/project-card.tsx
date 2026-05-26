import { selectedProjects } from "@/lib/content";

export function Projects() {
  return (
    <ul className="-mx-3 flex flex-col">
      {selectedProjects.map((p, i) => (
        <li
          key={p.title}
          className={
            "row-hover rounded-md px-3 py-5 " +
            (i > 0 ? "border-t border-border-soft" : "")
          }
        >
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[17px] font-semibold leading-snug text-foreground">
              {p.title} <span className="text-slate-dim">— {p.tagline}</span>
            </h3>
            <p className="font-mono text-[11.5px] uppercase tracking-widest text-slate-dim">
              {p.meta}
            </p>
            <p className="text-[14.5px] leading-relaxed text-slate">{p.blurb}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-slate-dim">
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                Stack
              </span>{" "}
              · {p.stack}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
