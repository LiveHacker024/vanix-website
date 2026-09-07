import http from 'http';

const BASE_URL = 'http://localhost:3001';

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

async function runBookingQA() {
  console.log('=== STARTING ₹999 SERVICE BOOKING & LOGO VERIFICATION ===\n');
  let allPassed = true;

  // 1. Check Images
  console.log('1. Checking Brand Logo and UPI QR images ...');
  const logoRes = await fetchUrl('/images/vanix-logo.png');
  if (logoRes.status === 200) {
    console.log('   ✓ /images/vanix-logo.png is served (200 OK)');
  } else {
    console.error('   ✕ Failed to fetch vanix-logo.png:', logoRes.status);
    allPassed = false;
  }

  const qrRes = await fetchUrl('/images/vanix-upi-qr.png');
  if (qrRes.status === 200) {
    console.log('   ✓ /images/vanix-upi-qr.png is served (200 OK)');
  } else {
    console.error('   ✕ Failed to fetch vanix-upi-qr.png:', qrRes.status);
    allPassed = false;
  }

  // 2. Check ₹999 CTA on all 14 service detail pages
  console.log('\n2. Verifying ₹999 Booking CTA on all 14 service pages ...');
  for (const slug of slugs) {
    const pageRes = await fetchUrl(`/services/${slug}`);
    if (pageRes.status === 200 && pageRes.body.includes('Book This Service — ₹999')) {
      console.log(`   ✓ [${slug}] contains 'Book This Service — ₹999' CTA`);
    } else {
      console.error(`   ✕ [${slug}] missing ₹999 CTA or failed with status ${pageRes.status}`);
      allPassed = false;
    }
  }

  // 3. Test POST /api/service-bookings with valid data
  console.log('\n3. Testing POST /api/service-bookings (Valid Booking) ...');
  const validPayload = JSON.stringify({
    name: 'Kunal Test Customer',
    businessName: 'Apex Enterprises',
    phone: '+91 9457727770',
    email: 'test@example.com',
    location: 'Shamli, UP',
    serviceSlug: 'website-development',
    utr: 'UTR945772777012',
    note: 'Need modern website with fast speed'
  });

  const bookingRes = await fetchUrl('/api/service-bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: validPayload
  });

  if (bookingRes.status === 201) {
    const data = JSON.parse(bookingRes.body);
    if (
      data.success &&
      data.booking &&
      data.booking.booking_reference.startsWith('VNX-') &&
      data.booking.amount === 999 &&
      data.booking.payment_status === 'PAYMENT_VERIFICATION_PENDING'
    ) {
      console.log('   ✓ Service booking successfully created:');
      console.log(`     - Reference: ${data.booking.booking_reference}`);
      console.log(`     - Service: ${data.booking.service_name} (${data.booking.service_slug})`);
      console.log(`     - Amount: ₹${data.booking.amount} ${data.booking.currency}`);
      console.log(`     - Status: ${data.booking.payment_status}`);
      console.log(`     - UPI ID: ${data.booking.upi_id}`);
      console.log(`     - UTR: ${data.booking.utr}`);
    } else {
      console.error('   ✕ Unexpected booking response payload:', data);
      allPassed = false;
    }
  } else {
    console.error(`   ✕ POST /api/service-bookings returned status ${bookingRes.status}:`, bookingRes.body);
    allPassed = false;
  }

  // 4. Test Invalid Service Slug
  console.log('\n4. Testing POST /api/service-bookings (Invalid Service Slug) ...');
  const invalidSlugPayload = JSON.stringify({
    name: 'Test Customer',
    businessName: 'Apex',
    phone: '+91 9457727770',
    serviceSlug: 'invalid-fake-service-slug'
  });
  const invalidSlugRes = await fetchUrl('/api/service-bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: invalidSlugPayload
  });
  if (invalidSlugRes.status === 400) {
    console.log('   ✓ Correctly rejected invalid service slug with 400 Bad Request');
  } else {
    console.error('   ✕ Expected status 400 for invalid slug, got:', invalidSlugRes.status);
    allPassed = false;
  }

  // 5. Test Missing Required Fields
  console.log('\n5. Testing POST /api/service-bookings (Missing Name/Phone) ...');
  const missingFieldPayload = JSON.stringify({
    name: '',
    phone: '',
    serviceSlug: 'website-development'
  });
  const missingFieldRes = await fetchUrl('/api/service-bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: missingFieldPayload
  });
  if (missingFieldRes.status === 400) {
    console.log('   ✓ Correctly rejected missing required fields with 400 Bad Request');
  } else {
    console.error('   ✕ Expected status 400 for missing fields, got:', missingFieldRes.status);
    allPassed = false;
  }

  console.log('\n======================================================');
  if (allPassed) {
    console.log('🎉 ALL ₹999 SERVICE BOOKING & BRAND LOGO TESTS PASSED!');
  } else {
    console.error('❌ SOME BOOKING QA CHECKS FAILED.');
  }
  console.log('======================================================\n');
}

runBookingQA().catch(console.error);
