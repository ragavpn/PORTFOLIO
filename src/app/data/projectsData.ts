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
import imgJupyter from "../../assets/tech-icons/jupyternotebook.svg";
import imgMedianAppFlow from "../../assets/projects/median/app flow.png";
import imgBallastAppFlow from "../../assets/projects/ballast/app flow.png";
import imgHomebaseAppFlow from "../../assets/projects/homebase/app flow.png";
import imgEventozoAppFlow from "../../assets/projects/eventozo/app flow.png";
import imgInstagram from "../../assets/icons/instagram.svg";
// ── Project preview images (bundled by Vite for instant availability) ──────
import previewInternalTool from "../../assets/projects/internal-tool/preview.png";
import previewCausalReasoning from "../../assets/projects/causal-reasoning/preview.png";
import previewHypothesisInterp from "../../assets/projects/hypothesis-interpolation/preview.png";
import previewNocaine from "../../assets/projects/nocaine/preview.png";
import previewDonkeycar from "../../assets/projects/donkeycar/preview.png";
import previewAiTherapist from "../../assets/projects/ai-therapist/preview.png";
import previewWeldDetection from "../../assets/projects/weld-detection/preview.jpg";
import previewCosmicCarnage from "../../assets/projects/cosmic-carnage/preview.png";
import previewNeuron from "../../assets/projects/neuron/preview.png";
import previewMedian from "../../assets/projects/median/preview.png";
import previewBallast from "../../assets/projects/ballast/preview.png";
import previewHomebase from "../../assets/projects/homebase/preview.png";
import previewEventozo from "../../assets/projects/eventozo/preview.png";
import previewPragyan from "../../assets/projects/pragyan-2026/preview.png";


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
  behanceUrl?: string;
  instagramUrl?: string;
  appFlowText?: string;
  appFlowImage?: string;
  skipGallery?: boolean;
  mobileGallery?: boolean;
};

export const projectsData: ProjectData[] = [
  {
    hasContent: true,
    slug: "internal-tool",
    title: "Internal Tool",
    displayTitle: "INTERNAL TOOL",
    index: 1,
    totalProjects: 14,
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
    overview: "A web - based internal dashboard developed to digitize routine machinery inspection workflows and compliance documentation in an industrial manufacturing environment. The system replaced manual spreadsheet logging and paper - based approvals with a centralized platform for tracking maintenance checks and managing signed records.",
    challenges: "Maintenance checks and approval workflows were previously handled through Excel sheets and manually signed PDF documents, creating repetitive administrative effort and fragmented record keeping. The solution required automated reminders, structured role - based workflows, and reliable documentation handling suitable for operational and audit readiness.",
    reflections: "This project strengthened experience in translating manual operational workflows into structured digital systems that improve reliability and accountability. It reinforced the value of automation and role - based access control in operational environments.",
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
    image: previewInternalTool,
  },
  {
    hasContent: true,
    slug: "causal-reasoning",
    title: "Causal Reasoning",
    displayTitle: "CAUSAL REASONING",
    index: 2,
    totalProjects: 14,
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
    overview: "A research - driven federated learning framework designed for healthcare environments where patient data confidentiality is critical. The system addresses vulnerabilities in collaborative model training by introducing a robust mechanism to defend against explanation poisoning attacks using causal graph reasoning and adaptive client evolution strategies.",
    challenges: "Federated learning systems must maintain model accuracy and trustworthiness while operating on distributed, private datasets. A key technical challenge involved managing exponential simulation time as dataset parameters increased, while ensuring the proposed defense mechanism remained computationally feasible and comparable to baseline federated learning methods.",
    reflections: "This project strengthened understanding of secure and resilient distributed machine learning systems, particularly in privacy - sensitive domains such as healthcare. It also reinforced experience in balancing algorithmic innovation with computational feasibility during large - scale experimental simulations.",
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
    image: previewCausalReasoning,
  },
  {
    hasContent: true,
    slug: "hypothesis-interpolation",
    title: "Hypothesis Interpolation",
    displayTitle: "HYPOTHESIS INTERPOLATION",
    index: 3,
    totalProjects: 14,
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
    overview: "Developed a production - ready system that converts decision - tree outputs into clear natural - language explanations for risk and business analysts. The solution improved interpretability of root cause analysis workflows by translating encoded logic into structured summaries while preserving logical accuracy and scalability. Development progressed through iterative experimentation and culminated in a hybrid summarization pipeline deployed into an internal staging production environment. In parallel, an experimental reinforcement learning workflow was implemented to refine generated summaries using structured user feedback.",
    challenges: "Decision - tree models used in enterprise analytics generated highly technical outputs that were difficult for non - technical stakeholders to interpret. Analysts often relied on manual decoding of encoded logic, slowing investigation workflows and increasing cognitive overhead. The system needed to produce interpretable explanations at scale while meeting enterprise requirements for reliability, traceability, and deployment readiness. At the same time, the project explored methods to continuously improve summary quality using feedback - driven learning mechanisms.",
    reflections: "This project demonstrated the transition from model experimentation to enterprise - grade deployment while maintaining reliability and interpretability requirements. It required balancing deterministic logic, generative modeling, and system engineering constraints within a production environment. The experience strengthened skills in system design, production readiness, and applied machine learning, while reinforcing the importance of usability and feedback - driven improvement in enterprise analytics systems.",
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
    image: previewHypothesisInterp,
  },
  {
    hasContent: true,
    slug: "nocaine",
    title: "Nocaine",
    displayTitle: "NOCAINE",
    index: 4,
    totalProjects: 14,
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
    challenges: "Dark web environments are highly dynamic, anonymous, and distributed, making large - scale monitoring and classification computationally intensive and operationally complex. The system needed to support scalable crawling, high - throughput data processing, and reliable classification while maintaining responsiveness for investigative workflows.",
    reflections: "This project strengthened practical experience in building large - scale distributed systems that combine machine learning, data pipelines, and investigative tooling. It reinforced the importance of scalability, fault tolerance, and structured data processing when working with high - volume and continuously evolving data sources.",
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
    image: previewNocaine,
  },
  {
    hasContent: true,
    slug: "donkeycar",
    title: "DonkeyCar",
    displayTitle: "DONKEYCAR",
    index: 5,
    totalProjects: 14,
    domain: "software",
    tags: ["Reinforcement Learning", "Autonomous Driving"],
    category: "Autonomous Systems",
    role: "Research Intern",
    team: "Individual Project",
    liveUrl: null,
    githubUrl: "https://github.com/ragavpn/RL_DonkeyCar",
    techStack: [
      { name: "Python", src: imgPython },
      { name: "Docker", src: "https://cdn.simpleicons.org/docker/fffcf3" }
    ],
    overview: "A reinforcement learning–based simulation system developed to train an autonomous vehicle for lane following and steering control in a virtual driving environment. The project used a policy optimization approach with an autoencoder - based perception pipeline to learn driving behavior in simulation and prepare the trained model for deployment onto Jetson Nano hardware for real - world operation.",
    challenges: "Training autonomous driving systems directly on physical vehicles introduces safety risks and hardware constraints, making simulation - based learning essential. The system needed to efficiently process visual inputs and maintain stable control of steering and throttle while ensuring the trained model could transition reliably from simulation to deployment environments.",
    reflections: "This project strengthened practical understanding of applying reinforcement learning to robotics systems and highlighted the importance of simulation in developing safe and reliable autonomous behaviors. It also reinforced experience in designing perception - driven control systems that bridge simulated training and real - world deployment.",
    whatWasDone: [
      "Implemented a reinforcement learning training pipeline to learn lane-following behavior and continuous steering control in simulated track environments",
      "Designed an autoencoder-based perception module to reduce visual input complexity and improve training efficiency",
      "Configured simulation environments to support continuous control of steering and throttle actions",
      "Conducted iterative training experiments to improve model stability and driving performance"
    ],
    whatWasBuilt: [
      "Autonomous driving simulation capable of learning lane-following behavior through reinforcement learning",
      "Perception pipeline for processing visual input and generating control signals",
      "Simulation-to-deployment workflow preparing trained models for execution on embedded hardware",
      "Reproducible experimentation setup for autonomous driving research"
    ],
    nextProject: "causal-reasoning",
    image: previewDonkeycar,
    skipGallery: true,
  },
  {
    hasContent: true,
    slug: "ai-therapist",
    title: "AI Therapist",
    displayTitle: "AI THERAPIST",
    index: 6,
    totalProjects: 14,
    domain: "software",
    tags: ["Conversational AI", "Emotion Detection"],
    category: "Mental Health",
    role: "Machine Learning & UI Developer",
    team: "Team of 6",
    liveUrl: null,
    githubUrl: "https://github.com/ragavpn/AI_Therapist",
    techStack: [
      { name: "Python", src: imgPython },
      { name: "Flask", src: imgFlask },
      { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript/fffcf3" },
      { name: "HTML/CSS", src: "https://cdn.simpleicons.org/html5/fffcf3" },
    ],
    overview: "A conversational chatbot prototype designed to provide accessible mental health support by simulating therapist - style interactions using historical therapy session notes. The system analyzes user input to detect emotional states, maintains conversation history for contextual responses, and generates supportive replies through a structured dialogue workflow.",
    challenges: "Mental health conversations require context awareness and emotional sensitivity, making response generation more complex than standard chat interfaces. The system needed to detect emotions reliably, maintain conversational continuity through stored interaction history, and deliver meaningful responses within the constraints of a short hackathon development cycle.",
    reflections: "This project strengthened experience in building user - facing AI systems that combine interface design with machine learning workflows under tight development timelines. It also highlighted the importance of context retention and accessibility considerations when designing conversational systems for sensitive domains.",
    whatWasDone: [
      "Developed the chatbot interface and interaction workflows supporting conversational input and response visualization",
      "Built emotion detection logic using therapist conversation data to classify user sentiment and guide response generation",
      "Implemented session history storage to preserve emotional context and improve continuity across conversations",
      "Contributed to the design of a speech-enabled interface concept for multilingual interaction and voice-based emotion recognition"
    ],
    whatWasBuilt: [
      "Functional mental health chatbot prototype capable of generating context-aware responses",
      "Emotion detection pipeline using structured therapist–client conversation data",
      "Chat interface supporting conversational interaction and session history tracking",
      "Conceptual speech interaction mode for multilingual emotional input recognition"
    ],
    nextProject: "nocaine",
    image: previewAiTherapist,
  },
  {
    hasContent: true,
    slug: "weld-detection",
    title: "Weld Detection",
    displayTitle: "WELD DETECTION",
    index: 7,
    totalProjects: 14,
    domain: "software",
    tags: ["Computer Vision", "Defect Detection"],
    category: "Industrial Inspection",
    role: "Machine Learning Engineer",
    team: "Team of 3",
    liveUrl: null,
    githubUrl: "https://github.com/ragavpn/WELD_DETECTION",
    techStack: [
      { name: "Python", src: imgPython },
      { name: "Jupyter", src: imgJupyter },
    ],
    overview: "A computer vision system developed in collaboration with BHEL to automatically detect and classify weld defects in X - ray scans of industrial steam pipeline joints. The solution was designed to support quality assurance during on - site welding of large metal pipes, where manual inspection is time - consuming and prone to human error.",
    challenges: "Weld defects in high - pressure steam pipelines can lead to critical structural failures, making accurate detection essential for safety and operational reliability. The system needed to identify subtle defect patterns from grayscale X - ray images while maintaining reliable performance across multiple defect categories.",
    reflections: "This project provided hands - on experience in applying computer vision techniques to real industrial safety problems and reinforced the importance of reliable model evaluation in high - risk engineering environments. It also strengthened understanding of how machine learning systems can augment traditional inspection workflows in manufacturing settings.",
    whatWasDone: [
      "Designed and trained a deep learning model to detect and classify weld defects from industrial X-ray images provided by BHEL",
      "Implemented data preprocessing and augmentation workflows to improve model generalization and address class imbalance",
      "Evaluated model performance using structured test datasets and performance metrics to validate reliability",
      "Collaborated with engineering teams to align model outputs with real-world inspection requirements",
    ],
    whatWasBuilt: [
      "Automated weld defect detection and classification system for industrial X-ray inspection",
      "Two-stage deep learning model capable of identifying both defect presence and defect type",
      "Training and evaluation pipeline for processing industrial inspection datasets",
      "Prototype inspection tool evaluated by engineering teams for further operational use",
    ],
    skipGallery: true,
    nextProject: "cosmic-carnage",
    image: previewWeldDetection,
  },
  {
    hasContent: true,
    slug: "cosmic-carnage",
    title: "Cosmic Carnage",
    displayTitle: "COSMIC CARNAGE",
    index: 8,
    totalProjects: 14,
    domain: "software",
    tags: ["Multi-Agent Systems", "Reinforcement Learning"],
    category: "Game AI | Multi-Agent Simulation",
    role: "RL & Simulation Developer",
    team: "Team of 10",
    liveUrl: null,
    githubUrl: "https://github.com/ragavpn/SpaceShooter",
    techStack: [
      { name: "Python", src: imgPython },
    ],
    overview: "A multi - agent reinforcement learning simulation platform developed to host competitive training events where participants submit optimized RL models to outperform others in a shared game environment. The system provides a controlled simulation framework where users can modify hyperparameters and reward functions while the core game logic remains consistent, enabling fair benchmarking of learning strategies.",
    challenges: "Designing a competitive reinforcement learning environment required balancing flexibility for participant experimentation with stability of the core simulation system. The platform needed to support coordinated multi - agent behavior, scalable training workflows, and consistent performance evaluation across different model configurations.",
    reflections: "This project strengthened experience in building configurable simulation systems that support large - scale experimentation and competitive evaluation of learning algorithms. It also reinforced understanding of how reward design and parameter tuning directly influence agent behavior and system performance in multi - agent environments.",
    whatWasDone: [
      "Developed core game simulation logic supporting multi-agent interactions and fleet-based coordination behaviors",
      "Implemented reinforcement learning training workflows using policy optimization methods for agent decision-making",
      "Designed customizable reward function interfaces enabling participants to experiment with different learning strategies",
      "Built performance tracking mechanisms to monitor system usage, simulation time, and participant leaderboard rankings",
    ],
    whatWasBuilt: [
      "Multi-agent reinforcement learning simulation environment for competitive model training",
      "Fleet-based coordination system enabling cooperative agent behavior",
      "Configurable training framework allowing users to tune hyperparameters and reward functions",
      "Performance monitoring and leaderboard system for benchmarking participant models",
    ],
    skipGallery: false,
    nextProject: "neuron",
    image: previewCosmicCarnage,
  },
  {
    hasContent: true,
    slug: "neuron",
    title: "Neuron",
    displayTitle: "NEURON",
    index: 9,
    totalProjects: 14,
    domain: "software",
    tags: ["Medical AI", "Image Classification", "Diagnostic Support"],
    category: "Healthcare | Medical Imaging",
    role: "Machine Learning & UI Developer",
    team: "Team of 2",
    liveUrl: null,
    githubUrl: "https://github.com/ragavpn/NEURON",
    techStack: [
      { name: "Python", src: imgPython },
      { name: "Next.js", src: imgNextjs },
      { name: "TypeScript", src: imgTs },
      { name: "Tailwind CSS", src: imgTailwind },
    ],
    overview: "A web - based assistive diagnostic tool developed to support early detection of Alzheimer's disease using brain scan images from the OASIS dataset. Users can upload CT or MRI scans through a browser interface, and the system analyzes the images to predict dementia stage, confidence levels, and supporting recommendations for early intervention.",
    challenges: "Early - stage Alzheimer's symptoms are often subtle and difficult to identify through manual analysis of medical imaging. The system needed to accurately distinguish between multiple dementia stages while maintaining reliable performance across medical image variations and ensuring results were presented in a clear, accessible format for non - expert users.",
    reflections: "This project strengthened experience in building end - to-end medical AI systems that combine machine learning models with user - facing interfaces. It also reinforced the importance of model interpretability and usability when designing tools intended to support early health intervention.",
    whatWasDone: [
      "Designed and trained deep learning models to classify brain scans into multiple Alzheimer's disease stages using structured medical imaging data",
      "Iteratively improved model performance by progressing from basic neural networks to advanced architectures capable of extracting complex spatial features",
      "Built the prediction interface and visualization logic to display diagnosis results, probability scores, and recommendations",
      "Conducted model evaluation using accuracy-based performance metrics to validate classification reliability",
    ],
    whatWasBuilt: [
      "Web-based diagnostic application deployed on Vercel for uploading and analyzing brain scan images",
      "Deep learning model capable of classifying multiple Alzheimer's disease stages from medical imaging data",
      "Prediction interface presenting diagnosis category, confidence scores, and guidance recommendations",
      "End-to-end inference pipeline connecting image upload, model processing, and result visualization",
    ],
    skipGallery: false,
    nextProject: "median",
    image: previewNeuron,
  },
  {
    hasContent: true,
    slug: "median",
    title: "Median",
    displayTitle: "MEDIAN",
    index: 10,
    totalProjects: 14,
    domain: "design",
    tags: ["Mobile Experience", "Lifestyle Platform", "Health Tracking"],
    category: "Health & Fitness / Lifestyle",
    role: "UI/UX Designer",
    team: "Individual Project",
    liveUrl: null,
    behanceUrl: "https://www.behance.net/gallery/195941399/Median-UIUX-Fitness-Tracking-App",
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Median is a mobile - first lifestyle platform designed for individuals who are beginning or maintaining their fitness journey by integrating health tracking, workouts, and social engagement into a single ecosystem. The product focuses on simplifying daily wellness management by allowing users to monitor key health metrics, discover activities, and stay connected within one unified experience.",
    challenges: "Fitness and wellness users often rely on multiple applications to track different aspects of their health, leading to fragmented routines and reduced long - term engagement. The challenge was to design a cohesive platform that combines diverse health and lifestyle features while keeping navigation intuitive and interactions lightweight for frequent daily use.",
    reflections: "This project strengthened the ability to design a multi - feature lifestyle platform while maintaining clarity and usability across interconnected workflows. It also reinforced the importance of structuring complex health ecosystems into intuitive navigation systems that support consistent user engagement.",
    whatWasDone: [
      "Analyzed existing fitness and wellness platforms to understand how users manage tracking, workouts, and community engagement across separate tools",
      "Organized the platform around a unified navigation structure that connects health metrics, activity tracking, and social features into a consistent workflow",
      "Prioritized quick-access interactions for daily tracking tasks such as logging activity, monitoring progress, and reviewing health insights",
      "Established clear visual hierarchy and modular layout patterns to support scalability as additional health features are introduced",
    ],
    whatWasBuilt: [
      "End-to-end mobile interface design for a holistic health and lifestyle management application",
      "Integrated tracking modules for daily health metrics including activity, sleep, hydration, and calorie monitoring",
      "Social interaction features supporting content sharing and community engagement",
      "Membership and payment workflows enabling subscription-based services within the platform",
    ],
    appFlowText: "The application flow guides users from initial access through authentication into the main dashboard, where core features such as workouts, health tracking, profile management, and membership services are accessible. Each module branches into specific functions while remaining connected through a centralized home interface, enabling smooth navigation across the fitness ecosystem.",
    appFlowImage: imgMedianAppFlow,
    mobileGallery: true,
    nextProject: "ballast",
    image: previewMedian,
  },
  {
    hasContent: true,
    slug: "ballast",
    title: "Ballast",
    displayTitle: "BALLAST",
    index: 11,
    totalProjects: 14,
    domain: "design",
    tags: ["Workflow Design", "Service Marketplace"],
    category: "Marketplace Platform | Service Booking",
    role: "UI/UX Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Ballast is a mobile marketplace prototype designed to help boat owners connect with skilled professionals for maintenance and repair services. The application enables users to create service tasks, receive offers from craftsmen, communicate through in - app messaging, and manage the entire lifecycle of a task from creation to completion within a structured workflow.",
    challenges: "The client required a prototype that strictly followed predefined functional requirements while avoiding any additional features not explicitly requested. The challenge was to translate detailed use cases into intuitive user flows while ensuring every mandatory interaction was implemented accurately and consistently across the application. The prototype had to include all required workflows while excluding standard account - related functionality such as registration and password management, as those were intentionally removed from the initial scope.",
    reflections: "This project strengthened the ability to design under strict requirements while maintaining usability and workflow clarity. It reinforced the importance of aligning design decisions with documented specifications and ensuring complex service workflows remain intuitive for everyday users.",
    whatWasDone: [
      "Translated detailed client requirements into structured workflows that ensured all required use cases were implemented without introducing unrequested functionality",
      "Simplified the multi-step task creation process into a clear, sequential flow to reduce user effort and improve completion reliability",
      "Designed consistent navigation patterns across task states such as Open, Agreement Made, In Progress, and Done to support easy task tracking",
      "Focused on seamless transitions between screens to help users manage tasks, review offers, and communicate with craftsmen without confusion",
      "Ensured all interface decisions aligned directly with the functional requirements and data structures defined in the client documentation",
    ],
    whatWasBuilt: [
      "End-to-end mobile marketplace prototype for boat maintenance service requests",
      "Multi-step task creation workflow supporting structured data input and image uploads",
      "Task lifecycle management system covering Open, Agreement Made, In Progress, and Done states",
      "Offer review and selection interface enabling decision-making between multiple craftsmen",
      "Profile and communication workflows supporting collaboration between users and service providers",
    ],
    appFlowText: "The application flow guides users through creating service tasks, reviewing offers from craftsmen, communicating through chat, and managing the full lifecycle of a task from posting to completion. Each stage of the workflow is structured to reflect the operational process defined by the client, ensuring clear navigation and reliable task management.",
    appFlowImage: imgBallastAppFlow,
    mobileGallery: true,
    nextProject: "homebase",
    image: previewBallast,
  },
  {
    hasContent: true,
    slug: "homebase",
    title: "Homebase",
    displayTitle: "HOMEBASE",
    index: 12,
    totalProjects: 14,
    domain: "design",
    tags: ["Website Design", "Transaction Workflow"],
    category: "Sports Betting | Analytics Platform",
    role: "UI/UX Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "HomeBase is a desktop - based sports betting platform designed as a personal project to explore the interaction design of data - driven transactional systems. The application enables users to browse sporting events across multiple sports, place bets through an integrated bet slip, track performance through analytics dashboards, and compare results through a competitive leaderboard.\n\nThe platform focuses on clarity of information, structured navigation, and quick decision - making by organizing complex betting workflows into a consistent and predictable interface.",
    challenges: "Sports betting platforms involve dense information such as live events, odds, and financial transactions, which can overwhelm users if not structured clearly. The challenge was to design an interface that supports fast interactions while maintaining visibility of critical betting data.\n\nAnother key challenge was balancing transactional workflows with performance insights so users could place bets efficiently while monitoring results and account activity within the same system.",
    reflections: "This project strengthened the ability to design transactional systems that require both speed and clarity of interaction. It reinforced the importance of structuring complex workflows into predictable interfaces that support confident decision - making in fast - paced digital environments.",
    whatWasDone: [
      "Structured the interface around a centralized dashboard that connects event discovery, betting actions, and performance analytics into a single workflow",
      "Designed a persistent bet slip component to maintain visibility of selected bets during the transaction process",
      "Simplified navigation between Home, Leaderboard, and Account sections to support quick task switching",
      "Organized statistical data into clear visual summaries to help users understand performance trends quickly",
    ],
    whatWasBuilt: [
      "End-to-end desktop interface design for a multi-sport betting platform",
      "Integrated betting workflow supporting event selection, bet placement, and confirmation",
      "Analytics dashboard displaying performance metrics such as win rate and betting history",
      "Leaderboard interface presenting ranked user performance",
      "Account management interface for monitoring balances and transactions",
    ],
    behanceUrl: "https://www.behance.net/gallery/181329489/Sports-Betting-Website",
    appFlowText: "The application flow guides users from authentication into the main dashboard where they can browse events, place bets through the bet slip, track performance through analytics, and manage account activity. Each section is connected through a consistent navigation structure that supports quick interactions and continuous engagement.",
    appFlowImage: imgHomebaseAppFlow,
    nextProject: "eventozo",
    image: previewHomebase,
  },
  {
    hasContent: true,
    slug: "eventozo",
    title: "Eventozo",
    displayTitle: "EVENTOZO",
    index: 13,
    totalProjects: 14,
    domain: "design",
    tags: ["Marketplace Design", "Service Booking"],
    category: "Event Booking",
    role: "Freelance UI/UX Designer",
    team: "Individual Project",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Eventozo is a desktop - based event planning platform developed for a real client to support end - to-end coordination between planners, organizers, and customers. The platform enables event planners to discover organizers, explore available services, and manage bookings through a structured workflow.\n\nIn a later stage of the project, an additional portal was introduced allowing organizers to list venues for rent, expanding the platform into a marketplace that supports both event planning and venue hosting.",
    challenges: "The platform needed to support multiple user roles while maintaining a clear and predictable workflow across discovery, booking, and management tasks. The challenge was to design an interface that connects planners and organizers efficiently without overwhelming users with complex navigation.\n\nAnother key challenge was ensuring the system could scale to include a venue listing portal while preserving usability and consistency across the platform.",
    reflections: "This project strengthened the ability to design multi - sided marketplace platforms that support different user roles within a single system. It reinforced the importance of building scalable workflows that can evolve as new services and features are introduced.",
    whatWasDone: [
      "Structured the platform around a discovery-driven workflow that enables planners to browse organizers and evaluate services before initiating bookings",
      "Simplified the booking process into clear, sequential steps to reduce friction during service selection and confirmation",
      "Designed consistent navigation patterns across discovery, booking, and profile management to support seamless movement between tasks",
      "Built a scalable interface framework that could support the addition of a venue listing portal without disrupting the existing system",
    ],
    whatWasBuilt: [
      "End-to-end desktop interface design for an event planning and booking marketplace",
      "Organizer discovery and service browsing workflow supporting informed decision-making",
      "Booking management interface enabling users to track and manage event reservations",
      "Venue listing portal allowing organizers to publish and manage rentable event spaces",
    ],
    appFlowText: "The application flow guides event planners through discovering organizers, reviewing services, initiating bookings, and managing event reservations. The platform also supports organizers listing venues for rent through a dedicated portal, enabling a complete marketplace experience for event planning and hosting.",
    appFlowImage: imgEventozoAppFlow,
    nextProject: "pragyan-2026",
    image: previewEventozo,
  },
  {
    hasContent: true,
    slug: "pragyan-2026",
    title: "Pragyan 2026",
    displayTitle: "PRAGYAN 2026",
    index: 14,
    totalProjects: 14,
    domain: "design",
    tags: ["Theme Based", "Technical Fest"],
    category: "Event Website",
    role: "Head of Design",
    team: "Team of 8 Designers",
    liveUrl: null,
    techStack: [
      { name: "Figma", src: imgFigma },
    ],
    overview: "Pragyan 2026 is the official website for a large - scale technical festival conducted at the college, designed to support event discovery, registrations, and information access across multiple domains and activities. The platform needed to present large volumes of content clearly while maintaining visual consistency and usability across both desktop and mobile devices.\n\nAs Head of Design, the responsibility involved leading a team of designers to deliver the complete website within a fixed timeline, ensuring alignment across layouts, components, and visual standards throughout the project lifecycle.",
    challenges: "The project required coordinating multiple designers working on different sections of the website while maintaining consistency in layout structure, visual hierarchy, and responsive behavior. The challenge was to manage design delivery across numerous pages and content types without introducing inconsistencies or delays. Another key challenge was simplifying complex festival information into an intuitive navigation system that allows users to quickly discover events, schedules, and resources across the platform.",
    reflections: "This project strengthened leadership and coordination skills in managing a multi - designer workflow under fixed deadlines. It reinforced the importance of establishing clear design standards, maintaining communication across teams, and ensuring consistency when delivering large - scale digital platforms.",
    whatWasDone: [
      "Established a unified design framework to maintain visual consistency across all pages and sections of the website",
      "Coordinated task allocation and design reviews to ensure alignment between team members working on different components",
      "Structured navigation and content hierarchy to simplify access to event information and registrations",
      "Implemented responsive design patterns to ensure usability across desktop and mobile devices",
    ],
    whatWasBuilt: [
      "Complete responsive website design for the Pragyan 2026 technical festival",
      "Standardized layout and component system used across multiple pages and sections",
      "Coordinated design workflow enabling consistent delivery across a team of designers",
      "Final production-ready interface supporting event discovery, schedules, and registrations",
    ],
    instagramUrl: "https://www.instagram.com/p/DUX_u9ejRy6/?img_index=1",
    nextProject: "internal-tool",
    image: previewPragyan,
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
