import imgReact from "../../assets/tech-icons/react.svg";
import imgTs from "../../assets/tech-icons/typescript.svg";
import imgTailwind from "../../assets/tech-icons/tailwindcss.svg";
import imgSupabase from "../../assets/tech-icons/supabase.svg";
import imgPostgres from "../../assets/tech-icons/postgresql.svg";
import imgPython from "../../assets/tech-icons/python.svg";
import imgFigma from "../../assets/tech-icons/figma.svg";
import imgNextjs from "../../assets/tech-icons/nextdotjs.svg";
import imgNode from "../../assets/tech-icons/nodedotjs.svg";
import imgMongo from "../../assets/tech-icons/mongodb.svg";
import imgFlask from "../../assets/tech-icons/flask.svg";
import imgPytorch from "../../assets/tech-icons/pytorch.svg";
import imgDocker from "../../assets/tech-icons/docker.svg";
import imgAws from "../../assets/tech-icons/aws.svg";

export type ProjectData = {
  hasContent: boolean;
  slug: string;
  title: string;
  displayTitle: string;
  index: number;
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
  hasArchitecture?: boolean;
  timelapse?: {
    heading: string;
    text: string;
  };
  nextProject: string;
  image: string;
  githubUrl?: string;
};

export const projectsData: ProjectData[] = [
  {
    hasContent: true,
    slug: "internal-tool",
    title: "Internal Tool",
    displayTitle: "INTERNAL TOOL",
    index: 1,
    totalProjects: 16,
    domain: "software",
    tags: ["Workflow Automation", "Operations Management"],
    category: "Industrial Operations",
    role: "Full Stack Developer",
    team: "Individual Project",
    liveUrl: null,
    githubUrl: "https://github.com/ragavpn/EGA-Internal-Tool",
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
      "Maintenance checks and approval workflows were previously handled through Excel sheets and manually signed PDF documents, creating repetitive administrative effort and fragmented record keeping. The solution required automated reminders, structured role - based workflows, and reliable documentation handling suitable for operational and audit readiness.",
    reflections:
      "This project strengthened experience in translating manual operational workflows into structured digital systems that improve reliability and accountability. It reinforced the value of automation and role-based access control in operational environments.",
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
    image: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    hasContent: true,
    slug: "causal-reasoning",
    title: "Causal Reasoning",
    displayTitle: "CAUSAL REASONING",
    index: 2,
    totalProjects: 16,
    domain: "software",
    tags: ["Federated Learning", "Causal Reasoning", "Thesis"],
    category: "Healthcare - Federated ML",
    role: "Machine Learning Engineer",
    team: "Team of 3",
    liveUrl: null,
    githubUrl: "https://github.com/elegantShock2258/ged-fed-learning",
    techStack: [
      { name: "Python", src: imgPython },
      { name: "Docker", src: imgDocker },
    ],
    overview: "A research-driven federated learning framework designed for healthcare environments where patient data confidentiality is critical. The system addresses vulnerabilities in collaborative model training by introducing a robust mechanism to defend against explanation poisoning attacks using causal graph reasoning and adaptive client evolution strategies.",
    challenges: "Federated learning systems must maintain model accuracy and trustworthiness while operating on distributed, private datasets. A key technical challenge involved managing exponential simulation time as dataset parameters increased, while ensuring the proposed defense mechanism remained computationally feasible and comparable to baseline federated learning methods.",
    reflections: "This project strengthened understanding of secure and resilient distributed machine learning systems, particularly in privacy-sensitive domains such as healthcare. It also reinforced experience in balancing algorithmic innovation with computational feasibility during large-scale experimental simulations.",
    whatWasDone: [
      "Designed a federated learning architecture integrating causal graph reasoning to detect and mitigate explanation poisoning behavior across distributed clients",
      "Implemented adaptive client model evolution using the NEAT neuroevolution algorithm to dynamically adjust learning structures",
      "Developed experimental workflows to benchmark system performance against baseline FedAvg implementations",
      "Structured simulation pipelines to evaluate model robustness, convergence behavior, and training efficiency under varying parameter conditions",
    ],
    whatWasBuilt: [
      "Federated learning simulation framework for privacy-preserving model training",
      "Robust aggregation mechanism resistant to explanation poisoning attacks",
      "Experimental evaluation pipeline comparing performance against standard federated learning baselines",
      "Research-ready implementation supporting reproducible experiments and academic publication",
    ],
    timelapse: {
      heading: "LOCAL TRAINING TIMELAPSE",
      text: "A visual simulation showing how client models evolve during local training by dynamically adding new nodes and connections through neuroevolution. Each round concludes with aggregation of client models into a global consensus model, illustrating the collaborative learning process across distributed participants."
    },
    nextProject: "weld-detection",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: true,
    slug: "hypothesis-interpolation",
    title: "Hypothesis Interpolation",
    displayTitle: "HYPOTHESIS INTERPOLATION",
    index: 3,
    totalProjects: 16,
    domain: "software",
    tags: ["Production ML Systems", "RLHF "],
    category: "Enterprise Analytics",
    role: "Machine Learning Engineer",
    team: "4 Engineers + 2 PM",
    liveUrl: null,
    techStack: [
      { name: "Python", src: imgPython },
      { name: "AWS", src: imgAws },
      { name: "Docker", src: imgDocker },
    ],
    overview: "Developed a production-ready system that converts decision-tree outputs into clear natural-language explanations for risk and business analysts. The solution improved interpretability of root cause analysis workflows by translating encoded logic into structured summaries while preserving logical accuracy and scalability. Development progressed through iterative experimentation and culminated in a hybrid summarization pipeline deployed into an internal staging production environment. In parallel, an experimental reinforcement learning workflow was implemented to refine generated summaries using structured user feedback.",
    challenges: "Decision-tree models used in enterprise analytics generated highly technical outputs that were difficult for non-technical stakeholders to interpret. Analysts often relied on manual decoding of encoded logic, slowing investigation workflows and increasing cognitive overhead. The system needed to produce interpretable explanations at scale while meeting enterprise requirements for reliability, traceability, and deployment readiness. At the same time, the project explored methods to continuously improve summary quality using feedback - driven learning mechanisms.",
    reflections: "This project demonstrated the transition from model experimentation to enterprise-grade deployment while maintaining reliability and interpretability requirements. It required balancing deterministic logic, generative modeling, and system engineering constraints within a production environment. The experience strengthened skills in system design, production readiness, and applied machine learning, while reinforcing the importance of usability and feedback-driven improvement in enterprise analytics systems.",
    whatWasDone: [
      "Designed and implemented multiple solution approaches including rule-based templates, transformer-based summarization, and a production-ready hybrid pipeline",
      "Standardized and consolidated metadata from fragmented sources to enable consistent interpretation of encoded decision-tree conditions",
      "Productionized the system through modular architecture design, automated testing, code quality validation, and deployment pipeline integration",
      "Developed an experimental reinforcement learning with human feedback (RLHF) workflow to iteratively refine summary outputs based on structured user ratings and feedback"
    ],
    whatWasBuilt: [
      "A hybrid summarization pipeline that converts decision-tree logic into concise natural-language explanations for business and risk analysts",
      "An event-driven processing workflow triggered by incoming data files in cloud storage and integrated into internal analytics systems",
      "A containerized service exposed through a REST API for seamless integration into enterprise workflows",
      "A feedback-driven RLHF prototype capable of improving summary quality through iterative reward-based refinement"
    ],
    nextProject: "donkeycar",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: true,
    slug: "nocaine",
    title: "Nocaine",
    displayTitle: "NOCAINE",
    index: 4,
    totalProjects: 16,
    domain: "software",
    tags: ["Distributed Systems", "Cybercrime Detection", "Machine Learning"],
    category: "Cybercrime Investigation",
    role: "Machine Learning Engineer",
    team: "Team of 7",
    liveUrl: null,
    techStack: [
      { name: "Go", src: "https://cdn.simpleicons.org/go/fffcf3" },
      { name: "Python", src: imgPython },
      { name: "Kafka", src: "https://cdn.simpleicons.org/apachekafka/fffcf3" },
      { name: "Docker", src: "https://cdn.simpleicons.org/docker/fffcf3" },
      { name: "Elasticsearch", src: "https://cdn.simpleicons.org/elasticsearch/fffcf3" },
      { name: "MongoDB", src: imgMongo },
      { name: "Redis", src: "https://cdn.simpleicons.org/redis/fffcf3" },
      { name: "TOR / I2P", src: "https://cdn.simpleicons.org/torproject/fffcf3" },
    ],
    overview: "A distributed intelligence platform developed to monitor and investigate illegal activities across dark web networks such as TOR and I2P. The system continuously crawls hidden services, analyzes textual and visual content, and flags suspicious websites for review by authorities through an investigative dashboard.",
    challenges: "Dark web environments are highly dynamic, anonymous, and distributed, making large-scale monitoring and classification computationally intensive and operationally complex. The system needed to support scalable crawling, high-throughput data processing, and reliable classification while maintaining responsiveness for investigative workflows.",
    reflections: "This project strengthened practical experience in building large-scale distributed systems that combine machine learning, data pipelines, and investigative tooling. It reinforced the importance of scalability, fault tolerance, and structured data processing when working with high-volume and continuously evolving data sources.",
    whatWasDone: [
      "Designed and trained machine learning models to classify scraped textual and image data into predefined cybercrime categories",
      "Developed preprocessing pipelines to convert raw dark web content into structured inputs for automated detection",
      "Implemented classification logic to flag suspicious services and integrate results into the investigation dashboard",
      "Collaborated with the distributed systems team to ensure reliable data flow between scraping, processing, and monitoring services"
    ],
    whatWasBuilt: [
      "Distributed dark web monitoring system capable of crawling and analyzing hidden services across multiple networks",
      "Automated classification engine for detecting and categorizing suspicious websites",
      "Investigation dashboard with search, filtering, and reporting capabilities for law enforcement workflows",
      "Graph-based visualization interface showing relationships and traversal paths between monitored services"
    ],
    hasArchitecture: true,
    nextProject: "hypothesis-interpolation",
    image: "https://images.unsplash.com/photo-1608742213509-815b97c30b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "donkeycar",
    title: "DonkeyCar",
    displayTitle: "DONKEYCAR",
    index: 5,
    totalProjects: 16,
    domain: "software",
    tags: ["Autonomous", "Robotics"],
    category: "Robotics & Autonomous Systems",
    role: "ML Engineer",
    team: "Team Project",
    liveUrl: null,
    techStack: [
      { name: "Python", src: imgPython },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "causal-reasoning",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "ai-therapist",
    title: "AI Therapist",
    displayTitle: "AI THERAPIST",
    index: 6,
    totalProjects: 16,
    domain: "software",
    tags: ["Natural Language Processing", "Mental Health Tech"],
    category: "Mental Health Technology",
    role: "Full Stack Developer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "React", src: imgReact },
      { name: "Python", src: imgPython },
      { name: "Flask", src: imgFlask },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "nocaine",
    image: "https://images.unsplash.com/photo-1775440285627-ce48346bc58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "weld-detection",
    title: "Weld Detection",
    displayTitle: "WELD DETECTION",
    index: 7,
    totalProjects: 16,
    domain: "software",
    tags: ["Computer Vision", "Industrial"],
    category: "Industrial AI",
    role: "ML Engineer",
    team: "Team Project",
    liveUrl: null,
    techStack: [
      { name: "Python", src: imgPython },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "cosmic-carnage",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "cosmic-carnage",
    title: "Cosmic Carnage",
    displayTitle: "COSMIC CARNAGE",
    index: 8,
    totalProjects: 16,
    domain: "software",
    tags: ["Game Dev", "C#"],
    category: "Game Development",
    role: "Game Developer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "neuron",
    image: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "neuron",
    title: "Neuron",
    displayTitle: "NEURON",
    index: 9,
    totalProjects: 16,
    domain: "software",
    tags: ["Neural Networks", "AI"],
    category: "AI / Machine Learning",
    role: "ML Engineer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Python", src: imgPython },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "median",
    image: "https://images.unsplash.com/photo-1620712948343-0008cc890662?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "median",
    title: "Median",
    displayTitle: "MEDIAN",
    index: 10,
    totalProjects: 16,
    domain: "design",
    tags: ["UI / UX"],
    category: "UI / UX Design",
    role: "Product Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "ballast",
    image: "https://images.unsplash.com/photo-1706509511838-4b101f379ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "ballast",
    title: "Ballast",
    displayTitle: "BALLAST",
    index: 11,
    totalProjects: 16,
    domain: "design",
    tags: ["UI / UX", "Mobile App"],
    category: "Mobile App Design",
    role: "Product Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "homebase",
    image: "https://images.unsplash.com/photo-1773611814475-e80ea69a4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "homebase",
    title: "Homebase",
    displayTitle: "HOMEBASE",
    index: 12,
    totalProjects: 16,
    domain: "design",
    tags: ["Product Design", "Web App"],
    category: "Web App Design",
    role: "Product Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "eventozo",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "eventozo",
    title: "Eventozo",
    displayTitle: "EVENTOZO",
    index: 13,
    totalProjects: 16,
    domain: "design",
    tags: ["Event Management", "App Design"],
    category: "Mobile App Design",
    role: "Product Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "pragyan-2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "pragyan-2026",
    title: "Pragyan 2026",
    displayTitle: "PRAGYAN 2026",
    index: 14,
    totalProjects: 16,
    domain: "design",
    tags: ["Brand Identity", "Print"],
    category: "Brand & Identity",
    role: "Graphic Designer",
    team: "Team Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "lunar-crater",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "lunar-crater",
    title: "Lunar Crater",
    displayTitle: "LUNAR CRATER",
    index: 15,
    totalProjects: 16,
    domain: "design",
    tags: ["3D Modeling", "Concept Art"],
    category: "3D Design & Concept Art",
    role: "3D Artist",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "mental-health-chatbot",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=1080",
  },
  {
    hasContent: false,
    slug: "mental-health-chatbot",
    title: "Mental Health Chatbot",
    displayTitle: "MENTAL HEALTH CHATBOT",
    index: 16,
    totalProjects: 16,
    domain: "design",
    tags: ["Conversational UI", "Empathy"],
    category: "Conversational UI Design",
    role: "Product Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Coming soon.",
    challenges: "Coming soon.",
    reflections: "Coming soon.",
    whatWasDone: [],
    whatWasBuilt: [],
    nextProject: "internal-tool",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1080",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): ProjectData | undefined {
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) return undefined;
  
  const nextIndex = (currentIndex + 1) % projectsData.length;
  return projectsData[nextIndex];
}
