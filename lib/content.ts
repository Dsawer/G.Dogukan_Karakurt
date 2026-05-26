export type IconLink = {
  label: string;
  href: string;
  brand: "orcid" | "scholar" | "linkedin";
};

export type EntryIcon =
  | "graduation"
  | "book"
  | "hardhat"
  | "finance"
  | "research"
  | "code"
  | "mobile"
  | "trading"
  | "design";

export type Entry = {
  period: string;
  title: string;
  org: string;
  detail: string;
  icon: EntryIcon;
};

export type Pill = {
  label: string;
  level?: string;
};

export type SkillGroup = {
  name: string;
  pills: Pill[];
};

export const profile = {
  name: "Gürkan Doğukan Karakurt",
  roles: ["MSc Candidate", "Research Assistant"],
  headline:
    "MSc Candidate & Research Assistant, Construction Engineering & Management at METU",
  eyebrow: "METU · Construction Engineering & Management",
  about: [
    "MSc candidate and Research Assistant in Construction Engineering and Management at Middle East Technical University. Building on my foundation as a Civil Engineer, my core expertise lies at the intersection of Artificial Intelligence and the built environment. I actively research and develop advanced machine learning models to predict and automate construction schedules directly from BIM topology.",
    "Previously, as a Software Engineer at Mega Mühendislik, I built custom automation tools and software to optimize civil engineering operations and drive digital transformation in construction workflows.",
    "Beyond my primary academic and engineering focus, I possess a versatile background as a full stack developer and designer. I have briefly contributed to a select number of external software initiatives, ranging from quantitative algorithmic trading systems at Vortex to serving as the technical lead for an AI powered wellness application. Ultimately, I consistently bridge the gap between complex civil engineering research and practical application by engineering scalable software architectures."
  ],
  researchInterests: [
    "BIM",
    "Graph Neural Networks",
    "Construction Scheduling",
    "Machine Learning"
  ],
  links: {
    orcid: "https://orcid.org/0009-0008-3277-5405",
    scholar: "https://scholar.google.com/citations?user=lYuZHmYAAAAJ",
    linkedin:
      "https://www.linkedin.com/in/g%C3%BCrkan-do%C4%9Fukan-karakurt-964a84177/"
  }
} as const;

export const iconLinks: IconLink[] = [
  { label: "ORCID", href: profile.links.orcid, brand: "orcid" },
  { label: "Google Scholar", href: profile.links.scholar, brand: "scholar" },
  { label: "LinkedIn", href: profile.links.linkedin, brand: "linkedin" }
];

export const research = {
  title:
    "Predicting Construction Precedence Relationships from BIM Geometry with Machine Learning",
  paragraphs: [
    "I am building a graph neural network that reads a BIM model and outputs the full construction schedule. The network predicts every FS, SS, FF, SF precedence link, so the schedule regenerates from the model whenever the design changes.",
    "BIM and the construction schedule still do not talk to each other; planners rebuild precedence by hand for every project. The model treats the BIM as a graph: nodes are building elements with their IFC class, geometry, and standardized activity codes (Uniformat II, OmniClass T22); edges encode topology like adjacency, support, and containment. Message passing across that graph scores every candidate precedence link, replacing free-form activity text with standardized vocabularies.",
    "What is new is that precedence prediction is grounded directly in BIM topology and standardized classification codes (IFC, Uniformat II, OmniClass) rather than free-form activity text, so the model can transfer across firms and projects instead of overfitting a single dataset."
  ],
  images: [
    {
      src: "/assets/thesis-bim.jpg",
      href: "https://en.wikipedia.org/wiki/Building_information_modeling",
      alt: "BIM model of a multi-storey building",
      caption: "BIM model: what the network reads."
    },
    {
      src: "/assets/thesis-schedule.jpg",
      href: "https://en.wikipedia.org/wiki/Gantt_chart",
      alt: "Primavera P6 construction schedule with linked activities",
      caption: "Construction schedule: what the network predicts."
    }
  ]
} as const;

export const education: Entry[] = [
  {
    period: "2025 — Ongoing",
    title: "Master's in Construction Management",
    org: "Orta Doğu Teknik Üniversitesi (METU)",
    detail:
      "Research Assistant. Thesis on machine learning models that predict and automate construction schedules directly from BIM topology, supervised by Prof. Dr. Rıfat Sönmez.",
    icon: "graduation"
  },
  {
    period: "2017 — 2023",
    title: "Civil Engineering",
    org: "Orta Doğu Teknik Üniversitesi (METU), GPA 3.35 / 4.00",
    detail:
      "Coursework in structural analysis, geotechnics, hydraulics, construction management, and Building Information Modeling.",
    icon: "hardhat"
  },
  {
    period: "2019 — 2023",
    title: "Corporate Finance (Minor Program)",
    org: "Orta Doğu Teknik Üniversitesi (METU), GPA 3.39 / 4.00",
    detail:
      "Minor programme covering financial analysis, valuation, and quantitative methods alongside the civil engineering degree.",
    icon: "finance"
  }
];

export const experience: Entry[] = [
  {
    period: "Oct 2025 — Present",
    title: "Research Assistant",
    org: "Middle East Technical University · Ankara",
    detail:
      "I conduct graduate research in Construction Engineering and Management under the supervision of Prof. Dr. Rıfat Sönmez. My research focuses on developing machine learning models to predict and automate construction schedules directly from BIM topology. Additionally, I serve as a teaching assistant for departmental courses, where I provide academic support, prepare course materials, and facilitate student learning within the civil engineering program.",
    icon: "research"
  },
  {
    period: "Dec 2024 — Oct 2025",
    title: "Software Engineer (Construction Tech.)",
    org: "Mega Mühendislik Müşavirlik A.Ş. · Ankara",
    detail:
      "Worked on the digital transformation of construction workflows by building internal automation tools and custom software for engineering operations. Focused on data structuring, process optimization, and technical problem-solving for civil engineering applications.",
    icon: "code"
  },
  {
    period: "Jan 2025 — Aug 2025",
    title: "Lead Frontend Designer",
    org: "Global Crypto Exchange (Stealth) · Remote",
    detail:
      "Spearheaded the design and implementation of the core trading interface for a pre-launch global crypto exchange. Responsible for responsive architecture, performance optimization, and UX/UI systems that adapt across devices. Technologies include React, TypeScript, Tailwind, and WebSocket-based live data feeds.",
    icon: "code"
  },
  {
    period: "2023 — 2024",
    title: "Head of Quantitative Strategies",
    org: "Vortex Foundation · Remote",
    detail:
      "Led the design, development, and deployment of algorithmic trading bots for hedge fund and retail-level use cases. Delivered strategies based on user-specific risk appetites, including scalping, swing, and long-term investment models. Built fully autonomous bots with live market execution and order book integration. Also developed custom market making algorithms for liquidity optimization on multiple exchanges.",
    icon: "trading"
  },
  {
    period: "2023 — Present",
    title: "Co-Founder & Full Stack Developer",
    org: "Diyet Cebimde · AI-assisted wellness & diet platform",
    detail:
      "I architected and developed an AI assisted wellness and diet generation platform in collaboration with my wife, Dietitian Melisa Karakurt. Designed specifically to digitize and scale her professional dietary practice, I built the entire technical infrastructure from the ground up featuring both web and mobile clients. I engineered a hybrid pipeline that integrates the Gemini API for intelligent meal selection and PuLP linear programming for precise portion optimization. The robust backend architecture is built using Python, Django REST Framework, and PostgreSQL, while the admin panel and cross platform mobile client were designed using React 18 and React Native with Expo.",
    icon: "mobile"
  }
];

export const skills: SkillGroup[] = [
  {
    name: "Software Developer",
    pills: [
      { label: "Python & Django" },
      { label: "Web Dev (HTML, CSS, JS)" },
      { label: "React, Tailwind" },
      { label: "React Native (Mobile)" },
      { label: "PostgreSQL" },
      { label: "MATLAB, VBA" },
      { label: "Algorithmic Trading Development" }
    ]
  },
  {
    name: "Civil Engineer",
    pills: [
      { label: "Construction Software Automation" },
      { label: "AutoCAD" },
      { label: "Excel + Visual Basic" },
      { label: "Revit" },
      { label: "Navisworks" },
      { label: "MS Project" }
    ]
  },
  {
    name: "Languages",
    pills: [{ label: "Turkish" }, { label: "English (C1)" }]
  }
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" }
];
