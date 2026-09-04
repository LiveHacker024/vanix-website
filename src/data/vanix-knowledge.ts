/**
 * VANIX Controlled Verified Business Knowledge Base
 * 
 * IMPORTANT GUARDRAIL:
 * The AI Assistant MUST ONLY answer based on the facts provided in this repository.
 * It must NEVER invent custom pricing, discounts, guarantees, or delivery times.
 */

export interface KnowledgeService {
  name: string;
  category: string;
  description: string;
  deliverables: string[];
}

export const vanixKnowledge = {
  businessName: "VANIX",
  tagline: "Digital Growth Partner",
  legalName: "VANIX Digital Growth Solutions",
  mission:
    "VANIX transforms traditional and offline businesses into dominant digital growth engines through bespoke websites, e-commerce, multi-marketplace dominance, local SEO, targeted advertising, WhatsApp commerce funnels, and automated conversion systems.",
  location: "Shamli, Uttar Pradesh - 247776, India",
  directPhone: "+91 9457727770",
  directEmail: "hackwithkunal@gmail.com",
  founder: {
    name: "Kunal Rajput",
    title: "Founder & Lead Technologist",
    bio: "Kunal Rajput is a Junior Penetration Tester and B.Tech CSE student specializing in Web, API, and Android security with experience in VAPT and security testing. He is also the creator behind HackWithKunal on YouTube.",
  },
  supportedIndustries: [
    "Retail & Boutique Stores",
    "Manufacturers & Factories",
    "Wholesalers & Distributors",
    "Local Service Providers",
    "D2C Brands & Creators",
    "Professional Firms & Clinics",
    "Traditional & Offline Family Businesses",
  ],
  services: [
    {
      name: "Website Development",
      category: "Foundation",
      description: "Bespoke, fast responsive websites engineered for brand authority and lead conversion.",
      deliverables: ["Custom UI/UX Design", "Mobile-first Responsive Architecture", "Speed Optimization", "CMS Integration"],
    },
    {
      name: "E-Commerce Website",
      category: "Foundation",
      description: "Full-scale direct-to-consumer online stores with secure checkouts and inventory management.",
      deliverables: ["Payment Gateway Setup", "Cart Abandonment Funnels", "Product Variations & Inventory", "Order Management Dashboard"],
    },
    {
      name: "Product Listing & Cataloging",
      category: "Discovery",
      description: "High-converting product listings with rich copywriting, A+ content, and search indexing.",
      deliverables: ["A+ Content & Infographics", "SKU & Variation Architecture", "Attribute Optimization", "Keyword-Rich Descriptions"],
    },
    {
      name: "Amazon, Meesho & IndiaMART",
      category: "Discovery",
      description: "Multi-marketplace onboarding, brand registry, listing optimization, and B2B/B2C sales pipeline management.",
      deliverables: ["Seller Account Setup & Verification", "Amazon Brand Registry & A+ Pages", "Meesho Catalog Launch", "IndiaMART Verified Lead Pipeline"],
    },
    {
      name: "Google Business Profile",
      category: "Discovery",
      description: "Verified Google Business Profile setup, optimization, and local map pack dominance.",
      deliverables: ["Profile Verification & Optimization", "Google Maps 3-Pack Strategy", "Automated Review Engine", "Weekly Posts & Catalog Updates"],
    },
    {
      name: "Local SEO & Geo-Targeting",
      category: "Discovery",
      description: "Targeted local search engine optimization to capture high-intent buyers in your city.",
      deliverables: ["Local Directory Citations", "City-Specific Landing Pages", "Local Schema Markup", "Keyword Rank Tracking"],
    },
    {
      name: "Social Media Management",
      category: "Acquisition",
      description: "Premium visual storytelling and brand building across Instagram, Facebook, and LinkedIn.",
      deliverables: ["High-Production Content Creation", "Brand Guidelines & Visual System", "Reels & Short-Form Video Strategy", "Community & Comment Management"],
    },
    {
      name: "Google Ads (Search & Performance Max)",
      category: "Acquisition",
      description: "High-intent paid search campaigns delivering qualified inquiries from customers ready to buy.",
      deliverables: ["Keyword Intent Research", "Ad Copywriting & A/B Testing", "Conversion Tracking Setup", "Continuous Bid & Negative Optimization"],
    },
    {
      name: "Meta Ads (Instagram & Facebook)",
      category: "Acquisition",
      description: "Targeted demographic and interest campaigns that generate consistent demand and WhatsApp conversations.",
      deliverables: ["Audience Targeting & Retargeting", "Creative Video & Image Ad Production", "Server-Side CAPI Tracking", "ROAS Optimization"],
    },
    {
      name: "WhatsApp Sales & Commerce",
      category: "Acquisition",
      description: "Direct Click-to-WhatsApp funnels and automated catalogs for instant customer conversions.",
      deliverables: ["WhatsApp Business API Setup", "Direct Click-to-WhatsApp Ads", "Automated Catalog & Fast Replies", "Broadcast & Follow-up Workflows"],
    },
    {
      name: "Lead Generation & CRM Automation",
      category: "Operations",
      description: "Automated qualification funnels and CRM routing that deliver warm, verified inquiries directly to your phone.",
      deliverables: ["High-Converting Landing Pages", "Lead Qualification Scoring", "Instant SMS/WhatsApp Alerts", "CRM Pipeline Setup"],
    },
    {
      name: "Analytics & Growth Reporting",
      category: "Operations",
      description: "Crystal-clear reporting dashboards tracking traffic, inquiries, return on ad spend, and net acquisition cost.",
      deliverables: ["Custom Live Dashboard", "GA4 & Server-Side Event Tracking", "Monthly Executive Reviews", "Attribution & ROAS Audits"],
    },
    {
      name: "Online Growth Strategy",
      category: "Strategy",
      description: "Holistic digital roadmap connecting branding, channels, pricing, and scaling mechanics for traditional businesses.",
      deliverables: ["Competitive Market Analysis", "Multi-Channel Growth Roadmap", "Pricing & Offer Strategy", "Quarterly Expansion Milestones"],
    },
    {
      name: "Technical & Marketing Support",
      category: "Strategy",
      description: "Dedicated technical and creative support to keep all digital growth engines operating at peak performance.",
      deliverables: ["24/7 Uptime & Security Monitoring", "Regular Content & Listing Updates", "Dedicated Growth Manager", "Priority Technical Troubleshooting"],
    },
  ] as KnowledgeService[],
  process: [
    "Phase 1: Deep Discovery & Product Audit",
    "Phase 2: Digital Foundation & Architecture Setup",
    "Phase 3: Cataloging & Search Optimization",
    "Phase 4: Multi-Channel Traffic & Paid Acquisition",
    "Phase 5: Automated Funnels, Conversion & Ongoing Scale",
  ],
  aiGuardrails: {
    prohibitedActions: [
      "Never invent exact custom package pricing without human strategy review.",
      "Never promise guaranteed sales volumes, revenue figures, or unrealistic delivery timelines.",
      "Never create policies, contracts, or discounts.",
      "Always offer to connect with human strategy team when customer requests human or custom quotation.",
    ],
  },
};
