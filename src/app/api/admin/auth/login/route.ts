import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  checkAdminLoginRateLimit,
  createAdminSession,
  recordFailedLoginAttempt,
  resetLoginAttempts,
  safeCompare,
  validateEmail,
} from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    // 1. Client IP & Rate Limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkAdminLoginRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Please try again in ${rateLimit.retryAfter || 60} seconds.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse & validate request payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    // 3. Verify Server-Side Configuration
    const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD;
    const adminSecret = process.env.ADMIN_SECRET?.trim();

    if (!expectedEmail || !expectedPassword || !adminSecret || adminSecret.length < 32) {
      console.error(
        "[Admin Auth Configuration Error]: Server environment variables ADMIN_EMAIL, ADMIN_PASSWORD, or ADMIN_SECRET are missing or improperly configured."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Authentication service unavailable. Server configuration error.",
        },
        { status: 500 }
      );
    }

    // 4. Validate credentials input
    if (!email || !password || !validateEmail(email)) {
      recordFailedLoginAttempt(ip);
      return NextResponse.json(
        { success: false, error: "Invalid admin email or password." },
        { status: 401 }
      );
    }

    // 5. Timing-safe credential comparison
    const isEmailMatch = safeCompare(email.toLowerCase(), expectedEmail);
    const isPasswordMatch = safeCompare(password, expectedPassword);

    if (!isEmailMatch || !isPasswordMatch) {
      recordFailedLoginAttempt(ip);
      return NextResponse.json(
        { success: false, error: "Invalid admin email or password." },
        { status: 401 }
      );
    }

    // 6. Successful authentication -> Reset failed attempts & issue session
    resetLoginAttempts(ip);

    const token = await createAdminSession(expectedEmail);
    if (!token) {
      console.error("[Admin Auth Error]: Failed to create signed admin session token.");
      return NextResponse.json(
        { success: false, error: "Failed to create secure session." },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: { email: expectedEmail, role: "admin" },
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[Admin Login Error]:", message);
    return NextResponse.json(
      { success: false, error: "Authentication service error." },
      { status: 500 }
    );
  }
}

