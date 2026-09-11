export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Websites & Tech" | "Local SEO & Discovery" | "Advertising & Leads" | "Process & Pricing";
}

export const faqCategories = [
  "All",
  "General",
  "Websites & Tech",
  "Local SEO & Discovery",
  "Advertising & Leads",
  "Process & Pricing",
] as const;

export const faqsData: FaqItem[] = [
  // General
  {
    category: "General",
    question: "What is VANIX and what does the company do?",
    answer:
      "VANIX is an independent digital growth and technology agency based in Shamli, Uttar Pradesh. We specialize in transforming traditional, retail, wholesale, and offline businesses into scalable online growth engines through custom website development, e-commerce, Google Maps local SEO, marketplace onboarding (Amazon, Meesho, IndiaMART), targeted advertising (Google & Meta Ads), and WhatsApp conversion funnels.",
  },
  {
    category: "General",
    question: "Who are VANIX's services designed for?",
    answer:
      "Our services are designed for business owners, manufacturers, wholesalers, retail store owners, healthcare providers, boutique brands, and local service professionals who want to establish a strong digital presence, attract verified inquiries, and generate consistent revenue without relying solely on walk-in foot traffic or word of mouth.",
  },
  {
    category: "General",
    question: "Where is VANIX located and can you work with businesses remotely?",
    answer:
      "VANIX is headquartered in Shamli, Uttar Pradesh (247776), India. We collaborate with clients across India remotely via structured online workflows, video consultations, shared project boards, and WhatsApp communication.",
  },
  {
    category: "General",
    question: "Who leads the technical engineering at VANIX?",
    answer:
      "VANIX was founded by Kunal Rajput, a Lead Technologist, Junior Penetration Tester, and B.Tech CSE student specializing in web, API, and Android security, who also runs the HackWithKunal educational channel. Our development and cybersecurity analysts ensure every platform is fast, clean, and architecturally secure.",
  },

  // Websites & Tech
  {
    category: "Websites & Tech",
    question: "What types of websites does VANIX build?",
    answer:
      "We engineer custom brand showcase websites, multi-page business portals, lead-generation landing pages, direct-to-consumer (D2C) e-commerce stores, and service booking platforms. Every website is built mobile-first, optimized for Google search indexation, and engineered for ultra-fast load times.",
  },
  {
    category: "Websites & Tech",
    question: "What technology stack do you use for website development?",
    answer:
      "We utilize modern, high-performance web frameworks including Next.js, React, TypeScript, Tailwind CSS, and secure database architectures such as PostgreSQL and Supabase. We do not use bloated, slow templates; our systems are custom-coded for speed, security, and scalability.",
  },
  {
    category: "Websites & Tech",
    question: "Will my website be mobile-friendly and secure?",
    answer:
      "Yes. Over 75% of Indian web users browse on smartphones, so every VANIX website is engineered mobile-first with adaptive layouts. Security is fundamental to our practice: we integrate SSL/TLS encryption, secure API endpoints, input sanitization, and rate limiting to protect your business and visitors.",
  },
  {
    category: "Websites & Tech",
    question: "Do you integrate online payment gateways and UPI for e-commerce?",
    answer:
      "Yes. For e-commerce and booking platforms, we integrate certified Indian payment gateways (such as Razorpay, Cashfree, or direct UPI deep-linking) allowing your customers to pay seamlessly via Google Pay, PhonePe, Paytm, credit cards, debit cards, and net banking.",
  },

  // Local SEO & Discovery
  {
    category: "Local SEO & Discovery",
    question: "How does VANIX optimize Google Business Profiles for local search?",
    answer:
      "We conduct a complete audit of your Google Business Profile, optimize business categories, establish consistent Name, Address, Phone (NAP) data across local directories, upload high-resolution geotagged images, structure service catalogs, and implement a systematic review collection process to enhance your visibility in Google's Local 3-Pack.",
  },
  {
    category: "Local SEO & Discovery",
    question: "Can you help list our products on Amazon, Meesho, and IndiaMART?",
    answer:
      "Yes. We handle end-to-end multi-marketplace onboarding, including seller account verification, GST catalog mapping, high-converting product listings, keyword-optimized A+ content, category optimization, and B2B inquiry routing on platforms like IndiaMART, Amazon India, and Meesho.",
  },
  {
    category: "Local SEO & Discovery",
    question: "How long does local SEO take to show noticeable improvements?",
    answer:
      "Local SEO and organic search visibility generally show measurable progress within 4 to 12 weeks, depending on existing competition in your locality, category density, review velocity, and Google algorithm indexing cycles.",
  },

  // Advertising & Leads
  {
    category: "Advertising & Leads",
    question: "What is the difference between Google Ads and Meta Ads for my business?",
    answer:
      "Google Ads captures high-intent customers who are actively searching for your specific product or service right now. Meta (Facebook & Instagram) Ads generates demand by showcasing visually appealing creative to targeted demographic and interest audiences. We often combine both with Click-to-WhatsApp funnels for maximum efficiency.",
  },
  {
    category: "Advertising & Leads",
    question: "How do Click-to-WhatsApp funnels work?",
    answer:
      "Click-to-WhatsApp funnels connect your ads or website CTAs directly to your business WhatsApp. Instead of forcing prospects through lengthy forms, interested customers start a direct 1-on-1 chat with a pre-filled message, dramatically reducing friction and accelerating inquiry response times.",
  },
  {
    category: "Advertising & Leads",
    question: "How are leads captured and delivered to me?",
    answer:
      "When a prospect submits an inquiry form or books a strategy consultation, our system instantly logs the lead in your CRM database, sends an immediate internal email/WhatsApp alert to your team, and triggers a confirmation message to the customer.",
  },

  // Process & Pricing
  {
    category: "Process & Pricing",
    question: "How does the engagement process work with VANIX?",
    answer:
      "Our process follows 5 structured phases: (1) Discovery & Business Audit, (2) Digital Architecture Setup, (3) Search & Catalog Optimization, (4) Targeted Traffic & Acquisition, and (5) Conversion Automation & Ongoing Growth. You can start by requesting a custom proposal or booking an initial ₹999 strategy session.",
  },
  {
    category: "Process & Pricing",
    question: "What is the ₹999 Digital Growth Strategy Session?",
    answer:
      "The ₹999 Strategy Session is a dedicated 1-on-1 technical and marketing audit where we analyze your current business footprint, identify digital bottlenecks, and map out a step-by-step roadmap for your transition online. If you proceed with a full implementation package, the ₹999 fee is credited toward your project.",
  },
  {
    category: "Process & Pricing",
    question: "Does VANIX guarantee specific Google rankings, leads, or revenue?",
    answer:
      "No ethical digital agency can guarantee specific Google rankings or exact revenue figures because search algorithms, ad auction costs, and consumer market factors operate outside any agency's direct control. What VANIX guarantees is rigorous technical execution, industry best practices, transparent reporting, and continuous performance optimization.",
  },
  {
    category: "Process & Pricing",
    question: "How can I contact VANIX to get started?",
    answer:
      "You can submit an inquiry through our Contact page, connect directly with us on WhatsApp at +91 9457727770, or send an email to hackwithkunal@gmail.com. Our team typically reviews inquiries within 24 to 48 business hours.",
  },
];
