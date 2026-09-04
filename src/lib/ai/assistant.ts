import { LeadRecord } from "../types";
import { vanixKnowledge } from "@/data/vanix-knowledge";
import { automationConfig } from "@/config/automation";
import { sendHumanHandoffEmail } from "../notifications/email";
import { sendHumanHandoffWhatsApp } from "../notifications/whatsapp";
import { updateLead } from "../db";

/**
 * Checks if current time is within business hours (IST).
 */
export function isWithinBusinessHours(): boolean {
  try {
    const now = new Date();
    // Convert to IST
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: automationConfig.businessHours.timezone }));
    const day = istTime.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    const hour = istTime.getHours();

    const isOpenDay = automationConfig.businessHours.daysOpen.includes(day);
    const isOpenHour =
      hour >= automationConfig.businessHours.startHour &&
      hour < automationConfig.businessHours.endHour;

    return isOpenDay && isOpenHour;
  } catch (err) {
    return true; // default open on timezone error
  }
}

/**
 * Evaluates an incoming WhatsApp customer message, checks for qualification / handoff triggers,
 * and generates a strictly controlled factual response.
 */
export async function processCustomerMessageWithAI(
  lead: LeadRecord,
  incomingText: string
): Promise<{
  replyText: string;
  triggeredHandoff: boolean;
  handoffReason?: string;
}> {
  const text = incomingText.toLowerCase().trim();
  const insideHours = isWithinBusinessHours();

  // 1. Check for Human Handoff Triggers
  let handoffReason: string | undefined;

  // Direct human/representative request
  if (
    text.includes("human") ||
    text.includes("agent") ||
    text.includes("person") ||
    text.includes("representative") ||
    text.includes("call me") ||
    text.includes("talk to someone") ||
    text.includes("speak with someone")
  ) {
    handoffReason = "Customer explicitly requested a human representative.";
  }
  // Custom pricing / quotation / cost
  else if (
    text.includes("price") ||
    text.includes("pricing") ||
    text.includes("how much") ||
    text.includes("cost") ||
    text.includes("discount") ||
    text.includes("quotation") ||
    text.includes("quote")
  ) {
    handoffReason = "Customer requested custom pricing or quote.";
  }
  // Dissatisfaction / Complaints
  else if (
    text.includes("unhappy") ||
    text.includes("complaint") ||
    text.includes("issue") ||
    text.includes("bad") ||
    text.includes("refund")
  ) {
    handoffReason = "Customer reported an issue or complaint.";
  }

  // 2. Trigger Handoff if identified
  if (handoffReason) {
    // Dispatch alerts
    await Promise.allSettled([
      sendHumanHandoffEmail(lead, handoffReason, incomingText),
      sendHumanHandoffWhatsApp(lead, handoffReason, incomingText),
      updateLead(lead.id, {
        handoff_status: "REQUESTED",
        handoff_reason: handoffReason,
      }),
    ]);

    const replyText = insideHours
      ? `I'd be happy to have the VANIX strategy team assist you directly with this. I've alerted our team and an advisor will connect with you shortly.`
      : `I've recorded your request and alerted the VANIX strategy desk. As we are currently outside business hours, our team will connect with you during regular hours (9:00 AM – 7:00 PM IST).`;

    return {
      replyText,
      triggeredHandoff: true,
      handoffReason,
    };
  }

  // 3. Search Knowledge Base for Service Inquiries
  let matchedService = vanixKnowledge.services.find(
    (s) =>
      text.includes(s.name.toLowerCase()) ||
      text.includes(s.category.toLowerCase()) ||
      (s.name.includes("SEO") && text.includes("seo")) ||
      (s.name.includes("E-Commerce") && (text.includes("ecommerce") || text.includes("shop") || text.includes("store"))) ||
      (s.name.includes("Amazon") && (text.includes("amazon") || text.includes("meesho") || text.includes("indiamart"))) ||
      (s.name.includes("Ads") && (text.includes("ads") || text.includes("advertising"))) ||
      (s.name.includes("Website") && text.includes("website"))
  );

  if (matchedService) {
    const deliverablesList = matchedService.deliverables.slice(0, 3).join(", ");
    let replyText = `At VANIX, our *${matchedService.name}* includes: ${deliverablesList}. ${matchedService.description}`;

    // Gentle qualification prompt
    if (!lead.company) {
      replyText += `\n\nWhat is your business name or industry?`;
    } else if (!lead.message) {
      replyText += `\n\nWhat are you looking to achieve with this project?`;
    }

    return { replyText, triggeredHandoff: false };
  }

  // 4. Check for General Process / About Questions
  if (text.includes("process") || text.includes("how it works") || text.includes("how do you work")) {
    const replyText = `VANIX works in 5 phases:\n1. Deep Discovery & Audit\n2. Architecture Setup\n3. Cataloging & SEO\n4. Paid Acquisition\n5. Automated Funnels & Scaling.\n\nDo you already have an existing website or store?`;
    return { replyText, triggeredHandoff: false };
  }

  if (text.includes("founder") || text.includes("who are you") || text.includes("kunal")) {
    const replyText = `VANIX was founded by ${vanixKnowledge.founder.name} (${vanixKnowledge.founder.title}), an experienced cybersecurity professional and technologist focused on turning traditional offline businesses into digital growth engines.`;
    return { replyText, triggeredHandoff: false };
  }

  // 5. Qualification / General Questions Fallback
  if (!lead.service || lead.service === "General Growth Consultation") {
    const replyText = `Thank you for connecting with VANIX. Which service or goal are you most interested in (e.g. Website Development, E-Commerce, Google Ads, Local SEO, Marketplace scale)?`;
    return { replyText, triggeredHandoff: false };
  }

  // Fallback for unknown questions -> Trigger Human Handoff safely (Zero hallucination policy)
  const unknownReason = `Customer asked a question outside the verified knowledge base: "${incomingText}"`;
  await Promise.allSettled([
    sendHumanHandoffEmail(lead, unknownReason, incomingText),
    sendHumanHandoffWhatsApp(lead, unknownReason, incomingText),
    updateLead(lead.id, {
      handoff_status: "REQUESTED",
      handoff_reason: unknownReason,
    }),
  ]);

  const fallbackReply = `I'd be happy to have the VANIX team help with that. I have informed our growth team to review your request and connect with you directly.`;

  return {
    replyText: fallbackReply,
    triggeredHandoff: true,
    handoffReason: unknownReason,
  };
}
