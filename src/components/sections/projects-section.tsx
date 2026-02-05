"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BlurFade from "@/components/ui/blur-fade";
import type { Project } from "@/data/portfolio";

type ProjectsSectionProps = {
  projects: Project[];
};

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="space-y-8">
      <BlurFade delay={0.2} inView>
        <h2 className="text-3xl font-semibold tracking-tight">Selected Work</h2>
      </BlurFade>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <BlurFade key={project.title} delay={0.1 * i} inView>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 flex flex-col hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full group relative overflow-hidden">

              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-sm">
                <p className="text-green-500 font-mono text-sm mb-2">&lt;DevStats /&gt;</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center">
                  <div>
                    <p className="text-xs text-foreground/70 uppercase tracking-wider">Commits</p>
                    <p className="text-xl font-bold text-foreground font-mono">{project.devStats?.commits}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/70 uppercase tracking-wider">Caffeine</p>
                    <p className="text-xl font-bold text-foreground font-mono">{project.devStats?.caffeine}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-foreground/70 uppercase tracking-wider">Bugs Created</p>
                    <p className="text-xl font-bold text-red-400 font-mono">{project.devStats?.bugs}</p>
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {project.highlights.slice(0, 2).map((h, k) => (
                    <li key={k} className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 flex flex-wrap gap-2 border-t border-border/50 bg-muted/20">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs font-normal bg-background/50 hover:bg-background/80 transition-colors">
                    {t}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </BlurFade>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
