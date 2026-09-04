import { Resend } from "resend";
import { LeadRecord } from "../types";
import { automationConfig } from "@/config/automation";

let resendClient: Resend | null = null;
const apiKey = process.env.RESEND_API_KEY;

if (apiKey && !apiKey.includes("your_resend_api_key")) {
  resendClient = new Resend(apiKey);
}

/**
 * 1. INTERNAL NOTIFICATION EMAIL (Sent to hackwithkunal@gmail.com)
 */
export async function sendLeadNotificationEmail(
  lead: LeadRecord
): Promise<{ success: boolean; error?: string }> {
  const recipientEmail = automationConfig.leadNotificationEmail;
  const fromEmail = automationConfig.senderEmail;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!resendClient) {
    console.warn(`[Resend Email Skipped]: RESEND_API_KEY not configured for internal alert ${lead.id}.`);
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const formattedDate = new Date(lead.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `NEW VANIX LEAD — ${lead.service || "Growth Consultation"}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NEW VANIX LEAD</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080808; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #080808; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #121212; border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
          <tr>
            <td style="background: linear-gradient(135deg, #181818 0%, #101010 100%); padding: 22px 30px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.15em; color: #D4AF37; text-transform: uppercase;">VANIX</span>
              <span style="float: right; background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); color: #F3E5AB; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">NEW LEAD</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 30px;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #FFFFFF; text-transform: uppercase; letter-spacing: 0.05em;">
                New Lead Received
              </h2>
              <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #1A1A1A; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); width: 35%; font-size: 11px; font-weight: 600; color: #A0A0A0; text-transform: uppercase;">Name:</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; font-weight: 700; color: #FFFFFF;">${lead.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 11px; font-weight: 600; color: #A0A0A0; text-transform: uppercase;">Email:</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #FFFFFF;">${lead.email || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 11px; font-weight: 600; color: #A0A0A0; text-transform: uppercase;">Phone:</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; font-weight: 700; color: #D4AF37;">${lead.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 11px; font-weight: 600; color: #A0A0A0; text-transform: uppercase;">Service:</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; font-weight: 600; color: #FFFFFF;">${lead.service || "Growth Consultation"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 11px; font-weight: 600; color: #A0A0A0; text-transform: uppercase;">Budget:</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; color: #F3E5AB;">${lead.budget || "Not Specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 11px; font-weight: 600; color: #A0A0A0; text-transform: uppercase;">Source:</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #A0A0A0;">${lead.source_page || "/"} (${lead.utm_source || "Direct"})</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 11px; font-weight: 600; color: #A0A0A0; text-transform: uppercase;">Date:</td>
                  <td style="padding: 12px 16px; font-size: 12px; color: #C0C0C0;">${formattedDate}</td>
                </tr>
              </table>

              ${
                lead.message
                  ? `<div style="background-color: #181818; border-left: 3px solid #D4AF37; padding: 14px 18px; border-radius: 4px; margin-bottom: 22px;">
                      <div style="font-size: 10px; font-weight: 700; color: #D4AF37; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Message:</div>
                      <div style="font-size: 13px; color: #E0E0E0; line-height: 1.5; white-space: pre-wrap;">${lead.message}</div>
                    </div>`
                  : ""
              }

              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${siteUrl}/admin/leads" style="display: inline-block; background: linear-gradient(135deg, #DFB743 0%, #B8860B 100%); color: #000000; font-size: 12px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
                      Open Lead in Admin Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject,
      html,
    });

    if (error) {
      console.error("[Resend Internal Email Error]:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Resend Internal Email Exception]:", message);
    return { success: false, error: message };
  }
}

/**
 * 2. CUSTOMER CONFIRMATION EMAIL (Sent automatically to customer's email)
 */
export async function sendCustomerConfirmationEmail(
  lead: LeadRecord
): Promise<{ success: boolean; error?: string }> {
  if (!lead.email) {
    return { success: false, error: "No customer email provided" };
  }

  const fromEmail = automationConfig.senderEmail;

  if (!resendClient) {
    console.warn(`[Resend Customer Email Skipped]: RESEND_API_KEY not configured.`);
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const subject = "We received your VANIX inquiry";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>We received your VANIX inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080808; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #080808; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 550px; background-color: #121212; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="background: #181818; padding: 22px 28px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <span style="font-size: 20px; font-weight: 800; letter-spacing: 0.15em; color: #D4AF37;">VANIX</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px; font-size: 14px; line-height: 1.6; color: #E0E0E0;">
              <p style="margin: 0 0 16px 0;">Hi <strong>${lead.name}</strong>,</p>
              <p style="margin: 0 0 16px 0;">Thank you for contacting VANIX.</p>
              <p style="margin: 0 0 16px 0;">We have successfully received your inquiry regarding:</p>
              <div style="background-color: #1A1A1A; border-left: 3px solid #D4AF37; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px; font-weight: 600; color: #F3E5AB;">
                ${lead.service || "Digital Growth Consultation"}
              </div>
              <p style="margin: 0 0 24px 0;">Your requirements have been recorded and our team will review your request.</p>
              <p style="margin: 0; color: #A0A0A0; font-size: 13px;">
                Regards,<br />
                <strong style="color: #FFFFFF;">VANIX Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0A0A0A; padding: 14px 28px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #666666;">
              © ${new Date().getFullYear()} VANIX Digital Growth Solutions
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: lead.email,
      subject,
      html,
    });

    if (error) {
      console.error("[Resend Customer Email Error]:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Resend Customer Email Exception]:", message);
    return { success: false, error: message };
  }
}

/**
 * 3. FOLLOW-UP EMAILS (Day 1 / Day 3)
 */
export async function sendFollowupEmail(
  lead: LeadRecord,
  stage: 1 | 2
): Promise<{ success: boolean; error?: string }> {
  if (!lead.email) {
    return { success: false, error: "No customer email available" };
  }

  const fromEmail = automationConfig.senderEmail;

  if (!resendClient) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const subject =
    stage === 1
      ? `Following up on your VANIX inquiry — ${lead.service || "Digital Growth"}`
      : `Next steps for your digital growth — VANIX`;

  const bodyContent =
    stage === 1
      ? `<p>Hi <strong>${lead.name}</strong>,</p>
         <p>Just following up regarding your VANIX inquiry for <strong>${lead.service || "digital growth solutions"}</strong>.</p>
         <p>If you have any additional requirements, questions about our process, or specific timelines, you can reply directly to this email or reach us on WhatsApp.</p>`
      : `<p>Hi <strong>${lead.name}</strong>,</p>
         <p>We wanted to check in once more regarding your inquiry for <strong>${lead.service || "digital expansion"}</strong>.</p>
         <p>Whenever you are ready to explore your tailored digital growth roadmap, feel free to reply to this email or connect with our strategy desk.</p>`;

  const html = `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 20px; background-color: #080808; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF;">
  <table width="100%" style="max-width: 550px; margin: 0 auto; background-color: #121212; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 24px;">
    <tr>
      <td style="font-size: 14px; line-height: 1.6; color: #E0E0E0;">
        ${bodyContent}
        <p style="margin-top: 24px; color: #A0A0A0; font-size: 13px;">
          Regards,<br />
          <strong style="color: #FFFFFF;">VANIX Team</strong>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: lead.email,
      subject,
      html,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

/**
 * 4. HUMAN HANDOFF ALERT EMAIL
 */
export async function sendHumanHandoffEmail(
  lead: LeadRecord,
  reason: string,
  summary: string
): Promise<{ success: boolean; error?: string }> {
  const recipientEmail = automationConfig.leadNotificationEmail;
  const fromEmail = automationConfig.senderEmail;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!resendClient) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const subject = `🚨 HUMAN HANDOFF REQUIRED — ${lead.name} (${lead.phone})`;

  const html = `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 20px; background-color: #080808; font-family: sans-serif; color: #FFFFFF;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border: 2px solid #E11D48; border-radius: 12px; padding: 24px;">
    <div style="background: rgba(225, 29, 72, 0.15); border: 1px solid #E11D48; color: #FDA4AF; padding: 8px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; margin-bottom: 16px;">
      🚨 IMMEDIATE HUMAN TAKEOVER REQUESTED
    </div>
    <h2 style="margin: 0 0 12px 0; color: #FFFFFF; font-size: 18px;">Customer: ${lead.name}</h2>
    <p style="color: #FDA4AF; font-size: 13px; margin: 0 0 16px 0;"><strong>Reason:</strong> ${reason}</p>
    
    <div style="background: #1A1A1A; padding: 14px; border-radius: 6px; margin-bottom: 16px; font-size: 13px; color: #E0E0E0;">
      <div><strong>Phone:</strong> <a href="tel:${lead.phone}" style="color: #D4AF37;">${lead.phone}</a></div>
      <div><strong>Service:</strong> ${lead.service || "N/A"}</div>
      <div><strong>Company:</strong> ${lead.company || "N/A"}</div>
    </div>

    <div style="background: #181818; border-left: 3px solid #E11D48; padding: 12px; font-size: 12px; color: #CCCCCC; margin-bottom: 20px; white-space: pre-wrap;">
      <strong>Conversation Summary / Trigger:</strong><br />${summary}
    </div>

    <div style="text-align: center;">
      <a href="${siteUrl}/admin/leads" style="display: inline-block; background: #E11D48; color: #FFFFFF; font-size: 12px; font-weight: bold; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
        Open Lead Dossier in Command Center →
      </a>
    </div>
  </div>
</body>
</html>
`;

  try {
    const { error } = await resendClient.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject,
      html,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
