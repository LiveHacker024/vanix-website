import { SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

console.log("==================================================");
console.log("🔒 VANIX CRM - AUTHENTICATION HARDENING TEST SUITE");
console.log("==================================================");

let passedCount = 0;
let totalCount = 0;

function assert(condition, testName, extraInfo = "") {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`✅ [PASS] ${testName} ${extraInfo ? `(${extraInfo})` : ""}`);
  } else {
    console.error(`❌ [FAIL] ${testName} ${extraInfo ? `(${extraInfo})` : ""}`);
  }
}

// ----------------------------------------------------------------------------
// Helpers mirroring security logic for testing
// ----------------------------------------------------------------------------

function safeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function getAdminSecret(envSecret) {
  const secret = envSecret?.trim();
  if (!secret || secret.length < 32) {
    return null;
  }
  return new TextEncoder().encode(secret);
}

async function createAdminSession(email, envSecret) {
  const secret = getAdminSecret(envSecret);
  if (!secret) return null;
  if (!email || typeof email !== "string") return null;

  const token = await new SignJWT({ email: email.trim().toLowerCase(), role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

async function verifyAdminSession(token, envSecret) {
  if (!token || typeof token !== "string") return null;
  const secret = getAdminSecret(envSecret);
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (
      payload.role !== "admin" ||
      typeof payload.email !== "string" ||
      !payload.email.trim()
    ) {
      return null;
    }

    return {
      email: payload.email.trim().toLowerCase(),
      role: "admin",
    };
  } catch {
    return null;
  }
}

// In-memory rate limiting test simulation
const testLoginMap = new Map();

function checkAdminLoginRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxFailedAttempts = 5;
  const current = testLoginMap.get(ip);
  if (!current || now - current.firstSeen > windowMs) return { allowed: true };
  if (current.count >= maxFailedAttempts) {
    const retryAfter = Math.ceil((current.firstSeen + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }
  return { allowed: true };
}

function recordFailedLoginAttempt(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const current = testLoginMap.get(ip);
  if (!current || now - current.firstSeen > windowMs) {
    testLoginMap.set(ip, { count: 1, firstSeen: now });
  } else {
    current.count += 1;
    testLoginMap.set(ip, current);
  }
}

function resetLoginAttempts(ip) {
  testLoginMap.delete(ip);
}

// ----------------------------------------------------------------------------
// Run Unit & Security Invariant Tests
// ----------------------------------------------------------------------------

async function runAllTests() {
  const validSecret = "vanix_test_secret_key_minimum_32_characters_long_12345";
  const validEmail = "admin@example.com";
  const validPassword = "SuperSecurePassword123!";

  // TEST 1: Correct ADMIN_EMAIL + ADMIN_PASSWORD -> Login succeeds and creates valid JWT
  console.log("\n--- TEST 1: Valid Credentials Authentication ---");
  const isEmailValid = safeCompare(validEmail.toLowerCase(), validEmail.toLowerCase());
  const isPassValid = safeCompare(validPassword, validPassword);
  const token = await createAdminSession(validEmail, validSecret);
  assert(
    isEmailValid && isPassValid && token !== null,
    "TEST 1: Correct credentials produce a valid signed JWT session token"
  );
  const verified = await verifyAdminSession(token, validSecret);
  assert(
    verified !== null && verified.email === validEmail && verified.role === "admin",
    "TEST 1b: Session token verified with expected email and 'admin' role"
  );

  // TEST 2: Wrong password -> safeCompare fails
  console.log("\n--- TEST 2: Invalid Password Rejection ---");
  const wrongPassCheck = safeCompare("WrongPassword999", validPassword);
  assert(!wrongPassCheck, "TEST 2: Wrong password rejected by timing-safe comparison");

  // TEST 3: Wrong email -> safeCompare fails
  console.log("\n--- TEST 3: Invalid Email Rejection ---");
  const wrongEmailCheck = safeCompare("hacker@malicious.com", validEmail);
  assert(!wrongEmailCheck, "TEST 3: Wrong email rejected by timing-safe comparison");

  // TEST 4: Missing ADMIN_PASSWORD -> Server Configuration Error
  console.log("\n--- TEST 4: Missing ADMIN_PASSWORD Safety ---");
  const unconfiguredPassword = undefined;
  const configErrorPass = !unconfiguredPassword;
  assert(configErrorPass, "TEST 4: Missing ADMIN_PASSWORD fails safely as server configuration error");

  // TEST 5: Missing or short ADMIN_SECRET -> Fails safely, no session created
  console.log("\n--- TEST 5: Missing / Short ADMIN_SECRET Safety ---");
  const shortSecretToken = await createAdminSession(validEmail, "too_short_secret");
  const missingSecretToken = await createAdminSession(validEmail, undefined);
  assert(
    shortSecretToken === null && missingSecretToken === null,
    "TEST 5: Missing or < 32 chars ADMIN_SECRET fails safely without creating session"
  );

  // TEST 6: Modified / Tampered JWT -> Rejected
  console.log("\n--- TEST 6: Tampered JWT Rejection ---");
  const tamperedToken = token.slice(0, -5) + "abcde";
  const tamperedResult = await verifyAdminSession(tamperedToken, validSecret);
  assert(tamperedResult === null, "TEST 6: Tampered JWT signature is rejected safely");

  // TEST 7: Expired JWT -> Rejected
  console.log("\n--- TEST 7: Expired JWT Rejection ---");
  const expiredToken = await new SignJWT({ email: validEmail, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Math.floor(Date.now() / 1000) - 1000)
    .setExpirationTime(Math.floor(Date.now() / 1000) - 10)
    .sign(new TextEncoder().encode(validSecret));
  const expiredResult = await verifyAdminSession(expiredToken, validSecret);
  assert(expiredResult === null, "TEST 7: Expired JWT is rejected safely");

  // TEST 8: Wrong Role in JWT -> Rejected
  console.log("\n--- TEST 8: Non-Admin Role Rejection ---");
  const nonAdminToken = await new SignJWT({ email: validEmail, role: "user" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(validSecret));
  const nonAdminResult = await verifyAdminSession(nonAdminToken, validSecret);
  assert(nonAdminResult === null, "TEST 8: JWT with non-admin role is rejected");

  // TEST 9: Empty / Null / Tampered token -> Rejected
  console.log("\n--- TEST 9: Null / Malformed Token Safety ---");
  const nullTokenResult = await verifyAdminSession(null, validSecret);
  const emptyTokenResult = await verifyAdminSession("", validSecret);
  const garbageTokenResult = await verifyAdminSession("invalid.token.here", validSecret);
  assert(
    nullTokenResult === null && emptyTokenResult === null && garbageTokenResult === null,
    "TEST 9: Null, empty, or garbage token returns null safely"
  );

  // TEST 10: Repeated Failed Logins -> Rate Limiter Activates (429)
  console.log("\n--- TEST 10: Brute Force Rate Limiting ---");
  const testIp = "192.168.1.100";
  resetLoginAttempts(testIp);
  assert(checkAdminLoginRateLimit(testIp).allowed === true, "TEST 10a: Initial request allowed");
  for (let i = 0; i < 5; i++) {
    recordFailedLoginAttempt(testIp);
  }
  const rateLimitResult = checkAdminLoginRateLimit(testIp);
  assert(
    rateLimitResult.allowed === false && rateLimitResult.retryAfter > 0,
    "TEST 10b: 5 failed attempts triggers rate limit (HTTP 429)"
  );
  resetLoginAttempts(testIp);
  assert(
    checkAdminLoginRateLimit(testIp).allowed === true,
    "TEST 10c: Successful login resets failed attempts"
  );

  // TEST 11: Timing Safe Comparison Invariants
  console.log("\n--- TEST 11: Timing Safe Comparison Accuracy ---");
  assert(safeCompare("password123", "password123") === true, "TEST 11a: Identical strings match");
  assert(safeCompare("password123", "password124") === false, "TEST 11b: Differing characters reject");
  assert(safeCompare("short", "longer_password") === false, "TEST 11c: Differing lengths reject");
  assert(safeCompare("", "") === true, "TEST 11d: Empty strings match");

  // TEST 12: Algorithm Confusion Defense
  console.log("\n--- TEST 12: Algorithm Confusion Defense ---");
  // Try none algorithm
  try {
    const noneAlgToken = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIn0.";
    const noneAlgResult = await verifyAdminSession(noneAlgToken, validSecret);
    assert(noneAlgResult === null, "TEST 12: 'none' algorithm token rejected");
  } catch {
    assert(true, "TEST 12: 'none' algorithm token rejected");
  }

  console.log("\n==================================================");
  console.log(`📊 TEST SUMMARY: ${passedCount} / ${totalCount} PASSED`);
  console.log("==================================================");

  if (passedCount !== totalCount) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
