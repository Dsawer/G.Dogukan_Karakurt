import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featuredProject } from "@/lib/content";

export function ProjectCard() {
  const p = featuredProject;
  return (
    <Card className="overflow-hidden border-l-[3px] border-l-accent">
      <CardHeader className="space-y-2">
        <CardTitle>{p.title}</CardTitle>
        <p className="text-[14.5px] text-muted-foreground">{p.subtitle}</p>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">
          {p.meta.map((m, i) => (
            <span key={m}>
              {m}
              {i < p.meta.length - 1 && <span className="mx-2 text-accent">·</span>}
            </span>
          ))}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-[14.5px] leading-relaxed text-muted-foreground">
          {p.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <Badge key={s} variant="accent">
              {s}
            </Badge>
          ))}
        </div>

        <div className="space-y-3">
          {p.highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-[var(--radius-md)] border border-border bg-background/40 p-4"
            >
              <h4 className="mb-1 text-[14px] font-semibold text-foreground">
                {h.title}
              </h4>
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                {h.body}
              </p>
            </div>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-3 rounded-[var(--radius-md)] border border-dashed border-border bg-background/30 p-4 md:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                {m.label}
              </dt>
              <dd className="mt-1 text-[15px] font-semibold tabular-nums text-foreground">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>

      <CardFooter className="border-t border-border pt-4 text-[12.5px]">
        Full engineering write-up: <code className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">CV_PROJECT.md</code>
      </CardFooter>
    </Card>
  );
}
