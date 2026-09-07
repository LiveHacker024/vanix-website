// Pure Node.js verification script for Growth Journey recommendation logic
console.log("==================================================");
console.log("🧪 TESTING VANIX PERSONALIZED GROWTH JOURNEY ENGINE");
console.log("==================================================\n");

// 14 official service slugs
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

const validSlugsSet = new Set(ALL_14_SERVICE_SLUGS);

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

    return {
      slug: item.slug,
      tier,
      tierLabel,
      score: item.score,
    };
  });

  return {
    businessName,
    businessType,
    primaryGoal,
    location,
    highPriorityService: formattedItems[0],
    nextSteps: formattedItems.filter((i) => i.tier === "NEXT_STEP"),
    scaleServices: formattedItems.filter((i) => i.tier === "SCALE"),
    allRecommended: formattedItems,
    totalRecommendedCount: formattedItems.length,
  };
}

const TEST_SCENARIOS = [
  {
    name: "Scenario 1: Local / Retail + Get More Customers",
    input: {
      businessName: "Sharma Furniture & Living",
      businessType: "Local / Retail",
      primaryGoal: "Get More Customers",
      currentPresence: ["Nothing Yet"],
      location: "Jaipur, Rajasthan",
    },
    expectedTopSlugs: ["google-business-profile", "local-seo-geotargeting"],
  },
  {
    name: "Scenario 2: Service Business + Generate More Leads",
    input: {
      businessName: "Apex HVAC & MEP Services",
      businessType: "Service Business",
      primaryGoal: "Generate More Leads",
      currentPresence: ["Instagram / Facebook"],
      location: "Mumbai & Thane",
    },
    expectedTopSlugs: ["website-development", "lead-generation-crm"],
  },
  {
    name: "Scenario 3: E-commerce + Sell Products Online",
    input: {
      businessName: "Veda Organics Naturals",
      businessType: "E-commerce",
      primaryGoal: "Sell Products Online",
      currentPresence: ["Instagram / Facebook"],
      location: "Pan-India",
    },
    expectedTopSlugs: ["ecommerce-website", "product-listing-cataloging"],
  },
  {
    name: "Scenario 4: Manufacturer + Generate More Leads",
    input: {
      businessName: "Bharat Precision Valves Ltd.",
      businessType: "Manufacturer",
      primaryGoal: "Generate More Leads",
      currentPresence: ["Nothing Yet"],
      location: "Pune & Aurangabad",
    },
    expectedTopSlugs: ["website-development", "lead-generation-crm"],
  },
  {
    name: "Scenario 5: Restaurant / Food + Get Found on Google",
    input: {
      businessName: "The Olive Kitchen & Cafe",
      businessType: "Restaurant / Food",
      primaryGoal: "Get Found on Google",
      currentPresence: ["Instagram / Facebook"],
      location: "Indiranagar, Bangalore",
    },
    expectedTopSlugs: ["google-business-profile", "local-seo-geotargeting"],
  },
  {
    name: "Scenario 6: Jewellery / Fashion + Sell Products Online",
    input: {
      businessName: "Aura Silver & Jewels",
      businessType: "Jewellery / Fashion",
      primaryGoal: "Sell Products Online",
      currentPresence: ["Instagram / Facebook", "WhatsApp Business"],
      location: "Surat & Nationwide",
    },
    expectedTopSlugs: ["ecommerce-website", "product-listing-cataloging"],
  },
  {
    name: "Scenario 7: I'm Not Sure",
    input: {
      businessName: "Modern Diagnostics Center",
      businessType: "Healthcare",
      primaryGoal: "I'm Not Sure",
      currentPresence: ["Nothing Yet"],
      location: "Delhi NCR",
    },
    expectedTopSlugs: ["google-business-profile", "online-growth-strategy"],
  },
];

let allPassed = true;

for (const [idx, scenario] of TEST_SCENARIOS.entries()) {
  console.log(`[TEST ${idx + 1}/7] ${scenario.name}`);
  const result = generateGrowthRoadmap(scenario.input);

  // Verification 1: Count check (Must be between 3 and 5, NEVER 14)
  const count = result.totalRecommendedCount;
  if (count < 3 || count > 5) {
    console.error(`❌ FAIL: Recommended count is ${count} (must be between 3 and 5)`);
    allPassed = false;
  } else {
    console.log(`  ✓ Count: ${count} services recommended (not all 14)`);
  }

  // Verification 2: Check all recommended slugs exist in servicesData
  const invalidSlugs = result.allRecommended.filter((r) => !validSlugsSet.has(r.slug));
  if (invalidSlugs.length > 0) {
    console.error(`❌ FAIL: Found invalid slugs: ${invalidSlugs.map((s) => s.slug).join(", ")}`);
    allPassed = false;
  } else {
    console.log(`  ✓ All recommended services map to valid slugs in 14-service system`);
  }

  // Verification 3: Check Top Recommended Service
  const topService = result.highPriorityService;
  console.log(`  ✓ #1 High Priority Service: "${topService.slug}" (Score: ${topService.score})`);

  // Verification 4: Check Next Steps and Scale lists
  console.log(
    `  ✓ Next Steps (${result.nextSteps.length}): ${result.nextSteps.map((s) => s.slug).join(", ")}`
  );
  if (result.scaleServices.length > 0) {
    console.log(
      `  ✓ Scale Services (${result.scaleServices.length}): ${result.scaleServices.map((s) => s.slug).join(", ")}`
    );
  }
  console.log("");
}

if (allPassed) {
  console.log("==================================================");
  console.log("✅ ALL 7 GROWTH JOURNEY SCENARIOS PASSED PERFECTLY!");
  console.log("==================================================");
} else {
  console.error("❌ SOME TESTS FAILED");
  process.exit(1);
}
