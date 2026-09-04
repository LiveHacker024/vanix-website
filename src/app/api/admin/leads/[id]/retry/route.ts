import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/security";
import { getLeadById, updateLead } from "@/lib/db";
import {
  sendCustomerConfirmationEmail,
  sendLeadNotificationEmail,
} from "@/lib/notifications/email";
import {
  sendCustomerAutoReplyWhatsApp,
  sendLeadNotificationWhatsApp,
} from "@/lib/notifications/whatsapp";

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
  const target = body.target; // "internal_email" | "customer_email" | "whatsapp"

  if (target === "internal_email") {
    const res = await sendLeadNotificationEmail(lead);
    const status = res.success ? "SENT" : "FAILED";
    await updateLead(lead.id, { email_notification_status: status });
    return NextResponse.json({ success: res.success, status, error: res.error });
  }

  if (target === "customer_email") {
    if (!lead.email) {
      return NextResponse.json({ success: false, error: "No customer email provided" }, { status: 400 });
    }
    const res = await sendCustomerConfirmationEmail(lead);
    const status = res.success ? "SENT" : "FAILED";
    await updateLead(lead.id, { customer_email_status: status });
    return NextResponse.json({ success: res.success, status, error: res.error });
  }

  if (target === "whatsapp") {
    const res = await sendLeadNotificationWhatsApp(lead);
    const status = res.success ? "SENT" : "FAILED";
    await updateLead(lead.id, { whatsapp_notification_status: status });
    return NextResponse.json({ success: res.success, status, error: res.error });
  }

  return NextResponse.json({ success: false, error: "Invalid retry target" }, { status: 400 });
}
