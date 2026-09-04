import { NextRequest, NextResponse } from "next/server";
import { createLead, updateLead } from "@/lib/db";
import {
  checkRateLimit,
  isDuplicateSubmission,
  sanitizeString,
  validateEmail,
  validatePhone,
} from "@/lib/security";
import {
  sendCustomerConfirmationEmail,
  sendLeadNotificationEmail,
} from "@/lib/notifications/email";
import {
  sendCustomerAutoReplyWhatsApp,
  sendLeadNotificationWhatsApp,
} from "@/lib/notifications/whatsapp";
import { CreateLeadInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    // 1. IP & Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many inquiries submitted. Please try again in ${rateCheck.retryAfter || 60} seconds.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse & validate request payload
    const body = await request.json();

    // 3. Honeypot check (anti-spam bot trap)
    if (body.honeypot || body.company_website_hp || body.trap_field) {
      console.warn(`[Anti-Spam] Honeypot triggered from IP: ${ip}`);
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been received.",
      });
    }

    // 4. Sanitize inputs
    const name = sanitizeString(body.name);
    const phone = sanitizeString(body.phone);
    const email = body.email ? sanitizeString(body.email) : undefined;
    const businessName = sanitizeString(body.businessName || body.company || "");
    const businessType = sanitizeString(body.businessType || "");
    const service = sanitizeString(body.service || body.serviceNeeded || "General Growth Consultation");
    const message = sanitizeString(body.message || "");
    const budget = sanitizeString(body.budget || "");
    const website = sanitizeString(body.website || "");
    const whatsapp = sanitizeString(body.whatsapp || "");

    // 5. Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid phone number (minimum 7 digits)." },
        { status: 400 }
      );
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address or leave it blank." },
        { status: 400 }
      );
    }

    // 6. Duplicate Submission Protection
    if (isDuplicateSubmission(phone, email)) {
      return NextResponse.json(
        {
          success: false,
          error: "A submission with these details was recently received. Please allow our team a moment to review it.",
        },
        { status: 429 }
      );
    }

    // 7. Extract marketing & client metadata
    const source_page = sanitizeString(body.source_page || request.headers.get("referer") || "/");
    const utm_source = sanitizeString(body.utm_source || "");
    const utm_medium = sanitizeString(body.utm_medium || "");
    const utm_campaign = sanitizeString(body.utm_campaign || "");
    const utm_term = sanitizeString(body.utm_term || "");
    const utm_content = sanitizeString(body.utm_content || "");
    const referrer = sanitizeString(body.referrer || request.headers.get("referer") || "");
    const device_info = sanitizeString(body.device_info || request.headers.get("user-agent") || "");

    const leadInput: CreateLeadInput = {
      name,
      phone,
      email: email || undefined,
      whatsapp: whatsapp || undefined,
      company: businessName || undefined,
      business_type: businessType || undefined,
      service,
      message: message || undefined,
      budget: budget || undefined,
      website: website || undefined,
      source_page,
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined,
      utm_term: utm_term || undefined,
      utm_content: utm_content || undefined,
      referrer: referrer || undefined,
      device_info: device_info || undefined,
      ip_address: ip,
    };

    // 8. Save Lead to Database (Priority: Lead MUST be saved)
    const savedLead = await createLead(leadInput);
    console.log(`[Lead Ingestion]: Lead ${savedLead.id} saved for ${savedLead.name} (${savedLead.phone})`);

    // 9. Asynchronously trigger Notifications
    (async () => {
      try {
        const [
          internalEmailRes,
          customerEmailRes,
          internalWhatsAppRes,
          customerWhatsAppRes,
        ] = await Promise.allSettled([
          sendLeadNotificationEmail(savedLead),
          savedLead.email ? sendCustomerConfirmationEmail(savedLead) : Promise.resolve({ success: true }),
          sendLeadNotificationWhatsApp(savedLead),
          sendCustomerAutoReplyWhatsApp(savedLead),
        ]);

        const emailStatus =
          internalEmailRes.status === "fulfilled" && internalEmailRes.value.success
            ? "SENT"
            : "FAILED";

        const customerEmailStatus =
          customerEmailRes.status === "fulfilled" && customerEmailRes.value.success
            ? "SENT"
            : savedLead.email
            ? "FAILED"
            : "SKIPPED";

        const whatsappStatus =
          internalWhatsAppRes.status === "fulfilled" && internalWhatsAppRes.value.success
            ? "SENT"
            : "FAILED";

        await updateLead(savedLead.id, {
          email_notification_status: emailStatus,
          customer_email_status: customerEmailStatus,
          whatsapp_notification_status: whatsappStatus,
        });

        console.log(
          `[Notifications Log]: Lead ${savedLead.id} - Internal Email: ${emailStatus}, Customer Email: ${customerEmailStatus}, WhatsApp: ${whatsappStatus}`
        );
      } catch (notifyErr) {
        console.error("[Notification Queue Error]:", notifyErr);
      }
    })();

    // 10. Clean success response
    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Our strategy team will reach out shortly.",
        leadId: savedLead.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "We encountered an issue submitting your inquiry. Please try again or reach out on WhatsApp.";
    console.error("[Lead Ingestion Exception]:", message);
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
