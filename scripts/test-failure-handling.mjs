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

async function runFailureTest() {
  console.log("==================================================");
  console.log("🛡️ TESTING FAILURE HANDLING & ERROR PROPAGATION");
  console.log("==================================================");

  const { createLead } = await import("../src/lib/db.ts");

  // 1. Test database validation error (e.g. invalid status not matching CHECK constraint)
  console.log("1. Testing database level constraint rejection...");
  let threwError = false;
  try {
    // Attempt inserting an invalid status to test DB rejection
    await createLead({
      name: "Invalid Status Lead",
      phone: "+919457727770",
      service: "Test",
      status: "INVALID_STATUS_THAT_VIOLATES_DB_CHECK",
    });
  } catch (err) {
    threwError = true;
    console.log("✅ Expected DB Error Thrown:", err.message);
  }

  if (!threwError) {
    console.error("❌ FAILED: createLead did NOT throw on database error!");
    process.exit(1);
  } else {
    console.log("✅ createLead properly throws when DB insert fails (no silent success).");
  }

  console.log("\n==================================================");
  console.log("🎉 FAILURE HANDLING TEST PASSED SUCCESSFULLY!");
  console.log("==================================================");
}

runFailureTest().catch((err) => {
  console.error("❌ Test Failed with Exception:", err);
  process.exit(1);
});
