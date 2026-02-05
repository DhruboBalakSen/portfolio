export type Project = {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  devStats: {
    commits: number;
    caffeine: string;
    bugs: string;
  };
};

export type Skills = {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
};

export const projects: Project[] = [
  {
    title: "Calley - Auto Call Dialer",
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

export const skills: Skills = {
  languages: ["TypeScript", "JavaScript", "Python", "Java", "C"],
  frameworks: ["Next.js", "React.js", "Express", "Spring Boot"],
  databases: ["MongoDB", "PostgreSQL", "MS SQL Server"],
  tools: ["Docker", "Git", "RabbitMQ", "N8N", "Zapier", "Ollama", "Plesk"]
};
