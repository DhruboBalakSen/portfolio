"use client";

import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/ui/blur-fade";
import type { Skills } from "@/data/portfolio";

const SystemMonitor = dynamic(() => import("@/components/ui/system-monitor"), { ssr: false });

type AboutSkillsSectionProps = {
  skills: Skills;
};

const AboutSkillsSection = ({ skills }: AboutSkillsSectionProps) => {
  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <BlurFade delay={0.2} inView>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">About</h2>
          <div className="prose dark:prose-invert text-muted-foreground">
            <p>
              I'm a Full Stack Developer currently working at <span className="text-foreground font-medium">C S Tech Infosolutions</span>.
              I specialize in building efficient, maintainable systems that solve real-world problems.
            </p>
            <p className="mb-8">
              My focus areas include Back-End Development, Cloud Computing, and Data Engineering.
              I hold a Master's in Computer Application from PES University, Bengaluru.
            </p>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between items-center text-sm border-b border-border pb-2 hover:bg-muted/50 p-2 rounded transition-colors">
                <span>MCA - PES University</span>
                <span className="text-muted-foreground">8.36 CGPA</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border pb-2 hover:bg-muted/50 p-2 rounded transition-colors">
                <span>BCA - Acharya Inst.</span>
                <span className="text-muted-foreground">8.31 CGPA</span>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.4} inView>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">Stack</h2>
            <div className="w-40 h-12 -mt-6 hidden md:block">
              <SystemMonitor />
            </div>
          </div>
          <div className="space-y-0 relative z-20">
            <div className="md:hidden mb-6 h-40">
              <SystemMonitor />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Languages</span>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((s) => (
                  <Badge key={s} variant="secondary" className="hover:scale-105 transition-transform cursor-default">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Frameworks</span>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((s) => (
                  <Badge key={s} variant="secondary" className="hover:scale-105 transition-transform cursor-default">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Databases</span>
              <div className="flex flex-wrap gap-2">
                {skills.databases.map((s) => (
                  <Badge key={s} variant="secondary" className="hover:scale-105 transition-transform cursor-default">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Tools</span>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((s) => (
                  <Badge key={s} variant="outline" className="hover:scale-105 transition-transform cursor-default">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export default AboutSkillsSection;
