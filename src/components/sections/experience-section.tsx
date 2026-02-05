"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlurFade from "@/components/ui/blur-fade";
import HonestWorkToggle from "@/components/ui/honest-work-toggle";

type ExperienceSectionProps = {
  honestMode: boolean;
  onToggle: (value: boolean) => void;
};

const ExperienceSection = ({ honestMode, onToggle }: ExperienceSectionProps) => {
  return (
    <section id="experience" className="space-y-8">
      <BlurFade delay={0.2} inView>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
            <Badge variant="outline" className="text-sm py-1">2025 - Present</Badge>
          </div>
          <HonestWorkToggle enabled={honestMode} onToggle={onToggle} />
        </div>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-foreground/20 transition-all duration-300">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-xl">
                  {honestMode ? "Professional Google Searcher" : "Full Stack Developer"}
                </CardTitle>
                <CardDescription className="text-base mt-1">C S Tech Infosolutions Private Limited</CardDescription>
              </div>
              <Badge variant="secondary">On-Site</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm leading-relaxed">
              {honestMode ? (
                <>
                  <li>Copied code from Stack Overflow & ChatGPT and claimed it was "system modernization".</li>
                  <li>Designed backend systems that mostly just crash gracefully.</li>
                  <li>Deployed Docker containers and prayed they wouldn't perform an unplanned rapid disassembly.</li>
                  <li>Built internal dashboards so management feels like they are managing something.</li>
                </>
              ) : (
                <>
                  <li>Worked on production-grade web applications using Next.js, contributing to system modernization and performance improvements.</li>
                  <li>Designed and implemented backend systems involving asynchronous job queues, containerized deployments, and scalable architectures.</li>
                  <li>Built and deployed Dockerized applications on a Plesk-managed VPS for multiple internal and client-facing platforms.</li>
                  <li>Contributed to internal tooling, automation workflows, and admin dashboards to improve operational efficiency.</li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </BlurFade>
    </section>
  );
};

export default ExperienceSection;
