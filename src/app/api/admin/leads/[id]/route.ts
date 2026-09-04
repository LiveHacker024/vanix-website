import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/security";
import { deleteLead, getLeadById, updateLead } from "@/lib/db";
import { LeadStatus } from "@/lib/types";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const lead = await getLeadById(id);

  if (!lead) {
    return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, lead });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();

  const updates: { status?: LeadStatus; notes?: string } = {};

  if (body.status) {
    const validStatuses: LeadStatus[] = [
      "NEW",
      "CONTACTED",
      "QUALIFIED",
      "PROPOSAL_SENT",
      "WON",
      "LOST",
      "SPAM",
    ];
    if (validStatuses.includes(body.status)) {
      updates.status = body.status;
    }
  }

  if (typeof body.notes === "string") {
    updates.notes = body.notes;
  }

  const updated = await updateLead(id, updates);
  if (!updated) {
    return NextResponse.json({ success: false, error: "Lead update failed" }, { status: 400 });
  }

  return NextResponse.json({ success: true, lead: updated });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deleteLead(id);

  if (!deleted) {
    return NextResponse.json({ success: false, error: "Lead not found or delete failed" }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Lead deleted successfully" });
}
