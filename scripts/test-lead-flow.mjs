import fs from "fs";
import path from "path";

// 1. Load .env.local
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

async function runTest() {
  console.log("==================================================");
  console.log("🧪 TESTING FULL VANIX SUPABASE DATA FLOW");
  console.log("==================================================");

  // Import db methods dynamically after env vars loaded
  const { createLead, getInquiries, getInquiryById, deleteInquiry, getSupabaseClient } = await import("../src/lib/db.ts");

  const client = getSupabaseClient();
  console.log("1. Supabase Client Initialized:", !!client);

  if (!client) {
    console.error("❌ Failed to initialize Supabase client. Check credentials.");
    process.exit(1);
  }

  // 2. Test createLead inserting into Supabase
  const testPhone = "+919457727770";
  const testName = "VANIX Audit Verified Lead";
  const testService = "Website Development";

  console.log("\n2. Executing createLead()...");
  const created = await createLead({
    name: testName,
    phone: testPhone,
    email: "audit-test@vanix.in",
    company: "VANIX Audit Enterprise",
    service: testService,
    message: "Verifying live Supabase database ingestion and CRM query alignment.",
    source_page: "/#contact",
  });

  console.log("✅ Lead successfully created with ID:", created.id);
  console.log("   Name:", created.name);
  console.log("   Phone:", created.phone);
  console.log("   Service:", created.service);
  console.log("   Status:", created.status);

  // 3. Query directly from Supabase to verify it exists
  console.log("\n3. Verifying record directly from Supabase public.leads...");
  const { data: dbRow, error: dbError } = await client
    .from("leads")
    .select("*")
    .eq("id", created.id)
    .single();

  if (dbError || !dbRow) {
    console.error("❌ Record was NOT found in Supabase public.leads!", dbError);
    process.exit(1);
  }

  console.log("✅ CONFIRMED IN SUPABASE `public.leads`:");
  console.log("   Row ID:", dbRow.id);
  console.log("   Row Name:", dbRow.name);
  console.log("   Row Created At:", dbRow.created_at);

  // 4. Test CRM retrieval via getInquiries
  console.log("\n4. Testing CRM Inquiries retrieval (getInquiries)...");
  const crmResult = await getInquiries({ search: created.id });
  const foundInCRM = crmResult.inquiries.some((i) => i.id === created.id);
  console.log("   Found in CRM Inquiries Query:", foundInCRM);
  console.log("   Total inquiries count:", crmResult.total);

  if (!foundInCRM) {
    console.error("❌ Lead was not returned by getInquiries!");
    process.exit(1);
  }

  // 5. Clean up test record from Supabase
  console.log("\n5. Cleaning up test lead from Supabase...");
  await deleteInquiry(created.id);
  console.log("✅ Test lead cleaned up successfully.");

  console.log("\n==================================================");
  console.log("🎉 ALL REAL DATA FLOW TESTS PASSED SUCCESSFULLY!");
  console.log("==================================================");
}

runTest().catch((err) => {
  console.error("❌ Test Failed with Exception:", err);
  process.exit(1);
});
