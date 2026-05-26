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
  roles: ["Graduate Researcher", "Civil Engineer", "Software Developer"],
  headline:
    "MSc Candidate, Construction Engineering & Management at METU",
  eyebrow: "METU · Construction Engineering & Management",
  about: [
    "I am an MSc candidate and Research Assistant in Construction Engineering & Management at Middle East Technical University, supervised by Prof. Dr. Rıfat Sönmez. My research applies graph neural networks to BIM models, with the goal of generating complete construction precedence schedules directly from a building's geometry and standardized activity classifications.",
    "I hold a BSc in Civil Engineering from METU and a minor in Corporate Finance. That mix lets me look at construction projects both as engineering systems and as cost-driven programmes. My current research interests are BIM, graph neural networks, construction scheduling, and machine learning for the built environment.",
    "Outside the lab I write full-stack software in Python, Django, React, and React Native, and I work on financial systems. I led the quantitative strategy team at Vortex in 2023–2024, designing algorithmic trading bots for scalping and swing strategies, and earlier I built a self-initiated web-based trading interface end to end. I also work as a freelance graphic designer and led the visual design of a 2024 Turkish mayoral campaign."
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
    "The novel piece is grounding precedence prediction directly in BIM topology and standardized classification codes (IFC, Uniformat II, OmniClass) instead of free-form activity text. That is what lets the model transfer across firms and projects rather than overfit a single dataset."
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
    period: "2025 — Present",
    title: "MSc, Construction Engineering & Management",
    org: "Middle East Technical University (METU), Ankara",
    detail:
      "Research Assistant. Thesis on BIM-driven scheduling with graph neural networks, supervised by Prof. Dr. Rıfat Sönmez. Transferred from the Geotechnical Engineering programme in Spring 2025.",
    icon: "graduation"
  },
  {
    period: "2017 — 2023",
    title: "BSc, Civil Engineering",
    org: "Middle East Technical University (METU), GPA 3.35 / 4.00",
    detail:
      "Coursework in structural analysis, geotechnics, hydraulics, construction management, and Building Information Modeling."
    ,
    icon: "hardhat"
  },
  {
    period: "2019 — 2023",
    title: "Minor, Corporate Finance",
    org: "Middle East Technical University (METU), GPA 3.39 / 4.00",
    detail:
      "Minor programme covering financial analysis, valuation, and quantitative methods alongside the civil engineering degree.",
    icon: "finance"
  }
];

export const experience: Entry[] = [
  {
    period: "Oct 2025 — Present",
    title: "Research Assistant",
    org: "METU · Construction Engineering & Management, Department of Civil Engineering",
    detail:
      "Graduate research and teaching support within the Construction Engineering and Management division. Focus areas include BIM, graph neural networks for construction scheduling, and machine learning applied to the built environment.",
    icon: "research"
  },
  {
    period: "Dec 2024 — Oct 2025",
    title: "Software Engineer",
    org: "Mega Mühendislik, Türkiye",
    detail:
      "Built software for engineering workflows, contributing across the stack to ship reliable internal tooling before moving full-time into graduate research at METU.",
    icon: "code"
  },
  {
    period: "2023 — Present",
    title: "Founder & Full-Stack Developer",
    org: "Diyet Cebimde · AI-assisted diet & nutrition platform",
    detail:
      "Solo-built mobile platform that generates AI-driven weekly diet plans from each user's profile and goals, with photo-based meal recognition, manual tracking, weight and measurement logging, and a memory-equipped chatbot. Hybrid pipeline (Gemini for meal selection, PuLP linear programming for portion optimisation) and snapshot architecture keep historical plans stable across catalog updates. Three repositories: Django + DRF + PostgreSQL backend, React 18 + Vite admin panel, Expo + React Native mobile client.",
    icon: "mobile"
  },
  {
    period: "2023 — 2024",
    title: "Head of Quantitative Strategies",
    org: "Vortex · Remote (Georgia)",
    detail:
      "Designed and developed algorithmic trading bots for financial markets, including scalping and swing strategies, performance tuning, and per-investor mandate customisation. Owned the strategy roadmap end to end, from market-data ingestion to backtesting to live deployment.",
    icon: "trading"
  },
  {
    period: "2021 — 2024",
    title: "Web Development Project Lead (Self-Initiated)",
    org: "Independent · Finance & trading interfaces",
    detail:
      "Built a web-based trading interface for financial markets end to end and ran several smaller finance-side projects in parallel. Picked the stack, owned product decisions, and shipped each iteration to production myself.",
    icon: "trading"
  },
  {
    period: "Summer 2022",
    title: "Civil Engineering Intern",
    org: "ES Group, Erdemir Port Project, Zonguldak",
    detail:
      "Worked across site operations, planning, and progress payments on a port construction project. Contributed to steel-pile design and took responsibility in cost control and project scheduling.",
    icon: "hardhat"
  },
  {
    period: "2020 — 2024",
    title: "Freelance Graphic Designer · 2024 Local Elections Lead Designer",
    org: "Independent",
    detail:
      "Delivered posters, brochures, social media content, and campaign materials across freelance projects. Served as lead designer for a 2024 Turkish mayoral campaign and owned the full digital content production pipeline.",
    icon: "design"
  }
];

export const skills: SkillGroup[] = [
  {
    name: "Research & Engineering",
    pills: [
      { label: "BIM", level: "Revit, IFC" },
      { label: "Construction Management", level: "scheduling, CPM" },
      { label: "Machine Learning", level: "PyTorch, GNN (GraphSAGE / GAT)" },
      { label: "Optimization", level: "Linear Programming, PuLP" },
      { label: "AutoCAD", level: "upper-intermediate" },
      { label: "MS Project", level: "intermediate" },
      { label: "MATLAB / Visual Basic", level: "advanced" }
    ]
  },
  {
    name: "Backend & Data",
    pills: [
      { label: "Python", level: "advanced" },
      { label: "Django + Django REST Framework", level: "advanced" },
      { label: "PostgreSQL", level: "ArrayField, JSONField, indexing" },
      { label: "JWT (SimpleJWT) + Google OAuth", level: "production auth" },
      { label: "Algorithmic trading systems", level: "scalping, swing, custom strategies" },
      { label: "Quantitative finance", level: "strategy design, market data, backtesting" },
      { label: "Gunicorn", level: "production deployment" }
    ]
  },
  {
    name: "Frontend & Mobile",
    pills: [
      { label: "TypeScript", level: "advanced" },
      { label: "React", level: "advanced" },
      { label: "Next.js (App Router)", level: "advanced" },
      { label: "React Native + Expo", level: "advanced, EAS Build" },
      { label: "Tailwind CSS + NativeWind", level: "advanced" },
      { label: "React Query + Zustand", level: "state management" },
      { label: "Vite, Vercel, Railway", level: "build & deploy" },
      { label: "HTML / CSS / JavaScript", level: "advanced" }
    ]
  },
  {
    name: "Design",
    pills: [
      { label: "Photoshop", level: "advanced" },
      { label: "Illustrator", level: "advanced" },
      { label: "Premiere Pro", level: "advanced" },
      { label: "After Effects", level: "intermediate" }
    ]
  },
  {
    name: "Languages",
    pills: [
      { label: "Turkish", level: "native" },
      { label: "English", level: "C1" }
    ]
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
