export type ServiceCategory = "FOUNDATION" | "VISIBILITY" | "ACQUISITION" | "OPERATIONS" | "STRATEGY";

export interface DeliverableItem {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface KpiItem {
  label: string;
  context: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  heroTitle: {
    main: string;
    goldHighlight: string;
  };
  heroDescription: string;
  problem: {
    heading: string;
    description: string;
    points: string[];
  };
  deliverables: string[];
  detailedDeliverables: DeliverableItem[];
  techStack: string[];
  process: ProcessStep[];
  kpis: KpiItem[];
  kpiDisclaimer?: string;
  faqs: [FaqItem, FaqItem, FaqItem, FaqItem];
  seoTitle: string;
  seoDescription: string;
  relatedSlugs: string[];
  iconName: string;
  accentImage?: string;
  videoLinkIndex?: number;
}

export const servicesData: ServiceItem[] = [
  // 1. WEBSITE DEVELOPMENT
  {
    id: "website-development",
    slug: "website-development",
    number: "01",
    title: "Website Development",
    category: "FOUNDATION",
    shortDescription: "Bespoke, high-performance responsive websites engineered for brand authority and lead conversion.",
    fullDescription: "We build custom, modern web applications tailored specifically to showcase your offline business, establish unmatched trust, and guide visitors seamlessly toward becoming paying customers.",
    heroTitle: {
      main: "Website Development",
      goldHighlight: "for Offline to Online Growth",
    },
    heroDescription: "Transform your offline business reputation into an authoritative digital presence. We engineer ultra-fast, mobile-first websites designed to capture high-intent inquiries and build long-term brand credibility.",
    problem: {
      heading: "The Cost of Remaining an Offline-Only Business",
      description: "When a traditional business relies exclusively on physical footfall and word-of-mouth, it leaves massive commercial opportunities on the table every single day.",
      points: [
        "Prospective clients cannot research your credentials, past work, or catalog outside standard business hours.",
        "Zero digital proof or authority when offline referrals search for your business name on Google.",
        "Inability to run targeted search or social ad campaigns that require high-converting landing pages.",
        "Competitors with modern, mobile-responsive websites capture high-intent customers who search online first.",
      ],
    },
    deliverables: [
      "Custom UI/UX Architecture",
      "Mobile-First Responsive Engineering",
      "Lead & WhatsApp Conversion Funnels",
      "Core Web Vitals & Speed Optimization",
      "SEO-Ready On-Page Structure",
      "Secure Deployment & Hosting Setup",
    ],
    detailedDeliverables: [
      {
        title: "Custom UI/UX Architecture",
        description: "Bespoke visual layouts crafted specifically for your industry, ensuring high brand trust, intuitive navigation, and effortless readability across all devices.",
      },
      {
        title: "Mobile-First Responsive Engineering",
        description: "Flawless rendering and touch-optimized navigation engineered for smartphones, tablets, laptops, and ultra-wide desktop monitors.",
      },
      {
        title: "Lead & WhatsApp Conversion Funnels",
        description: "Direct click-to-WhatsApp triggers, interactive consultation forms, and instant notification pipelines that turn visitors into verified inquiries.",
      },
      {
        title: "Core Web Vitals & Speed Optimization",
        description: "Sub-second visual load times utilizing modern server-rendering, image compression, script optimization, and lightweight asset bundling.",
      },
      {
        title: "SEO-Ready On-Page Structure",
        description: "Semantic HTML5 markup hierarchy, Schema.org Organization metadata, dynamic XML sitemaps, and Open Graph sharing previews.",
      },
      {
        title: "Secure Deployment & Cloud Infrastructure",
        description: "HTTPS SSL encryption, automated CDN caching, anti-tamper security headers, DNS configuration, and 24/7 uptime monitoring.",
      },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Schema.org"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We analyze your offline business strengths, target customer personas, competitor benchmarks, and core service offerings.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We design brand-aligned wireframes, craft persuasive conversion copy, and configure clean technical layout components.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We write clean, semantic code, integrate lead capture mechanisms, test Core Web Vitals across viewports, and deploy live.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We monitor user interactions, mobile page speeds, and inquiry pathways to continuously maximize form completion rates.",
      },
    ],
    kpis: [
      { label: "Inquiry Conversion Rate", context: "Percentage of unique website visitors who submit a lead form or start a WhatsApp chat." },
      { label: "Core Web Vitals Score", context: "Google Lighthouse performance metrics ensuring sub-second Largest Contentful Paint (LCP)." },
      { label: "Mobile Engagement Rate", context: "Session duration and interaction depth on handheld smartphones and tablets." },
      { label: "Search Engine Indexing", context: "Speed and depth of Google indexing for core service pages and localized metadata." },
    ],
    kpiDisclaimer: "Expected growth metrics depend on market competition, brand search volume, traffic quality, and business response speed. VANIX focuses on structural excellence and conversion readiness.",
    faqs: [
      {
        question: "How long does it take to design and launch a custom business website?",
        answer: "Most custom business websites are designed, developed, tested, and deployed within 2 to 4 weeks, depending on the scope of deliverables and content readiness.",
      },
      {
        question: "Will my website be fully optimized for mobile devices and tablets?",
        answer: "Yes. Every website is built mobile-first, ensuring smooth responsive layouts, touch-friendly navigation, and fast loading across all screen sizes from 320px smartphones to 4K desktops.",
      },
      {
        question: "Can the website connect directly to our WhatsApp and internal CRM?",
        answer: "Yes. We integrate one-click WhatsApp chat triggers, direct inquiry modals, and webhook/email routing so leads reach your team immediately without manual data entry.",
      },
      {
        question: "Is on-page SEO included with website development?",
        answer: "Yes. We implement semantic HTML5 structure, Open Graph metadata, Schema.org JSON-LD markup, XML sitemaps, and optimized page speed to ensure search engines can index your site effectively.",
      },
    ],
    seoTitle: "Website Development for Offline to Online Growth | VANIX",
    seoDescription: "Custom, ultra-fast responsive website development for Indian businesses. Turn offline footfall into continuous online inquiries with conversion-focused design.",
    relatedSlugs: ["ecommerce-website", "google-business-profile", "local-seo-geotargeting", "lead-generation-crm"],
    iconName: "Globe",
    accentImage: "/images/vanix-02.png",
  },

  // 2. E-COMMERCE WEBSITE
  {
    id: "ecommerce-website",
    slug: "ecommerce-website",
    number: "02",
    title: "E-Commerce Website",
    category: "FOUNDATION",
    shortDescription: "Full-scale direct-to-consumer online stores equipped with secure checkouts, payment gateways, and inventory sync.",
    fullDescription: "Take your retail or wholesale catalog online with a high-conversion e-commerce platform equipped with automated tax calculations, payment gateway integrations, and instant checkout.",
    heroTitle: {
      main: "E-Commerce Website",
      goldHighlight: "for Direct-to-Consumer Scale",
    },
    heroDescription: "Expand your retail store or wholesale catalog into an automated 24/7 digital storefront with fast checkout, multi-payment options, inventory controls, and order management.",
    problem: {
      heading: "The Limits of Physical Retail & Manual Orders",
      description: "Operating purely through a physical storefront or taking manual orders over personal messaging creates severe operational friction.",
      points: [
        "Store sales are strictly limited by physical geographic footfall and local operating hours.",
        "Manual order taking over phone or chat leads to inventory confusion, stock errors, and billing delays.",
        "High commission fees eat into profitability when selling exclusively through third-party food or retail aggregators.",
        "Inability to capture repeat customer data and build a valuable, independent direct-to-consumer brand database.",
      ],
    },
    deliverables: [
      "Custom Storefront & Product Showcase",
      "Secure Multi-Payment Gateway Setup",
      "Structured SKU & Inventory Management",
      "Streamlined 1-Page Checkout Funnel",
      "Automated Order & Shipping Tracking",
      "Mobile Cart Abandonment Protections",
    ],
    detailedDeliverables: [
      {
        title: "Custom Storefront & Product Showcase",
        description: "Brand-first shopping experience with category filtering, product variation selectors, and mobile-first product detail layouts.",
      },
      {
        title: "Secure Multi-Payment Gateway Setup",
        description: "Seamless integration with Razorpay, Cashfree, and PhonePe supporting UPI, credit/debit cards, net banking, and EMI options.",
      },
      {
        title: "Structured SKU & Inventory Management",
        description: "Organized product architecture supporting sizes, colors, weights, automated out-of-stock badges, and real-time inventory adjustments.",
      },
      {
        title: "Streamlined 1-Page Checkout Funnel",
        description: "High-speed checkout flow designed to minimize form friction, prevent cart drop-offs, and capture verified customer contact info.",
      },
      {
        title: "Automated Order & Shipping Tracking",
        description: "Automated invoice generation, email/SMS order confirmations, and logistics integration with Shiprocket/Delhivery tracking.",
      },
      {
        title: "Mobile Cart Abandonment Protections",
        description: "Automated reminder workflows and saved cart states to recover prospective buyers who step away before payment.",
      },
    ],
    techStack: ["Next.js", "Shopify / WooCommerce", "PostgreSQL", "Razorpay", "Tailwind CSS"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We review your product margins, shipping constraints, SKU volume, payment needs, and target buyer demographics.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We configure category structures, product detail cards, checkout funnels, and payment gateway webhooks.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We conduct end-to-end sandbox transaction testing, tax calculation QA, mobile responsiveness checks, and launch.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We analyze cart drop-off points, optimize product photography display, and refine checkout ergonomics for higher conversion.",
      },
    ],
    kpis: [
      { label: "Checkout Completion Rate", context: "Ratio of started checkouts that successfully complete payment." },
      { label: "Add-to-Cart Conversion", context: "Percentage of product page views that result in an item added to cart." },
      { label: "Average Order Value (AOV)", context: "Mean transaction size driven by product bundles and cross-sells." },
      { label: "Mobile Checkout Speed", context: "Time required to navigate from product page to payment confirmation on mobile." },
    ],
    kpiDisclaimer: "E-commerce performance is influenced by product demand, pricing competitiveness, shipping rates, and ad spend. VANIX delivers an optimized transactional foundation.",
    faqs: [
      {
        question: "Can customers pay via UPI, Credit Cards, and Net Banking on our store?",
        answer: "Yes. We integrate leading Indian payment gateways supporting UPI (Google Pay, PhonePe, Paytm, BHIM), credit/debit cards, and net banking with instant settlement.",
      },
      {
        question: "How do we manage product stock and variations (sizes/colors)?",
        answer: "You receive an intuitive backend dashboard where you can update stock counts, add variations, modify pricing, and track orders in real time.",
      },
      {
        question: "Can our e-commerce store handle thousands of products?",
        answer: "Yes. Our architecture is built to support extensive product catalogs with structured database queries, image optimization, and fast category filtering.",
      },
      {
        question: "Can we integrate automated shipping and courier tracking?",
        answer: "Yes. We connect your store with Indian logistics aggregators (like Shiprocket and Delhivery) for automated shipping label generation and customer tracking notifications.",
      },
    ],
    seoTitle: "E-Commerce Website Development for Online Sales | VANIX",
    seoDescription: "Build a high-conversion direct-to-consumer e-commerce store with UPI payment gateways, automated inventory, and fast mobile checkouts tailored for Indian businesses.",
    relatedSlugs: ["website-development", "product-listing-cataloging", "amazon-meesho-indiamart", "whatsapp-sales-commerce"],
    iconName: "ShoppingCart",
    accentImage: "/images/vanix-03.png",
  },

  // 3. PRODUCT LISTING & CATALOGING
  {
    id: "product-listing-cataloging",
    slug: "product-listing-cataloging",
    number: "03",
    title: "Product Listing & Cataloging",
    category: "OPERATIONS",
    shortDescription: "High-converting product cataloging with benefit-driven copywriting, A+ content architecture, and search indexing.",
    fullDescription: "Showcase your physical products with professional photography, benefit-driven copywriting, SEO-rich titles, and category tagging that captures shopper intent.",
    heroTitle: {
      main: "Product Listing & Cataloging",
      goldHighlight: "for High-Conversion Discovery",
    },
    heroDescription: "Transform raw product specifications into compelling, SEO-indexed digital listings that answer buyer questions, build purchasing confidence, and minimize customer returns.",
    problem: {
      heading: "The Danger of Poor Product Presentations",
      description: "Unstructured, low-information product listings cause prospective buyers to hesitate and look for alternatives.",
      points: [
        "Sparse descriptions and low-resolution photos cause high return rates and customer hesitation.",
        "Unstructured catalog data prevents search engines and marketplace algorithms from indexing your items.",
        "Inconsistent categorization causes buyers to miss matching products in search results.",
        "High customer support workload answering basic dimension, material, and compatibility questions repeatedly.",
      ],
    },
    deliverables: [
      "Benefit-Driven Sales Copywriting",
      "A+ Visual Content Architecture",
      "Precision Category & Attribute Tagging",
      "High-Resolution Visual Staging Guidelines",
      "Bulk Catalog Data Sheet Preparation",
      "Search Term & Keyword Indexing",
    ],
    detailedDeliverables: [
      {
        title: "Benefit-Driven Sales Copywriting",
        description: "Clear, persuasive titles, bullet points, and specification summaries written for search intent, readability, and purchasing confidence.",
      },
      {
        title: "A+ Visual Content Architecture",
        description: "Structured graphic layouts, comparison tables, and infographic-style feature breakdowns that highlight product benefits visually.",
      },
      {
        title: "Precision Category & Attribute Tagging",
        description: "Accurate mapping of product attributes, dimensions, materials, and backend search keywords to match shopper search queries.",
      },
      {
        title: "High-Resolution Visual Staging Guidelines",
        description: "Standardized photo staging, angle requirements, and dimensional callout diagrams to ensure clean, professional presentation.",
      },
      {
        title: "Bulk Catalog Data Sheet Preparation",
        description: "Organized CSV/data sheet architecture for rapid multi-channel upload across websites and marketplace seller panels.",
      },
      {
        title: "Search Term & Keyword Indexing",
        description: "Integration of high-volume buyer search terms into product descriptions without unnatural keyword stuffing.",
      },
    ],
    techStack: ["Adobe Creative Suite", "Canva Pro", "Excel/CSV Automation", "Marketplace Catalog APIs"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We audit existing product assets, specifications, certifications, and target customer search queries.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We write search-optimized copy and produce structured infographic callouts and comparison charts.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We validate data integrity against marketplace/platform specifications and publish verified listings.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We track search impression keywords and adjust copy, attributes, and tags for improved discovery.",
      },
    ],
    kpis: [
      { label: "Listing Quality Score", context: "Completeness of attributes, images, bullet points, and backend search terms." },
      { label: "Search Impression Rate", context: "Frequency with which catalog listings appear for relevant buyer queries." },
      { label: "Product Page Click-Through Rate", context: "Percentage of search impressions converting into product page visits." },
      { label: "Conversion Rate per SKU", context: "Proportion of product views that translate into orders or inquiry inquiries." },
    ],
    kpiDisclaimer: "Product listing performance depends on market demand, competitive pricing, product quality, and reviews. VANIX provides professional presentation and metadata optimization.",
    faqs: [
      {
        question: "What information is needed to start product cataloging?",
        answer: "We need your raw product specifications, dimensions, materials, key benefits, manufacturer details, and existing product photos or samples.",
      },
      {
        question: "Do you write A+ content for Amazon and brand websites?",
        answer: "Yes. We create structured A+ content layouts with visual comparison charts, brand story blocks, and feature highlights that enhance buyer confidence.",
      },
      {
        question: "How does proper cataloging improve search ranking?",
        answer: "Algorithms index backend search terms, bullet points, and attributes. Complete, accurate listings rank higher because they provide direct answers to customer search queries.",
      },
      {
        question: "Can you handle cataloging for large SKU inventories?",
        answer: "Yes. We utilize standardized data templates and batch validation processes to efficiently structure hundreds or thousands of SKUs.",
      },
    ],
    seoTitle: "Product Listing & Cataloging Services for Businesses | VANIX",
    seoDescription: "Professional product listing, A+ content creation, and search cataloging for websites and marketplaces. Increase product visibility and conversion rates.",
    relatedSlugs: ["amazon-meesho-indiamart", "ecommerce-website", "website-development", "technical-marketing-support"],
    iconName: "Layers",
    accentImage: "/images/vanix-04.png",
  },

  // 4. AMAZON, MEESHO & INDIAMART
  {
    id: "amazon-meesho-indiamart",
    slug: "amazon-meesho-indiamart",
    number: "04",
    title: "Amazon, Meesho & IndiaMART",
    category: "OPERATIONS",
    shortDescription: "Multi-marketplace onboarding, brand registry, listing optimization, and B2B/B2C sales pipeline management.",
    fullDescription: "Expand your reach onto India's largest marketplace platforms for both B2C and B2B orders. We handle end-to-end account management, catalog sync, and sponsored ads.",
    heroTitle: {
      main: "Amazon, Meesho & IndiaMART",
      goldHighlight: "Multi-Marketplace Scaling",
    },
    heroDescription: "Expand your product distribution across India's largest marketplace ecosystems. We handle seller onboarding, catalog compliance, brand verification, and sponsored ad strategy for B2C and B2B sales.",
    problem: {
      heading: "The Friction of Marketplace Selling Without Strategy",
      description: "Navigating complex marketplace compliance, category approvals, and listing rules without expertise leads to rejections and buried products.",
      points: [
        "Complex onboarding rules, category un-gating, and GST documentation create severe delays.",
        "Unoptimized product listings get buried beneath thousands of competing products in search results.",
        "Inability to differentiate genuine wholesale buyers from casual inquiries on B2B platforms like IndiaMART.",
        "High risk of account suspensions or penalties caused by fulfillment mismatches or policy misunderstandings.",
      ],
    },
    deliverables: [
      "Seller Account Setup & Verification",
      "Marketplace Listing Optimization",
      "Amazon Brand Store & A+ Setup",
      "IndiaMART B2B Lead Funnel Setup",
      "Meesho Catalog & Pricing Setup",
      "Marketplace Sponsored Ads Strategy",
    ],
    detailedDeliverables: [
      {
        title: "Seller Account Setup & Verification",
        description: "Complete documentation assistance, category un-gating, GST tax verification, and Brand Registry approval across platforms.",
      },
      {
        title: "Marketplace Listing Optimization",
        description: "Custom titles, bullet points, backend search terms, and compliant image structuring tailored to marketplace algorithms.",
      },
      {
        title: "Amazon Brand Store & A+ Setup",
        description: "Dedicated brand storefront design and modular enhanced brand content integration for registered brand owners.",
      },
      {
        title: "IndiaMART B2B Lead Funnel Setup",
        description: "Catalog categorization, verified trust seal setup, and automated lead inquiry alerts for wholesale trade.",
      },
      {
        title: "Meesho Catalog & Pricing Setup",
        description: "Competitive price tiering, bundle packaging, and zero-commission catalog optimization for regional consumer reach.",
      },
      {
        title: "Marketplace Sponsored Ads Strategy",
        description: "Structured keyword bidding campaigns designed to maximize sales velocity while maintaining target Advertising Cost of Sales (ACOS).",
      },
    ],
    techStack: ["Amazon Seller Central", "Meesho Supplier Panel", "IndiaMART Seller Portal", "Helium 10 / Keyword Tools"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We audit GST/brand documentation, product margins, packaging readiness, and channel suitability across platforms.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We set up seller panels, upload compliant catalogs, configure shipping nodes, and establish brand credentials.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We activate listings, configure brand assets, and initiate targeted sponsored search campaigns to build early sales velocity.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We monitor ACOS, refine negative search terms, adjust inventory levels, and resolve fulfillment bottlenecks.",
      },
    ],
    kpis: [
      { label: "Organic Search Placement", context: "Rank positioning of primary product listings on marketplace search results." },
      { label: "Advertising Cost of Sales (ACOS)", context: "Ratio of ad spend to attributed sales revenue on sponsored marketplace campaigns." },
      { label: "Verified B2B Lead Volume", context: "Number of authenticated wholesale buyer inquiries received via IndiaMART." },
      { label: "Order Fulfillment Rate", context: "Percentage of orders dispatched and delivered within platform SLA targets." },
    ],
    kpiDisclaimer: "Marketplace sales volume depends on product pricing, inventory availability, shipping speed, customer reviews, and category competition. VANIX ensures compliant setup and operational optimization.",
    faqs: [
      {
        question: "Do we need a registered trademark for Amazon Brand Registry?",
        answer: "A pending or registered trademark is required for Amazon Brand Registry. We guide you through the brand application and documentation process.",
      },
      {
        question: "How does selling on Meesho differ from Amazon or Flipkart?",
        answer: "Meesho focuses primarily on value-conscious regional consumers with zero commission on many categories and streamlined logistics, requiring tailored pricing strategies.",
      },
      {
        question: "Can IndiaMART generate qualified wholesale B2B inquiries?",
        answer: "Yes. By optimizing your IndiaMART catalog, TrustSeal credentials, and response speed, you attract verified B2B buyers seeking bulk orders.",
      },
      {
        question: "Who manages inventory and shipping fulfillment?",
        answer: "You retain ownership of your stock. We configure the fulfillment settings (FBA, Easy Ship, or Self-Ship) and manage catalog updates to keep stock status accurate.",
      },
    ],
    seoTitle: "Amazon, Meesho & IndiaMART Marketplace Scaling | VANIX",
    seoDescription: "Scale your B2B and B2C sales across Amazon, Meesho, and IndiaMART. Expert seller onboarding, catalog optimization, and sponsored advertising management.",
    relatedSlugs: ["product-listing-cataloging", "ecommerce-website", "google-ads-pmax", "technical-marketing-support"],
    iconName: "Store",
    accentImage: "/images/vanix-04.png",
  },

  // 5. GOOGLE BUSINESS PROFILE
  {
    id: "google-business-profile",
    slug: "google-business-profile",
    number: "05",
    title: "Google Business Profile",
    category: "VISIBILITY",
    shortDescription: "Verified Google Business Profile setup, optimization, and local map pack dominance.",
    fullDescription: "Make your business the first choice for local customers. We optimize your Google Maps listing with verified details, geotagged photos, business hours, and review collection.",
    heroTitle: {
      main: "Google Business Profile",
      goldHighlight: "for Local Maps Dominance",
    },
    heroDescription: "Make your business the undisputed first choice when local buyers search on Google Maps. We optimize profile details, geotag visual assets, and establish an automated review collection engine.",
    problem: {
      heading: "The Danger of Being Invisible on Google Maps",
      description: "When local customers search for your products or services near them, an unoptimized profile sends them directly to nearby competitors.",
      points: [
        "Nearby customers searching for your services discover and visit competitors in the Google Maps 3-Pack instead.",
        "Unverified or incorrect business hours, address, and phone numbers lead to lost walk-ins and phone calls.",
        "Lack of recent customer reviews and photos makes your business appear inactive or untrustworthy.",
        "Missing service categories prevent your profile from triggering for high-intent local search queries.",
      ],
    },
    deliverables: [
      "Profile Verification & Category Optimization",
      "Google Maps 3-Pack Strategy",
      "Geotagged Photo & Media Uploads",
      "Automated Review Collection Strategy",
      "Weekly Google Posts & Product Updates",
      "Direct Call & Message Integration",
    ],
    detailedDeliverables: [
      {
        title: "Profile Verification & Category Optimization",
        description: "Accurate primary and secondary category selection, precise operating hours, service area definitions, and verification support.",
      },
      {
        title: "Google Maps 3-Pack Strategy",
        description: "Strategic keyword positioning in profile naming, business description, service menus, and localized attribute tagging.",
      },
      {
        title: "Geotagged Photo & Media Uploads",
        description: "High-quality, location-tagged images of your storefront, facility, products, and team to build local algorithm authority.",
      },
      {
        title: "Automated Review Collection Strategy",
        description: "Direct review link shortcuts, QR codes for billing counters, and polite automated follow-up messages for satisfied customers.",
      },
      {
        title: "Weekly Google Posts & Product Updates",
        description: "Regular promotional posts, product showcases, and operational updates signaling active operations to Google's ranking algorithm.",
      },
      {
        title: "Direct Call & Message Integration",
        description: "Seamless WhatsApp and phone call triggers directly from Google search result cards to capture immediate customer demand.",
      },
    ],
    techStack: ["Google Business Profile Manager", "Google Maps API", "Geo-Metadata Tools", "Local Review Engines"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We check NAP (Name, Address, Phone) consistency, current ranking radius, and competitor map listings in your city.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We optimize service categories, update verified business data, and upload geotagged storefront photos.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We activate review collection workflows, publish initial promotional Google Posts, and verify contact click triggers.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We track weekly search impressions, direction requests, and phone calls, continuously refining category attributes.",
      },
    ],
    kpis: [
      { label: "Direct Phone Calls", context: "Inbound phone calls initiated directly from your Google Business Profile listing." },
      { label: "Direction Requests", context: "Number of navigation requests to your physical business location on Google Maps." },
      { label: "Profile Views & Impressions", context: "Total visibility on Google Search and Google Maps for relevant local keywords." },
      { label: "Website Clicks", context: "Referral visits from Google Business Profile to your website landing page." },
    ],
    kpiDisclaimer: "Local map rankings depend on geographic proximity, search query density, review volume, and category competition. VANIX implements complete optimization to maximize local visibility.",
    faqs: [
      {
        question: "How does Google determine which businesses appear in the local 3-pack?",
        answer: "Google evaluates Relevance (profile accuracy and categories), Distance (proximity to the searcher), and Prominence (review volume, ratings, and local directory citations).",
      },
      {
        question: "Can you help if our Google Business Profile is suspended or pending verification?",
        answer: "Yes. We review Google guidelines, verify documentation, and guide you through the reinstatement or video verification process to restore your profile.",
      },
      {
        question: "How often should a Google Business Profile be updated?",
        answer: "We recommend updating photos and publishing Google Posts at least once every 1–2 weeks to signal active business operations to Google's ranking algorithm.",
      },
      {
        question: "How do we get more positive Google reviews from our existing customers?",
        answer: "We provide direct short links, custom QR codes for your billing counter or delivery parcels, and polite automated follow-up messages for satisfied clients.",
      },
    ],
    seoTitle: "Google Business Profile Optimization & Local Maps | VANIX",
    seoDescription: "Dominate Google Maps and local 3-pack search results. Verified Google Business Profile setup, geotagged photos, and review strategy for Indian businesses.",
    relatedSlugs: ["local-seo-geotargeting", "website-development", "google-ads-pmax", "whatsapp-sales-commerce"],
    iconName: "MapPin",
    accentImage: "/images/vanix-05.png",
  },

  // 6. LOCAL SEO & GEO-TARGETING
  {
    id: "local-seo-geotargeting",
    slug: "local-seo-geotargeting",
    number: "06",
    title: "Local SEO & Geo-Targeting",
    category: "VISIBILITY",
    shortDescription: "Targeted local search engine optimization to capture high-intent buyers in your city.",
    fullDescription: "Win local search queries with citations across high-authority directories, localized landing pages, schema markup, and regional keyword positioning.",
    heroTitle: {
      main: "Local SEO & Geo-Targeting",
      goldHighlight: "for City-Wide Search Dominance",
    },
    heroDescription: "Capture high-intent buyers in your city searching for solutions near them. We build authoritative local directory citations, city-specific landing pages, and structured local business schema.",
    problem: {
      heading: "Why Local Businesses Lose Organic City Search Traffic",
      description: "Without structured geographic optimization, search engines cannot determine your service area, handing local organic traffic to competing firms.",
      points: [
        "Inconsistent business name, address, and phone details across directories harm search engine trust.",
        "Website lacks localized keywords, preventing it from appearing in '[Service] in [City]' searches.",
        "Absence of structured LocalBusiness schema makes it difficult for search bots to understand your service zones.",
        "Competitors with dedicated localized landing pages capture all the regional organic search inquiries.",
      ],
    },
    deliverables: [
      "NAP Citation Audit & Building",
      "City & Region-Specific Landing Pages",
      "LocalBusiness JSON-LD Schema Markup",
      "Hyperlocal Keyword Targeting",
      "On-Page Geo-Tagging & Meta Optimization",
      "Local Search Rank Tracking",
    ],
    detailedDeliverables: [
      {
        title: "NAP Citation Audit & Building",
        description: "Consistent business listings across top Indian directories (Justdial, Sulekha, IndiaMART, YellowPages, Bing Places).",
      },
      {
        title: "City & Region-Specific Landing Pages",
        description: "Targeted service pages customized for specific neighborhoods, towns, and commercial districts to capture regional queries.",
      },
      {
        title: "LocalBusiness JSON-LD Schema Markup",
        description: "Structured data specifying geographic coordinates, opening hours, service areas, and direct contact endpoints.",
      },
      {
        title: "Hyperlocal Keyword Targeting",
        description: "Targeting high-intent 'near me' and city-tailored keywords with natural, conversion-focused content integration.",
      },
      {
        title: "On-Page Geo-Tagging & Meta Optimization",
        description: "Location-specific title tags, meta descriptions, image ALT attributes, and localized header structures.",
      },
      {
        title: "Local Search Rank Tracking",
        description: "Ongoing monitoring of keyword positions and organic visibility across target pin codes and regional search zones.",
      },
    ],
    techStack: ["Google Search Console", "Schema.org", "Moz Local Methods", "Ahrefs / SEMrush Rank Tracking"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We map existing directory citations, identify NAP discrepancies, and analyze local search volumes across target cities.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We clean up inconsistent citations, implement LocalBusiness schema, and structure localized landing page layouts.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We publish localized service landing pages and submit XML sitemaps to Google Search Console for indexing.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We monitor keyword ranking movements across target cities, build local citation authority, and refine on-page content.",
      },
    ],
    kpis: [
      { label: "Local Organic Keyword Positions", context: "Search engine ranking for localized service terms (e.g., '[Service] in [City]')." },
      { label: "Regional Search Impressions", context: "Total impressions on Google search results originating from target geographic areas." },
      { label: "Organic Landing Page Traffic", context: "Unique visitors arriving directly from organic search to localized service pages." },
      { label: "Local Inbound Inquiries", context: "Qualified leads and calls originating from localized organic search rankings." },
    ],
    kpiDisclaimer: "SEO rankings evolve over time based on domain authority, local competition, citation consistency, and search volume. VANIX adheres to white-hat technical SEO best practices.",
    faqs: [
      {
        question: "What is NAP consistency and why does it matter for SEO?",
        answer: "NAP stands for Name, Address, and Phone number. When this information matches identically across your website, Google Profile, and directories, search engines trust your business authenticity.",
      },
      {
        question: "How does Local SEO differ from regular national SEO?",
        answer: "Local SEO targets search queries with geographic intent (e.g., 'in Shamli' or 'near me'), focusing heavily on Google Maps, citations, and localized schema markup.",
      },
      {
        question: "Can we target multiple cities or districts with Local SEO?",
        answer: "Yes. We create dedicated, non-duplicate localized service pages tailored to each specific city or district where you provide services.",
      },
      {
        question: "How long does Local SEO take to show organic ranking improvements?",
        answer: "Local SEO typically begins showing ranking improvements within 4 to 8 weeks as directory citations propagate and search engines re-index updated schema data.",
      },
    ],
    seoTitle: "Local SEO & Geo-Targeting Services | VANIX",
    seoDescription: "Capture high-intent local customers with Local SEO, directory citations, city-specific landing pages, and LocalBusiness schema markup tailored for Indian businesses.",
    relatedSlugs: ["google-business-profile", "website-development", "google-ads-pmax", "lead-generation-crm"],
    iconName: "Search",
    accentImage: "/images/vanix-05.png",
  },

  // 7. SOCIAL MEDIA MANAGEMENT
  {
    id: "social-media-management",
    slug: "social-media-management",
    number: "07",
    title: "Social Media Management",
    category: "VISIBILITY",
    shortDescription: "Premium visual storytelling and brand building across Instagram, Facebook, and LinkedIn.",
    fullDescription: "Turn social media into a brand equity generator. We create luxury-grade graphics, video reels, and educational carousels that position your business as the market leader.",
    heroTitle: {
      main: "Social Media Management",
      goldHighlight: "for Brand Authority & Trust",
    },
    heroDescription: "Transform social channels into high-credibility assets. We produce premium graphics, educational carousels, short-form reels, and maintain active community engagement to elevate brand prestige.",
    problem: {
      heading: "The Damage of Irregular, Amateur Social Media",
      description: "When potential buyers search for your business on Instagram or LinkedIn and find an abandoned page, they question your credibility.",
      points: [
        "Irregular, low-quality social posts degrade brand perception and make the business look inactive.",
        "Lack of consistent brand visual identity confuses potential buyers and fails to build recognition.",
        "Zero short-form video content means missing massive organic discovery on Instagram Reels and YouTube.",
        "Unanswered direct messages and comments lead to lost sales inquiries and frustrated prospects.",
      ],
    },
    deliverables: [
      "High-Production Graphic Content",
      "Short-Form Video & Reels Production",
      "Brand Visual System & Guidelines",
      "Editorial Calendar & Scheduled Publishing",
      "Community Management & DM Routing",
      "Monthly Engagement & Reach Reports",
    ],
    detailedDeliverables: [
      {
        title: "High-Production Graphic Content",
        description: "Polished graphics, product showcases, and infographic carousels tailored to your brand colors, typography, and industry aesthetics.",
      },
      {
        title: "Short-Form Video & Reels Production",
        description: "Scripting, editing, dynamic captions, and sound design for engaging Instagram Reels and YouTube Shorts.",
      },
      {
        title: "Brand Visual System & Guidelines",
        description: "Consistent color palettes, typography standards, logo watermarks, and visual rules that ensure brand coherence.",
      },
      {
        title: "Editorial Calendar & Scheduled Publishing",
        description: "Pre-planned monthly content schedule ensuring consistent posting without daily operational stress.",
      },
      {
        title: "Community Management & DM Routing",
        description: "Prompt monitoring of post comments and routing qualified purchase inquiries directly to WhatsApp.",
      },
      {
        title: "Monthly Engagement & Reach Reports",
        description: "Analysis of top-performing content formats, follower growth velocity, and audience interaction patterns.",
      },
    ],
    techStack: ["Adobe Premiere Pro", "After Effects", "Photoshop", "Meta Business Suite", "Canva Pro"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We analyze existing visual assets, competitor aesthetics, target demographic tastes, and channel strengths.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We establish brand design templates, color schemes, content pillars, and a monthly editorial calendar.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We produce high-resolution assets, edit short-form reels, and execute scheduled multi-platform publishing.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We review post metrics, double down on high-performing video formats, and refine DM response workflows.",
      },
    ],
    kpis: [
      { label: "Organic Reach & Impressions", context: "Total unique accounts exposed to your brand visuals across Instagram and Facebook." },
      { label: "Engagement Rate (Saves / Shares)", context: "Proportion of viewers who save or share educational and product content." },
      { label: "Direct Message Inquiries", context: "Qualified sales inquiries received via social direct messages and comments." },
      { label: "Follower Growth Velocity", context: "Steady, organic growth of relevant local and industry-specific followers." },
    ],
    kpiDisclaimer: "Social media reach is subject to platform algorithm shifts, creative resonance, and audience trends. VANIX ensures consistent production quality and brand authority.",
    faqs: [
      {
        question: "Which social media platforms do you manage?",
        answer: "We manage Instagram, Facebook, LinkedIn, and YouTube Shorts depending on whether your business is consumer retail, local service, or B2B manufacturing.",
      },
      {
        question: "Do we need to record videos ourselves?",
        answer: "You can send us raw footage and product videos, and our team handles scripting, professional editing, captions, motion graphics, and audio mixing.",
      },
      {
        question: "How often will content be published on our social accounts?",
        answer: "Depending on your selected strategy, we establish a structured schedule typically ranging from 3 to 5 high-production posts and reels per week.",
      },
      {
        question: "Can social media inquiries be routed straight to WhatsApp?",
        answer: "Yes. We set up automated quick replies, bio links, and DM triggers that direct interested buyers straight to your WhatsApp business chat.",
      },
    ],
    seoTitle: "Social Media Management & Video Production | VANIX",
    seoDescription: "Elevate your brand with premium social media management, Instagram Reels production, and community engagement tailored for growing Indian businesses.",
    relatedSlugs: ["meta-ads", "whatsapp-sales-commerce", "online-growth-strategy", "website-development"],
    iconName: "Share2",
    accentImage: "/images/vanix-01.png",
  },

  // 8. GOOGLE ADS & PMAX
  {
    id: "google-ads-pmax",
    slug: "google-ads-pmax",
    number: "08",
    title: "Google Ads (Search & Performance Max)",
    category: "ACQUISITION",
    shortDescription: "High-intent paid search campaigns delivering qualified inquiries from people ready to buy.",
    fullDescription: "Capture immediate demand. We structure tightly targeted Google Search and Performance Max campaigns, negative keyword lists, and ad copies designed to minimize cost per lead.",
    heroTitle: {
      main: "Google Ads & PMax",
      goldHighlight: "for High-Intent Demand Capture",
    },
    heroDescription: "Capture buyers at the exact moment they search for your products or services. We design tightly targeted Google Search and Performance Max campaigns that maximize lead intent and minimize wasted spend.",
    problem: {
      heading: "The Pitfall of Inefficient Paid Advertising",
      description: "Running Google Ads without negative keywords, proper conversion tracking, or tight keyword intent wastes ad budget on non-converting clicks.",
      points: [
        "Relying purely on organic footfall creates unpredictable inquiry volumes and seasonal revenue dry spells.",
        "Running unmanaged Google Ads without negative keywords wastes significant budget on irrelevant clicks.",
        "Missing conversion tracking makes it impossible to know which keywords generate real sales calls.",
        "Competitors bidding on your industry terms capture high-intent customers who were ready to buy.",
      ],
    },
    deliverables: [
      "High-Intent Keyword Architecture",
      "Negative Keyword Exclusion Lists",
      "Benefit-Driven Ad Copywriting",
      "Performance Max (PMax) Campaigns",
      "Conversion Tracking & GA4 Integration",
      "Bid Strategy & Cost Per Lead Optimization",
    ],
    detailedDeliverables: [
      {
        title: "High-Intent Keyword Architecture",
        description: "In-depth commercial keyword research, search intent clustering, and match type structuring to target ready-to-buy prospects.",
      },
      {
        title: "Negative Keyword Exclusion Lists",
        description: "Comprehensive exclusion lists to prevent wasted ad spend on job seekers, free queries, and unrelated searches.",
      },
      {
        title: "Benefit-Driven Ad Copywriting",
        description: "High-CTR headlines, dynamic keyword insertions, callout extensions, and structured snippet highlights.",
      },
      {
        title: "Performance Max (PMax) Campaigns",
        description: "Multi-asset campaigns leveraging Google's AI across Search, Maps, YouTube, and Display with tight asset group controls.",
      },
      {
        title: "Conversion Tracking & GA4 Integration",
        description: "Precise tracking of phone calls, WhatsApp clicks, and form submissions with server-side attribution.",
      },
      {
        title: "Bid Strategy & Cost Per Lead Optimization",
        description: "Ongoing bid adjustments, search term pruning, and budget allocation toward top-performing keyword clusters.",
      },
    ],
    techStack: ["Google Ads Manager", "Google Tag Manager", "Google Analytics 4", "Google Keyword Planner"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We analyze search volume for your services, competitor ad strategies, and cost-per-click benchmarks in your market.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We build tightly themed ad groups, write compelling ad copy, and configure server-side conversion tags.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We deploy search and PMax campaigns with conservative initial bidding to build clean conversion data.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We add weekly negative keywords, adjust device/location bids, and lower cost per qualified inquiry.",
      },
    ],
    kpis: [
      { label: "Cost Per Qualified Lead (CPL)", context: "Average advertising expenditure required to generate a verified business inquiry." },
      { label: "Click-Through Rate (CTR)", context: "Proportion of searchers who click your ad when searching for relevant keywords." },
      { label: "Conversion Rate on Landing Pages", context: "Percentage of ad clicks that result in a form submission or phone call." },
      { label: "Search Impression Share", context: "Percentage of available target search queries captured by your campaigns." },
    ],
    kpiDisclaimer: "Ad performance depends on market search volume, industry CPCs, bidding competition, landing page offer, and sales team response time. VANIX optimizes campaign structure and budget efficiency.",
    faqs: [
      {
        question: "How quickly do Google Ads start generating business inquiries?",
        answer: "Google Ads can begin driving targeted traffic and phone inquiries within 24 to 48 hours of campaign launch and tracking verification.",
      },
      {
        question: "How do you prevent ad spend from being wasted on irrelevant clicks?",
        answer: "We implement exhaustive negative keyword lists, tight phrase/exact match targeting, and continuous search query pruning to filter out low-intent queries.",
      },
      {
        question: "What advertising budget is required to start?",
        answer: "Budgets depend on your industry CPC and local competition. We recommend starting with a manageable test budget and scaling as conversion data proves profitable.",
      },
      {
        question: "How do we know which ads are actually producing phone calls or leads?",
        answer: "We install Google Tag Manager and GA4 conversion tracking on phone numbers, WhatsApp links, and inquiry forms to attribute every lead back to its specific keyword.",
      },
    ],
    seoTitle: "Google Ads & Performance Max Lead Campaigns | VANIX",
    seoDescription: "Capture high-intent customer search demand with structured Google Search and Performance Max campaigns. Lower cost per lead with negative keyword filtering.",
    relatedSlugs: ["meta-ads", "lead-generation-crm", "website-development", "analytics-growth-reporting"],
    iconName: "Target",
  },

  // 9. META ADS
  {
    id: "meta-ads",
    slug: "meta-ads",
    number: "09",
    title: "Meta Ads (Instagram & Facebook)",
    category: "ACQUISITION",
    shortDescription: "Laser-targeted demographic and interest campaigns that generate consistent demand.",
    fullDescription: "Reach ideal prospective customers where they spend their time. We produce high-converting video and carousel ads that drive traffic straight into your WhatsApp or lead forms.",
    heroTitle: {
      main: "Meta Ads (Instagram & Facebook)",
      goldHighlight: "for Targeted Demand Generation",
    },
    heroDescription: "Reach your ideal customers where they spend their digital time. We engineer high-converting video and carousel ads that drive engaged prospects straight into your WhatsApp or lead funnels.",
    problem: {
      heading: "The Waste of Untargeted Marketing & Boosted Posts",
      description: "Boosting random social posts without conversion tracking, custom audiences, or retargeting leads to high spend with minimal tangible business inquiries.",
      points: [
        "Traditional print or outdoor ads provide zero audience targeting and zero trackable conversion data.",
        "Boosting random posts via mobile apps wastes budget without proper retargeting or conversion funnels.",
        "Ad fatigue causes acquisition costs to spike when creative formats are not regularly refreshed.",
        "Failure to retarget past website visitors leaves warm prospects on the table for competitors.",
      ],
    },
    deliverables: [
      "Audience Research & Precision Targeting",
      "High-Converting Creative Ad Production",
      "Direct Click-to-WhatsApp Funnels",
      "Retargeting & Lookalike Audiences",
      "Meta Pixel & Conversions API (CAPI) Setup",
      "ROAS & Cost-Per-Acquisition Optimization",
    ],
    detailedDeliverables: [
      {
        title: "Audience Research & Precision Targeting",
        description: "Custom audience segmentation based on demographics, interests, purchasing behavior, and geographic pin codes.",
      },
      {
        title: "High-Converting Creative Ad Production",
        description: "Engaging video reels, static graphics, and carousel ads designed to capture attention and trigger action in the feed.",
      },
      {
        title: "Direct Click-to-WhatsApp Funnels",
        description: "Instant messaging ad triggers that start direct sales conversations on WhatsApp without landing page drop-offs.",
      },
      {
        title: "Retargeting & Lookalike Audiences",
        description: "Dynamic remarketing to previous website visitors, video viewers, and engaged social followers.",
      },
      {
        title: "Meta Pixel & Conversions API (CAPI) Setup",
        description: "Server-side tracking setup to bypass browser cookie limitations and accurately measure conversion events.",
      },
      {
        title: "ROAS & Cost-Per-Acquisition Optimization",
        description: "A/B testing of hooks, angles, and call-to-actions to maximize inquiry volume while controlling ad spend.",
      },
    ],
    techStack: ["Meta Ads Manager", "Meta Business Suite", "Meta Conversions API (CAPI)", "Canva / Premiere"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We define your ideal customer profile, key buying triggers, competitor ad creatives, and competitive advantages.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We design ad creatives, configure Meta Pixel & CAPI server events, and structure testing ad sets.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We launch test ad sets across multiple creative angles and target audiences to identify winning combinations.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We allocate budget to winning creatives, eliminate underperforming ads, and refresh fatigued visuals regularly.",
      },
    ],
    kpis: [
      { label: "Cost Per Messaging Conversation", context: "Advertising cost to initiate a qualified one-on-one WhatsApp sales conversation." },
      { label: "Click-Through Rate (Link CTR)", context: "Proportion of ad viewers who take action and click into your inquiry funnel." },
      { label: "Cost Per 1,000 Impressions (CPM)", context: "Efficiency of media spend across targeted demographic segments." },
      { label: "Return on Ad Spend (ROAS)", context: "Attributed sales revenue generated relative to advertising expenditure." },
    ],
    kpiDisclaimer: "Meta advertising returns vary based on offer strength, creative appeal, audience saturation, and customer close rate. VANIX engineers testing frameworks to optimize acquisition costs.",
    faqs: [
      {
        question: "Why is Click-to-WhatsApp so effective for Indian businesses?",
        answer: "Indian consumers prefer direct, conversational purchasing. Click-to-WhatsApp ads remove form friction and allow your team to close sales in real-time.",
      },
      {
        question: "What is the difference between 'boosting a post' and using Meta Ads Manager?",
        answer: "Boosting a post is a basic tool with limited targeting. Meta Ads Manager provides advanced audience segmentation, CAPI server tracking, A/B testing, and retargeting capabilities.",
      },
      {
        question: "How often should ad creatives be changed?",
        answer: "We monitor creative fatigue weekly and introduce fresh hooks, video variations, and graphics every 2–3 weeks to keep acquisition costs low.",
      },
      {
        question: "How do you track conversions after iOS privacy changes?",
        answer: "We implement Meta's Server-Side Conversions API (CAPI) alongside the standard browser Pixel for accurate, privacy-compliant event tracking.",
      },
    ],
    seoTitle: "Meta Ads (Instagram & Facebook) Lead Generation | VANIX",
    seoDescription: "Scale your customer acquisition with high-converting Instagram and Facebook ads. Click-to-WhatsApp funnels and CAPI server tracking for Indian businesses.",
    relatedSlugs: ["google-ads-pmax", "whatsapp-sales-commerce", "social-media-management", "lead-generation-crm"],
    iconName: "Flame",
  },

  // 10. WHATSAPP SALES & COMMERCE
  {
    id: "whatsapp-sales-commerce",
    slug: "whatsapp-sales-commerce",
    number: "10",
    title: "WhatsApp Sales & Commerce",
    category: "OPERATIONS",
    shortDescription: "Direct Click-to-WhatsApp funnels and automated catalogs for instant customer conversions.",
    fullDescription: "WhatsApp is where Indian business happens. We build automated product catalogs, instant response bots, and one-click chat triggers to convert conversations into confirmed orders.",
    heroTitle: {
      main: "WhatsApp Sales & Commerce",
      goldHighlight: "for Instant Conversions",
    },
    heroDescription: "Turn conversations into revenue. We build automated WhatsApp business catalogs, instant inquiry responders, broadcast workflows, and direct payment link triggers for rapid customer conversion.",
    problem: {
      heading: "The Friction of Manual Messaging & Delayed Replies",
      description: "Indian buyers expect immediate answers on WhatsApp. Delayed replies and manual photo sharing cause prospects to buy from faster competitors.",
      points: [
        "Slow inquiry response times cause impatient buyers to purchase from competitors within minutes.",
        "Sales teams struggle to manually send product photos, prices, and bank details repeatedly.",
        "Zero organized customer database or broadcast system for re-engaging past buyers during festive sales.",
        "Lack of structured catalog inside WhatsApp causes confusion and abandoned conversations.",
      ],
    },
    deliverables: [
      "WhatsApp Business API & Account Setup",
      "Automated Catalog & Fast Replies",
      "Instant Lead Response Automation",
      "Broadcast & Festive Re-engagement Funnels",
      "Payment Link Integration",
      "CRM & Contact Tagging Synchronization",
    ],
    detailedDeliverables: [
      {
        title: "WhatsApp Business API & Account Setup",
        description: "Official green tick verification support, multi-agent shared inbox setup, and verified business profile configuration.",
      },
      {
        title: "Automated Catalog & Fast Replies",
        description: "Structured product collections, instant pricing cards, and one-tap frequently asked question replies.",
      },
      {
        title: "Instant Lead Response Automation",
        description: "Automated welcome greetings and qualification flows triggering the instant a customer messages from ads or websites.",
      },
      {
        title: "Broadcast & Festive Re-engagement Funnels",
        description: "Compliant message templates for announcements, seasonal offers, and catalog updates to past buyers.",
      },
      {
        title: "Payment Link Integration",
        description: "Direct UPI and Razorpay payment links sent inside WhatsApp chat for immediate order confirmation.",
      },
      {
        title: "CRM & Contact Tagging Synchronization",
        description: "Automated tagging of customer intent (Wholesale, Retail, Inquiry, Closed) synchronized directly to your CRM.",
      },
    ],
    techStack: ["WhatsApp Business API", "Meta Business Manager", "Interakt / Wati / Custom Webhooks", "Razorpay Payment Links"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We map your current customer inquiry path, response bottlenecks, and repetitive buyer questions.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We structure the WhatsApp product catalog, create pre-approved templates, and build instant response logic.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We connect WhatsApp buttons across your website and ads, and train your team on multi-agent tools.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We monitor conversation resolution times, test broadcast engagement rates, and optimize closing workflows.",
      },
    ],
    kpis: [
      { label: "First Response Time", context: "Speed at which incoming customer inquiries receive automated or human replies." },
      { label: "Conversation-to-Sale Rate", context: "Percentage of initiated WhatsApp chats that result in confirmed orders or bookings." },
      { label: "Broadcast Read Rate", context: "Proportion of targeted past customers who open and engage with broadcast updates." },
      { label: "Order Velocity via Chat", context: "Total transaction volume processed directly through WhatsApp payment links." },
    ],
    kpiDisclaimer: "WhatsApp conversion speed depends on staff responsiveness, inventory availability, and customer relationship quality. VANIX delivers automated workflows and API infrastructure.",
    faqs: [
      {
        question: "What is the difference between WhatsApp Business App and WhatsApp Business API?",
        answer: "The free App is for single phone usage. The Cloud API allows multiple staff members to reply from one number, integrates automated bots, and supports large-scale broadcast messaging.",
      },
      {
        question: "Can multiple team members answer customer chats on the same number?",
        answer: "Yes. With our WhatsApp API setup, your entire sales and support team can access the shared inbox from their own computers or smartphones.",
      },
      {
        question: "Are WhatsApp broadcast messages compliant with Meta policies?",
        answer: "Yes. We use pre-approved Meta message templates to ensure your number remains in good standing and avoids spam blocks.",
      },
      {
        question: "Can we collect payments directly inside WhatsApp?",
        answer: "Yes. We configure instant payment links (UPI, Cards, Net Banking) that can be generated and sent in one click during customer chats.",
      },
    ],
    seoTitle: "WhatsApp Sales & Commerce Automation | VANIX",
    seoDescription: "Automate your WhatsApp sales with official Business API setup, product catalogs, fast replies, and payment links. Convert conversations into revenue.",
    relatedSlugs: ["meta-ads", "lead-generation-crm", "ecommerce-website", "technical-marketing-support"],
    iconName: "MessageCircle",
    accentImage: "/images/vanix-06.png",
  },

  // 11. LEAD GENERATION & CRM
  {
    id: "lead-generation-crm",
    slug: "lead-generation-crm",
    number: "11",
    title: "Lead Generation & CRM",
    category: "ACQUISITION",
    shortDescription: "Automated qualification funnels and CRM routing that deliver warm, verified inquiries.",
    fullDescription: "Stop chasing unqualified prospects. We implement interactive lead qualification forms that filter serious buyers and route high-value inquiries directly to your phone.",
    heroTitle: {
      main: "Lead Generation & CRM",
      goldHighlight: "for Automated Pipeline Growth",
    },
    heroDescription: "Stop losing leads in scattered spreadsheets. We implement interactive qualification forms that filter serious buyers, prevent spam, and route verified inquiries directly to your sales team.",
    problem: {
      heading: "The Breakdown of Unorganized Lead Management",
      description: "Without structured qualification and automated CRM pipelines, businesses lose track of valuable inquiries and waste time on unqualified leads.",
      points: [
        "Inquiries from multiple channels get lost in scattered spreadsheets, personal phones, and emails.",
        "Sales teams spend hours chasing junk or unqualified inquiries who lack budget or commercial intent.",
        "Delayed follow-ups result in cold prospects who no longer remember contacting your business.",
        "Zero visibility into lead stage progress, conversion bottlenecks, or sales team follow-up accountability.",
      ],
    },
    deliverables: [
      "Interactive Lead Qualification Funnels",
      "Automated Real-Time WhatsApp & Email Alerts",
      "Custom CRM Pipeline Architecture",
      "Anti-Spam & Duplicate Lead Deduplication",
      "Automated Customer Acknowledgement",
      "Lead Source Attribution & Stage Analytics",
    ],
    detailedDeliverables: [
      {
        title: "Interactive Lead Qualification Funnels",
        description: "Multi-step inquiry forms that capture budget, business type, and specific requirements without overwhelming the prospect.",
      },
      {
        title: "Automated Real-Time WhatsApp & Email Alerts",
        description: "Instant notifications delivered to your sales team the second a lead submits, ensuring rapid follow-up.",
      },
      {
        title: "Custom CRM Pipeline Architecture",
        description: "Visual pipeline stages (New, Contacted, Qualified, Proposal Sent, Won, Lost) customized for your business workflow.",
      },
      {
        title: "Anti-Spam & Duplicate Lead Deduplication",
        description: "Honeypot filters, rate limiting per IP, phone validation, and automated duplicate submission protection.",
      },
      {
        title: "Automated Customer Acknowledgement",
        description: "Instant auto-reply emails and WhatsApp greetings reassuring the buyer of swift professional follow-up.",
      },
      {
        title: "Lead Source Attribution & Stage Analytics",
        description: "Tracking lead source channels (Google, Meta, Organic, Direct) and sales stage conversion velocity.",
      },
    ],
    techStack: ["Next.js API Routes", "Supabase / PostgreSQL", "Resend Email", "WhatsApp Webhooks", "Custom CRM Dashboard"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We define criteria for qualified vs. unqualified leads, and audit current inquiry drop-offs across channels.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We build interactive lead forms, configure Supabase database schemas, and establish alert webhooks.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We connect forms across all web assets and verify instant notification delivery to your staff.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We refine form questions to improve completion rates and monitor lead-to-close timelines.",
      },
    ],
    kpis: [
      { label: "Lead Qualification Rate", context: "Percentage of total inquiries meeting your target budget and profile criteria." },
      { label: "Follow-Up Speed (Time-to-Touch)", context: "Average minutes elapsed between lead submission and sales team contact." },
      { label: "Form Completion Rate", context: "Proportion of visitors who start an inquiry form and successfully submit." },
      { label: "Pipeline Conversion Velocity", context: "Average days required to move a qualified lead from New to Won." },
    ],
    kpiDisclaimer: "Lead closing rates depend on sales team response speed, pricing competitiveness, and market conditions. VANIX delivers qualified inquiry pipelines and CRM tracking.",
    faqs: [
      {
        question: "How does CRM automation help our sales team close deals faster?",
        answer: "It eliminates manual data entry, notifies your team immediately with complete prospect context, and organizes every lead into clear follow-up stages.",
      },
      {
        question: "How do you filter out spam and fake submissions?",
        answer: "We implement multi-layered protections including hidden honeypot fields, rate limiting per IP, phone number validation, and duplicate submission checks.",
      },
      {
        question: "Can we access our lead dashboard from mobile phones?",
        answer: "Yes. Our CRM interfaces are fully responsive and secured with role-based authentication so you can manage leads from any device.",
      },
      {
        question: "Can leads be exported to Excel or external software?",
        answer: "Yes. You can export complete lead records with contact information, timestamps, and stage statuses to CSV/Excel in one click.",
      },
    ],
    seoTitle: "Lead Generation & CRM Automation Systems | VANIX",
    seoDescription: "Automate your sales pipeline with custom lead qualification forms, instant WhatsApp alerts, and Supabase CRM architecture for growing businesses.",
    relatedSlugs: ["google-ads-pmax", "meta-ads", "website-development", "analytics-growth-reporting"],
    iconName: "UserCheck",
    accentImage: "/images/vanix-07.png",
  },

  // 12. ANALYTICS & GROWTH REPORTING
  {
    id: "analytics-growth-reporting",
    slug: "analytics-growth-reporting",
    number: "12",
    title: "Analytics & Growth Reporting",
    category: "STRATEGY",
    shortDescription: "Crystal-clear growth dashboards tracking every metric from cost per click to net revenue.",
    fullDescription: "Eliminate guesswork. Our comprehensive reporting dashboards give you a 24/7 transparent view of traffic, leads, sales, return on ad spend, and customer acquisition costs.",
    heroTitle: {
      main: "Analytics & Growth Reporting",
      goldHighlight: "for Data-Driven Scaling",
    },
    heroDescription: "Eliminate guesswork from your marketing investments. We build unified reporting dashboards that give you 24/7 transparent visibility into traffic, inquiries, ad spend, and customer acquisition costs.",
    problem: {
      heading: "The Blind Spot of Marketing Without Clean Data",
      description: "Making business growth decisions based on intuition rather than verified customer data leads to wasted ad budgets and unnoticed revenue leaks.",
      points: [
        "Making business growth decisions based on intuition rather than verified customer data.",
        "Inability to determine which marketing channel actually generates profitable customers versus wasted budget.",
        "Scattered data across Google Ads, Meta, and website making comprehensive performance reviews impossible.",
        "Unnoticed spikes in customer drop-offs on critical website pages or inquiry forms.",
      ],
    },
    deliverables: [
      "Unified Real-Time Growth Dashboard",
      "GA4 & Server-Side Event Tracking",
      "Channel Attribution Modeling",
      "Monthly Executive Growth Reviews",
      "Conversion Drop-Off Auditing",
      "Return on Ad Spend (ROAS) Tracking",
    ],
    detailedDeliverables: [
      {
        title: "Unified Real-Time Growth Dashboard",
        description: "Consolidated visual dashboard displaying real-time traffic, leads, conversion rates, and acquisition channels.",
      },
      {
        title: "GA4 & Server-Side Event Tracking",
        description: "Complete configuration of Google Analytics 4 events, custom conversions, and user journey funnels.",
      },
      {
        title: "Channel Attribution Modeling",
        description: "Clear attribution showing which touchpoints (Search, Social, Direct) drove each qualified inquiry.",
      },
      {
        title: "Monthly Executive Growth Reviews",
        description: "Monthly performance summaries outlining what worked, what needs tuning, and next-month priorities.",
      },
      {
        title: "Conversion Drop-Off Auditing",
        description: "Identification of bottlenecks on landing pages, product cards, or checkout steps.",
      },
      {
        title: "Return on Ad Spend (ROAS) Tracking",
        description: "Direct comparison of advertising expenditure against actual closed sales pipeline value.",
      },
    ],
    techStack: ["Google Analytics 4", "Looker Studio", "Google Tag Manager", "Supabase Analytics", "Next.js Telemetry"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We verify existing analytics installations, identify broken tracking tags, and list critical business KPIs.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We deploy GA4, custom events, server-side tags, and unified dashboard connections.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We validate event accuracy against backend database records and publish executive dashboards.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We conduct monthly reviews, analyze channel efficiencies, and reallocate growth budgets based on ROI.",
      },
    ],
    kpis: [
      { label: "Customer Acquisition Cost (CAC)", context: "Blended cost of advertising and marketing required to acquire a new paying customer." },
      { label: "Blended ROAS", context: "Overall return on advertising spend calculated across all active paid acquisition channels." },
      { label: "Channel Conversion Efficiency", context: "Comparison of conversion rates across Google Search, Meta Ads, and Organic traffic." },
      { label: "Monthly Growth Velocity", context: "Month-over-month expansion in qualified lead volume and website engagement." },
    ],
    kpiDisclaimer: "Analytics reporting provides transparency into real-world business performance. Growth velocity depends on operational execution, budget scale, and offer competitiveness.",
    faqs: [
      {
        question: "Why is Google Analytics 4 (GA4) configuration often inaccurate by default?",
        answer: "Out-of-the-box GA4 only tracks basic page views. Custom commercial events like WhatsApp clicks, form submissions, and phone calls require precise custom event tagging.",
      },
      {
        question: "How often are analytics dashboards updated?",
        answer: "Dashboards update in real-time or near real-time, allowing you to check performance whenever you need to make decisions.",
      },
      {
        question: "Do we get plain-language summaries instead of complicated charts?",
        answer: "Yes. Alongside live dashboards, we deliver monthly executive summaries explaining exactly what the numbers mean for your business revenue.",
      },
      {
        question: "Can you track offline conversions back to digital ads?",
        answer: "Yes. By tagging leads with unique source IDs in your CRM, we can match closed offline sales back to the specific campaign that originated the inquiry.",
      },
    ],
    seoTitle: "Analytics & Growth Reporting Dashboards | VANIX",
    seoDescription: "Gain complete transparency over marketing performance with custom GA4 tracking, Looker Studio dashboards, and CAC/ROAS analytics by VANIX.",
    relatedSlugs: ["online-growth-strategy", "google-ads-pmax", "lead-generation-crm", "meta-ads"],
    iconName: "BarChart3",
    accentImage: "/images/vanix-08.png",
  },

  // 13. ONLINE GROWTH STRATEGY
  {
    id: "online-growth-strategy",
    slug: "online-growth-strategy",
    number: "13",
    title: "Online Growth Strategy",
    category: "STRATEGY",
    shortDescription: "Holistic digital roadmap connecting branding, channels, pricing, and scaling mechanics.",
    fullDescription: "We don't just provide isolated tools; we design your overarching digital growth system. A clear roadmap tailored to your specific offline strengths, market competitors, and unit economics.",
    heroTitle: {
      main: "Online Growth Strategy",
      goldHighlight: "for Structured Business Expansion",
    },
    heroDescription: "We don't offer disconnected tactical tools; we design your overarching digital growth system. A clear strategic roadmap tailored to your specific offline strengths, market competitors, and unit economics.",
    problem: {
      heading: "The Danger of Fragmented Marketing Tactics",
      description: "Executing random marketing activities without an overarching digital strategy leads to wasted capital, confused branding, and team burnout.",
      points: [
        "Wasting money on disconnected marketing tactics without a cohesive strategic growth engine.",
        "Underpricing products online due to lack of understanding of digital margins and packaging.",
        "Copying competitor tactics that are unsuitable for your specific business model and market.",
        "Lack of phased milestones leading to team burnout and premature abandonment of profitable channels.",
      ],
    },
    deliverables: [
      "Competitive Market & Competitor Audit",
      "Multi-Channel Digital Roadmap",
      "Digital Offer & Pricing Architecture",
      "Unit Economics & Margin Planning",
      "Quarterly Growth Milestone Reviews",
      "Offline-to-Online Transition Blueprint",
    ],
    detailedDeliverables: [
      {
        title: "Competitive Market & Competitor Audit",
        description: "Deep analysis of direct competitors' digital presence, traffic sources, pricing models, and market vulnerabilities.",
      },
      {
        title: "Multi-Channel Digital Roadmap",
        description: "Phased 90-day and 1-year growth blueprint outlining which channels to activate in what order for maximum ROI.",
      },
      {
        title: "Digital Offer & Pricing Architecture",
        description: "Strategic structuring of bundles, minimum order quantities, and value propositions for digital buyers.",
      },
      {
        title: "Unit Economics & Margin Planning",
        description: "Realistic modeling of advertising costs, packaging, shipping, and expected net margins across channels.",
      },
      {
        title: "Quarterly Growth Milestone Reviews",
        description: "Structured strategy sessions to review progress against target milestones and adjust for market shifts.",
      },
      {
        title: "Offline-to-Online Transition Blueprint",
        description: "Operational guidance on adapting your existing staff and inventory workflows to handle digital demand.",
      },
    ],
    techStack: ["Market Intelligence Frameworks", "Unit Economics Modeling", "Miro / Strategy Mapping", "Competitor Research Tools"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We assess current offline revenue streams, operational capacity, gross margins, and growth targets.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We design your complete digital system, offer packages, and channel sequence roadmap.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We guide the execution of Foundation, Visibility, and Acquisition pillars in orderly phases.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We review channel unit economics, double down on profitable avenues, and unlock new growth milestones.",
      },
    ],
    kpis: [
      { label: "Digital Revenue Contribution", context: "Proportion of total business revenue originated through online channels." },
      { label: "Channel Diversification Index", context: "Healthy distribution of customer acquisition across multiple independent platforms." },
      { label: "Customer Lifetime Value (LTV)", context: "Total value generated per customer through repeat orders and referrals." },
      { label: "Strategic Milestone Adherence", context: "On-time execution of phased quarterly digital expansion goals." },
    ],
    kpiDisclaimer: "Strategic outcomes depend on management execution, market conditions, capital allocation, and operational capacity. VANIX provides strategic clarity and roadmap governance.",
    faqs: [
      {
        question: "How does a growth strategy prevent wasted marketing budget?",
        answer: "It establishes the correct sequence: building a solid digital foundation and conversion mechanism before spending money on paid advertising.",
      },
      {
        question: "Is this strategy suitable for traditional manufacturing and B2B businesses?",
        answer: "Yes. We specifically tailor strategies for B2B manufacturers, wholesalers, and local service providers based on high-ticket inquiry cycles.",
      },
      {
        question: "What deliverables are provided as part of the strategy?",
        answer: "You receive a comprehensive digital roadmap document, competitor breakdown, unit economics models, and phased implementation timeline.",
      },
      {
        question: "How often is the growth strategy reviewed and updated?",
        answer: "We conduct structured quarterly reviews to analyze actual performance data, adapt to competitor movements, and plan the next scaling phase.",
      },
    ],
    seoTitle: "Online Growth Strategy & Digital Roadmap | VANIX",
    seoDescription: "Strategic digital growth roadmaps, unit economics modeling, and multi-channel blueprints engineered for traditional Indian businesses moving online.",
    relatedSlugs: ["analytics-growth-reporting", "website-development", "google-ads-pmax", "technical-marketing-support"],
    iconName: "Compass",
    accentImage: "/images/vanix-09.png",
  },

  // 14. TECHNICAL & MARKETING SUPPORT
  {
    id: "technical-marketing-support",
    slug: "technical-marketing-support",
    number: "14",
    title: "Technical & Marketing Support",
    category: "OPERATIONS",
    shortDescription: "Dedicated technical and creative support to keep your digital systems operating at peak performance.",
    fullDescription: "Your digital engine requires continuous monitoring, security updates, and creative refreshes. We act as your dedicated growth and technology department.",
    heroTitle: {
      main: "Technical & Marketing Support",
      goldHighlight: "for Continuous System Reliability",
    },
    heroDescription: "Your digital engine requires continuous monitoring, security updates, and creative refreshes. We act as your dedicated growth and technology department, ensuring zero downtime and rapid issue resolution.",
    problem: {
      heading: "The Fragility of Unmaintained Digital Assets",
      description: "When web platforms, APIs, and security certificates are left unmanaged, technical failures disrupt business revenue and erode customer trust.",
      points: [
        "Websites breaking or becoming slow with nobody technical available to fix critical errors.",
        "Security vulnerabilities, expired SSL certificates, or malware infections ruining business trust.",
        "Outdated product listings, incorrect prices, and stale promotional banners confusing customers.",
        "High cost and management burden of hiring an in-house full-time technical and design team.",
      ],
    },
    deliverables: [
      "24/7 Uptime & Performance Monitoring",
      "Regular Content & Catalog Updates",
      "Vulnerability Assessment & Security Hardening",
      "Priority Troubleshooting & Bug Fixes",
      "Dedicated Technical Growth Manager",
      "Database & Digital Asset Backups",
    ],
    detailedDeliverables: [
      {
        title: "24/7 Uptime & Performance Monitoring",
        description: "Automated checks monitoring server availability, SSL certificate health, and page speed.",
      },
      {
        title: "Regular Content & Catalog Updates",
        description: "Prompt updates to banners, product descriptions, pricing, operating hours, and contact details.",
      },
      {
        title: "Vulnerability Assessment & Security Hardening",
        description: "Proactive patching of CMS/framework updates, API security checks, and anti-tamper protections.",
      },
      {
        title: "Priority Troubleshooting & Bug Fixes",
        description: "Rapid turnaround on form bugs, layout glitches, or tracking tag disruptions.",
      },
      {
        title: "Dedicated Technical Growth Manager",
        description: "A single point of technical contact who understands your complete digital architecture.",
      },
      {
        title: "Database & Digital Asset Backups",
        description: "Automated regular backups ensuring your customer inquiries and website data are securely preserved.",
      },
    ],
    techStack: ["GitHub / Version Control", "Vercel / Cloudflare", "Uptime Monitoring Tools", "Supabase Backup Automation"],
    process: [
      {
        step: "01",
        title: "AUDIT",
        description: "We inspect codebase security, DNS configuration, SSL status, and automated backup routines.",
      },
      {
        step: "02",
        title: "SETUP",
        description: "We install uptime monitoring alerts, automated backup scripts, and secure communication channels.",
      },
      {
        step: "03",
        title: "LAUNCH",
        description: "We execute scheduled maintenance routines, listing updates, and security patching proactively.",
      },
      {
        step: "04",
        title: "OPTIMIZE",
        description: "We review monthly uptime logs, optimize database queries, and refresh digital assets continuously.",
      },
    ],
    kpis: [
      { label: "Platform Uptime Percentage", context: "Server and website availability maintained above 99.9% target SLA." },
      { label: "Incident Resolution Time", context: "Average speed to diagnose and resolve reported technical glitches." },
      { label: "Security Patch Compliance", context: "Timely deployment of critical framework and library security updates." },
      { label: "Update Request Turnaround", context: "Speed of publishing routine catalog, banner, and content updates." },
    ],
    kpiDisclaimer: "Technical maintenance ensures high availability and fast resolution. System speed also relies on external hosting providers and third-party APIs.",
    faqs: [
      {
        question: "How quickly are technical issues resolved when they arise?",
        answer: "Critical issues affecting lead capture or uptime are prioritized with rapid response protocols to minimize disruption to your business.",
      },
      {
        question: "Can we request regular updates to our product catalog and banners?",
        answer: "Yes. Routine content updates, price changes, and new promotional banners are covered as part of ongoing support.",
      },
      {
        question: "How do you ensure our website and customer data remain secure?",
        answer: "We implement SSL encryption, secure database access rules, anti-spam protections, and regular vulnerability assessments.",
      },
      {
        question: "Why is continuous technical support better than hiring an in-house IT team?",
        answer: "You get access to a multidisciplinary team of developers, designers, and security specialists at a fraction of the overhead of hiring full-time staff.",
      },
    ],
    seoTitle: "Technical & Marketing Support Services | VANIX",
    seoDescription: "Keep your digital growth engines running smoothly with 24/7 uptime monitoring, security hardening, and regular content updates by VANIX.",
    relatedSlugs: ["website-development", "ecommerce-website", "online-growth-strategy", "lead-generation-crm"],
    iconName: "ShieldCheck",
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((service) => service.slug === slug || service.id === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((service) => service.slug);
}
