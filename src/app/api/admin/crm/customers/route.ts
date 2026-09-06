import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin, sanitizeString, validatePhone, validateEmail } from "@/lib/security";
import { getCustomers, createCustomer } from "@/lib/db";
import { CustomerFilterParams } from "@/lib/types";

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filters: CustomerFilterParams = {
      search: searchParams.get("search") || "",
      status: (searchParams.get("status") as any) || "ALL",
      sortBy: (searchParams.get("sortBy") as any) || "newest",
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: parseInt(searchParams.get("limit") || "20", 10),
    };

    const result = await getCustomers(filters);
    return NextResponse.json({ success: true, data: result.customers, total: result.total });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to fetch customers" }, { status: 500 });
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
    const website = body.website ? sanitizeString(body.website) : undefined;
    const services = Array.isArray(body.services) ? body.services.map((s: string) => sanitizeString(s)) : [];
    const notes = body.notes ? sanitizeString(body.notes) : undefined;

    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, error: "Please enter customer name." }, { status: 400 });
    }
    if (!phone || !validatePhone(phone)) {
      return NextResponse.json({ success: false, error: "Please enter a valid phone number." }, { status: 400 });
    }
    if (email && !validateEmail(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const customer = await createCustomer({
      name,
      phone,
      email,
      company,
      website,
      services,
      notes,
    });

    return NextResponse.json({ success: true, data: customer }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to create customer" }, { status: 500 });
  }
}
