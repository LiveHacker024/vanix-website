import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin, sanitizeString, validatePhone, validateEmail } from "@/lib/security";
import { getInquiries, createInquiry } from "@/lib/db";
import { InquiryFilterParams } from "@/lib/types";

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filters: InquiryFilterParams = {
      search: searchParams.get("search") || "",
      status: (searchParams.get("status") as any) || "ALL",
      service: searchParams.get("service") || "",
      source: searchParams.get("source") || "",
      sortBy: (searchParams.get("sortBy") as any) || "newest",
      dateRange: (searchParams.get("dateRange") as any) || "all",
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: parseInt(searchParams.get("limit") || "20", 10),
    };

    const result = await getInquiries(filters);
    return NextResponse.json({ success: true, data: result.inquiries, total: result.total });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = sanitizeString(body.name);
    const phone = sanitizeString(body.phone);
    const email = body.email ? sanitizeString(body.email) : undefined;
    const company = body.company ? sanitizeString(body.company) : undefined;
    const service = sanitizeString(body.service || "General Growth Consultation");
    const budget = body.budget ? sanitizeString(body.budget) : undefined;
    const website = body.website ? sanitizeString(body.website) : undefined;
    const message = body.message ? sanitizeString(body.message) : undefined;
    const notes = body.notes ? sanitizeString(body.notes) : undefined;
    const status = body.status || "NEW";

    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, error: "Please enter a valid full name." }, { status: 400 });
    }
    if (!phone || !validatePhone(phone)) {
      return NextResponse.json({ success: false, error: "Please provide a valid phone number." }, { status: 400 });
    }
    if (email && !validateEmail(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const inquiry = await createInquiry({
      name,
      phone,
      email,
      company,
      service,
      budget,
      website,
      message,
      notes,
      status,
      source_page: "CRM Manual Entry",
    });

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to create inquiry" }, { status: 500 });
  }
}
