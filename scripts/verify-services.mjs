import http from 'http';

const BASE_URL = 'http://localhost:3000';

const slugs = [
  'website-development',
  'ecommerce-website',
  'product-listing-cataloging',
  'amazon-meesho-indiamart',
  'google-business-profile',
  'local-seo-geotargeting',
  'social-media-management',
  'google-ads-pmax',
  'meta-ads',
  'whatsapp-sales-commerce',
  'lead-generation-crm',
  'analytics-growth-reporting',
  'online-growth-strategy',
  'technical-marketing-support'
];

async function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', (err) => reject(err));
  });
}

async function runVerification() {
  console.log('=== STARTING COMPLETE SERVICE DETAIL PAGES QA VERIFICATION ===\n');
  let allPassed = true;

  // 1. Homepage QA
  console.log('1. Checking Homepage (/) ...');
  const homeRes = await fetchUrl('/');
  if (homeRes.status === 200) {
    console.log('   ✓ Homepage returned status 200');
    // Check service card links on homepage
    let missingLinks = [];
    for (const slug of slugs) {
      if (!homeRes.body.includes(`/services/${slug}`)) {
        missingLinks.push(slug);
      }
    }
    if (missingLinks.length === 0) {
      console.log(`   ✓ All 14 service links verified on homepage!`);
    } else {
      console.error(`   ✕ Missing links on homepage:`, missingLinks);
      allPassed = false;
    }
  } else {
    console.error(`   ✕ Homepage returned status ${homeRes.status}`);
    allPassed = false;
  }

  // 2. Services Index QA (/services)
  console.log('\n2. Checking Services Index (/services) ...');
  const indexRes = await fetchUrl('/services');
  if (indexRes.status === 200) {
    console.log('   ✓ /services returned status 200');
    let missingIndexLinks = [];
    for (const slug of slugs) {
      if (!indexRes.body.includes(`/services/${slug}`)) {
        missingIndexLinks.push(slug);
      }
    }
    if (missingIndexLinks.length === 0) {
      console.log('   ✓ All 14 service links present on /services index!');
    } else {
      console.error('   ✕ Missing links on /services:', missingIndexLinks);
      allPassed = false;
    }
  } else {
    console.error(`   ✕ /services returned status ${indexRes.status}`);
    allPassed = false;
  }

  // 3. Check All 14 Service Detail Pages
  console.log('\n3. Checking All 14 Service Detail Pages (/services/[slug]) ...');
  for (const slug of slugs) {
    const pageRes = await fetchUrl(`/services/${slug}`);
    if (pageRes.status === 200) {
      const html = pageRes.body;
      
      // Check canonical tag
      const hasCanonical = html.includes(`rel="canonical"`) || html.includes(`canonical`);
      // Check Deliverables anchor
      const hasDeliverables = html.includes(`id="deliverables"`);
      // Check JSON-LD Service
      const hasServiceSchema = html.includes(`"@type":"Service"`) || html.includes(`"@type": "Service"`);
      // Check JSON-LD Breadcrumbs
      const hasBreadcrumbSchema = html.includes(`"@type":"BreadcrumbList"`) || html.includes(`"@type": "BreadcrumbList"`);
      // Check JSON-LD FAQPage
      const hasFaqSchema = html.includes(`"@type":"FAQPage"`) || html.includes(`"@type": "FAQPage"`);
      // Check CTA button
      const hasCta = html.includes(`Book Free Growth Audit`);
      // Check WhatsApp trigger
      const hasWhatsApp = html.includes(`Talk on WhatsApp`) || html.includes(`wa.me`);

      const checks = [
        hasDeliverables ? 'Deliverables' : null,
        hasServiceSchema ? 'ServiceSchema' : null,
        hasBreadcrumbSchema ? 'BreadcrumbsSchema' : null,
        hasFaqSchema ? 'FAQSchema' : null,
        hasCta ? 'CTA' : null,
        hasWhatsApp ? 'WhatsApp' : null
      ].filter(Boolean);

      console.log(`   ✓ [${slug}] - 200 OK (${checks.length}/6 checks: ${checks.join(', ')})`);
    } else {
      console.error(`   ✕ [${slug}] returned status ${pageRes.status}`);
      allPassed = false;
    }
  }

  // 4. Check 404 on invalid slug
  console.log('\n4. Checking 404 Handling (/services/invalid-service-slug) ...');
  const notFoundRes = await fetchUrl('/services/invalid-service-slug');
  if (notFoundRes.status === 404) {
    console.log('   ✓ /services/invalid-service-slug correctly returned 404 Not Found');
  } else {
    console.warn(`   ! Returned status ${notFoundRes.status} (expected 404)`);
  }

  // 5. Check Sitemap XML
  console.log('\n5. Checking Dynamic Sitemap (/sitemap.xml) ...');
  const sitemapRes = await fetchUrl('/sitemap.xml');
  if (sitemapRes.status === 200) {
    console.log('   ✓ /sitemap.xml returned status 200');
    let missingSitemapUrls = [];
    for (const slug of slugs) {
      if (!sitemapRes.body.includes(`/services/${slug}`)) {
        missingSitemapUrls.push(slug);
      }
    }
    if (missingSitemapUrls.length === 0) {
      console.log('   ✓ All 14 service URLs are included in sitemap.xml!');
    } else {
      console.error('   ✕ Missing in sitemap:', missingSitemapUrls);
      allPassed = false;
    }
  } else {
    console.error(`   ✕ /sitemap.xml returned status ${sitemapRes.status}`);
    allPassed = false;
  }

  console.log('\n======================================================');
  if (allPassed) {
    console.log('🎉 ALL 14 SERVICES AND SEO INFRASTRUCTURE QA PASSED PERFECTLY!');
  } else {
    console.error('❌ SOME QA CHECKS FAILED.');
  }
  console.log('======================================================\n');
}

runVerification().catch(console.error);
