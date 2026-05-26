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
    "MSc Candidate, Construction Engineering & Management — METU",
  eyebrow: "METU · CE 520 Graduate Seminar · Spring 2026",
  about: [
    "I am an MSc candidate and Research Assistant in Construction Engineering & Management at Middle East Technical University, supervised by Prof. Dr. Rıfat Sönmez. My research applies graph neural networks to BIM models, with the goal of generating complete construction precedence schedules directly from a building's geometry and standardized activity classifications.",
    "I hold a BSc in Civil Engineering from METU, with a minor in Corporate Finance — a combination that lets me reason about construction projects both as engineering systems and as cost-driven programmes. My current research interests are BIM, graph neural networks, construction scheduling, and machine learning for the built environment.",
    "Alongside academic work I have a long-standing practice in full-stack software development (Python/Django, React, React Native) and graphic design, including freelance work and the visual design of a 2024 Turkish municipal election campaign. I treat code, design, and engineering as complementary tools for the same problem: turning messy real-world domains into systems that scale."
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
  programme: "MSc Thesis · Construction Engineering & Management",
  supervisor: "Prof. Dr. Rıfat Sönmez",
  course: "CE 520 — Graduate Seminar, Spring 2026",
  presentedOn: "Presented 12 May 2026 at METU",
  pitch:
    "Construction megaprojects miss budget 98 % of the time, largely because BIM and the construction schedule still do not talk to each other. This thesis closes that loop: given a BIM model with assigned OmniClass activities, a graph neural network predicts the entire FS, SS, FF, SF precedence network — regenerating schedules from the model on every design change.",
  sections: [
    {
      label: "Problem",
      body:
        "The 4D BIM loop is broken: schedule logic is not derived from the model itself. Planners rebuild precedence by hand from drawings for each project. Recent text-based approaches (e.g. Amer, Jung & Golparvar-Fard, 2023, ILC) reach F1 91 % on activity pairs, but ignore geometry, hit token-window limits at real project scale, and produce loops and broken links."
    },
    {
      label: "Approach",
      body:
        "A single graph neural network (GraphSAGE / GAT) consumes a three-layer IFC representation: native IFC class and geometry, Uniformat II classification, and OmniClass T22 activities. Message passing over BIM topology — adjacency, support, containment — yields probabilities for every candidate FS / SS / FF / SF link in the schedule. Standardized vocabularies replace free-form text and avoid LLM hallucinations."
    },
    {
      label: "Contribution",
      body:
        "First end-to-end whole-schedule precedence predictor that grounds directly in BIM topology and standardized classification codes, instead of free-form activity text. Designed for transfer across firms and projects, with a roadmap to a defense in December 2027."
    }
  ],
  images: [
    {
      src: "/assets/thesis-bim.jpg",
      alt: "BIM model cutaway of a multi-storey reinforced-concrete building with mechanical systems exposed",
      caption: "BIM model — geometry, topology, and classification feed the GNN."
    },
    {
      src: "/assets/thesis-gnn.png",
      alt: "Graph Neural Network architecture: input graph, graph convolution layers, regularization, output probabilities of links between nodes",
      caption:
        "Graph neural network — nodes are BIM elements, edges are precedence candidates."
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
    org: "Middle East Technical University (METU) — GPA 3.35 / 4.00",
    detail:
      "Coursework in structural analysis, geotechnics, hydraulics, construction management, and Building Information Modeling.",
    icon: "hardhat"
  },
  {
    period: "2019 — 2023",
    title: "Minor, Corporate Finance",
    org: "Middle East Technical University (METU) — GPA 3.39 / 4.00",
    detail:
      "Minor programme covering financial analysis, valuation, and quantitative methods alongside the civil engineering degree.",
    icon: "finance"
  }
];

export const experience: Entry[] = [
  {
    period: "Oct 2025 — Present",
    title: "Research Assistant — Construction Engineering & Management",
    org: "Middle East Technical University (METU), Department of Civil Engineering",
    detail:
      "Graduate research and teaching support within the Construction Engineering and Management division. Focus areas include BIM, graph neural networks for construction scheduling, and machine learning applied to the built environment.",
    icon: "research"
  },
  {
    period: "Dec 2024 — Oct 2025",
    title: "Software Engineer",
    org: "Mega Mühendislik, Türkiye",
    detail:
      "Developed software for engineering workflows, contributing across the stack to ship reliable internal tooling before moving full-time into graduate research at METU.",
    icon: "code"
  },
  {
    period: "2023 — Present",
    title: "Founder & Full-Stack Developer — Diyet Cebimde",
    org: "Self-initiated · AI-assisted diet & nutrition platform",
    detail:
      "Solo-built mobile platform that generates AI-driven weekly diet plans from each user's profile and goals, with photo-based meal recognition, manual tracking, weight/measurement logging, and a memory-equipped chatbot. Hybrid pipeline (Gemini for meal selection, PuLP linear programming for portion optimisation) and snapshot architecture keep historical plans stable across catalog updates. Three repositories: Django + DRF + PostgreSQL backend, React 18 + Vite admin panel, Expo + React Native mobile client.",
    icon: "mobile"
  },
  {
    period: "2023 — 2024",
    title: "Head of Quantitative Strategies",
    org: "Vortex · Remote (Georgia)",
    detail:
      "Designed and developed algorithmic trading systems for financial markets — scalping and swing strategies, performance tuning, and per-investor mandate customisation.",
    icon: "trading"
  },
  {
    period: "Summer 2022",
    title: "Civil Engineering Intern",
    org: "ES Group — Erdemir Port Project, Zonguldak",
    detail:
      "Worked across site operations, planning, and progress payments on a port construction project. Contributed to steel-pile design and took responsibility in cost control and project scheduling.",
    icon: "hardhat"
  },
  {
    period: "2020 — 2024",
    title: "Freelance Graphic Designer · 2024 Local Elections Lead Designer",
    org: "Independent",
    detail:
      "Delivered posters, brochures, social media content, and campaign materials across freelance projects. Served as lead designer for a 2024 Turkish mayoral campaign, owning the full digital content production pipeline.",
    icon: "design"
  }
];

export const skills: SkillGroup[] = [
  {
    name: "Research & Engineering",
    pills: [
      { label: "BIM", level: "Revit, IFC" },
      { label: "Construction Mgmt", level: "scheduling, CPM" },
      { label: "Graph Neural Networks", level: "GraphSAGE / GAT" },
      { label: "Machine Learning", level: "PyTorch" },
      { label: "AutoCAD", level: "upper-intermediate" },
      { label: "SAP2000", level: "beginner-intermediate" },
      { label: "EPANET", level: "advanced" },
      { label: "MS Project", level: "intermediate" }
    ]
  },
  {
    name: "Software Development",
    pills: [
      { label: "Python & Django", level: "advanced" },
      { label: "HTML / CSS / JS", level: "advanced" },
      { label: "React", level: "intermediate" },
      { label: "PostgreSQL", level: "intermediate" },
      { label: "MATLAB / VBA", level: "advanced" }
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
