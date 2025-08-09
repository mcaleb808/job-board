const JOBS = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Acme Labs",
    type: "full-time",
    location: "Kigali, RW",
    salaryRange: "$1,500–$2,500",
    tags: ["react", "nextjs"],
    createdAt: "2025-07-20",
    description:
      "Build sleek UIs with React/Next.js. Work with designers and backend team.",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataBridge",
    type: "contract",
    location: "Remote",
    salaryRange: "$2,000–$3,000",
    tags: ["node", "api"],
    createdAt: "2025-07-18",
    description:
      "Own APIs, performance and reliability. Node.js and databases.",
  },
  {
    id: "3",
    title: "Full-Stack Dev",
    company: "Nimbus",
    type: "part-time",
    location: "Kigali, RW",
    salaryRange: "$1,000–$1,800",
    tags: ["react", "node"],
    createdAt: "2025-07-10",
    description: "Ship features end-to-end on a small, fast team.",
  },
  {
    id: "4",
    title: "UI Engineer",
    company: "Bloom",
    type: "full-time",
    location: "Remote",
    salaryRange: "$1,800–$2,800",
    tags: ["css", "accessibility"],
    createdAt: "2025-06-29",
    description: "Own design systems and accessibility across the app.",
  },
  {
    id: "5",
    title: "React Native Dev",
    company: "MoveIt",
    type: "full-time",
    location: "Hybrid — Kigali",
    salaryRange: "$1,600–$2,600",
    tags: ["react-native"],
    createdAt: "2025-06-25",
    description: "Build mobile features and iterate quickly with product.",
  },
  {
    id: "6",
    title: "QA Engineer",
    company: "SoftSure",
    type: "contract",
    location: "Remote",
    salaryRange: "$1,200–$1,900",
    tags: ["testing", "playwright"],
    createdAt: "2025-06-20",
    description: "Automate E2E tests, CI health, and reliability metrics.",
  },
  {
    id: "7",
    title: "DevOps Engineer",
    company: "InfraOne",
    type: "full-time",
    location: "Remote",
    salaryRange: "$2,500–$3,500",
    tags: ["aws", "k8s"],
    createdAt: "2025-06-10",
    description: "Own deployments and observability with IaC.",
  },
  {
    id: "8",
    title: "Product Designer",
    company: "Mint",
    type: "full-time",
    location: "Kigali, RW",
    salaryRange: "$1,400–$2,200",
    tags: ["figma", "ux"],
    createdAt: "2025-06-09",
    description:
      "Design elegant, accessible flows in close partnership with eng.",
  },
  {
    id: "9",
    title: "Support Engineer",
    company: "CareFlow",
    type: "part-time",
    location: "Remote",
    salaryRange: "$800–$1,200",
    tags: ["customer", "triage"],
    createdAt: "2025-06-05",
    description: "Help users succeed, triage issues, write docs.",
  },
  {
    id: "10",
    title: "Data Engineer",
    company: "Grain",
    type: "full-time",
    location: "Remote",
    salaryRange: "$2,000–$3,200",
    tags: ["etl", "python"],
    createdAt: "2025-06-01",
    description: "Pipelines, warehousing, performance tuning.",
  },
  {
    id: "11",
    title: "Security Engineer",
    company: "Shield",
    type: "full-time",
    location: "Remote",
    salaryRange: "$2,500–$3,800",
    tags: ["appsec"],
    createdAt: "2025-05-28",
    description: "Lead secure SDLC practices and reviews.",
  },
  {
    id: "12",
    title: "Technical Writer",
    company: "Docsly",
    type: "contract",
    location: "Remote",
    salaryRange: "$1,000–$1,800",
    tags: ["docs"],
    createdAt: "2025-05-20",
    description: "Write crisp documentation and guides.",
  },
];

export function listJobs({ q = "", type = "all", page = 1, pageSize = 8 }) {
  const norm = (s) => s.toLowerCase();
  let filtered = JOBS;
  if (q) {
    const n = norm(q);
    filtered = filtered.filter(
      (j) =>
        norm(j.title).includes(n) ||
        norm(j.company).includes(n) ||
        j.tags.some((t) => norm(t).includes(n))
    );
  }
  if (type && type !== "all")
    filtered = filtered.filter((j) => j.type === type);
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  return { items, total, page, pageSize };
}

export function getJob(id) {
  return JOBS.find((j) => j.id === id) || null;
}
