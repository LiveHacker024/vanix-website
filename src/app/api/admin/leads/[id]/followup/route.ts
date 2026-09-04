import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/security";
import { getLeadById, updateLead } from "@/lib/db";
import { sendFollowupEmail } from "@/lib/notifications/email";

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

  if (!lead.email) {
    return NextResponse.json({ success: false, error: "Lead has no email address" }, { status: 400 });
  }

  const body = await request.json();
  const stage = (body.stage === 2 ? 2 : 1) as 1 | 2;

  const res = await sendFollowupEmail(lead, stage);

  if (res.success) {
    await updateLead(lead.id, {
      followup_stage: stage,
    });
    return NextResponse.json({
      success: true,
      message: `Follow-up ${stage} sent successfully.`,
      followup_stage: stage,
    });
  }

  return NextResponse.json({ success: false, error: res.error || "Failed to send follow-up" }, { status: 500 });
}
