import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/security";

export async function GET() {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    return NextResponse.json(
      { authenticated: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: admin.email,
      role: admin.role,
    },
  });
}
