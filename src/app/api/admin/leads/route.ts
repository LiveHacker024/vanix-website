import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/security";
import { getLeads } from "@/lib/db";
import { LeadFilterParams, LeadStatus } from "@/lib/types";

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const status = (searchParams.get("status") as LeadStatus | "ALL") || "ALL";
  const service = searchParams.get("service") || "";
  const sortBy = (searchParams.get("sortBy") as "newest" | "oldest") || "newest";
  const dateRange = (searchParams.get("dateRange") as "all" | "today" | "week" | "month") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const filters: LeadFilterParams = {
    search,
    status,
    service,
    sortBy,
    dateRange,
    page,
    limit,
  };

  const { leads, total } = await getLeads(filters);
  const totalPages = Math.ceil(total / limit) || 1;

  return NextResponse.json({
    success: true,
    leads,
    total,
    page,
    limit,
    totalPages,
  });
}
