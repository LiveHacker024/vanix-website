import { servicesData, ServiceItem, getServiceBySlug } from "@/config/services";

export type BusinessType =
  | "Local / Retail"
  | "Service Business"
  | "Manufacturer"
  | "Wholesale / Distributor"
  | "E-commerce"
  | "Restaurant / Food"
  | "Jewellery / Fashion"
  | "Real Estate"
  | "Healthcare"
  | "Education"
  | "Professional Services"
  | "Other";

export type GrowthGoal =
  | "Get More Customers"
  | "Generate More Leads"
  | "Build an Online Presence"
  | "Get Found on Google"
  | "Sell Products Online"
  | "Improve Digital Marketing"
  | "Improve Customer Follow-up"
  | "I'm Not Sure";

export type OnlineAsset =
  | "Website"
  | "Google Business Profile"
  | "Instagram / Facebook"
  | "Online Store"
  | "Google Ads"
  | "Meta Ads"
  | "WhatsApp Business"
  | "Nothing Yet"
  | "Not Sure";

export interface AssessmentAnswers {
  businessName: string;
  businessType: BusinessType;
  primaryGoal: GrowthGoal;
  currentPresence: OnlineAsset[];
  location?: string;
}

export type RoadmapTier = "HIGH_PRIORITY" | "NEXT_STEP" | "SCALE";

export interface RecommendedServiceItem {
  service: ServiceItem;
  slug: string;
  tier: RoadmapTier;
  tierLabel: string;
  tierStepNumber: string;
  whyRecommended: string;
  whatVanixCanDo: string;
  keyOutcomes: string[];
  kpis: { label: string; context: string }[];
  score: number;
}

export interface GrowthRoadmapResult {
  businessName: string;
  businessType: BusinessType;
  primaryGoal: GrowthGoal;
  location?: string;
  currentPresence: OnlineAsset[];
  highPriorityService: RecommendedServiceItem;
  nextSteps: RecommendedServiceItem[];
  scaleServices: RecommendedServiceItem[];
  allRecommended: RecommendedServiceItem[];
  totalRecommendedCount: number;
  generatedAt: string;
}

interface ServiceRuleConfig {
  slug: string;
  baseWeight: number;
  industryAffinity: Partial<Record<BusinessType, number>>;
  goalAffinity: Partial<Record<GrowthGoal, number>>;
}

const SERVICE_SCORING_RULES: ServiceRuleConfig[] = [
  // 1. Website Development
  {
    slug: "website-development",
    baseWeight: 10,
    industryAffinity: {
      "Service Business": 16,
      "Manufacturer": 15,
      "Professional Services": 16,
      "Real Estate": 14,
      "Healthcare": 14,
      "Education": 14,
      "Wholesale / Distributor": 12,
      "Local / Retail": 10,
      "Other": 10,
    },
    goalAffinity: {
      "Build an Online Presence": 20,
      "Generate More Leads": 16,
      "Get More Customers": 12,
      "Improve Digital Marketing": 10,
      "I'm Not Sure": 10,
    },
  },

  // 2. E-Commerce Website
  {
    slug: "ecommerce-website",
    baseWeight: 8,
    industryAffinity: {
      "E-commerce": 22,
      "Jewellery / Fashion": 20,
      "Local / Retail": 12,
      "Wholesale / Distributor": 10,
      "Manufacturer": 8,
    },
    goalAffinity: {
      "Sell Products Online": 24,
      "Build an Online Presence": 10,
      "Get More Customers": 8,
    },
  },

  // 3. Product Listing & Cataloging
  {
    slug: "product-listing-cataloging",
    baseWeight: 7,
    industryAffinity: {
      "E-commerce": 18,
      "Jewellery / Fashion": 18,
      "Manufacturer": 16,
      "Wholesale / Distributor": 16,
      "Local / Retail": 10,
    },
    goalAffinity: {
      "Sell Products Online": 18,
      "Build an Online Presence": 8,
    },
  },

  // 4. Amazon / Meesho / IndiaMART Growth
  {
    slug: "amazon-meesho-indiamart",
    baseWeight: 6,
    industryAffinity: {
      "Manufacturer": 16,
      "Wholesale / Distributor": 16,
      "E-commerce": 14,
      "Jewellery / Fashion": 12,
    },
    goalAffinity: {
      "Sell Products Online": 16,
      "Get More Customers": 10,
      "Generate More Leads": 10,
    },
  },

  // 5. Google Business Profile & Maps
  {
    slug: "google-business-profile",
    baseWeight: 12,
    industryAffinity: {
      "Local / Retail": 22,
      "Restaurant / Food": 22,
      "Healthcare": 18,
      "Real Estate": 16,
      "Service Business": 16,
      "Education": 14,
      "Professional Services": 14,
      "Other": 12,
    },
    goalAffinity: {
      "Get Found on Google": 24,
      "Get More Customers": 18,
      "Build an Online Presence": 14,
      "I'm Not Sure": 16,
    },
  },

  // 6. Local SEO & Geo-Targeting
  {
    slug: "local-seo-geotargeting",
    baseWeight: 10,
    industryAffinity: {
      "Local / Retail": 20,
      "Restaurant / Food": 20,
      "Healthcare": 18,
      "Service Business": 16,
      "Real Estate": 16,
      "Professional Services": 14,
      "Education": 12,
    },
    goalAffinity: {
      "Get Found on Google": 22,
      "Get More Customers": 18,
      "Generate More Leads": 14,
      "I'm Not Sure": 12,
    },
  },

  // 7. Social Media Management & Reels
  {
    slug: "social-media-management",
    baseWeight: 8,
    industryAffinity: {
      "Jewellery / Fashion": 18,
      "Restaurant / Food": 18,
      "E-commerce": 14,
      "Local / Retail": 12,
      "Education": 10,
    },
    goalAffinity: {
      "Build an Online Presence": 16,
      "Improve Digital Marketing": 14,
      "Get More Customers": 10,
    },
  },

  // 8. Meta Ads (Facebook & Instagram)
  {
    slug: "meta-ads",
    baseWeight: 7,
    industryAffinity: {
      "Jewellery / Fashion": 16,
      "E-commerce": 16,
      "Restaurant / Food": 14,
      "Local / Retail": 12,
      "Real Estate": 14,
      "Education": 12,
      "Service Business": 10,
    },
    goalAffinity: {
      "Get More Customers": 16,
      "Generate More Leads": 14,
      "Sell Products Online": 14,
      "Improve Digital Marketing": 14,
    },
  },

  // 9. Google Ads & Performance Max
  {
    slug: "google-ads-pmax",
    baseWeight: 7,
    industryAffinity: {
      "Service Business": 16,
      "Real Estate": 16,
      "Healthcare": 14,
      "Professional Services": 14,
      "Manufacturer": 12,
      "E-commerce": 14,
      "Education": 12,
      "Local / Retail": 10,
    },
    goalAffinity: {
      "Generate More Leads": 18,
      "Get Found on Google": 16,
      "Get More Customers": 14,
      "Sell Products Online": 12,
    },
  },

  // 10. WhatsApp Sales & Commerce
  {
    slug: "whatsapp-sales-commerce",
    baseWeight: 8,
    industryAffinity: {
      "Jewellery / Fashion": 16,
      "Restaurant / Food": 14,
      "Local / Retail": 14,
      "Real Estate": 14,
      "Service Business": 12,
      "Wholesale / Distributor": 12,
      "E-commerce": 10,
    },
    goalAffinity: {
      "Improve Customer Follow-up": 26,
      "Get More Customers": 12,
      "Generate More Leads": 12,
      "Sell Products Online": 10,
    },
  },

  // 11. Lead Generation & CRM Automation
  {
    slug: "lead-generation-crm",
    baseWeight: 8,
    industryAffinity: {
      "Service Business": 18,
      "Real Estate": 18,
      "Manufacturer": 16,
      "Professional Services": 16,
      "Education": 14,
      "Healthcare": 14,
      "Wholesale / Distributor": 12,
    },
    goalAffinity: {
      "Generate More Leads": 24,
      "Improve Customer Follow-up": 20,
      "Get More Customers": 12,
    },
  },

  // 12. Analytics & Growth Reporting
  {
    slug: "analytics-growth-reporting",
    baseWeight: 5,
    industryAffinity: {
      "E-commerce": 12,
      "Service Business": 10,
      "Manufacturer": 8,
    },
    goalAffinity: {
      "Improve Digital Marketing": 16,
      "Generate More Leads": 8,
    },
  },

  // 13. Online Growth Strategy & Consulting
  {
    slug: "online-growth-strategy",
    baseWeight: 6,
    industryAffinity: {
      "Other": 16,
      "Manufacturer": 12,
      "Wholesale / Distributor": 12,
      "Professional Services": 10,
    },
    goalAffinity: {
      "I'm Not Sure": 20,
      "Improve Digital Marketing": 14,
      "Build an Online Presence": 12,
    },
  },

  // 14. Technical & Marketing Support
  {
    slug: "technical-marketing-support",
    baseWeight: 5,
    industryAffinity: {
      "E-commerce": 10,
      "Service Business": 8,
      "Local / Retail": 8,
    },
    goalAffinity: {
      "Improve Digital Marketing": 10,
      "Build an Online Presence": 8,
    },
  },
];

/**
 * Generate truthful, contextualized "Why VANIX Recommends This" copy
 * based strictly on the user's answers. No fake audit claims.
 */
function generateWhyRecommended(
  slug: string,
  answers: AssessmentAnswers,
  tier: RoadmapTier
): string {
  const { businessType, primaryGoal, currentPresence } = answers;
  const hasWebsite = currentPresence.includes("Website") || currentPresence.includes("Online Store");
  const hasGbp = currentPresence.includes("Google Business Profile");
  const isFresh = currentPresence.includes("Nothing Yet");

  switch (slug) {
    case "website-development":
      if (!hasWebsite) {
        return `Based on what you told us, your ${businessType} does not currently have a dedicated website. A custom, mobile-fast website is the primary digital anchor required to showcase your credibility, present your offerings, and convert visitors into inquiries.`;
      }
      return `To support your goal of ${primaryGoal.toLowerCase()}, your existing web presence can be upgraded into a high-performance conversion engine with clear action funnels and direct WhatsApp inquiry triggers.`;

    case "ecommerce-website":
      if (primaryGoal === "Sell Products Online") {
        return `As a ${businessType} aiming to sell products online, having a dedicated e-commerce storefront gives you full control over direct customer orders, secure payment gateways, and repeat buyer retention without third-party commission leakage.`;
      }
      return `For your ${businessType}, a modern direct-to-consumer store automates 24/7 product browsing, automated checkout, and inventory management.`;

    case "product-listing-cataloging":
      return `High-converting product photography, standardized descriptions, and structured SKU catalogs are essential for ${businessType} businesses to build buyer confidence and accelerate purchasing decisions.`;

    case "amazon-meesho-indiamart":
      return `As a ${businessType}, expanding your distribution onto high-traffic B2B and B2C marketplaces like Amazon, Meesho, or IndiaMART unlocks immediate nationwide buyer intent alongside your own direct channels.`;

    case "google-business-profile":
      if (!hasGbp) {
        return `As a ${businessType} looking to ${primaryGoal.toLowerCase()}, a verified and optimized Google Business Profile is the #1 highest-return asset to capture local customers searching nearby on Google Maps.`;
      }
      return `Enhancing and actively managing your Google Business Profile ensures top placement in local 3-pack search results whenever prospective clients look for services in your area.`;

    case "local-seo-geotargeting":
      return `For a ${businessType}, localized search optimization ensures your business ranks for high-intent geo-specific keywords (e.g. "near me" and city-level searches), channeling continuous local footfall and calls.`;

    case "social-media-management":
      return `Building visual trust through consistent reels, product highlights, and social proof helps ${businessType} brands stay top-of-mind and attract organic word-of-mouth engagement.`;

    case "meta-ads":
      return `Targeted Meta ads (Instagram & Facebook) allow your ${businessType} to precisely reach prospective customers by local geography, interests, and buying behaviors to drive direct sales and inquiries.`;

    case "google-ads-pmax":
      return `Running high-intent Google Search & Performance Max ad campaigns captures customers at the exact moment they are actively searching to buy your services or products.`;

    case "whatsapp-sales-commerce":
      if (primaryGoal === "Improve Customer Follow-up") {
        return `Since your primary goal is to improve customer follow-up, automated WhatsApp business funnels and instant catalog sharing prevent lost leads and double your response speed.`;
      }
      return `Direct click-to-WhatsApp communication provides the highest response rate in the Indian market, making customer consultations and quick checkout frictionless.`;

    case "lead-generation-crm":
      if (primaryGoal === "Generate More Leads") {
        return `To achieve your goal of generating more qualified leads, implementing automated lead capture pipelines and CRM tracking ensures no potential client slips through the cracks.`;
      }
      return `A structured CRM and automated follow-up system transforms raw inquiries into verified sales appointments with zero manual tracking overhead.`;

    case "analytics-growth-reporting":
      return `Clear, transparent growth dashboards give you real-time visibility into traffic sources, lead costs, and conversion efficiency so every marketing rupee is accountable.`;

    case "online-growth-strategy":
      if (primaryGoal === "I'm Not Sure") {
        return `Since you are exploring the best growth path, VANIX recommends starting with a clear strategic roadmap that prioritizes low-risk, high-impact foundational assets first.`;
      }
      return `A comprehensive digital growth roadmap aligns your positioning, competitor gap analysis, and conversion channels into a step-by-step scaling plan.`;

    case "technical-marketing-support":
      return `Ongoing technical maintenance, uptime monitoring, and routine content updates keep your digital systems operating at 99.9% reliability without hiring an expensive in-house IT team.`;

    default:
      return `VANIX recommends this service to strengthen your digital presence and support your primary goal of ${primaryGoal.toLowerCase()}.`;
  }
}

/**
 * Generate concise "What VANIX Can Do" for the service
 */
function generateWhatVanixCanDo(service: ServiceItem): string {
  if (service.deliverables && service.deliverables.length > 0) {
    return service.deliverables.slice(0, 4).join(" • ");
  }
  return service.shortDescription;
}

/**
 * Deterministic recommendation engine computing 3 to 5 ranked services.
 */
export function generateGrowthRoadmap(answers: AssessmentAnswers): GrowthRoadmapResult {
  const { businessType, primaryGoal, currentPresence, businessName, location } = answers;

  const hasWebsite = currentPresence.includes("Website");
  const hasOnlineStore = currentPresence.includes("Online Store");
  const hasGbp = currentPresence.includes("Google Business Profile");
  const hasMeta = currentPresence.includes("Instagram / Facebook") || currentPresence.includes("Meta Ads");
  const hasGoogleAds = currentPresence.includes("Google Ads");
  const isNothingYet = currentPresence.includes("Nothing Yet");

  // Calculate score for each rule
  const scoredServices = SERVICE_SCORING_RULES.map((rule) => {
    let score = rule.baseWeight;

    // 1. Industry Affinity
    const indBonus = rule.industryAffinity[businessType] || 0;
    score += indBonus;

    // 2. Goal Affinity
    const goalBonus = rule.goalAffinity[primaryGoal] || 0;
    score += goalBonus;

    // 3. Online Presence & Asset Modifiers
    if (rule.slug === "website-development") {
      if (isNothingYet || (!hasWebsite && !hasOnlineStore)) {
        score += 15; // Massive boost if no website
      } else if (hasWebsite) {
        score -= 10; // Already has website, reduce priority unless goal is rebranding
        if (primaryGoal === "Build an Online Presence") {
          score += 4; // Moderate boost for revamp
        }
      }
    }

    if (rule.slug === "ecommerce-website") {
      if (hasOnlineStore) {
        score -= 8; // Already has store
      } else if (businessType === "E-commerce" || businessType === "Jewellery / Fashion" || primaryGoal === "Sell Products Online") {
        score += 16;
      }
    }

    if (rule.slug === "google-business-profile") {
      if (isNothingYet || !hasGbp) {
        if (businessType === "Local / Retail" || businessType === "Restaurant / Food" || businessType === "Healthcare" || businessType === "Service Business") {
          score += 16;
        }
      } else if (hasGbp) {
        score -= 4; // Already has profile, prioritize local SEO instead
      }
    }

    if (rule.slug === "local-seo-geotargeting") {
      if (hasGbp) {
        score += 8; // Elevate local SEO optimization
      }
      if (businessType === "Local / Retail" || businessType === "Restaurant / Food" || primaryGoal === "Get Found on Google") {
        score += 12;
      }
    }

    if (rule.slug === "meta-ads") {
      if (!hasMeta && (primaryGoal === "Get More Customers" || primaryGoal === "Sell Products Online")) {
        score += 8;
      }
      if (businessType === "Jewellery / Fashion" || businessType === "Restaurant / Food" || businessType === "E-commerce") {
        score += 10;
      }
    }

    if (rule.slug === "google-ads-pmax") {
      if (primaryGoal === "Generate More Leads" || primaryGoal === "Get Found on Google") {
        score += 12;
      }
      if (businessType === "Service Business" || businessType === "Real Estate" || businessType === "Professional Services") {
        score += 10;
      }
    }

    if (rule.slug === "whatsapp-sales-commerce") {
      if (primaryGoal === "Improve Customer Follow-up") {
        score += 20;
      }
      if (businessType === "Local / Retail" || businessType === "Jewellery / Fashion" || businessType === "Restaurant / Food") {
        score += 8;
      }
    }

    if (rule.slug === "lead-generation-crm") {
      if (primaryGoal === "Generate More Leads" || primaryGoal === "Improve Customer Follow-up") {
        score += 18;
      }
      if (businessType === "Service Business" || businessType === "Real Estate" || businessType === "Manufacturer") {
        score += 12;
      }
    }

    if (rule.slug === "online-growth-strategy") {
      if (primaryGoal === "I'm Not Sure") {
        score += 22;
      }
    }

    return {
      slug: rule.slug,
      score,
    };
  });

  // Sort descending by score
  scoredServices.sort((a, b) => b.score - a.score);

  // Take top 4 or 5 recommendations (capped at maximum 5, minimum 3, NEVER all 14)
  const targetCount = primaryGoal === "I'm Not Sure" ? 3 : 4;
  const topScored = scoredServices.slice(0, targetCount);

  const formattedItems: RecommendedServiceItem[] = topScored.map((item, index) => {
    const service = getServiceBySlug(item.slug)!;
    let tier: RoadmapTier = "NEXT_STEP";
    let tierLabel = "NEXT STEP";
    let tierStepNumber = `0${index + 1}`;

    if (index === 0) {
      tier = "HIGH_PRIORITY";
      tierLabel = "HIGH PRIORITY";
    } else if (index >= 2) {
      tier = "SCALE";
      tierLabel = "SCALE & OPTIMIZE";
    }

    const whyRecommended = generateWhyRecommended(item.slug, answers, tier);
    const whatVanixCanDo = generateWhatVanixCanDo(service);
    const keyOutcomes = service.deliverables ? service.deliverables.slice(0, 4) : [];
    const kpis = service.kpis ? service.kpis.slice(0, 3) : [];

    return {
      service,
      slug: service.slug,
      tier,
      tierLabel,
      tierStepNumber,
      whyRecommended,
      whatVanixCanDo,
      keyOutcomes,
      kpis,
      score: item.score,
    };
  });

  const highPriorityService = formattedItems[0];
  const nextSteps = formattedItems.filter((i) => i.tier === "NEXT_STEP");
  const scaleServices = formattedItems.filter((i) => i.tier === "SCALE");

  return {
    businessName: businessName.trim(),
    businessType,
    primaryGoal,
    location: location?.trim() || undefined,
    currentPresence,
    highPriorityService,
    nextSteps,
    scaleServices,
    allRecommended: formattedItems,
    totalRecommendedCount: formattedItems.length,
    generatedAt: new Date().toISOString(),
  };
}
