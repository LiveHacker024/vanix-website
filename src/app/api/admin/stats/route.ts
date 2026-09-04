import { NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/security";
import { getLeadStats } from "@/lib/db";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const stats = await getLeadStats();
  return NextResponse.json({ success: true, stats });
}
