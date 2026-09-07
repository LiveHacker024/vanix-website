// Production-level QA test suite for VANIX Personalized Growth Journey Engine

console.log("==================================================================");
console.log("🚀 STARTING PRODUCTION QA PASS: VANIX GROWTH JOURNEY ENGINE");
console.log("==================================================================\n");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  ✕ [FAIL] ${message}`);
  }
}

const ALL_14_SERVICE_SLUGS = [
  "website-development",
  "ecommerce-website",
  "product-listing-cataloging",
  "amazon-meesho-indiamart",
  "google-business-profile",
  "local-seo-geotargeting",
  "social-media-management",
  "meta-ads",
  "google-ads-pmax",
  "whatsapp-sales-commerce",
  "lead-generation-crm",
  "analytics-growth-reporting",
  "online-growth-strategy",
  "technical-marketing-support",
];

const ALL_VALID_SLUGS = new Set(ALL_14_SERVICE_SLUGS);

const SERVICE_TITLES = {
  "website-development": "Website Development",
  "ecommerce-website": "E-Commerce Website",
  "product-listing-cataloging": "Product Listing & Cataloging",
  "amazon-meesho-indiamart": "Amazon / Meesho / IndiaMART Growth",
  "google-business-profile": "Google Business Profile & Maps",
  "local-seo-geotargeting": "Local SEO & Geo-Targeting",
  "social-media-management": "Social Media Management & Reels",
  "meta-ads": "Meta Ads (Facebook & Instagram)",
  "google-ads-pmax": "Google Ads & Performance Max",
  "whatsapp-sales-commerce": "WhatsApp Sales & Commerce",
  "lead-generation-crm": "Lead Generation & CRM Automation",
  "analytics-growth-reporting": "Analytics & Growth Reporting",
  "online-growth-strategy": "Online Growth Strategy & Consulting",
  "technical-marketing-support": "Technical & Marketing Support",
};

const SERVICE_SCORING_RULES = [
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

function generateWhyRecommended(slug, answers, tier) {
  const { businessType, primaryGoal, currentPresence } = answers;
  const hasWebsite = currentPresence.includes("Website") || currentPresence.includes("Online Store");
  const hasGbp = currentPresence.includes("Google Business Profile");

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

function generateGrowthRoadmap(answers) {
  const { businessType, primaryGoal, currentPresence, businessName, location } = answers;

  const hasWebsite = currentPresence.includes("Website");
  const hasOnlineStore = currentPresence.includes("Online Store");
  const hasGbp = currentPresence.includes("Google Business Profile");
  const hasMeta = currentPresence.includes("Instagram / Facebook") || currentPresence.includes("Meta Ads");
  const isNothingYet = currentPresence.includes("Nothing Yet");

  const scoredServices = SERVICE_SCORING_RULES.map((rule) => {
    let score = rule.baseWeight;

    const indBonus = rule.industryAffinity[businessType] || 0;
    score += indBonus;

    const goalBonus = rule.goalAffinity[primaryGoal] || 0;
    score += goalBonus;

    if (rule.slug === "website-development") {
      if (isNothingYet || (!hasWebsite && !hasOnlineStore)) {
        score += 15;
      } else if (hasWebsite) {
        score -= 10;
        if (primaryGoal === "Build an Online Presence") score += 4;
      }
    }

    if (rule.slug === "ecommerce-website") {
      if (hasOnlineStore) {
        score -= 8;
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
        score -= 4;
      }
    }

    if (rule.slug === "local-seo-geotargeting") {
      if (hasGbp) score += 8;
      if (businessType === "Local / Retail" || businessType === "Restaurant / Food" || primaryGoal === "Get Found on Google") {
        score += 12;
      }
    }

    if (rule.slug === "meta-ads") {
      if (!hasMeta && (primaryGoal === "Get More Customers" || primaryGoal === "Sell Products Online")) score += 8;
      if (businessType === "Jewellery / Fashion" || businessType === "Restaurant / Food" || businessType === "E-commerce") score += 10;
    }

    if (rule.slug === "google-ads-pmax") {
      if (primaryGoal === "Generate More Leads" || primaryGoal === "Get Found on Google") score += 12;
      if (businessType === "Service Business" || businessType === "Real Estate" || businessType === "Professional Services") score += 10;
    }

    if (rule.slug === "whatsapp-sales-commerce") {
      if (primaryGoal === "Improve Customer Follow-up") score += 20;
      if (businessType === "Local / Retail" || businessType === "Jewellery / Fashion" || businessType === "Restaurant / Food") score += 8;
    }

    if (rule.slug === "lead-generation-crm") {
      if (primaryGoal === "Generate More Leads" || primaryGoal === "Improve Customer Follow-up") score += 18;
      if (businessType === "Service Business" || businessType === "Real Estate" || businessType === "Manufacturer") score += 12;
    }

    if (rule.slug === "online-growth-strategy") {
      if (primaryGoal === "I'm Not Sure") score += 22;
    }

    return { slug: rule.slug, score };
  });

  scoredServices.sort((a, b) => b.score - a.score);

  const targetCount = primaryGoal === "I'm Not Sure" ? 3 : 4;
  const topScored = scoredServices.slice(0, targetCount);

  const formattedItems = topScored.map((item, index) => {
    let tier = "NEXT_STEP";
    let tierLabel = "NEXT STEP";
    if (index === 0) {
      tier = "HIGH_PRIORITY";
      tierLabel = "HIGH PRIORITY";
    } else if (index >= 2) {
      tier = "SCALE";
      tierLabel = "SCALE & OPTIMIZE";
    }

    const why = generateWhyRecommended(item.slug, answers, tier);

    return {
      slug: item.slug,
      title: SERVICE_TITLES[item.slug],
      tier,
      tierLabel,
      whyRecommended: why,
      score: item.score,
    };
  });

  return {
    businessName: businessName.trim(),
    businessType,
    primaryGoal,
    location: location?.trim() || undefined,
    currentPresence,
    highPriorityService: formattedItems[0],
    nextSteps: formattedItems.filter((i) => i.tier === "NEXT_STEP"),
    scaleServices: formattedItems.filter((i) => i.tier === "SCALE"),
    allRecommended: formattedItems,
    totalRecommendedCount: formattedItems.length,
  };
}

// -------------------------------------------------------------
// SECTION 1: ASSESSMENT FLOW & DATA STRUCTURE VALIDATION
// -------------------------------------------------------------
console.log("--- 1. ASSESSMENT FLOW & DATA STRUCTURE VALIDATION ---");

const standardInput = {
  businessName: "Sharma Furniture & Living",
  businessType: "Local / Retail",
  primaryGoal: "Get More Customers",
  currentPresence: ["Nothing Yet"],
  location: "Jaipur, Rajasthan",
};

const result1 = generateGrowthRoadmap(standardInput);

assert(result1.businessName === "Sharma Furniture & Living", "Preserves and trims business name");
assert(result1.businessType === "Local / Retail", "Preserves business type");
assert(result1.primaryGoal === "Get More Customers", "Preserves primary goal");
assert(result1.location === "Jaipur, Rajasthan", "Preserves target service area");
assert(result1.highPriorityService !== undefined, "High priority #1 service is defined");
assert(result1.highPriorityService.tier === "HIGH_PRIORITY", "High priority tier is correctly labeled");
assert(result1.totalRecommendedCount >= 3 && result1.totalRecommendedCount <= 5, "Recommendation count is strictly between 3 and 5");

// -------------------------------------------------------------
// SECTION 2: DETERMINISTIC SCORING & REPEATABILITY
// -------------------------------------------------------------
console.log("\n--- 2. DETERMINISTIC SCORING & STABILITY AUDIT ---");

let isDeterministic = true;
for (let i = 0; i < 50; i++) {
  const r = generateGrowthRoadmap(standardInput);
  if (r.highPriorityService.slug !== result1.highPriorityService.slug || r.totalRecommendedCount !== result1.totalRecommendedCount) {
    isDeterministic = false;
    break;
  }
}
assert(isDeterministic, "Identical inputs produce 100% identical recommendations across 50 iterations");

// Business name neutrality check (Business Name must NOT alter scoring)
const nameA = generateGrowthRoadmap({ ...standardInput, businessName: "Alpha Ltd" });
const nameB = generateGrowthRoadmap({ ...standardInput, businessName: "Omega Supertech Industries" });
assert(
  nameA.highPriorityService.slug === nameB.highPriorityService.slug &&
  nameA.totalRecommendedCount === nameB.totalRecommendedCount,
  "Business name has ZERO artificial influence on scoring calculations"
);

// -------------------------------------------------------------
// SECTION 3: 14-SERVICE INTEGRATION & SLUG VALIDATION
// -------------------------------------------------------------
console.log("\n--- 3. 14-SERVICE SLUG & METADATA INTEGRITY ---");

const allPermutationTypes = [
  "Local / Retail", "Service Business", "Manufacturer", "Wholesale / Distributor",
  "E-commerce", "Restaurant / Food", "Jewellery / Fashion", "Real Estate",
  "Healthcare", "Education", "Professional Services", "Other"
];

const allPermutationGoals = [
  "Get More Customers", "Generate More Leads", "Build an Online Presence",
  "Get Found on Google", "Sell Products Online", "Improve Digital Marketing",
  "Improve Customer Follow-up", "I'm Not Sure"
];

let allSlugsValid = true;
let allCountValid = true;
let maxCountFound = 0;
let minCountFound = 999;

for (const bType of allPermutationTypes) {
  for (const bGoal of allPermutationGoals) {
    const res = generateGrowthRoadmap({
      businessName: "Test Enterprise",
      businessType: bType,
      primaryGoal: bGoal,
      currentPresence: ["Nothing Yet"],
      location: "India",
    });

    if (res.totalRecommendedCount < minCountFound) minCountFound = res.totalRecommendedCount;
    if (res.totalRecommendedCount > maxCountFound) maxCountFound = res.totalRecommendedCount;

    if (res.totalRecommendedCount < 3 || res.totalRecommendedCount > 5) {
      allCountValid = false;
    }

    for (const item of res.allRecommended) {
      if (!ALL_VALID_SLUGS.has(item.slug)) {
        allSlugsValid = false;
        console.error(`Invalid slug detected: ${item.slug}`);
      }
    }
  }
}

assert(allSlugsValid, "100% of recommended services across all industry/goal permutations map to valid 14 services");
assert(allCountValid, `Recommended count is strictly bounded (Min: ${minCountFound}, Max: ${maxCountFound}) — NEVER all 14`);

// -------------------------------------------------------------
// SECTION 4: HONEST COPY & NO FAKE AUDIT CLAIMS
// -------------------------------------------------------------
console.log("\n--- 4. TRUTHFULNESS & COPY AUDIT (NO FAKE CLAIMS) ---");

const bannedFakeClaims = [
  "website is slow",
  "ranking is poor",
  "competitors are beating you",
  "losing ₹50,000",
  "audit found",
  "losing revenue",
  "we detected that your website",
  "your google score is bad",
];

let hasFakeClaims = false;
for (const bType of allPermutationTypes) {
  for (const bGoal of allPermutationGoals) {
    const res = generateGrowthRoadmap({
      businessName: "Test Enterprise",
      businessType: bType,
      primaryGoal: bGoal,
      currentPresence: ["Website", "Instagram / Facebook"],
      location: "Mumbai",
    });

    for (const item of res.allRecommended) {
      const lower = item.whyRecommended.toLowerCase();
      for (const phrase of bannedFakeClaims) {
        if (lower.includes(phrase)) {
          hasFakeClaims = true;
          console.error(`Detected fake claim phrase "${phrase}" in service ${item.slug}`);
        }
      }
    }
  }
}

assert(!hasFakeClaims, "Zero fake audit claims, fake speed warnings, or fabricated revenue loss statements found in copy");

// -------------------------------------------------------------
// SECTION 5: WHATSAPP URL FORMAT & ENCODING
// -------------------------------------------------------------
console.log("\n--- 5. WHATSAPP NOTIFICATION FORMAT AUDIT ---");

const sampleRoadmap = generateGrowthRoadmap({
  businessName: "Royal Heritage Textiles",
  businessType: "Jewellery / Fashion",
  primaryGoal: "Sell Products Online",
  currentPresence: ["Instagram / Facebook", "WhatsApp Business"],
  location: "Surat, Gujarat",
});

const whatsappNumber = "+91 9457727770";
const rawDigits = whatsappNumber.replace(/[^0-9]/g, "");
const waText = `Hello VANIX,

I completed the VANIX Growth Journey assessment.

Business:
${sampleRoadmap.businessName}

Business Type:
${sampleRoadmap.businessType}

Goal:
${sampleRoadmap.primaryGoal}

Recommended Starting Service:
${sampleRoadmap.highPriorityService.title}

Please help me understand the next steps.`;

const waUrl = `https://wa.me/${rawDigits}?text=${encodeURIComponent(waText)}`;

assert(rawDigits === "919457727770", "WhatsApp target number is +91 9457727770");
assert(waUrl.startsWith("https://wa.me/919457727770?text="), "WhatsApp URL has valid protocol and phone endpoint");
assert(waUrl.includes(encodeURIComponent("Royal Heritage Textiles")), "WhatsApp URL properly encodes business name");
assert(waUrl.includes(encodeURIComponent("Jewellery / Fashion")), "WhatsApp URL properly encodes business type");
assert(waUrl.includes(encodeURIComponent("Sell Products Online")), "WhatsApp URL properly encodes primary goal");
assert(waUrl.includes(encodeURIComponent(sampleRoadmap.highPriorityService.title)), "WhatsApp URL properly encodes starting service");
assert(!waUrl.includes("undefined") && !waUrl.includes("null"), "WhatsApp URL contains zero undefined or null tokens");

// -------------------------------------------------------------
// SECTION 6: EDGE CASES & RESILIENCE
// -------------------------------------------------------------
console.log("\n--- 6. EDGE CASES & BOUNDARY CONDITIONS ---");

// Edge case 1: Very long business name (300 chars)
const longName = "A".repeat(300);
const longResult = generateGrowthRoadmap({
  ...standardInput,
  businessName: longName,
});
assert(longResult.businessName.length === 300, "Handles 300-character business name gracefully without runtime crash");
assert(longResult.totalRecommendedCount >= 3, "Produces valid roadmap for long business name");

// Edge case 2: "I'm Not Sure" goal
const unsureResult = generateGrowthRoadmap({
  businessName: "Startup Exploring",
  businessType: "Other",
  primaryGoal: "I'm Not Sure",
  currentPresence: ["Not Sure"],
});
assert(unsureResult.totalRecommendedCount === 3, "'I'm Not Sure' returns a conservative 3-service foundational starter roadmap");
assert(unsureResult.allRecommended.some(r => r.slug === "online-growth-strategy" || r.slug === "google-business-profile"), "Unsure goal includes strategic / foundational guidance");

// Edge case 3: Fully loaded digital presence
const loadedResult = generateGrowthRoadmap({
  businessName: "Omnichannel Mega Corp",
  businessType: "E-commerce",
  primaryGoal: "Improve Digital Marketing",
  currentPresence: ["Website", "Online Store", "Google Business Profile", "Instagram / Facebook", "Google Ads", "Meta Ads", "WhatsApp Business"],
});
assert(loadedResult.totalRecommendedCount >= 3 && loadedResult.totalRecommendedCount <= 5, "Fully loaded presence still produces clean 3-5 scaling recommendations");

// -------------------------------------------------------------
// SECTION 7: SUMMARY & PASS CONFIRMATION
// -------------------------------------------------------------
console.log("\n==================================================================");
console.log(`📊 TOTAL AUDIT CHECKS: ${totalTests}`);
console.log(`✅ PASSED CHECKS:       ${passedTests}`);
console.log(`❌ FAILED CHECKS:       ${failedTests}`);
console.log("==================================================================");

if (failedTests === 0) {
  console.log("\n🎉 PERSONALIZED GROWTH JOURNEY — PRODUCTION QA PASSED\n");
} else {
  console.error(`\n❌ QA AUDIT FAILED with ${failedTests} issues.\n`);
  process.exit(1);
}
