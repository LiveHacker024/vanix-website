import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/security";
import { getLeadById, updateLead } from "@/lib/db";
import { HandoffStatus } from "@/lib/types";

export async function POST(
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

  const body = await request.json();
  const handoff_status = (body.handoff_status as HandoffStatus) || "RESOLVED";

  const updated = await updateLead(lead.id, {
    handoff_status,
  });

  return NextResponse.json({
    success: true,
    message: `Handoff marked as ${handoff_status}`,
    lead: updated,
  });
}
