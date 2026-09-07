import fs from 'fs';
import path from 'path';

console.log("==================================================================");
console.log("🔍 AUDITING BOTTOM CTA BANNER & RESPONSIVE BUTTONS");
console.log("==================================================================\n");

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ [PASS] ${message}`);
  } else {
    console.error(`  ✕ [FAIL] ${message}`);
  }
}

const filePath = path.resolve('src/components/ui/GrowthJourneyModal.tsx');
const content = fs.readFileSync(filePath, 'utf-8');

// 1. WhatsApp Link Verification
const EXPECTED_URL = "https://wa.me/919457727770?text=Hi%20VANIX%2C%20I%20want%20to%20discuss%20the%20digital%20growth%20plan%20for%20my%20business.";
assert(content.includes(EXPECTED_URL), `WhatsApp link is exact: ${EXPECTED_URL}`);
assert(content.includes('target="_blank"'), 'WhatsApp link uses target="_blank"');
assert(content.includes('rel="noopener noreferrer"'), 'WhatsApp link uses rel="noopener noreferrer"');
assert(content.includes('aria-label="Discuss digital growth plan with VANIX on WhatsApp"'), 'WhatsApp button has clear accessible aria-label');

// 2. Button container styling
assert(content.includes('gap-[14px]'), 'Container uses exact 14px gap (gap-[14px])');
assert(content.includes('flex flex-col md:flex-row'), 'Container stacks vertically on mobile (<=768px) and aligns horizontally on md+');
assert(content.includes('items-stretch md:items-center'), 'Buttons stretch to full width on mobile and center on desktop');

// 3. Exact 52px height for both buttons
const startBtnMatch = content.match(/<button[\s\S]*?onClick=\{handleOpenInquiryPlan\}[\s\S]*?h-\[52px\]/);
assert(!!startBtnMatch, '"Start This Growth Plan" button has explicit h-[52px]');

const whatsappBtnMatch = content.match(/<a[\s\S]*?href="https:\/\/wa\.me\/919457727770\?text=Hi%20VANIX[\s\S]*?h-\[52px\]/);
assert(!!whatsappBtnMatch, '"Discuss on WhatsApp" button has explicit h-[52px]');

// 4. WhatsApp button styling
assert(content.includes('bg-[#0d0d0d]'), 'WhatsApp button has #0d0d0d background');
assert(content.includes('border-[#d4af37]/45'), 'WhatsApp button has 1px solid rgba(212, 175, 55, 0.45) border');
assert(content.includes('font-semibold'), 'WhatsApp button has font-weight: 600 (font-semibold)');
assert(content.includes('tracking-[0.5px]'), 'WhatsApp button has letter-spacing: 0.5px (tracking-[0.5px])');
assert(content.includes('text-white'), 'WhatsApp button has white text');
assert(content.includes('text-emerald-400'), 'WhatsApp icon has emerald accent on left side');

// 5. Start This Growth Plan functionality preservation
assert(content.includes('onClick={handleOpenInquiryPlan}'), '"Start This Growth Plan" preserves handleOpenInquiryPlan handler');
assert(content.includes('setInquiryInitialService') && content.includes('setIsInquiryOpen(true)'), 'Growth plan prefill flow remains intact');

console.log("\n==================================================================");
console.log(`📊 TOTAL CHECKS: ${total}`);
console.log(`✅ PASSED:       ${passed}`);
console.log(`❌ FAILED:       ${total - passed}`);
console.log("==================================================================");

if (passed === total) {
  console.log("\n🎉 ALL BOTTOM CTA BANNER & RESPONSIVE BUTTON CHECKS PASSED!\n");
  process.exit(0);
} else {
  console.error("\n❌ Some checks failed.\n");
  process.exit(1);
}
