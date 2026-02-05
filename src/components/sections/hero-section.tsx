"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/ui/decrypted-text";
import BlurFade from "@/components/ui/blur-fade";
import GitJokes from "@/components/ui/git-jokes";

type HeroSectionProps = {
  onViewWork: () => void;
  onContact: () => void;
};

const HeroSection = ({ onViewWork, onContact }: HeroSectionProps) => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center z-10">
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50">
          <DecryptedText text="Dhrubo Balak Sen" speed={80} maxIterations={20} />
        </h1>

        <BlurFade delay={0.3}>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-tight">
            Full Stack Developer & Creative Technologist
          </p>
        </BlurFade>

        <BlurFade delay={0.5}>
          <p className="max-w-2xl mx-auto text-muted-foreground/80 leading-relaxed">
            Building production-grade web applications with Next.js, MongoDB, and modern cloud architectures.
            Specialized in scalable backend systems and containerized deployments.
          </p>
        </BlurFade>

        <BlurFade delay={0.7}>
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Button size="lg" onClick={onViewWork} className="bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 duration-300">
              View Work
            </Button>
            <Button variant="outline" size="lg" onClick={onContact} className="transition-all hover:scale-105 duration-300">
              Contact Me
            </Button>
            <Button variant="ghost" size="lg" asChild className="transition-all hover:scale-105 duration-300">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </div>
        </BlurFade>

        <BlurFade delay={0.9} className="pt-12 w-full flex justify-center">
          <GitJokes />
        </BlurFade>
      </div>
    </section>
  );
};

export default HeroSection;
