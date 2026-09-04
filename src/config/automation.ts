export const automationConfig = {
  // Notification Recipient Settings
  leadNotificationEmail: process.env.VANIX_LEAD_EMAIL || "hackwithkunal@gmail.com",
  leadNotificationWhatsApp: process.env.VANIX_LEAD_WHATSAPP || "919457727770",
  senderEmail: process.env.RESEND_FROM_EMAIL || "VANIX Inquiries <onboarding@resend.dev>",

  // Business Hours (IST - Asia/Kolkata)
  businessHours: {
    startHour: 9, // 9:00 AM
    endHour: 19, // 7:00 PM
    daysOpen: [1, 2, 3, 4, 5, 6], // Monday (1) to Saturday (6)
    timezone: "Asia/Kolkata",
    outOfHoursMessage:
      "Thank you for contacting VANIX. We have received your message outside our regular strategy desk hours (9:00 AM – 7:00 PM IST, Mon–Sat). Our team will review your inquiry and follow up promptly.",
  },

  // Email Follow-up Rules
  followup: {
    enabled: true,
    maxFollowups: 2, // Day 1 and Day 3
    day1DelayHours: 24,
    day3DelayHours: 72,
  },

  // WhatsApp Webhook Security
  webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "vanix_webhook_verify_token_2026",

  // Human Handoff Triggers
  handoffKeywords: [
    "human",
    "agent",
    "representative",
    "call me",
    "speak to someone",
    "pricing",
    "cost",
    "discount",
    "refund",
    "complaint",
    "urgent",
    "quote",
  ],
};
