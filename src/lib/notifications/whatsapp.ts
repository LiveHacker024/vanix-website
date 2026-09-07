import { LeadRecord } from "../types";
import { automationConfig } from "@/config/automation";
import { ServiceBookingRecord } from "../service-bookings";

/**
 * 1. INTERNAL WHATSAPP ALERT FOR LEADS (Sent to 919457727770)
 */
export async function sendLeadNotificationWhatsApp(
  lead: LeadRecord
): Promise<{ success: boolean; error?: string }> {
  const recipientNumber = automationConfig.leadNotificationWhatsApp;

  const formattedDate = new Date(lead.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const messageText = `🔔 *NEW VANIX LEAD*

*Name:* ${lead.name}
*Service:* ${lead.service || "Growth Consultation"}
*Phone:* ${lead.phone}
*Email:* ${lead.email || "N/A"}

*Message:*
${lead.message || "No specific message provided"}

*Time:*
${formattedDate}`;

  return await sendCustomerWhatsAppMessage(recipientNumber, messageText);
}

/**
 * 2. INTERNAL WHATSAPP ALERT FOR SERVICE BOOKINGS (₹999 Flow)
 */
export async function sendServiceBookingNotificationWhatsApp(
  booking: ServiceBookingRecord
): Promise<{ success: boolean; error?: string }> {
  const recipientNumber = automationConfig.leadNotificationWhatsApp;

  const formattedDate = new Date(booking.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const messageText = `🚀 *VANIX SERVICE BOOKING*

New ₹999 Service Booking

*Customer:*
${booking.customer_name}

*Business:*
${booking.business_name}

*Phone:*
${booking.phone}

*Email:*
${booking.email || "Not Provided"}

*Location:*
${booking.location || "Not Provided"}

*Service:*
${booking.service_name}

*Service Slug:*
${booking.service_slug}

*Amount:*
₹${booking.amount}

*Payment Status:*
Payment Verification Pending

*UPI ID:*
${booking.upi_id}

*UPI Transaction ID / UTR:*
${booking.utr || "Not Submitted Yet"}

*Booking Reference:*
${booking.booking_reference}

*Requirement:*
${booking.customer_note || "No specific notes"}

*Submitted At:*
${formattedDate}

*Source:*
VANIX Website`;

  return await sendCustomerWhatsAppMessage(recipientNumber, messageText);
}

/**
 * 3. CUSTOMER WHATSAPP AUTO-REPLY
 */
export async function sendCustomerAutoReplyWhatsApp(
  lead: LeadRecord
): Promise<{ success: boolean; error?: string }> {
  const targetPhone = lead.whatsapp || lead.phone;
  if (!targetPhone) {
    return { success: false, error: "No customer phone provided" };
  }

  const messageText = `Hi ${lead.name} 👋

Thank you for contacting VANIX.

We received your inquiry for:
*${lead.service || "Digital Growth Consultation"}*

Your requirements have been received successfully.

You can continue the conversation here if you have additional details to share.

— VANIX Team`;

  return await sendCustomerWhatsAppMessage(targetPhone, messageText);
}

/**
 * 4. HUMAN HANDOFF WHATSAPP ALERT
 */
export async function sendHumanHandoffWhatsApp(
  lead: LeadRecord,
  reason: string,
  summary: string
): Promise<{ success: boolean; error?: string }> {
  const recipientNumber = automationConfig.leadNotificationWhatsApp;

  const messageText = `🚨 *HUMAN HANDOFF REQUIRED*

*Customer:* ${lead.name}
*Phone:* ${lead.phone}
*Service:* ${lead.service || "Growth Consultation"}
*Reason:* ${reason}

*Summary:*
${summary}`;

  return await sendCustomerWhatsAppMessage(recipientNumber, messageText);
}

/**
 * 5. DISPATCH WHATSAPP MESSAGE VIA OFFICIAL META CLOUD API
 */
export async function sendCustomerWhatsAppMessage(
  recipientPhone: string,
  messageText: string
): Promise<{ success: boolean; error?: string }> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId || accessToken.includes("EAAB...")) {
    console.warn(`[WhatsApp Notification Skipped]: Missing credentials for ${recipientPhone}.`);
    return { success: false, error: "WhatsApp Cloud API credentials not configured" };
  }

  try {
    const cleanRecipient = recipientPhone.replace(/\D/g, "");
    const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanRecipient,
        type: "text",
        text: {
          preview_url: false,
          body: messageText,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errDetail = data?.error?.message || JSON.stringify(data);
      console.error("[WhatsApp Cloud API Error]:", errDetail);
      return { success: false, error: errDetail };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[WhatsApp Cloud API Exception]:", message);
    return { success: false, error: message };
  }
}
