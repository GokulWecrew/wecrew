export type InsightSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Insight = {
  slug: string;
  title: string;
  category: "Artificial Intelligence" | "Enterprise Software" | "DevOps & Cloud" | "Kubernetes" | "Cybersecurity" | "Digital Transformation" | "Technology Trends";
  excerpt: string;
  author: string; // WeCrew publishes under team attribution, not fabricated personas
  readingTime: number; // minutes, computed from content
  featured?: boolean;
  sections: InsightSection[];
};

export const insightCategories = [
  "All",
  "Artificial Intelligence",
  "Enterprise Software",
  "DevOps & Cloud",
  "Kubernetes",
  "Cybersecurity",
  "Digital Transformation",
  "Technology Trends",
] as const;

export const insights: Insight[] = [
  {
    slug: "taking-rag-systems-from-demo-to-production",
    title: "Taking RAG systems from demo to production",
    category: "Artificial Intelligence",
    excerpt:
      "Retrieval-augmented generation impresses in demos and fails in production for predictable reasons. Here is the checklist we use to close the gap.",
    author: "WeCrew Engineering",
    readingTime: 7,
    featured: true,
    sections: [
      {
        heading: "The demo–production gap",
        paragraphs: [
          "Almost every organization can now build a RAG demo in an afternoon: embed some documents, point a vector database at them, wire up an LLM, and the answers look impressive. The gap appears when real users with real questions start using it. Suddenly the answers are confidently wrong, the system can't see the document that mattered, and nobody can explain why.",
          "This gap is not a model problem. It is an engineering problem — and it is closable with the same discipline you would apply to any other production system.",
        ],
      },
      {
        heading: "What actually breaks",
        bullets: [
          "Fragmented knowledge: critical answers live in PDFs, tickets, wikis and people's heads. If only the PDFs were indexed, the system is blind where it matters most.",
          "No access control: the retrieval layer returns documents the asking user isn't allowed to see. In an enterprise, that's a compliance incident.",
          "Silent failures: retrieval returns stale or irrelevant chunks and the LLM papers over it with fluent prose. Without citation and evaluation, you can't tell.",
          "No feedback loop: users give up quietly, and the team never learns which questions fail.",
        ],
      },
      {
        heading: "The production checklist",
        bullets: [
          "Ground every answer in retrieved sources and cite them. Users check sources; that trust is the product.",
          "Enforce permissions at the retrieval layer, not the UI layer.",
          "Build an evaluation set of real questions with known-good answers before launch, and re-run it on every change.",
          "Log queries, retrieved sources and feedback. This telemetry drives your improvement roadmap.",
          "Deploy with the same rigor as any enterprise service — containers, health checks, audit logs, rollbacks.",
        ],
      },
      {
        heading: "Where to start",
        paragraphs: [
          "Pick one workflow where good answers have measurable value — support escalations, internal IT questions, sales enablement. Build the retrieval and evaluation foundation for that slice, prove the quality, then expand. This is exactly the path we took with WeCrew Copilot AI, our own enterprise knowledge copilot: start narrow, measure everything, earn the right to grow.",
        ],
      },
    ],
  },
  {
    slug: "kubernetes-in-production-what-actually-matters",
    title: "Kubernetes in production: what actually matters",
    category: "Kubernetes",
    excerpt:
      "Kubernetes succeeded as a platform the day it stopped being the project. The practices that decide success are less glamorous than the tooling.",
    author: "WeCrew Engineering",
    readingTime: 6,
    featured: true,
    sections: [
      {
        heading: "Kubernetes is a platform, not a project",
        paragraphs: [
          "A cluster that was installed is not a platform. A platform exists when your teams can deploy, observe, and recover services without learning Kubernetes internals — when the paved road is faster than the shortcut.",
          "In our own deployments, including the self-hosted Kubernetes environment running WeCrew Copilot AI, the difference between a fragile cluster and a boring one comes down to a handful of practices.",
        ],
      },
      {
        heading: "The practices that decide success",
        bullets: [
          "Everything as code: cluster configuration, workloads, ingress and secrets belong in version control. Hand-configured clusters drift; coded clusters can be rebuilt.",
          "Resource requests and limits on every workload: the single cheapest reliability upgrade. Without them, one noisy service can degrade a node.",
          "Health checks that test reality: liveness and readiness probes must reflect the dependencies that matter, or Kubernetes will happily route traffic to a broken service.",
          "Observability before optimization: metrics, logs and traces for every service. You cannot operate what you cannot see.",
          "A documented upgrade path: clusters, like dependencies, rot. Teams that rehearse upgrades fear them less.",
        ],
      },
      {
        heading: "When not to use Kubernetes",
        paragraphs: [
          "Kubernetes earns its complexity at a certain scale of services and teams. Below that, a single well-operated server or a small container host with a solid pipeline is often the more mature choice. We advise clients on the honest version of this trade-off — adopting Kubernetes because it suits the workload, not because it suits the résumé.",
        ],
      },
    ],
  },
  {
    slug: "api-security-is-application-security",
    title: "API security is application security",
    category: "Cybersecurity",
    excerpt:
      "APIs carry your business logic — which means your security posture is exactly as strong as your least-tested endpoint. A life-cycle approach beats a point-in-time scan.",
    author: "WeCrew Engineering",
    readingTime: 5,
    sections: [
      {
        heading: "Your attack surface is your API surface",
        paragraphs: [
          "Modern applications are constellations of APIs: internal microservices, partner integrations, mobile app backends, third-party webhooks. Each one exposes business logic to whoever can reach it. Traditional security reviews — a yearly penetration test and a firewall — were designed for a perimeter that no longer exists.",
        ],
      },
      {
        heading: "The three disciplines",
        bullets: [
          "Discovery: you cannot protect an API you don't know exists. Shadow APIs — old versions, forgotten endpoints, debug routes — are consistently where breaches begin. Maintain a live inventory, not a stale spreadsheet.",
          "Testing: scan continuously, not annually. Every schema change can introduce a broken authorization check; only regular, automated testing against your real traffic patterns catches it.",
          "Protection: enforce authentication, rate limiting and schema validation at runtime. Detect anomalous behavior — an API should know when it is being probed.",
        ],
      },
      {
        heading: "Full life cycle, not point-in-time",
        paragraphs: [
          "This is why we built WeCrew Sentinel as a full life cycle API security platform — discovery, testing and runtime protection treated as a continuous practice rather than a checklist item. Evidence before action; protection before breach.",
        ],
      },
    ],
  },
  {
    slug: "the-real-cost-of-spreadsheet-operations",
    title: "The real cost of running your business on spreadsheets",
    category: "Enterprise Software",
    excerpt:
      "Spreadsheets are excellent tools and dangerous systems of record. When they become core infrastructure, the costs compound quietly.",
    author: "WeCrew Engineering",
    readingTime: 5,
    sections: [
      {
        heading: "How it happens",
        paragraphs: [
          "No organization decides to run on spreadsheets. It happens one process at a time: a tracking sheet here, a reconciliation workbook there. Each is rational. Together, they form an undocumented system of record with no access control, no audit trail and no owner.",
        ],
      },
      {
        heading: "Where the cost shows up",
        bullets: [
          "Errors that need humans to catch: a mis-keyed figure in a shared workbook propagates silently into reports and decisions.",
          "Bottlenecks: the process only moves as fast as the person who knows the sheet's structure.",
          "Zero auditability: when a discrepancy appears weeks later, reconstructing what changed is archaeology.",
          "Compounding integration debt: every script that reads or writes these files adds fragility that eventually blocks real systems.",
        ],
      },
      {
        heading: "The pragmatic path off spreadsheets",
        paragraphs: [
          "You don't need a big-bang ERP migration. Start with the highest-friction workflow, build a purpose-fit application around it — with validation, permissions and audit trails — and integrate it with adjacent tools. WeCrew's custom software practice is built around exactly this: targeted systems that retire the riskiest spreadsheets first and pay for themselves in reduced error and rework.",
        ],
      },
    ],
  },
  {
    slug: "ci-cd-is-a-culture-before-it-is-a-pipeline",
    title: "CI/CD is a culture before it is a pipeline",
    category: "DevOps & Cloud",
    excerpt:
      "Tooling is the easy part of continuous delivery. The hard part is the team agreement that small, reversible changes are how everyone works.",
    author: "WeCrew Engineering",
    readingTime: 5,
    sections: [
      {
        heading: "The pipeline is the visible 20%",
        paragraphs: [
          "Most CI/CD discussions are about tools. But a pipeline only automates a decision the team has already made: that small, frequent, reversible changes are the normal way to work. Without that agreement, teams build a beautiful pipeline and then batch weeks of changes into one risky release that bypasses it in a crisis.",
        ],
      },
      {
        heading: "What the culture requires",
        bullets: [
          "Small changes by default: features ship dark, behind flags, in increments that can be reviewed in minutes.",
          "Automated tests as a shared contract: the suite defines what 'works' means, and everyone trusts it.",
          "Fast feedback: if the pipeline takes an hour, engineers batch. Keep the loop under ten minutes and behavior changes.",
          "Trunk-based flow: long-lived branches are where integration risk breeds.",
          "Blameless post-incident review: every deployment failure is data, not a disciplinary event.",
        ],
      },
      {
        heading: "How we implement it",
        paragraphs: [
          "When we set up CI/CD for clients, we spend as much time on working agreements — branch policy, review SLAs, release checkpoints — as on pipeline configuration. The technology we deploy (build automation, automated tests, environment promotion, rollback) is chosen to make the right behavior the easy behavior.",
        ],
      },
    ],
  },
  {
    slug: "digital-transformation-without-the-buzzword",
    title: "Digital transformation, without the buzzword",
    category: "Digital Transformation",
    excerpt:
      "Real transformation is a sequence of boring, well-engineered improvements. Here is how to sequence them so each one funds the next.",
    author: "WeCrew Engineering",
    readingTime: 6,
    sections: [
      {
        heading: "Transformation is a sequence, not a slogan",
        paragraphs: [
          "The word has been used so loosely that it has lost meaning. Strip it back and transformation means: your business runs on systems that are automated where repetition occurs, measured where it matters, and integrated so data flows without manual re-entry.",
        ],
      },
      {
        heading: "A sequence that works",
        bullets: [
          "Stabilize: make the current systems reliable and observable. Transformation on top of fragility collapses.",
          "Digitize the paper: get the core processes — orders, approvals, records — into systems with validation and audit trails.",
          "Integrate: connect the systems so data enters once and flows everywhere. This is where most of the efficiency lives.",
          "Automate: with clean data and connected systems, automate the repetitive decisions and handoffs.",
          "Intelligence last: AI on top of fragmented, unreliable data produces confident nonsense. AI on top of clean, governed data produces leverage.",
        ],
      },
      {
        heading: "Funding the flywheel",
        paragraphs: [
          "Each step should pay for the next: the workflow system saves hours, the integration saves errors, the automation saves headcount drag, and the AI layer — built on that foundation — delivers insight no spreadsheet ever could. WeCrew's engagement model is built to work this way: start where the value is provable, then compound.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export function relatedInsights(slug: string, count = 3) {
  const current = getInsight(slug);
  if (!current) return insights.slice(0, count);
  const sameCategory = insights.filter(
    (i) => i.slug !== slug && i.category === current.category
  );
  const others = insights.filter(
    (i) => i.slug !== slug && i.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, count);
}
