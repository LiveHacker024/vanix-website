export interface VideoStoryStage {
  id: string;
  stepNumber: string;
  videoSrc: string;
  title: string;
  headline: string;
  subtitle: string;
  description: string;
  bullets: string[];
  companionImage?: string;
  companionImageAlt?: string;
  tag: string;
}

export const videoManifest = {
  hero: {
    src: "/videos/animation-01.mp4",
    title: "Offline Business to Digital Leader",
    alt: "Cinematic 3D animation of traditional business transitioning to digital",
  },
  transformation: {
    src: "/videos/animation-02.mp4",
    title: "Digital Transformation Pivot",
    alt: "3D animation of offline store entering the digital highway",
  },
  cta: {
    src: "/videos/animation-13.mp4",
    title: "Final VANIX Growth Engine Finale",
    alt: "High-end cinematic 3D VANIX gold logo and growth acceleration",
  },
};

export const growthJourneyStages: VideoStoryStage[] = [
  {
    id: "stage-01",
    stepNumber: "01",
    videoSrc: "/videos/animation-03.mp4",
    tag: "Digital Foundation",
    title: "Website Development",
    headline: "BUILD A DIGITAL FOUNDATION",
    subtitle: "High-performance websites designed around your business goals, customers, and conversions.",
    description:
      "Your website is your 24/7 digital flagship. We craft ultra-fast, bespoke web platforms engineered for brand authority, seamless user experience, and measurable business conversions.",
    bullets: [
      "Custom responsive architecture",
      "High conversion page psychology",
      "Instant loading speed & core web vitals",
      "Enterprise security & custom CMS",
    ],
    companionImage: "/images/vanix-02.png",
    companionImageAlt: "VANIX high-end custom web design on gold workstation",
  },
  {
    id: "stage-02",
    stepNumber: "02",
    videoSrc: "/videos/animation-04.mp4",
    tag: "Direct Selling",
    title: "E-Commerce Experience",
    headline: "TURN PRODUCTS INTO AN ONLINE BUSINESS",
    subtitle: "End-to-end e-commerce infrastructure engineered to capture, process, and scale transactions.",
    description:
      "Transform your physical inventory into a scalable direct-to-consumer store. We implement frictionless checkouts, secure payment gateways, inventory sync, and conversion recovery.",
    bullets: [
      "Zero-friction multi-payment checkout",
      "Real-time inventory synchronization",
      "Automated cart recovery funnels",
      "Optimized for high-volume mobile shoppers",
    ],
    companionImage: "/images/vanix-03.png",
    companionImageAlt: "E-commerce store on laptop with gold shopping cart and VANIX delivery boxes",
  },
  {
    id: "stage-03",
    stepNumber: "03",
    videoSrc: "/videos/animation-05.mp4",
    tag: "Omnichannel Reach",
    title: "Marketplace Dominance",
    headline: "BE WHERE YOUR CUSTOMERS ARE SEARCHING",
    subtitle: "Amazon, Meesho, IndiaMART product listing, optimization, and catalog management.",
    description:
      "Scale immediately across India's largest B2C and B2B marketplaces. We manage A+ product listings, keyword optimization, category ranking, and marketplace advertising to maximize orders.",
    bullets: [
      "Amazon, Meesho & IndiaMART listing setup",
      "High-converting 3D product imagery & A+ content",
      "Category ranking & keyword indexing",
      "Competitor price & stock intelligence",
    ],
    companionImage: "/images/vanix-04.png",
    companionImageAlt: "Professional product listing catalog and multi-angle product photography",
  },
  {
    id: "stage-04",
    stepNumber: "04",
    videoSrc: "/videos/animation-06.mp4",
    tag: "Local Discovery",
    title: "Google Business Profile & Local SEO",
    headline: "GET FOUND WHEN CUSTOMERS SEARCH LOCALLY",
    subtitle: "Dominate Google Maps, local search results, and high-intent nearby customer queries.",
    description:
      "When customers in your city search for your products or services, your business must appear at the top. We optimize Google Maps rankings, local citations, review engines, and geo-targeted keywords.",
    bullets: [
      "Google Business Profile verified optimization",
      "Google Maps 3-Pack rank acceleration",
      "Automated customer review generation system",
      "High-intent local keyword dominance",
    ],
    companionImage: "/images/vanix-05.png",
    companionImageAlt: "Google Business Profile and Google Maps search visibility on laptop and phone",
  },
  {
    id: "stage-05",
    stepNumber: "05",
    videoSrc: "/videos/animation-07.mp4",
    tag: "Brand Authority",
    title: "Social Media Management",
    headline: "BUILD A BRAND PEOPLE REMEMBER",
    subtitle: "Consistent, premium social presence that builds trust, community, and organic engagement.",
    description:
      "We design cohesive visual narratives and strategic content that establish your brand as the definitive authority in your industry across Instagram, Facebook, LinkedIn, and YouTube.",
    bullets: [
      "Cinematic brand storytelling & aesthetics",
      "Consistent high-production creative assets",
      "Audience engagement & community nurturing",
      "Cross-platform growth positioning",
    ],
    companionImage: "/images/vanix-01.png",
    companionImageAlt: "Offline retail brand entering digital social visibility",
  },
  {
    id: "stage-06",
    stepNumber: "06",
    videoSrc: "/videos/animation-08.mp4",
    tag: "Paid Acquisition",
    title: "Targeted Ads & WhatsApp Sales",
    headline: "TURN ATTENTION INTO CONVERSATIONS",
    subtitle: "Laser-targeted Google Ads & Meta Ads paired with high-converting direct WhatsApp checkout.",
    description:
      "Drive immediate high-intent buyers into your pipeline. We run hyper-targeted ad campaigns directly connected to WhatsApp for rapid 1-on-1 consultations, instant quotes, and sales closures.",
    bullets: [
      "Google Search, Performance Max & Meta ad campaigns",
      "Direct Click-to-WhatsApp automated funnels",
      "Cost-per-acquisition (CPA) minimization",
      "Continuous A/B creative & copy testing",
    ],
    companionImage: "/images/vanix-06.png",
    companionImageAlt: "Conversational WhatsApp order confirmation and instant product purchase",
  },
  {
    id: "stage-07",
    stepNumber: "07",
    videoSrc: "/videos/animation-09.mp4",
    tag: "Pipeline Engine",
    title: "Lead Generation & CRM",
    headline: "TURN DIGITAL ATTENTION INTO REAL LEADS",
    subtitle: "Predictable lead acquisition engines with automated qualification and CRM routing.",
    description:
      "Never miss a prospective client. We build high-converting landing pages, interactive lead capture forms, and automated qualification workflows that deliver sales-ready leads to your team.",
    bullets: [
      "High-converting dedicated landing pages",
      "Automated lead qualification scoring",
      "Instant SMS/WhatsApp/Email notifications to sales",
      "Centralized CRM integration & pipeline tracking",
    ],
    companionImage: "/images/vanix-07.png",
    companionImageAlt: "VANIX Qualified Lead holographic capture and automated pipeline routing",
  },
  {
    id: "stage-08",
    stepNumber: "08",
    videoSrc: "/videos/animation-10.mp4",
    tag: "Revenue Engine",
    title: "Sales Conversion & Closing",
    headline: "TURN LEADS INTO PAYING CUSTOMERS",
    subtitle: "Conversion-rate optimization, automated follow-ups, and frictionless sales closing.",
    description:
      "Capturing leads is only step one. We optimize every touchpoint in your sales funnel—from instant proposal delivery to automated follow-up cadences—maximizing conversion rates and closing deals faster.",
    bullets: [
      "Conversion Rate Optimization (CRO) audit",
      "Automated multi-channel follow-up sequences",
      "Frictionless digital invoicing & advance deposits",
      "Customer lifetime value (LTV) enhancement",
    ],
  },
  {
    id: "stage-09",
    stepNumber: "09",
    videoSrc: "/videos/animation-11.mp4",
    tag: "Fulfillment & Scale",
    title: "Shipping & Order Fulfillment",
    headline: "FROM ORDER PLACEMENT TO DOORSTEP DELIVERY",
    subtitle: "Streamlined shipping logistics integration, courier aggregation, and delivery tracking.",
    description:
      "Flawless post-purchase experience. We integrate top courier aggregators (Shiprocket, Delhivery, Bluedart), automated label generation, NDR management, and real-time customer tracking updates.",
    bullets: [
      "Courier aggregator integration & rate optimization",
      "Automated AWB generation & manifest creation",
      "Real-time WhatsApp & SMS order tracking links",
      "NDR (Non-Delivery Report) automated verification",
    ],
  },
  {
    id: "stage-10",
    stepNumber: "10",
    videoSrc: "/videos/animation-12.mp4",
    tag: "Data Intelligence",
    title: "Analytics & Growth Optimization",
    headline: "MEASURE. OPTIMIZE. SCALE.",
    subtitle: "Real-time performance dashboards tracking traffic, cost per lead, sales, and return on ad spend.",
    description:
      "Complete transparency into your digital growth numbers. We set up comprehensive tracking architectures to measure every rupee spent and every customer acquired, continuously refining your growth strategy.",
    bullets: [
      "Custom executive growth dashboard",
      "Google Analytics 4 & Meta Pixel server-side tracking",
      "ROAS, CPA, and customer acquisition cost tracking",
      "Weekly performance review & strategic optimization",
    ],
    companionImage: "/images/vanix-08.png",
    companionImageAlt: "VANIX executive analytics dashboard with live growth charts, leads, and orders",
  },
];
