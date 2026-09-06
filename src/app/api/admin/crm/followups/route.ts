import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin, sanitizeString } from "@/lib/security";
import { getFollowUps, scheduleFollowUp } from "@/lib/db";
import { FollowUpFilterParams, FollowUpType } from "@/lib/types";

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filters: FollowUpFilterParams = {
      tab: (searchParams.get("tab") as any) || "all",
      inquiry_id: searchParams.get("inquiry_id") || undefined,
      customer_id: searchParams.get("customer_id") || undefined,
      status: (searchParams.get("status") as any) || "ALL",
      type: (searchParams.get("type") as any) || "ALL",
    };

    const followups = await getFollowUps(filters);
    return NextResponse.json({ success: true, data: followups });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to fetch follow-ups" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = sanitizeString(body.title);
    const scheduled_at = body.scheduled_at;
    const type = (body.type || "CALL") as FollowUpType;
    const note = body.note ? sanitizeString(body.note) : undefined;
    const inquiry_id = body.inquiry_id || undefined;
    const customer_id = body.customer_id || undefined;

    if (!title) {
      return NextResponse.json({ success: false, error: "Please enter follow-up title." }, { status: 400 });
    }
    if (!scheduled_at) {
      return NextResponse.json({ success: false, error: "Please pick a scheduled date & time." }, { status: 400 });
    }

    const followUp = await scheduleFollowUp({
      title,
      scheduled_at,
      type,
      note,
      inquiry_id,
      customer_id,
    });

    return NextResponse.json({ success: true, data: followUp }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Failed to schedule follow-up" }, { status: 500 });
  }
}
