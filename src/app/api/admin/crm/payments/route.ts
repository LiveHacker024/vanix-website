import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin, sanitizeString } from "@/lib/security";
import { getPayments, recordPayment } from "@/lib/db";
import { PaymentFilterParams, PaymentMethod, PaymentStatus } from "@/lib/types";

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filters: PaymentFilterParams = {
      customer_id: searchParams.get("customer_id") || undefined,
      inquiry_id: searchParams.get("inquiry_id") || undefined,
      status: (searchParams.get("status") as PaymentStatus) || "ALL",
      method: (searchParams.get("method") as PaymentMethod) || "ALL",
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: parseInt(searchParams.get("limit") || "20", 10),
    };

    const result = await getPayments(filters);
    return NextResponse.json({ success: true, data: result.payments, total: result.total });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to fetch payments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const amount = Number(body.amount);
    const method = (body.method || "UPI") as PaymentMethod;
    const status = (body.status || "PAID") as PaymentStatus;
    const customer_id = body.customer_id || undefined;
    const inquiry_id = body.inquiry_id || undefined;
    const transaction_id = body.transaction_id ? sanitizeString(body.transaction_id) : undefined;
    const notes = body.notes ? sanitizeString(body.notes) : undefined;

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ success: false, error: "Please enter a valid payment amount." }, { status: 400 });
    }

    const payment = await recordPayment({
      amount,
      method,
      status,
      customer_id,
      inquiry_id,
      transaction_id,
      notes,
    });

    return NextResponse.json({ success: true, data: payment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to record payment" }, { status: 500 });
  }
}
