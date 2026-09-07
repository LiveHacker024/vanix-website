import http from 'http';

const BASE_URL = 'http://localhost:3001';

console.log("==================================================================");
console.log("🚀 VANIX FINAL END-TO-END CONVERSION FUNNEL AUDIT");
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

function fetchUrl(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    });

    req.on('error', (err) => reject(err));

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// 14 Service Slugs
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

async function runEndToEndFunnelQA() {
  // -------------------------------------------------------------
  // 1. HOMEPAGE & CTA ACCESSIBILITY
  // -------------------------------------------------------------
  console.log("--- 1. HOMEPAGE & CTA ACCESSIBILITY AUDIT ---");
  const homeRes = await fetchUrl('/');
  assert(homeRes.status === 200, "Homepage returns HTTP 200 OK");
  assert(homeRes.body.includes("START YOUR GROWTH JOURNEY"), "Homepage contains 'START YOUR GROWTH JOURNEY' CTA");
  assert(homeRes.body.includes("START YOUR GROWTH"), "Navbar contains 'START YOUR GROWTH' CTA");

  const logoRes = await fetchUrl('/images/vanix-logo.png');
  assert(logoRes.status === 200, "Brand Logo (/images/vanix-logo.png) returns HTTP 200 OK");

  const qrRes = await fetchUrl('/images/vanix-upi-qr.png');
  assert(qrRes.status === 200, "UPI QR Asset (/images/vanix-upi-qr.png) returns HTTP 200 OK");

  // -------------------------------------------------------------
  // 2. REQUIRED 4 CUSTOMER ASSESSMENT PROFILES (A, B, C, D)
  // -------------------------------------------------------------
  console.log("\n--- 2. REQUIRED 4 CUSTOMER ASSESSMENT PROFILES AUDIT ---");
  
  // Profile A: Sharma Furniture
  const profileA = generateGrowthRoadmap({
    businessName: "Sharma Furniture",
    businessType: "Local / Retail",
    primaryGoal: "Get More Customers",
    currentPresence: ["Nothing Yet"],
    location: "Delhi",
  });
  assert(profileA.businessName === "Sharma Furniture", "Profile A: Preserves business name 'Sharma Furniture'");
  assert(profileA.location === "Delhi", "Profile A: Preserves location 'Delhi'");
  assert(profileA.totalRecommendedCount >= 3 && profileA.totalRecommendedCount <= 5, "Profile A: Recommends 3-5 services");
  assert(profileA.highPriorityService.slug === "google-business-profile", "Profile A: #1 recommendation is Google Business Profile");

  // Profile B: ABC Digital Services
  const profileB = generateGrowthRoadmap({
    businessName: "ABC Digital Services",
    businessType: "Service Business",
    primaryGoal: "Generate More Leads",
    currentPresence: ["Instagram / Facebook"],
    location: "Delhi NCR",
  });
  assert(profileB.businessName === "ABC Digital Services", "Profile B: Preserves business name 'ABC Digital Services'");
  assert(profileB.totalRecommendedCount >= 3 && profileB.totalRecommendedCount <= 5, "Profile B: Recommends 3-5 services");
  assert(profileB.highPriorityService.slug === "lead-generation-crm", "Profile B: #1 recommendation is Lead Generation & CRM");

  // Profile C: Fashion Store
  const profileC = generateGrowthRoadmap({
    businessName: "Fashion Store",
    businessType: "E-commerce",
    primaryGoal: "Sell Products Online",
    currentPresence: ["Instagram / Facebook"],
    location: "Pan-India",
  });
  assert(profileC.businessName === "Fashion Store", "Profile C: Preserves business name 'Fashion Store'");
  assert(profileC.totalRecommendedCount >= 3 && profileC.totalRecommendedCount <= 5, "Profile C: Recommends 3-5 services");
  assert(profileC.highPriorityService.slug === "ecommerce-website", "Profile C: #1 recommendation is E-commerce Website");

  // Profile D: Manufacturing Company
  const profileD = generateGrowthRoadmap({
    businessName: "Manufacturing Company",
    businessType: "Manufacturer",
    primaryGoal: "Generate More Leads",
    currentPresence: ["Nothing Yet"],
    location: "Haryana",
  });
  assert(profileD.businessName === "Manufacturing Company", "Profile D: Preserves business name 'Manufacturing Company'");
  assert(profileD.totalRecommendedCount >= 3 && profileD.totalRecommendedCount <= 5, "Profile D: Recommends 3-5 services");
  assert(profileD.highPriorityService.slug === "lead-generation-crm", "Profile D: #1 recommendation is Lead Generation & CRM");

  // -------------------------------------------------------------
  // 3. SERVICE DETAIL ROUTING AUDIT (ALL 14 SERVICES)
  // -------------------------------------------------------------
  console.log("\n--- 3. SERVICE DETAIL ROUTING AUDIT (ALL 14 SERVICES) ---");
  let allServicePagesOk = true;
  for (const slug of ALL_14_SERVICE_SLUGS) {
    const res = await fetchUrl(`/services/${slug}`);
    if (res.status !== 200 || !res.body.includes("Book This Service — ₹999")) {
      allServicePagesOk = false;
      console.error(`  ✕ Service page failure: /services/${slug} (Status: ${res.status})`);
    }
  }
  assert(allServicePagesOk, "All 14 individual service detail pages return HTTP 200 and render ₹999 Booking CTA");

  // -------------------------------------------------------------
  // 4. ₹999 SERVICE BOOKING API & PRICING TAMPER PROTECTION
  // -------------------------------------------------------------
  console.log("\n--- 4. ₹999 SERVICE BOOKING & SERVER PRICING INTEGRITY ---");
  
  // Test A: Normal Valid Booking with price tampering attempt
  const timestamp = Date.now();
  const validBookingPayload = {
    name: "Kunal Sharma",
    businessName: "Sharma Furniture",
    phone: `98765${String(timestamp).slice(-5)}`,
    email: `sharma.${timestamp}@example.com`,
    serviceSlug: "google-business-profile",
    location: "Delhi",
    utr: `UTR${timestamp}`,
    amount: 1, // Malicious price tampering attempt
  };

  const bookingRes = await fetchUrl('/api/service-bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validBookingPayload),
  });

  assert(bookingRes.status === 201, "POST /api/service-bookings returns HTTP 201 Created");
  const bookingData = JSON.parse(bookingRes.body);
  assert(bookingData.success === true, "Booking API response success is true");
  assert(bookingData.booking.amount === 999, "Booking amount is SERVER-ENFORCED at ₹999 (tamper attempt neutralized)");
  assert(bookingData.booking.payment_status === "PAYMENT_VERIFICATION_PENDING", "Booking status is strictly PAYMENT_VERIFICATION_PENDING (no fake auto-verification)");
  assert(bookingData.booking.booking_reference.startsWith("VNX-"), `Generated valid booking reference: ${bookingData.booking.booking_reference}`);
  assert(bookingData.booking.service_slug === "google-business-profile", "Service slug correctly preserved in booking record");

  // Test B: Duplicate Booking Protection (submitting same contact info in < 15 seconds)
  const duplicateRes = await fetchUrl('/api/service-bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validBookingPayload),
  });
  assert(duplicateRes.status === 429, "Duplicate submission within 15 seconds correctly rejected with HTTP 429 Too Many Requests");

  // Test C: Invalid Service Slug
  const invalidSlugPayload = {
    name: "Test Customer",
    businessName: "Test Co",
    phone: "9123456789",
    serviceSlug: "non-existent-fake-service",
  };
  const invalidSlugRes = await fetchUrl('/api/service-bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invalidSlugPayload),
  });
  assert(invalidSlugRes.status === 400, "POST /api/service-bookings rejects invalid service slug with HTTP 400 Bad Request");

  // Test D: Missing Required Name/Phone
  const missingFieldPayload = {
    businessName: "Test Co",
    serviceSlug: "website-development",
  };
  const missingFieldRes = await fetchUrl('/api/service-bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(missingFieldPayload),
  });
  assert(missingFieldRes.status === 400, "POST /api/service-bookings rejects missing required name/phone with HTTP 400 Bad Request");

  // -------------------------------------------------------------
  // 5. INQUIRY / LEAD API AUDIT
  // -------------------------------------------------------------
  console.log("\n--- 5. INQUIRY / LEAD API INTEGRATION AUDIT ---");
  const leadPayload = {
    name: "Growth Plan Lead",
    businessName: "Sharma Furniture",
    phone: `99999${String(Date.now()).slice(-5)}`,
    email: `inquiry.${Date.now()}@example.com`,
    service: "Google Business Profile & Maps",
    message: "I completed the VANIX Growth Journey assessment for Sharma Furniture. Primary Goal: Get More Customers.",
  };

  const leadRes = await fetchUrl('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadPayload),
  });

  assert(leadRes.status === 200 || leadRes.status === 201, `POST /api/leads processed inquiry with HTTP ${leadRes.status}`);

  // -------------------------------------------------------------
  // 6. SUMMARY
  // -------------------------------------------------------------
  console.log("\n==================================================================");
  console.log(`📊 TOTAL END-TO-END AUDIT CHECKS: ${totalTests}`);
  console.log(`✅ PASSED CHECKS:                 ${passedTests}`);
  console.log(`❌ FAILED CHECKS:                 ${failedTests}`);
  console.log("==================================================================");

  if (failedTests === 0) {
    console.log("\n🎉 CONVERSION FUNNEL END-TO-END AUDIT PASSED!\n");
  } else {
    console.error(`\n❌ CONVERSION FUNNEL AUDIT FAILED with ${failedTests} issues.\n`);
    process.exit(1);
  }
}

runEndToEndFunnelQA().catch((err) => {
  console.error("Fatal QA Error:", err);
  process.exit(1);
});
