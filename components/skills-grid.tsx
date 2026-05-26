import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/lib/content";

export function SkillsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skills.map((group) => (
        <Card key={group.name}>
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold">{group.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {group.pills.map((pill) => (
                <Badge
                  key={pill.label}
                  variant="outline"
                  className="font-normal"
                >
                  <span className="text-foreground">{pill.label}</span>
                  {pill.level && (
                    <span className="text-muted-foreground/80">· {pill.level}</span>
                  )}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
