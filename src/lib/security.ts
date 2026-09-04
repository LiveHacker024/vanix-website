import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Rate limiting in-memory store (sliding window)
const rateLimitMap = new Map<string, { count: number; firstSeen: number }>();
const duplicateCheckMap = new Map<string, number>();

// Clean up stale rate limits every 10 minutes
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
}, 5 * 60 * 1000);

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
 * Basic in-memory rate limiting per IP address (max 5 requests per 5 minutes).
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

// Secret key for JWT sessions
const getAdminSecret = () => {
  const secret = process.env.ADMIN_SECRET || "vanix_production_default_secret_key_change_in_env_2026";
  return new TextEncoder().encode(secret);
};

export const ADMIN_COOKIE_NAME = "vanix_admin_session";

/**
 * Create a signed JWT admin session token (valid for 7 days).
 */
export async function createAdminSession(email: string): Promise<string> {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAdminSecret());

  return token;
}

/**
 * Verify JWT token and return session payload if valid.
 */
export async function verifyAdminSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAdminSecret());
    return payload as { email: string; role: string };
  } catch (error) {
    return null;
  }
}

/**
 * Helper to check current admin authentication from Next.js server cookie.
 */
export async function getAuthenticatedAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminSession(token);
}
