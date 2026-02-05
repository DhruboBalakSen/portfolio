"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";
import { KonamiToast } from "@/components/ui/konami-toast";
import TerminalFooter from "@/components/ui/terminal-footer";
import HeroSection from "@/components/sections/hero-section";
import AboutSkillsSection from "@/components/sections/about-skills-section";
import ExperienceSection from "@/components/sections/experience-section";
import ProjectsSection from "@/components/sections/projects-section";
import ContactSection from "@/components/sections/contact-section";
import { projects, skills } from "@/data/portfolio";

const Dither = dynamic(() => import("@/components/ui/Dither"), { ssr: false });

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Page = () => {
  const [honestMode, setHonestMode] = useState(false);

  return (
    <div className="min-h-screen relative font-sans">
      <KonamiToast />

      <div className="dither-bg">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      <HeroSection
        onViewWork={() => scrollToSection("projects")}
        onContact={() => scrollToSection("contact")}
      />

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-32 relative z-10">
        <AboutSkillsSection skills={skills} />

        <Separator />

        <ExperienceSection honestMode={honestMode} onToggle={setHonestMode} />

        <Separator />

        <ProjectsSection projects={projects} />

        <Separator />

        <ContactSection />
      </main>

      <TerminalFooter />
    </div>
  );
};

export default Page;
