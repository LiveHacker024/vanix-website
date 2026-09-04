import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSession } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = (process.env.ADMIN_EMAIL || "admin@vanix.in").trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || "VanixAdmin2026!Secure";

    if (
      !email ||
      !password ||
      email.trim().toLowerCase() !== expectedEmail ||
      password !== expectedPassword
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid admin email or password." },
        { status: 401 }
      );
    }

    const token = await createAdminSession(expectedEmail);

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
