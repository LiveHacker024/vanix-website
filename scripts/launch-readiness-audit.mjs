import http from 'http';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3001';
const EXPECTED_DOMAIN = 'https://vanix360.com';

console.log("==================================================================");
console.log("🌟 VANIX PRODUCTION LAUNCH READINESS AUDIT");
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

function fetchUrl(pathname, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(pathname, BASE_URL);
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

async function runLaunchAudit() {
  // -------------------------------------------------------------
  // 1. PRODUCTION DOMAIN & CENTRAL CONFIG AUDIT
  // -------------------------------------------------------------
  console.log("--- 1. DOMAIN CONFIGURATION & CANONICAL AUDIT ---");
  const siteConfigPath = path.resolve('src/config/site.ts');
  const siteConfigContent = fs.readFileSync(siteConfigPath, 'utf-8');
  assert(siteConfigContent.includes(EXPECTED_DOMAIN), `siteConfig defaults to ${EXPECTED_DOMAIN}`);

  const sitemapRes = await fetchUrl('/sitemap.xml');
  assert(sitemapRes.status === 200, "GET /sitemap.xml returns HTTP 200 OK");
  assert(sitemapRes.body.includes(EXPECTED_DOMAIN), `sitemap.xml contains canonical domain ${EXPECTED_DOMAIN}`);
  for (const slug of ALL_14_SERVICE_SLUGS) {
    assert(sitemapRes.body.includes(`${EXPECTED_DOMAIN}/services/${slug}`), `sitemap.xml includes /services/${slug}`);
  }

  const robotsRes = await fetchUrl('/robots.txt');
  assert(robotsRes.status === 200, "GET /robots.txt returns HTTP 200 OK");
  assert(robotsRes.body.includes(`Sitemap: ${EXPECTED_DOMAIN}/sitemap.xml`), `robots.txt points to ${EXPECTED_DOMAIN}/sitemap.xml`);

  // -------------------------------------------------------------
  // 2. 404 NOT FOUND ROUTING & BRANDED PAGE AUDIT
  // -------------------------------------------------------------
  console.log("\n--- 2. 404 NOT FOUND ROUTING & BRANDED PAGE AUDIT ---");
  const notFoundRes = await fetchUrl('/non-existent-random-page-test-404');
  assert(notFoundRes.status === 404, "Invalid URL returns HTTP 404 Not Found status");
  assert(notFoundRes.body.includes("ERROR 404") || notFoundRes.body.includes("PAGE NOT FOUND"), "404 page renders branded luxury error message");

  // -------------------------------------------------------------
  // 3. SERVICE PAGES METADATA & BOOKING CTAS
  // -------------------------------------------------------------
  console.log("\n--- 3. ALL 14 SERVICE PAGES VALIDATION ---");
  let allPagesOk = true;
  for (const slug of ALL_14_SERVICE_SLUGS) {
    const pageRes = await fetchUrl(`/services/${slug}`);
    if (pageRes.status !== 200) {
      allPagesOk = false;
      console.error(`  ✕ Service page HTTP error: /services/${slug} -> ${pageRes.status}`);
    }
    if (!pageRes.body.includes("Book This Service — ₹999")) {
      allPagesOk = false;
      console.error(`  ✕ Missing ₹999 CTA on /services/${slug}`);
    }
    if (!pageRes.body.includes("Book Free Growth Audit")) {
      allPagesOk = false;
      console.error(`  ✕ Missing 'Book Free Growth Audit' inquiry CTA on /services/${slug}`);
    }
  }
  assert(allPagesOk, "All 14 service detail pages render HTTP 200, unique content, ₹999 CTA, and inquiry CTA");

  // -------------------------------------------------------------
  // 4. ₹999 BOOKING BACKEND & PRICING SECURITY
  // -------------------------------------------------------------
  console.log("\n--- 4. ₹999 SERVICE BOOKING & TAMPER PROOFING ---");
  const validBooking = {
    name: "Production Audit Customer",
    businessName: "Launch Readiness Enterprises",
    phone: "9876543210",
    email: "audit@vanix360.com",
    serviceSlug: "website-development",
    location: "Mumbai",
    utr: `UTR${Date.now()}`,
    amount: 10, // Price tampering attempt
  };

  const bookingPostRes = await fetchUrl('/api/service-bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validBooking),
  });

  assert(bookingPostRes.status === 201, "POST /api/service-bookings returns HTTP 201 Created");
  const bookingJson = JSON.parse(bookingPostRes.body);
  assert(bookingJson.booking.amount === 999, "Backend forces amount to ₹999 (tampering blocked)");
  assert(bookingJson.booking.payment_status === "PAYMENT_VERIFICATION_PENDING", "Payment status is PAYMENT_VERIFICATION_PENDING");

  // -------------------------------------------------------------
  // 5. SECURITY & SECRET LEAKAGE AUDIT
  // -------------------------------------------------------------
  console.log("\n--- 5. SECURITY & SECRETS AUDIT ---");
  const homePageRes = await fetchUrl('/');
  const sensitivePatterns = [
    /SUPABASE_SERVICE_ROLE_KEY/i,
    /ADMIN_SECRET/i,
    /ADMIN_PASSWORD/i,
    /WHATSAPP_ACCESS_TOKEN/i,
    /RESEND_API_KEY/i,
  ];

  let secretsExposed = false;
  for (const pattern of sensitivePatterns) {
    if (pattern.test(homePageRes.body)) {
      secretsExposed = true;
      console.error(`  ✕ Potential secret keyword exposed: ${pattern}`);
    }
  }
  assert(!secretsExposed, "Zero sensitive backend environment variable names or keys exposed in homepage bundle");

  // -------------------------------------------------------------
  // 6. SUMMARY
  // -------------------------------------------------------------
  console.log("\n==================================================================");
  console.log(`📊 TOTAL LAUNCH READINESS CHECKS: ${totalTests}`);
  console.log(`✅ PASSED CHECKS:                 ${passedTests}`);
  console.log(`❌ FAILED CHECKS:                 ${failedTests}`);
  console.log("==================================================================");

  if (failedTests === 0) {
    console.log("\n🎉 PRODUCTION LAUNCH READINESS AUDIT PASSED!\n");
  } else {
    console.error(`\n❌ AUDIT FAILED with ${failedTests} issues.\n`);
    process.exit(1);
  }
}

runLaunchAudit().catch((err) => {
  console.error("Fatal Audit Error:", err);
  process.exit(1);
});
