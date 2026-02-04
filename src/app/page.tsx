"use client";

import { useState } from 'react';
import Dither from '@/components/ui/Dither';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DecryptedText from "@/components/ui/decrypted-text";
import BlurFade from "@/components/ui/blur-fade";
import GitJokes from "@/components/ui/git-jokes";
import { Github, Linkedin, Mail, Phone, ExternalLink, Download, FileText } from "lucide-react";

import SystemMonitor from "@/components/ui/system-monitor";
import { KonamiToast } from "@/components/ui/konami-toast";
import TerminalFooter from "@/components/ui/terminal-footer";
import DeployButton from "@/components/ui/deploy-button";
import HonestWorkToggle from "@/components/ui/honest-work-toggle";

const projects = [
  {
    title: "Calley – Auto Call Dialer",
    description: "Outbound calling platform for sales teams to automate and manage lead-based calls efficiently.",
    tech: ["Next.js", "MongoDB", "RabbitMQ"],
    highlights: [
      "Built scalable web app with queue-based background handling",
      "Developed admin, agent, and team management dashboards",
      "Integrated SIM-based and VoIP-based calling workflows"
    ],
    devStats: {
      commits: 120,
      caffeine: "40L",
      bugs: "3 (Known)"
    }
  },
  {
    title: "RAG WhatsApp Chatbot",
    description: "RAG-based WhatsApp chatbot for automated customer support and admin reporting.",
    tech: ["RAG", "WhatsApp API", "Analytics"],
    highlights: [
      "Implemented knowledge retrieval for context-aware responses",
      "Built conversation logs and analytics dashboards",
      "Scalable message handling for high-volume interactions"
    ],
    devStats: {
      commits: 85,
      caffeine: "25L",
      bugs: "0 (Lies)"
    }
  },
  {
    title: "CostHub",
    description: "Company-wide internal platform for task tracking, ticket management, and cost analysis.",
    tech: ["Next.js", "Role-based Auth", "Dashboards"],
    highlights: [
      "Task tracking and ticket management system",
      "Cost analysis and internal reporting modules",
      "Role-based dashboards for multiple teams"
    ],
    devStats: {
      commits: 210,
      caffeine: "Too much",
      bugs: "Infinite"
    }
  },
  {
    title: "ThrottleTribe",
    description: "A social media platform tailored for motorcyclists with trip planning and image sharing.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Cloudinary"],
    highlights: [
      "User authentication and media uploads",
      "Route planning with Google Maps integration",
      "NeonDB for scalable database solutions"
    ],
    devStats: {
      commits: 340,
      caffeine: "100L",
      bugs: "Yes"
    }
  }
];

const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "Java", "C"],
  frameworks: ["Next.js", "React.js", "Express", "Spring Boot"],
  databases: ["MongoDB", "PostgreSQL", "MS SQL Server"],
  tools: ["Docker", "Git", "RabbitMQ", "N8N", "Zapier", "Ollama", "Plesk"]
};

// Scroll to section handler
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Page = () => {
  const [honestMode, setHonestMode] = useState(false);

  return (
    <div className="min-h-screen relative font-sans">
      <KonamiToast />
      {/* Dither Background - Fixed */}
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

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center z-10">
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
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
              <Button size="lg" onClick={() => scrollToSection('projects')} className="bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 duration-300">
                View Work
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')} className="transition-all hover:scale-105 duration-300">
                Contact Me
              </Button>
              <Button variant="ghost" size="lg" asChild className="transition-all hover:scale-105 duration-300">
                <a href="/resume.pdf" target="_blank">
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20 space-y-32 relative z-10">

        {/* About & Skills Grid */}
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
                    <span>MCA • PES University</span>
                    <span className="text-muted-foreground">8.36 CGPA</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-border pb-2 hover:bg-muted/50 p-2 rounded transition-colors">
                    <span>BCA • Acharya Inst.</span>
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
                    {skills.languages.map(s => <Badge key={s} variant="secondary" className="hover:scale-105 transition-transform cursor-default">{s}</Badge>)}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Frameworks</span>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.map(s => <Badge key={s} variant="secondary" className="hover:scale-105 transition-transform cursor-default">{s}</Badge>)}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Databases</span>
                  <div className="flex flex-wrap gap-2">
                    {skills.databases.map(s => <Badge key={s} variant="secondary" className="hover:scale-105 transition-transform cursor-default">{s}</Badge>)}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Tools</span>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map(s => <Badge key={s} variant="outline" className="hover:scale-105 transition-transform cursor-default">{s}</Badge>)}
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </section>

        <Separator />

        {/* Experience */}
        <section id="experience" className="space-y-8">
          <BlurFade delay={0.2} inView>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
                <Badge variant="outline" className="text-sm py-1">2025 - Present</Badge>
              </div>
              <HonestWorkToggle enabled={honestMode} onToggle={setHonestMode} />
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

        <Separator />

        {/* Projects */}
        <section id="projects" className="space-y-8">
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl font-semibold tracking-tight">Selected Work</h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <BlurFade key={i} delay={0.1 * i} inView>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 flex flex-col hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full group relative overflow-hidden">

                  {/* Gamer Stats Overlay */}
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-sm">
                    <p className="text-green-500 font-mono text-sm mb-2">&lt;DevStats /&gt;</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Commits</p>
                        <p className="text-xl font-bold text-foreground font-mono">{project.devStats?.commits}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Caffeine</p>
                        <p className="text-xl font-bold text-foreground font-mono">{project.devStats?.caffeine}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Bugs Created</p>
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
                    {project.tech.map(t => (
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

        <Separator />

        {/* Contact */}
        <section id="contact" className="py-12 text-center space-y-8 max-w-2xl mx-auto">
          <BlurFade delay={0.2} inView>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">Get in Touch</h2>
              <p className="text-muted-foreground">
                I'm currently exploring new opportunities. <br />
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button asChild size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
                <a href="mailto:dhrubosen206@gmail.com">
                  <Mail className="mr-2 h-4 w-4" /> Email Me
                </a>
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a href="https://github.com/DhruboBalakSen" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a href="https://www.linkedin.com/in/dhrubo-balak-sen-39114322a/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground pt-8">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-3 w-3" />
                <a href="tel:+916364606251" className="hover:text-foreground transition-colors">+91-6364606251</a>
              </div>
            </div>

            <div className="pt-12">
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">Danger Zone</p>
              <DeployButton />
            </div>
          </BlurFade>
        </section>

      </main>

      <TerminalFooter />
    </div >
  );
};

export default Page;
