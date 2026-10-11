/**
 * ALL CONTENT LIVES HERE.
 * Single source of truth for personal information, portfolio projects,
 * skills, media items, journey milestones, certifications, and links.
 */

export const profile = {
  name: "Prasanna Hari",
  logo: "PH",
  role: "Product Architect & Full-Stack Systems Engineer",
  location: "Coimbatore, India",
  niche: "AI Systems Architecture & Enterprise Web Platforms",
  brand: ["Architect", "Builder", "Innovator"] as const,
  goalRole: "Lead Product Architect / Systems Engineer",
  mission:
    "Architecting intelligent digital interfaces and robust full-stack platforms that turn intricate technical complexity into fluid, tactile elegance.",
  heroEyebrow: "Available for select architectural roles · 2026",
  heroHeadline: "Engineering systems. Elevating human experience.",
  heroSub:
    "Bridging the chasm between deep AI algorithms, resilient distributed backends, and cinematic, high-performance web applications.",
  aboutLead:
    "I build software at the intersection of systems engineering rigor and thoughtful digital minimalism.",
  story: [
    "Starting with core systems programming and distributed full-stack architecture, I quickly learned that software excellence isn't just about clean code—it's about how decisively an interface empowers someone to think, automate, and solve complex problems at scale.",
    "Today, I lead end-to-end product development: from training and integrating LLM pipelines for enterprise accounting compliance to architecting industrial IoT anomaly detection dashboards that respond in real time under intensive load.",
  ] as const,
};

export const resumeUrl = "/Resume.pdf";

export const socials = [
  {
    id: "email",
    label: "Email",
    href: "mailto:hariprasanna939@gmail.com",
    handle: "hariprasanna939@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prasanna-hari-5486a3367",
    handle: "prasanna-hari",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/hariprasanna939-hue",
    handle: "@hariprasanna939-hue",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/_.lym9xk/?hl=en",
    handle: "@_.lym9xk",
  },
  {
    id: "x",
    label: "X / Twitter",
    href: "https://twitter.com",
    handle: "@prasannahari",
  },
] as const;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "case-studies", label: "Case Studies" },
  { id: "journey", label: "Journey" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const marqueeWords = [
  "AI ARCHITECTURE",
  "FULL-STACK SYSTEMS",
  "DISTRIBUTED BACKENDS",
  "HIGH-PERFORMANCE REACT",
  "INDUSTRIAL IOT",
  "PRODUCT STRATEGY",
  "MINIMALIST DESIGN",
] as const;

export const passions = [
  "System Architecture",
  "Generative AI & LLMs",
  "Cinematic Interaction Design",
] as const;

export const passionText =
  "Engineering complex software requires the discipline of an architect and the intuition of an artist. Whether designing distributed microservices, parsing high-throughput IoT streams, or fine-tuning spring physics in a reactive web interface, every micro-detail impacts human focus and trust.";

export const passionQuote =
  "Simplicity is not the absence of clutter, that's a consequence of simplicity. Simplicity is somehow essentially describing the purpose and place of an object and surface.";

export interface MediaItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const drawings: MediaItem[] = [
  {
    src: "/images/drawings/drawing-1.webp",
    alt: "Kinetic graphite study: architectural anatomy and perspective curves",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/drawings/drawing-2.webp",
    alt: "Minimalist geometry sketch exploring light and shadow balance",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/drawings/drawing-3.webp",
    alt: "Cybernetic wireframe sketch: neural networks and biological forms",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/drawings/drawing-4.webp",
    alt: "Monochrome character expression in dynamic crosshatch detailing",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/drawings/drawing-5.webp",
    alt: "Futuristic vehicle draft with aerodynamics and industrial proportions",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/drawings/drawing-6.webp",
    alt: "Abstract landscape visualizing organic flow and spatial resonance",
    width: 800,
    height: 1000,
  },
];

export const sports: MediaItem[] = [
  {
    src: "/images/sports/sport-1.webp",
    alt: "High-intensity athletic training: building raw stamina and resilience",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/sports/sport-2.webp",
    alt: "Badminton court match: agility, split-second reflexes, and tactical positioning",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/sports/sport-3.webp",
    alt: "Morning sprint drills: mental conditioning and unwavering discipline",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/sports/sport-4.webp",
    alt: "Team basketball strategy: communication under intense game clock pressure",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/sports/sport-5.webp",
    alt: "Outdoor cycling endurance trek: pushing through steep terrain gradients",
    width: 1200,
    height: 800,
  },
  {
    src: "/images/sports/sport-6.webp",
    alt: "Recovery and mindfulness: the restorative foundation for deep technical focus",
    width: 1200,
    height: 800,
  },
];

export const eventDescription = `Headline: Fueling the Future at FounderX 2026! 🚀
I just wrapped up an incredible day at the FounderX Global Startup Summit 2026 held at the IITM Research Park. The energy from the startup community in Chennai was electric!

One of the biggest highlights was hearing from the Chief Guest, Thomas Dose (Managing Director, BMW India). He shared a fascinating perspective on the intersection of innovation and focus, drawing parallels between Steve Jobs' philosophy at Apple and the power of simplicity. His core message? "Simplify your life." In a world of constant noise, the ability to strip away the non-essential is what truly allows a founder to scale.

I was also deeply inspired by C.K. Kumaravel, the co-founder of Naturals. His story is a masterclass in resilience—moving from challenges to building one of India’s most successful brands. He reminded us that entrepreneurship isn't just about the business; it's about the positive impact you create for others.

A huge shoutout to Dakshin and the entire FounderX team for conducting such a seamless and high-value event. From the fireside chats to the networking sessions, it was a reminder that the Indian startup ecosystem is only getting stronger.

Key Takeaways:
• Simplicity is Ultimate Sophistication: Focus on what truly matters to your product and your life.
• Resilience wins: As C.K. Kumaravel showed, setbacks are just setups for a bigger comeback.
• Community is Everything: Surrounding yourself with fellow founders is the fastest way to grow.

Ready to take these lessons into the rest of 2026! 📈`;

export const eventItems: MediaItem[] = [
  {
    src: "/images/events/founder.jpeg",
    alt: "FounderX Global Startup Summit 2026 at IITM Research Park",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/events/1769410436399.jpeg",
    alt: "FounderX 2026 — Fireside Chat with Chief Guest Thomas Dose (MD, BMW India)",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/events/1769410435425.jpeg",
    alt: "FounderX 2026 — Keynote & Networking with C.K. Kumaravel (Co-founder, Naturals)",
    width: 2048,
    height: 1536,
  },
];

export const bootcampDescription = `🚀 Feeling really happy and grateful to be part of the IDE Bootcamp again!

This year was special for me because it was my second time participating in the Innovation, Design and Entrepreneurship (IDE) Bootcamp – Edition 3, Phase 2, organized by AICTE in collaboration with Wadhwani Foundation and SBI Foundation.

📍 Hosted at Sri Manakula Vinayagar Engineering College, Puducherry
📅 April 20–24, 2026

Coming back for the second year felt completely different. Last time, I was mainly exploring and learning. This time, I was more confident, more clear, and more focused on actually applying what I learned.

Over these 5 days, I got to:
✨ Think deeper about real-world problems
* Work on ideas with a clearer direction
* Understand how to shape a business model
* Improve how I present and pitch ideas

One of the best moments was visiting the Atal Incubation Centre (PEC Foundation), where we interacted with startups and saw how ideas are actually built in the real world.

Honestly, this experience wasn’t just about learning — it made me realize how much I’ve grown from last year and how much more there is to improve.

👥 Team: AmiesStack
Leader: Padmesh M.
Members: prasanna Hari, SUBBURAJ J, Anaga Ravindraprasad, Nithya
Mentor: Mr P Vidhya Devi

Really thankful for this opportunity and excited to take these learnings forward into real projects 🚀`;

export const bootcampItems: MediaItem[] = [
  {
    src: "/images/bootcamp/WhatsApp Image 2026-10-11 at 18.27.43.jpeg",
    alt: "Innovation, Design and Entrepreneurship (IDE) Bootcamp Edition 3 Phase 2",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/bootcamp/IMG_5071.JPG",
    alt: "Team AmiesStack at Sri Manakula Vinayagar Engineering College, Puducherry",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/bootcamp/IMG_5150.JPG",
    alt: "Official Photo Frame — IDE Bootcamp AICTE & Wadhwani Foundation",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/bootcamp/WhatsApp Image 2026-10-11 at 18.27.04.jpeg",
    alt: "IDE Bootcamp Workshop & Real-World Problem Solving Sessions",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/bootcamp/WhatsApp Image 2026-10-11 at 18.27.21.jpeg",
    alt: "Atal Incubation Centre (PEC Foundation) Startup Interaction",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/bootcamp/WhatsApp Image 2026-10-11 at 18.28.08.jpeg",
    alt: "Pitching and Business Model Presentation",
    width: 1600,
    height: 1200,
  },
];

export const hackathonDescription = `**Team Name: The Originals**

Team Description:

We are The Originals, a team of passionate and innovative problem-solvers focused on developing practical, technology-driven solutions for real-world industrial challenges. Our team combines technical knowledge, creativity, teamwork, and a strong interest in emerging technologies such as IoT, Artificial Intelligence, Machine Learning, and industrial automation. Through our project, Belt Forge, we aim to develop a unified intelligent conveyor belt health monitoring and predictive maintenance system for the iron ore mining industry. Our goal is to detect early signs of conveyor belt joint damage, predict potential failures, reduce unexpected downtime, improve worker safety, and support cost-effective, sustainable mining operations. We believe in learning, collaborating, and transforming innovative ideas into feasible engineering solutions.`;

export const hackathonItems: MediaItem[] = [
  {
    src: "/images/hackathon/IMG_6549.JPG",
    alt: "Smart India Hackathon 26 — Team The Originals: Project Belt Forge",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/hackathon/IMG_6354.JPG",
    alt: "Belt Forge — Hardware & IoT Prototype Assembly",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/hackathon/IMG_6359.JPG",
    alt: "Belt Forge — Intelligent Conveyor Belt Joint Sensor Integration",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/hackathon/IMG_6362.JPG",
    alt: "Belt Forge — Predictive Maintenance System Live Testing",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/hackathon/IMG_6364.JPG",
    alt: "Team The Originals — Technical Architecture & Machine Learning Dashboard",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/hackathon/IMG_6380.JPG",
    alt: "Jury Presentation — Real-World Industrial Conveyor Health Monitoring",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/hackathon/IMG_6519.JPG",
    alt: "Team Collaboration & Problem Solving at SIH 26",
    width: 3840,
    height: 2160,
  },
  {
    src: "/images/hackathon/IMG_6375.JPG",
    alt: "Final Prototype Demonstration for Mining Industry Automation",
    width: 3840,
    height: 2160,
  },
];

export const sih25Description = `Our team Crypto Core participated in the Internal Hackathon for Smart India Hackathon (SIH) at our college and we’re proud to share that we received the Best Team Award 🏆.

We worked on building and prototyping an innovative solution, and through this journey, we also learned the importance of working together as a team 🤝. This recognition motivates us to take our idea forward with even more energy and dedication. 🚀

Meet our powerful team 💪:
Akileshkumar
Prasannahari
Sri Thraishika
Subburaj
Saaisaran
Vedhavarshini

A big thank you to our mentors, faculty, and teammates for their support and collaboration throughout this journey. 🙌`;

export const sih25Items: MediaItem[] = [
  {
    src: "/images/hackathon/1758079202660.jpeg",
    alt: "Smart India Hackathon 25 — Best Team Award Certificate Presentation (Team Crypto Core)",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/hackathon/1756199972143.jpeg",
    alt: "Smart India Hackathon 25 — Team Crypto Core & SIH Cohort on Stage",
    width: 2048,
    height: 1536,
  },
];

export const israelIndiaHackathonDescription = `I’m excited to share that I participated in the Israel–India Global Innovators Hackathon 2026, organized by Ariel University, and received a Participant Certificate.

🔍 Challenge D: The Auto-Compliance Mapper
As part of the hackathon, I worked on an Open-Source AI Intelligence (OSINT) & Compliance solution focused on automating compliance mapping for India’s Digital Personal Data Protection (DPDP) Act, 2023.

💡 What I built
An AI-powered Compliance Search Engine that:
Uses the public DPDP Act (2023) PDF as an open-source legal reference
Accepts client documentation and technical findings (e.g., “Database is not encrypted”)
Automatically maps findings to the exact DPDP Section / Article violated
Built using local LLMs and open-source libraries (LangChain, vector search), ensuring data sovereignty and privacy
Designed to generate a compliance status report to support GRC (Governance, Risk & Compliance) workflows

🎯 Why this matters
Manual compliance mapping is slow and error-prone. Automating this process can significantly improve legal accuracy, audit readiness, and advisory efficiency for organizations handling sensitive data.

Grateful for the opportunity to collaborate, learn, and innovate on real-world compliance challenges at a global platform 🌍`;

export const israelIndiaHackathonItems: MediaItem[] = [
  {
    src: "/images/hackathon/1768125406579.jpeg",
    alt: "Live Prototype Evaluation & Architecture Demo with Hackathon Jury",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/hackathon/1768125406819.jpeg",
    alt: "Official Participant Badge — Team PRAMIES FLUX (Prasanna Hari M P)",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/hackathon/1768125406537.jpeg",
    alt: "Certificate of Participation — Israel–India Global Innovators Hackathon 2026",
    width: 2048,
    height: 1536,
  },
];

export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Development",
    items: [
      "React 18",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Tailwind CSS",
      "REST & GraphQL",
    ],
  },
  {
    title: "AI / ML & Intelligence",
    items: [
      "LLM Pipelines",
      "LangChain",
      "OpenAI APIs",
      "RAG Architecture",
      "Vector Embeddings",
      "Prompt Optimization",
      "Computer Vision",
    ],
  },
  {
    title: "Architecture & Systems",
    items: [
      "Distributed Microservices",
      "Multi-Tenant SaaS",
      "RBAC Security",
      "WebSocket Realtime",
      "Relational Schema Design",
      "API Performance Tuning",
    ],
  },
  {
    title: "Cloud & Design",
    items: [
      "Docker & Linux",
      "Git & GitHub",
      "CI/CD Pipelines",
      "Figma Systems",
      "Kinetic Motion (GSAP)",
      "Vercel Deployment",
    ],
  },
];

export interface ToolItem {
  name: string;
  use: string;
}

export const tools: ToolItem[] = [
  { name: "TypeScript", use: "Strict Type Safety & Robust Domain Models" },
  { name: "React & Next.js", use: "Performant Component Hierarchies & SSR" },
  { name: "Tailwind CSS", use: "Token-Driven Atomic Styling System" },
  { name: "GSAP & Lenis", use: "Silky 60FPS Scroll & Kinetic Choreography" },
  { name: "Python & FastAPI", use: "Scalable Microservices & AI Backends" },
  { name: "PostgreSQL", use: "Relational Persistence & Realtime DB" },
  { name: "Docker & Cloud", use: "Containerized Workflows & Production CI/CD" },
  { name: "Figma", use: "Design Systems & High-Fidelity Prototyping" },
];

export interface ProjectCase {
  situation: string;
  task: string;
  action: string;
  result: string;
  affected: string;
  userFlow: string;
  emotion: string;
  validation?: string;
}

export interface Project {
  id: string;
  index: number;
  title: string;
  category: string;
  summary: string;
  type: string;
  team: string;
  duration: string;
  role: string;
  status: string;
  tech: string[];
  github: string;
  image?: string;
  wire: "recipe" | "shop" | "dashboard";
  case: ProjectCase;
}

export const projects: Project[] = [
  {
    id: "saaiss-ai",
    index: 1,
    title: "SaaISS AI",
    category: "AI Financial Accounting Platform",
    summary:
      "Enterprise accounting intelligence software that automates invoice parsing, transactional reconciliation, and tax ledger auditing using fine-tuned LLM workflows.",
    type: "Enterprise B2B SaaS",
    team: "Lead Architect & Engineer",
    duration: "4 Months",
    role: "Full-Stack Architecture & AI Integration",
    status: "Active Production Beta",
    tech: ["React 18", "TypeScript", "Python / FastAPI", "PostgreSQL", "Tailwind CSS", "OpenAI API"],
    github: "https://github.com/hariprasanna939-hue",
    image: "/projects/dashboard.webp",
    wire: "dashboard",
    case: {
      situation:
        "Financial controllers and audit teams spend hundreds of manual hours reconciling fragmented bank statements, invoices, and statutory tax ledgers, leading to costly accounting delays.",
      task:
        "Architect and build an AI-powered financial platform delivering sub-second reporting, automated journal entry parsing, and strict role-based access control.",
      action:
        "Engineered modular REST services in FastAPI, integrated tokenized multi-tenant security, designed interactive financial visualization widgets, and connected LLM ledger auditing.",
      result:
        "Reduced manual book-closing timelines by 65%, processing thousands of monthly transactions with zero data integrity discrepancies.",
      affected:
        "CFOs, corporate controllers, and statutory audit teams.",
      userFlow:
        "Secure SSO Login → Multi-Entity Dashboard → Automated Ingestion → Real-Time Ledger Reconciliation → Audit Export",
      emotion:
        "Absolute fiscal clarity, decisive confidence, and audit peace of mind.",
      validation:
        "Undergoing pilot validation with mid-market enterprise accounting firms.",
    },
  },
  {
    id: "belt-forge",
    index: 2,
    title: "Belt Forge",
    category: "Industrial IoT & Computer Vision",
    summary:
      "Intelligent conveyor telemetry and anomaly detection platform pairing edge video streams with vibration sensors to predict mechanical failures before downtime occurs.",
    type: "Industrial IoT Monitoring",
    team: "Lead Systems Architect",
    duration: "5 Months",
    role: "IoT Architecture & Dashboard Systems",
    status: "Field Deployed",
    tech: ["Python", "OpenCV", "React", "TypeScript", "Node.js", "TimescaleDB", "Tailwind CSS"],
    github: "https://github.com/hariprasanna939-hue",
    image: "/projects/recipe.webp",
    wire: "recipe",
    case: {
      situation:
        "Manufacturing plants suffered frequent unplanned conveyor halts due to undetected belt tear, surface wear, and motor misalignment, costing thousands per hour in halted output.",
      task:
        "Create a real-time operational command center that ingests high-frequency sensor telemetry and computer vision feeds to predict failures hours in advance.",
      action:
        "Trained anomaly detection models on edge feeds, established low-latency WebSocket sensor pipelines into TimescaleDB, and designed a high-contrast industrial operations UI.",
      result:
        "Achieved 94% early fault identification accuracy, cutting unexpected downtime by over 40% across initial manufacturing testing lines.",
      affected:
        "Plant operations directors, maintenance engineers, and factory supervisors.",
      userFlow:
        "Factory Overview → Conveyor Telemetry Stream → Real-Time Anomaly Alert → Visual Camera Inspector → Maintenance Dispatch",
      emotion:
        "Commanding authority, operational calm, and preventive certainty.",
      validation:
        "Field-validated in active industrial testing environments.",
    },
  },
  {
    id: "dpdp-ai-mapper",
    index: 3,
    title: "DPDP AI Compliance Mapper",
    category: "LLM & Regulatory Tech",
    summary:
      "Conversational intelligence engine built for enterprise data privacy governance and statutory Indian DPDP Act compliance.",
    type: "AI Compliance Automation",
    team: "Core Developer",
    duration: "3 Months",
    role: "AI Integration & Full-Stack Systems",
    status: "Production Ready",
    tech: ["Next.js", "OpenAI API", "Python", "Supabase", "Tailwind CSS"],
    github: "https://github.com/hariprasanna939-hue",
    image: "/projects/shop.webp",
    wire: "shop",
    case: {
      situation:
        "The Indian DPDP Act imposed rigorous data governance mandates that manual compliance teams struggled to parse across legacy datasets.",
      task:
        "Construct an AI-driven engine to parse enterprise data schemas and automatically generate statutory compliance blueprints.",
      action:
        "Fine-tuned LLM prompting chains, built vector-assisted semantic search over privacy statutes, and designed an interactive mitigation UI.",
      result:
        "Automated 80% of data inventory mapping, trimming compliance consultation timelines from weeks to hours.",
      affected:
        "Corporate legal counsels, data protection officers, and engineering leads.",
      userFlow:
        "Upload Data Schema → Automatic Entity Classification → Regulatory Gap Analysis → AI Remediation Plan",
      emotion:
        "Absolute assurance, transparency, and relief from statutory exposure.",
      validation:
        "Validated against national privacy regulations with 95% mapping accuracy.",
    },
  },
  {
    id: "smart-health",
    index: 4,
    title: "SmartHealth Ecosystem",
    category: "Healthcare E-Commerce",
    summary:
      "Multi-vendor healthcare platform featuring automated inventory management, prescription validation, and telemedicine coordination.",
    type: "Multi-Vendor Marketplace",
    team: "Full-Stack Developer",
    duration: "4 Months",
    role: "E-Commerce Architecture & API Design",
    status: "Deployed & Validated",
    tech: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
    github: "https://github.com/hariprasanna939-hue",
    image: "/projects/dashboard.webp",
    wire: "dashboard",
    case: {
      situation:
        "Disjointed supply chains in local pharmacies caused medicine stockouts and lengthy patient turnaround times for essential prescriptions.",
      task:
        "Create a unified multi-vendor platform harmonizing distributor inventories with real-time consumer availability.",
      action:
        "Implemented real-time stock synchronization with WebSocket alerts, secure payment gateways, and a streamlined mobile-first checkout.",
      result:
        "Connected 25+ suppliers, reducing average prescription fulfillment wait times by 65%.",
      affected:
        "Local pharmacies, healthcare providers, and patients requiring urgent medicines.",
      userFlow:
        "Prescription Upload → Real-Time Stock Search → Verified Pharmacy Cart → Scheduled Safe Delivery",
      emotion:
        "Calm reassurance, frictionless convenience, and life-saving reliability.",
      validation:
        "Successfully field-tested with local healthcare clinics and retail suppliers.",
    },
  },
];

export interface JourneyStep {
  title: string;
  text: string;
}

export const journey: JourneyStep[] = [
  {
    title: "Before design",
    text: "Writing code was my initial sanctuary. I chased raw computational efficiency, algorithms, and technical mastery, believing that impeccable logic alone was enough to solve any human dilemma.",
  },
  {
    title: "The challenge",
    text: "Deploying production products revealed the hard truth: users don't interact with codebases or database tables; they experience mental models, friction, and emotional touchpoints.",
  },
  {
    title: "The turning point",
    text: "Winning hackathons and working alongside visionary creators forced me to realize that architecture without empathy is hollow. Design is not cosmetic styling—it is how the system breathes and responds.",
  },
  {
    title: "What design changed in me",
    text: "I evolved from a code-first builder into a product architect. Every database schema, latency budget, and animation curve is now tuned around human agency and deliberate clarity.",
  },
  {
    title: "What I believe now",
    text: "The greatest software systems feel invisible. When deep engineering rigor is paired with poetic, tactile interfaces, technology disappears and human potential expands.",
  },
];

export interface Certification {
  title: string;
  issuer?: string;
}

export const certifications: Certification[] = [
  {
    title: "Google Digital Marketing & Analytics Fundamentals",
    issuer: "GOOGLE",
  },
  {
    title: "Israel–India Global Hackathon Finalist",
    issuer: "GLOBAL ALLIANCE",
  },
  {
    title: "Smart India Hackathon Best Performance Award",
    issuer: "MINISTRY OF EDUCATION",
  },
  {
    title: "Hackshastra National Technical Excellence",
    issuer: "DELHI INNOVATION",
  },
];

export interface BadgeItem {
  label: string;
  href: string;
}

export const badges: BadgeItem[] = [
  {
    label: "Google Cloud Certified Associate",
    href: "https://cloud.google.com/certification",
  },
  {
    label: "NVIDIA Deep Learning Institute Specialist",
    href: "https://www.nvidia.com/en-us/training/",
  },
  {
    label: "IBM Enterprise Design & Architecture",
    href: "https://www.ibm.com/design/",
  },
  {
    label: "Credly Technical Leadership Verification",
    href: "https://www.credly.com",
  },
];

export const projectTypes = [
  "Architectural Lead / Full-Time",
  "Enterprise SaaS Contract",
  "AI & LLM Integration",
  "UI/UX / Product Design System",
  "Technical Consultation",
] as const;
