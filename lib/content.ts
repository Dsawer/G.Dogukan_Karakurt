export type IconLink = {
  label: string;
  href: string;
  brand: "orcid" | "scholar" | "linkedin";
};

export type Entry = {
  period: string;
  title: string;
  org: string;
  detail: string;
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
  roles: ["Civil Engineer", "Software Developer", "Graduate Researcher"],
  headline:
    "Research Assistant @ METU Civil Engineering — Construction Management",
  eyebrow: "METU · Graduate Student",
  about: [
    "I graduated from Middle East Technical University with a degree in Civil Engineering and a double major in Corporate Finance, and I am now continuing at METU as a Research Assistant and MSc student in Construction Management. My undergraduate path combined classical civil engineering with corporate finance and Building Information Modeling (BIM), which shaped my interest in approaching construction problems from both an engineering and a financial perspective.",
    "In parallel, since 2019 I have grown into full-stack software development. I work most comfortably in Python/Django, modern JavaScript, and React/React Native, and I have shipped production projects ranging from web-based trading interfaces to AI-assisted mobile applications. Between 2023 and 2024 I led the quantitative strategy team of a trading startup, designing algorithms for scalping and swing strategies.",
    "I also work as a freelance graphic designer and led the visual design of a 2024 Turkish municipal election campaign. My current research interests are Construction Management, BIM, and Machine Learning, with a focus on bringing optimisation and modern software tooling into planning, cost management, and structural decision-making."
  ],
  researchInterests: ["Construction Management", "BIM", "Machine Learning"],
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

export const education: Entry[] = [
  {
    period: "2025 — Present",
    title: "MSc, Construction Management",
    org: "Middle East Technical University (METU), Ankara",
    detail:
      "Graduate research in Construction Management with a focus on BIM-driven planning and machine-learning approaches for construction analytics. Transferred from the Geotechnical Engineering programme in Spring 2025."
  },
  {
    period: "2017 — 2023",
    title: "BSc, Civil Engineering",
    org: "Middle East Technical University (METU) — GPA 3.35 / 4.00",
    detail:
      "Coursework in structural analysis, geotechnics, hydraulics, construction management, and Building Information Modeling."
  },
  {
    period: "2019 — 2023",
    title: "BSc Double Major, Corporate Finance",
    org: "Middle East Technical University (METU) — GPA 3.39 / 4.00",
    detail:
      "Financial analysis, valuation, and quantitative methods alongside the civil engineering programme."
  }
];

export const experience: Entry[] = [
  {
    period: "Oct 2025 — Present",
    title: "Research Assistant — Construction Management",
    org: "Middle East Technical University (METU), Department of Civil Engineering",
    detail:
      "Graduate research and teaching support within the Construction Management division. Focus areas include BIM-driven planning, construction analytics, and machine learning."
  },
  {
    period: "Dec 2024 — Oct 2025",
    title: "Software Engineer",
    org: "Mega Mühendislik, Türkiye",
    detail:
      "Developed software for engineering workflows, contributing across the stack to ship reliable internal tooling before moving full-time into graduate research at METU."
  },
  {
    period: "2023 — 2024",
    title: "Head of Quantitative Strategies",
    org: "Vortex · Remote (Georgia)",
    detail:
      "Designed and developed trading bots for financial markets. Built scalping and swing strategies, refined algorithm performance, and tailored bots to investor-specific mandates so the startup could offer customised allocation services."
  },
  {
    period: "2021 — 2024",
    title: "Web Development Project Lead",
    org: "Self-initiated project",
    detail:
      "Led a self-started web development project focused on financial markets, delivering a web-based trading interface end to end. Coordinated tasks across the project, owned product decisions, and extended the startup's capability around investment management."
  },
  {
    period: "Summer 2022",
    title: "Civil Engineering Intern",
    org: "ES Group — Erdemir Port Project, Zonguldak",
    detail:
      "Worked across site operations, planning, and progress payments on a port construction project. Contributed to steel-pile design and took responsibility in cost control and project scheduling, bridging engineering principles with field execution."
  },
  {
    period: "2020 — 2024",
    title: "Freelance Graphic Designer · 2024 Local Elections Lead Designer",
    org: "Independent",
    detail:
      "Delivered posters, brochures, social media content, and campaign materials across freelance projects. In the 2024 Turkish local elections, served as lead designer for a mayoral campaign and owned the full digital content production pipeline."
  }
];

export type ProjectMetric = { label: string; value: string };
export type ProjectHighlight = { title: string; body: string };

export const featuredProject = {
  title: "Diyet Cebimde",
  subtitle: "AI-powered diet & nutrition platform — full-stack, solo-built",
  meta: [
    "2025 — Ongoing",
    "Sole Full-Stack Developer / Founder",
    "Mobile + Web Admin + API"
  ],
  summary:
    "A full-stack mobile platform that generates AI-driven weekly diet plans from each user's personal profile and health goals. Features photo-based meal recognition, manual nutrition tracking, weight and body-measurement logging, and a memory-equipped chatbot. I designed and built the entire system end to end — backend API, admin web panel, and the React Native mobile client.",
  stack: [
    "Django 5.2",
    "DRF",
    "PostgreSQL",
    "SimpleJWT",
    "Google OAuth",
    "Gemini API",
    "PuLP (LP)",
    "React 18 + TS",
    "Vite",
    "Tailwind",
    "React Query",
    "Zustand",
    "Expo SDK 53",
    "React Native",
    "NativeWind",
    "i18next",
    "Railway",
    "EAS Build"
  ],
  highlights: [
    {
      title: "AI integration with hybrid optimisation",
      body: "Survey data + calorie goal + allergens + preferred cuisines flow into Gemini for meal selection, then PuLP linear programming locks in exact portion sizes. Photo-based meal recognition runs on Gemini Vision and auto-writes to the daily intake. A chatbot keeps long-term memory via a ConversationSummary model so it actually remembers the user."
    },
    {
      title: "Domain modelling & data integrity",
      body: "A 34-field central FoodItem model with six calorie-band max portions and five-tier cuisine classification. When a MealPlan is created, the underlying food data is snapshotted — past plans never break when the source catalog changes. Pre/post-save signals keep DailyIntake and ManualTrackingEntry transactionally in sync to prevent double-counting."
    },
    {
      title: "Resilient AI calling",
      body: "Four model strategies (Fast / Smart / Vision / Cheap fallback), rate-limit handling with retry-delay parsed straight out of Gemini error responses, and an automatic fallback to the cheap model when budgets squeeze. Retry and rate limiting are treated as business logic, not as exception handling."
    },
    {
      title: "Admin panel built for catalog operations",
      body: "7-tab food editor modal, 34-column CSV import/export with append / upsert / replace modes and row-level savepoints, and six analytics dashboards (user growth, BMI distribution, top foods, engagement, survey demographics, retention) loaded in parallel with useQueries."
    }
  ] satisfies ProjectHighlight[],
  metrics: [
    { label: "Repos", value: "3" },
    { label: "Food catalog", value: "~11,000" },
    { label: "Django apps", value: "8" },
    { label: "Mobile contexts", value: "15+" },
    { label: "Largest React page", value: "~2,100 LOC" },
    { label: "Languages", value: "TR / EN" }
  ] satisfies ProjectMetric[]
} as const;

export const skills: SkillGroup[] = [
  {
    name: "Software Development",
    pills: [
      { label: "Python & Django", level: "advanced" },
      { label: "HTML / CSS / JS", level: "advanced" },
      { label: "React", level: "intermediate" },
      { label: "PostgreSQL", level: "intermediate" },
      { label: "MATLAB, Visual Basic", level: "advanced" },
      { label: "Financial algorithms", level: "expert" }
    ]
  },
  {
    name: "Civil Engineering",
    pills: [
      { label: "AutoCAD", level: "upper-intermediate" },
      { label: "Excel + VBA", level: "expert" },
      { label: "SAP2000", level: "beginner-intermediate" },
      { label: "EPANET", level: "advanced" },
      { label: "MS Project", level: "intermediate" }
    ]
  },
  {
    name: "Graphic Design",
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
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Project" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" }
];
