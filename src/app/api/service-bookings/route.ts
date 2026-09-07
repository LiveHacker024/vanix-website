import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug } from "@/config/services";
import { saveServiceBooking } from "@/lib/service-bookings";
import {
  checkRateLimit,
  isDuplicateSubmission,
  sanitizeString,
  validateEmail,
  validatePhone,
} from "@/lib/security";
import { sendServiceBookingNotificationWhatsApp } from "@/lib/notifications/whatsapp";

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
          error: `Too many booking requests. Please try again in ${rateCheck.retryAfter || 60} seconds.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse payload
    const body = await request.json();

    // 3. Honeypot check (anti-spam bot trap)
    if (body.honeypot || body.company_website_hp || body.trap_field) {
      console.warn(`[Anti-Spam] Service booking honeypot triggered from IP: ${ip}`);
      return NextResponse.json({
        success: true,
        message: "Your booking request has been received.",
        booking: {
          booking_reference: "VNX-RECEIVED",
          payment_status: "PAYMENT_VERIFICATION_PENDING",
        },
      });
    }

    // 4. Sanitize inputs
    const customerName = sanitizeString(body.customer_name || body.name);
    const businessName = sanitizeString(body.business_name || body.businessName);
    const phone = sanitizeString(body.phone);
    const email = body.email ? sanitizeString(body.email) : undefined;
    const location = body.location ? sanitizeString(body.location) : undefined;
    const serviceSlug = sanitizeString(body.service_slug || body.serviceSlug);
    const utr = body.utr ? sanitizeString(body.utr) : undefined;
    const customerNote = body.customer_note || body.note ? sanitizeString(body.customer_note || body.note) : undefined;

    // 5. Validation
    if (!customerName || customerName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!businessName || businessName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your business or company name." },
        { status: 400 }
      );
    }

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number (minimum 7 digits)." },
        { status: 400 }
      );
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address or leave it blank." },
        { status: 400 }
      );
    }

    // 6. Duplicate Submission Protection (within 15 seconds)
    if (isDuplicateSubmission(phone, email)) {
      return NextResponse.json(
        {
          success: false,
          error: "A booking request with these contact details was recently received. Please allow our team a moment to review it.",
        },
        { status: 429 }
      );
    }

    // 7. Validate Service Slug server-side against official 14 services
    const officialService = getServiceBySlug(serviceSlug);
    if (!officialService) {
      return NextResponse.json(
        { success: false, error: "Invalid service selected. Please choose a valid VANIX service." },
        { status: 400 }
      );
    }

    // 8. Save Booking Record (Server enforces ₹999 amount and INR currency)
    const booking = await saveServiceBooking({
      customer_name: customerName,
      business_name: businessName,
      phone,
      email,
      location,
      service_slug: officialService.slug,
      service_name: officialService.title,
      utr,
      customer_note: customerNote,
      ip_address: ip,
      user_agent: request.headers.get("user-agent") || undefined,
    });

    console.log(
      `[Service Booking Created]: Reference ${booking.booking_reference} for ${booking.customer_name} (${booking.business_name}) - Service: ${booking.service_name}`
    );

    // 9. Trigger Asynchronous WhatsApp Notification to VANIX Team
    (async () => {
      try {
        await sendServiceBookingNotificationWhatsApp(booking);
      } catch (notifyErr) {
        console.error("[WhatsApp Booking Notification Error]:", notifyErr);
      }
    })();

    // 10. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your service booking request has been received.",
        booking: {
          id: booking.id,
          booking_reference: booking.booking_reference,
          customer_name: booking.customer_name,
          business_name: booking.business_name,
          phone: booking.phone,
          email: booking.email,
          service_name: booking.service_name,
          service_slug: booking.service_slug,
          amount: booking.amount,
          currency: booking.currency,
          payment_status: booking.payment_status,
          upi_id: booking.upi_id,
          utr: booking.utr,
          created_at: booking.created_at,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process booking.";
    console.error("[Service Booking Exception]:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
