export interface ProcessStep {
  step: string;
  title: string;
  phase: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    phase: "AUDIT & DISCOVER",
    title: "Deep Business Discovery",
    description: "We analyze your offline business model, customer demographics, competitor presence, product margins, and existing sales process to define the optimal digital growth path.",
    deliverables: ["Competitor & Market Landscape", "Ideal Customer Profile (ICP)", "Custom Digital Roadmap", "Revenue Target Alignment"],
  },
  {
    step: "02",
    phase: "BUILD & ASSEMBLE",
    title: "Digital Infrastructure Foundation",
    description: "We engineer your bespoke digital assets: luxury responsive website, e-commerce store, multi-marketplace catalogs, Google profile, and tracking pixels.",
    deliverables: ["Bespoke Web / Store Platform", "Amazon / IndiaMART Listing", "Local Maps Verification", "Full Tracking Setup"],
  },
  {
    step: "03",
    phase: "LAUNCH & CONNECT",
    title: "Omnichannel Channel Activation",
    description: "We connect your business to digital demand channels: high-intent Google Search, Meta Ads, and automated Click-to-WhatsApp direct checkout funnels.",
    deliverables: ["Targeted Ad Campaigns Live", "WhatsApp Catalog Funnels", "Social Proof Integration", "Lead Notification Routing"],
  },
  {
    step: "04",
    phase: "CONVERT & OPTIMIZE",
    title: "Lead Capture & Sales Velocity",
    description: "We turn incoming attention into qualified leads and direct sales orders through dedicated landing pages, automated follow-ups, and conversion rate optimization.",
    deliverables: ["Qualified Lead Inquiries", "Automated SMS/WhatsApp Alerts", "Sales Funnel Tuning", "A/B Testing Adjustments"],
  },
  {
    step: "05",
    phase: "SCALE & DOMINATE",
    title: "Analytics & Predictable Scaling",
    description: "Using real-time performance analytics, we double down on the highest-ROI channels, expand product listings, and scale revenue predictably.",
    deliverables: ["Live Executive Dashboards", "ROAS & LTV Optimization", "Expansion into New Markets", "Ongoing Technology Maintenance"],
  },
];

export const growthEngineNodes = [
  {
    id: "visibility",
    title: "VISIBILITY",
    subtitle: "Google Maps, Local SEO & Social",
    description: "Get discovered the moment high-intent buyers search for what you offer.",
    icon: "Eye",
  },
  {
    id: "traffic",
    title: "TRAFFIC",
    subtitle: "Paid Ads & Organic Discovery",
    description: "Drive qualified visitors from Google, Meta, and Marketplaces directly to your digital doors.",
    icon: "TrendingUp",
  },
  {
    id: "leads",
    title: "LEADS",
    subtitle: "WhatsApp, Inquiries & Forms",
    description: "Capture verified customer contacts with automated qualification and zero friction.",
    icon: "Users",
  },
  {
    id: "sales",
    title: "SALES",
    subtitle: "Direct Orders & Closures",
    description: "Turn conversations and store visits into confirmed payments and recurring clients.",
    icon: "CreditCard",
  },
  {
    id: "data",
    title: "DATA",
    subtitle: "Live Analytics & Attribution",
    description: "Track every rupee and customer touchpoint to pinpoint what drives profit.",
    icon: "BarChart3",
  },
  {
    id: "growth",
    title: "GROWTH",
    subtitle: "Predictable Scaling Engine",
    description: "Reinvest with confidence, expand reach, and build a lasting market leader.",
    icon: "Sparkles",
  },
];

export const whyVanixPillars = [
  {
    number: "01",
    title: "One Integrated Growth Partner",
    description: "No more juggling multiple disconnected freelancers for web, ads, SEO, and listings. VANIX unifies your entire digital ecosystem under one cohesive strategic roof.",
  },
  {
    number: "02",
    title: "Tailored for Traditional Businesses",
    description: "We understand offline business realities: inventory cycles, local customer trust, wholesale dynamics, and direct phone/WhatsApp transactions.",
  },
  {
    number: "03",
    title: "Modern Digital Infrastructure",
    description: "We deploy enterprise-grade, lightning-fast web technologies, modern aesthetic design systems, and rock-solid conversion engineering.",
  },
  {
    number: "04",
    title: "Multi-Marketplace Expansion",
    description: "From Amazon and Meesho to IndiaMART B2B catalogs, we place your products directly in front of active buyers with high purchase intent.",
  },
  {
    number: "05",
    title: "Local Search Dominance",
    description: "Capture nearby footfall and inquiries with Google Maps 3-Pack optimization, geotagged content, and automated review acquisition.",
  },
  {
    number: "06",
    title: "High-Converting WhatsApp Commerce",
    description: "Harness the power of WhatsApp for instant quotation, product catalogs, automated order confirmations, and rapid customer closing.",
  },
  {
    number: "07",
    title: "Predictable Lead Systems",
    description: "Custom lead funnels filter out tire-kickers and deliver pre-qualified prospects directly to your sales team with automated alerts.",
  },
  {
    number: "08",
    title: "Analytics & Data-Driven Strategy",
    description: "Transparent, real-time reporting dashboards give you complete clarity on revenue generated, cost per acquisition, and growth velocity.",
  },
];
