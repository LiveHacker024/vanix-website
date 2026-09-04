import { NextRequest, NextResponse } from "next/server";
import { automationConfig } from "@/config/automation";
import { appendConversationMessage, createLead, findLeadByPhone } from "@/lib/db";
import { processCustomerMessageWithAI } from "@/lib/ai/assistant";
import { sendCustomerWhatsAppMessage } from "@/lib/notifications/whatsapp";

/**
 * GET: Meta Webhook Verification Endpoint
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = automationConfig.webhookVerifyToken;

  if (mode === "subscribe" && token === expectedToken) {
    console.log("[WhatsApp Webhook]: Webhook subscription verified successfully.");
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("[WhatsApp Webhook]: Webhook verification failed — token mismatch.");
  return new NextResponse("Forbidden", { status: 403 });
}

/**
 * POST: Incoming WhatsApp Message Handler
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if this is a WhatsApp status or message update
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    // If not a text message event (e.g. delivery receipt / status update), return 200 OK
    if (!message || message.type !== "text") {
      return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
    }

    const fromPhone = message.from; // e.g. "919457727770"
    const messageText = message.text?.body || "";
    const senderName = value?.contacts?.[0]?.profile?.name || "WhatsApp Visitor";
    const now = new Date().toISOString();

    console.log(`[WhatsApp Inbound]: Received from ${senderName} (${fromPhone}): "${messageText}"`);

    // 1. Find or create lead
    let lead = await findLeadByPhone(fromPhone);

    if (!lead) {
      lead = await createLead({
        name: senderName,
        phone: fromPhone,
        whatsapp: fromPhone,
        service: "WhatsApp Conversation",
        message: messageText,
        source_page: "WhatsApp Direct Inbound",
      });
      console.log(`[WhatsApp Lead Created]: Created new lead ${lead.id} for ${fromPhone}`);
    } else {
      // Append customer message to history
      await appendConversationMessage(lead.id, {
        id: crypto.randomUUID(),
        sender: "customer",
        message: messageText,
        timestamp: now,
      });
    }

    // 2. Evaluate with AI Assistant & Knowledge Base
    const aiResult = await processCustomerMessageWithAI(lead, messageText);

    // 3. Append assistant reply to conversation history
    await appendConversationMessage(lead.id, {
      id: crypto.randomUUID(),
      sender: "assistant",
      message: aiResult.replyText,
      timestamp: new Date().toISOString(),
    });

    // 4. Send WhatsApp reply
    await sendCustomerWhatsAppMessage(fromPhone, aiResult.replyText);

    return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal error";
    console.error("[WhatsApp Webhook Error]:", message);
    // Meta requires a 200 OK response to prevent infinite webhook retries
    return NextResponse.json({ status: "ERROR_HANDLED", error: message }, { status: 200 });
  }
}
