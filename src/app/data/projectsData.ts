// Shared typed project data for the entire portfolio
// Extend this file to add new projects — ProjectDetail page reads from here

import imgReact from "../../assets/tech-icons/react.svg";
import imgTs from "../../assets/tech-icons/typescript.svg";
import imgTailwind from "../../assets/tech-icons/tailwindcss.svg";
import imgSupabase from "../../assets/tech-icons/supabase.svg";
import imgPostgres from "../../assets/tech-icons/postgresql.svg";

export type ProjectData = {
  slug: string;
  title: string;
  displayTitle: string; // Uppercase for hero
  index: number; // 01, 02, etc.
  totalProjects: number;
  domain: "software" | "design";
  tags: string[];
  category: string;
  role: string;
  team: string;
  liveUrl: string | null;
  techStack: { name: string; src: string }[];
  overview: string;
  challenges: string;
  reflections: string;
  whatWasDone: string[];
  whatWasBuilt: string[];
  nextProject: string; // slug of next project
  image: string; // Hero/list thumbnail
};

export const projectsData: ProjectData[] = [
  {
    slug: "internal-tool",
    title: "Internal Tool",
    displayTitle: "INTERNAL TOOL",
    index: 1,
    totalProjects: 16,
    domain: "software",
    tags: ["Full Stack", "React"],
    category: "Industrial Operations",
    role: "Full Stack Developer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "React", src: imgReact },
      { name: "TypeScript", src: imgTs },
      { name: "Tailwind CSS", src: imgTailwind },
      { name: "Supabase", src: imgSupabase },
      { name: "PostgreSQL", src: imgPostgres },
    ],
    overview:
      "A web-based internal dashboard developed to digitize routine machinery inspection workflows and compliance documentation in an industrial manufacturing environment. The system replaced manual spreadsheet logging and paper-based approvals with a centralized platform for tracking maintenance checks and managing signed records.",
    challenges:
      "Maintenance checks and approval workflows were previously handled through Excel sheets and manually signed PDF documents, creating repetitive administrative effort and fragmented record keeping.\nThe solution required automated reminders, structured role-based workflows, and reliable documentation handling suitable for operational and audit readiness.",
    reflections:
      "This project strengthened experience in translating manual operational workflows into structured digital systems that improve reliability and accountability.\nIt reinforced the value of automation and role-based access control in operational environments.",
    whatWasDone: [
      "Designed role-based workflows for employees, managers, and administrators with controlled access to maintenance and approval functions",
      "Implemented scheduled email notifications to alert users when required maintenance checks were overdue",
      "Developed secure authentication using employee identification credentials",
      "Built document handling workflows to upload, approve, and return signed inspection reports",
    ],
    whatWasBuilt: [
      "Internal dashboard for managing routine machinery inspections",
      "Automated reminder system for overdue maintenance tasks",
      "Digital approval workflow for signed inspection documentation",
      "Administrative portal for device registration and inspection monitoring",
    ],
    nextProject: "ai-therapist",
    image:
      "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc1OTI5Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    slug: "ai-therapist",
    title: "AI Therapist",
    displayTitle: "AI THERAPIST",
    index: 2,
    totalProjects: 16,
    domain: "software",
    tags: ["Natural Language Processing", "Mental Health Tech"],
    category: "Mental Health Technology",
    role: "Full Stack Developer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "nocaine",
    image:
      "https://images.unsplash.com/photo-1775440285627-ce48346bc58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwY29udmVyc2F0aW9uYWwlMjBhaSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzU5Mjk2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    slug: "nocaine",
    title: "Nocaine",
    displayTitle: "NOCAINE",
    index: 3,
    totalProjects: 16,
    domain: "software",
    tags: ["Mobile App", "React Native"],
    category: "Health & Wellness",
    role: "Mobile Developer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "median",
    image:
      "https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    slug: "median",
    title: "Median",
    displayTitle: "MEDIAN",
    index: 4,
    totalProjects: 16,
    domain: "software",
    tags: ["Data Analytics", "Dashboard"],
    category: "Data Engineering",
    role: "Full Stack Developer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "ballast",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    slug: "ballast",
    title: "Ballast",
    displayTitle: "BALLAST",
    index: 5,
    totalProjects: 16,
    domain: "design",
    tags: ["Brand Design", "Visual Identity"],
    category: "Brand Design",
    role: "Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "internal-tool",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): ProjectData | undefined {
  const current = getProjectBySlug(slug);
  if (!current) return undefined;
  return getProjectBySlug(current.nextProject);
}
