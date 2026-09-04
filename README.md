# VANIX — Complete Lead Management, Email & WhatsApp Automation Suite

A production-ready, zero-loss lead capture, qualification, and automated multi-channel communication engine for **VANIX**.

---

## 🌟 System Overview & Features

1. **Seamless Website Ingestion**:
   - Every website form ([`ContactSection.tsx`](file:///d:/My%20Company/VANIX/src/components/sections/ContactSection.tsx), 14 Service Cards via [`ServiceInquiryModal.tsx`](file:///d:/My%20Company/VANIX/src/components/ui/ServiceInquiryModal.tsx), CTAs) submits directly to `POST /api/leads`.
   - Captures customer details, business model, budget, message, UTM parameters, referrer, and device metadata.
2. **Resilient Database Layer**:
   - Supabase PostgreSQL primary database with [`supabase_schema.sql`](file:///d:/My%20Company/VANIX/supabase_schema.sql).
   - Zero-loss failover buffer ensures leads are always saved even during local dev or external connection downtime.
3. **Automated Customer & Internal Emailing**:
   - **Internal Alert**: Instant branded HTML email sent to `hackwithkunal@gmail.com`.
   - **Customer Confirmation**: Branded confirmation email sent to the customer with subject *"We received your VANIX inquiry"*.
   - **Follow-up Sequence**: Day 1 and Day 3 follow-up templates.
4. **WhatsApp Business Platform / Cloud API Automation**:
   - Instant internal WhatsApp alert to `+91 9457727770` (`919457727770`).
   - Customer auto-reply greeting and confirmation.
   - Live bidirectional webhook at `/api/whatsapp/webhook`.
5. **AI WhatsApp Assistant & Human Handoff Protocol**:
   - Controlled knowledge base in [`src/data/vanix-knowledge.ts`](file:///d:/My%20Company/VANIX/src/data/vanix-knowledge.ts).
   - Zero-hallucination guardrail (never invents prices, guarantees, or delivery times).
   - Immediate **Human Handoff Alert** (Email + WhatsApp) when a customer asks for pricing, a human agent, or has complex technical requirements.
6. **Command Center Admin Dashboard (`/admin/leads`)**:
   - Protected with secure JWT HTTP-only cookie authentication (`/admin/login`).
   - 9 KPI Stat Cards, real-time search, multi-faceted filtering, sorting, and pagination.
   - Lead Dossier with conversation timeline, notification retry buttons, follow-up triggers, 1-click status changers, and CSV export.

---

## 🚀 Step-by-Step Setup & Configuration

### 1. Database Setup (Supabase PostgreSQL)
1. Go to [Supabase](https://supabase.com/) and create a project.
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy and run the SQL code from [`supabase_schema.sql`](file:///d:/My%20Company/VANIX/supabase_schema.sql).
4. In **Project Settings -> API**, copy:
   - `Project URL` -> `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` (secret key) -> `SUPABASE_SERVICE_ROLE_KEY`

### 2. Email Automation Setup (Resend)
1. Sign up at [Resend](https://resend.com/) and generate an API key in **API Keys**.
2. Add `RESEND_API_KEY=re_...` to `.env.local`.
3. Set `VANIX_LEAD_EMAIL=hackwithkunal@gmail.com`.
4. (Optional for production) Verify your custom domain in Resend and set `RESEND_FROM_EMAIL=VANIX Inquiries <info@yourdomain.com>`.

### 3. WhatsApp Business Cloud API Setup (Meta)
1. Visit the [Meta for Developers Portal](https://developers.facebook.com/) and create a Business App with WhatsApp product added.
2. In **WhatsApp -> API Setup**:
   - Copy the Temporary or Permanent System User Access Token -> `WHATSAPP_ACCESS_TOKEN`.
   - Copy the Phone Number ID -> `WHATSAPP_PHONE_NUMBER_ID`.
   - Set `VANIX_LEAD_WHATSAPP=919457727770`.
3. In **WhatsApp -> Configuration -> Webhook**:
   - Callback URL: `https://your-domain.com/api/whatsapp/webhook`
   - Verify Token: Matches `WHATSAPP_WEBHOOK_VERIFY_TOKEN` (default: `vanix_webhook_verify_token_2026`).
   - Subscribe to the `messages` webhook field.

### 4. Admin Authentication
1. Set `ADMIN_EMAIL=admin@vanix.in` and `ADMIN_PASSWORD=...`.
2. Generate a secure random string for `ADMIN_SECRET` (min 32 characters).

---

## 🛠️ Verification & Build Commands

```powershell
# Run development server
npm.cmd run dev

# Run full TypeScript check and production build
npm.cmd run build

# Run ESLint validation
npm.cmd run lint
```

---

## 🔒 Security Invariants
- `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `WHATSAPP_ACCESS_TOKEN`, and `ADMIN_SECRET` are strictly server-side environment variables and are never bundled into client JavaScript.
- All form submissions are sanitized against XSS attacks and rate-limited.
- Invisible honeypot field catches automated spam bots silently.
