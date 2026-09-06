import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import crypto from "crypto";

// Rate limiting in-memory store (sliding window)
const rateLimitMap = new Map<string, { count: number; firstSeen: number }>();
const duplicateCheckMap = new Map<string, number>();

// Admin login brute force tracking (sliding window: 15 min, max 5 failed attempts)
const adminLoginAttemptsMap = new Map<string, { count: number; firstSeen: number }>();

// Clean up stale rate limits every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap.entries()) {
    if (now - val.firstSeen > 10 * 60 * 1000) {
      rateLimitMap.delete(key);
    }
  }
  for (const [key, timestamp] of duplicateCheckMap.entries()) {
    if (now - timestamp > 60 * 1000) {
      duplicateCheckMap.delete(key);
    }
  }
  for (const [key, val] of adminLoginAttemptsMap.entries()) {
    if (now - val.firstSeen > 15 * 60 * 1000) {
      adminLoginAttemptsMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Timing-safe string comparison using SHA-256 digests to prevent timing attacks.
 */
export function safeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Sanitize string inputs to strip HTML tags and avoid injection attacks.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/javascript:/gi, "") // Strip javascript scheme
    .trim();
}

/**
 * Validate RFC-compliant email address.
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate international or domestic phone numbers (at least 7 digits, max 20 characters).
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  return /^\d{7,15}$/.test(cleaned);
}

/**
 * Basic in-memory rate limiting per IP address for public leads (max 10 requests per 5 minutes).
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const maxRequests = 10;

  const current = rateLimitMap.get(ip);
  if (!current || now - current.firstSeen > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstSeen: now });
    return { allowed: true };
  }

  if (current.count >= maxRequests) {
    const retryAfter = Math.ceil((current.firstSeen + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }

  current.count += 1;
  rateLimitMap.set(ip, current);
  return { allowed: true };
}

/**
 * Brute-force protection for admin login: max 5 failed attempts per 15 minutes per IP.
 */
export function checkAdminLoginRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxFailedAttempts = 5;

  const current = adminLoginAttemptsMap.get(ip);
  if (!current || now - current.firstSeen > windowMs) {
    return { allowed: true };
  }

  if (current.count >= maxFailedAttempts) {
    const retryAfter = Math.ceil((current.firstSeen + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

/**
 * Record a failed admin login attempt for rate limiting.
 */
export function recordFailedLoginAttempt(ip: string): void {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const current = adminLoginAttemptsMap.get(ip);

  if (!current || now - current.firstSeen > windowMs) {
    adminLoginAttemptsMap.set(ip, { count: 1, firstSeen: now });
  } else {
    current.count += 1;
    adminLoginAttemptsMap.set(ip, current);
  }
}

/**
 * Reset failed admin login attempts on successful login.
 */
export function resetLoginAttempts(ip: string): void {
  adminLoginAttemptsMap.delete(ip);
}

/**
 * Detect rapid duplicate submissions (within 15 seconds) with same phone or email.
 */
export function isDuplicateSubmission(phone: string, email?: string): boolean {
  const key = `${phone.trim()}_${(email || "").trim()}`;
  const now = Date.now();
  const lastTime = duplicateCheckMap.get(key);

  if (lastTime && now - lastTime < 15 * 1000) {
    return true;
  }

  duplicateCheckMap.set(key, now);
  return false;
}

/**
 * Retrieve the strictly verified server-side ADMIN_SECRET key.
 * Requires minimum 32 characters; fails safely without default fallback.
 */
export function getAdminSecret(): Uint8Array | null {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret || secret.length < 32) {
    console.error(
      "[Security Configuration Error]: ADMIN_SECRET is missing or less than 32 characters in server environment."
    );
    return null;
  }
  return new TextEncoder().encode(secret);
}

export const ADMIN_COOKIE_NAME = "vanix_admin_session";

/**
 * Create a signed HS256 JWT admin session token (valid for 7 days).
 */
export async function createAdminSession(email: string): Promise<string | null> {
  const secret = getAdminSecret();
  if (!secret) return null;
  if (!email || typeof email !== "string" || !validateEmail(email)) {
    return null;
  }

  const token = await new SignJWT({ email: email.trim().toLowerCase(), role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

/**
 * Verify JWT token and return session payload if valid.
 */
export async function verifyAdminSession(
  token: string
): Promise<{ email: string; role: "admin" } | null> {
  if (!token || typeof token !== "string") return null;
  const secret = getAdminSecret();
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

/**
 * Helper to check current admin authentication from Next.js server cookie.
 */
export async function getAuthenticatedAdmin(): Promise<{ email: string; role: "admin" } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminSession(token);
  } catch {
    return null;
  }
}
