import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load .env.local if present
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.substring(0, idx).trim();
        const value = trimmed.substring(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

let url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
if (!url && process.env.SUPABASE_PROJECT_ID) {
  url = `https://${process.env.SUPABASE_PROJECT_ID.trim()}.supabase.co`;
}

if (url) {
  url = url.trim().replace(/\/+$/, "").replace(/\/rest\/v1\/?$/, "");
}

const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_API_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

console.log("==================================================");
console.log("🔍 VANIX SUPABASE CONNECTION DIAGNOSTIC");
console.log("==================================================");
console.log(`Supabase URL: ${url || "(NOT SET)"}`);
console.log(`Supabase Key: ${key ? `${key.substring(0, 10)}... [length: ${key.length}]` : "(NOT SET)"}`);
console.log("--------------------------------------------------");

if (!url) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL is missing in .env.local");
  process.exit(1);
}

if (!key) {
  console.warn("⚠️  Notice: API Key is not yet set in .env.local.");
  console.log("👉 Copy your API key (anon or service_role) from: Supabase Dashboard -> Project Settings -> API");
  process.exit(0);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function runTest() {
  try {
    console.log("📡 Testing connection and checking 'leads' table...");
    const { data, count, error } = await supabase
      .from("leads")
      .select("*", { count: "exact" })
      .limit(1);

    if (error) {
      if (
        error.code === "42P01" ||
        error.code === "PGRST204" ||
        error.message.includes("does not exist") ||
        error.message.includes("schema cache")
      ) {
        console.error("\n❌ Table 'leads' does not exist in your Supabase database yet!");
        console.log("--------------------------------------------------");
        console.log("👉 REQUIRED STEP:");
        console.log("1. Open Supabase Dashboard: https://supabase.com/dashboard/project/abjnurpzznimdpkwsqjb/sql");
        console.log("2. Click 'New query'");
        console.log("3. Copy & paste the contents of 'supabase_schema.sql'");
        console.log("4. Click 'Run'");
        console.log("5. Re-run 'npm run test:db'\n");
      } else {
        console.error("\n❌ Supabase Query Error:", error.message, error);
      }
      return;
    }

    console.log("✅ Successfully connected to Supabase table 'leads'!");
    console.log(`📊 Existing leads count: ${count ?? 0}`);

    // Insert a live test lead
    console.log("\n🚀 Inserting verified live test lead into Supabase...");
    const testLead = {
      id: crypto.randomUUID(),
      name: "VANIX System Test Lead",
      phone: "+919457727770",
      email: "hackwithkunal@gmail.com",
      company: "VANIX Growth Test Co",
      service: "Complete Digital Growth Engine (Recommended)",
      message: "Automated verification test lead confirming end-to-end Supabase PostgreSQL integration.",
      source_page: "https://vanix.growth/test",
      status: "NEW",
      email_notification_status: "SENT",
      customer_email_status: "SENT",
      whatsapp_notification_status: "SENT",
      handoff_status: "NONE",
      followup_stage: 0,
      conversation_history: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: inserted, error: insertError } = await supabase
      .from("leads")
      .insert([testLead])
      .select()
      .single();

    if (insertError) {
      console.error("❌ Live test lead insert failed:", insertError.message);
      return;
    }

    console.log("==================================================");
    console.log("🎉 SUCCESS! Real Database INSERT Confirmed in Supabase!");
    console.log("==================================================");
    console.log(`Lead ID:   ${inserted.id}`);
    console.log(`Name:      ${inserted.name}`);
    console.log(`Phone:     ${inserted.phone}`);
    console.log(`Service:   ${inserted.service}`);
    console.log(`Status:    ${inserted.status}`);
    console.log(`Timestamp: ${inserted.created_at}`);
    console.log("--------------------------------------------------");
    console.log("👉 Verify in Supabase Dashboard -> Table Editor -> 'leads':");
    console.log("   https://supabase.com/dashboard/project/abjnurpzznimdpkwsqjb/editor");
    console.log("==================================================");
  } catch (err) {
    console.error("❌ Unexpected connection error:", err.message);
  }
}

runTest();
