import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  ActivityLogRecord,
  ChatMessage,
  CreateCustomerInput,
  CreateInquiryInput,
  CreateLeadInput,
  CRMNotificationRecord,
  CRMSettingsRecord,
  CustomerFilterParams,
  CustomerRecord,
  DashboardKPIs,
  FollowUpFilterParams,
  FollowUpRecord,
  GlobalSearchResult,
  InquiryFilterParams,
  InquiryRecord,
  InquiryStatus,
  LeadFilterParams,
  LeadRecord,
  LeadStats,
  PaymentFilterParams,
  PaymentRecord,
  RecordPaymentInput,
  ScheduleFollowUpInput,
  ServiceRecord,
} from "./types";
import fs from "fs";
import path from "path";

// ----------------------------------------------------------------------------
// Supabase Client Initialization
// ----------------------------------------------------------------------------

function getCleanSupabaseUrl(): string | null {
  let url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;
  const projectId = process.env.SUPABASE_PROJECT_ID;

  if (!url && projectId && projectId.trim() && !projectId.includes("your-project")) {
    url = `https://${projectId.trim()}.supabase.co`;
  }

  if (!url) return null;

  url = url.trim().replace(/\/+$/, "");
  url = url.replace(/\/rest\/v1\/?$/, "");

  if (url.includes("your-project") || !url.startsWith("http")) {
    return null;
  }

  return url;
}

function getSupabaseKey(): string | null {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_API_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY;

  if (!key || key.includes("your_supabase") || key.length < 10) {
    return null;
  }

  if (key.startsWith("http://") || key.startsWith("https://")) {
    return null;
  }

  return key.trim();
}

let cachedSupabase: SupabaseClient | null = null;
let cachedKey: string | null = null;
let cachedUrl: string | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = getCleanSupabaseUrl();
  const key = getSupabaseKey();

  if (!url || !key) {
    return null;
  }

  if (cachedSupabase && cachedUrl === url && cachedKey === key) {
    return cachedSupabase;
  }

  try {
    cachedSupabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    cachedUrl = url;
    cachedKey = key;
    return cachedSupabase;
  } catch (initErr) {
    console.error("[Supabase DB]: Initialization error:", initErr);
    return null;
  }
}

export let supabase: SupabaseClient | null = getSupabaseClient();

// ----------------------------------------------------------------------------
// Resilient Fallback Storage (Offline / Dev Buffer)
// ----------------------------------------------------------------------------

const FALLBACK_DATA_DIR = path.join(process.cwd(), ".data");
const FALLBACK_CRM_FILE = path.join(FALLBACK_DATA_DIR, "crm.json");

interface LocalCRMStorage {
  leads: InquiryRecord[];
  customers: CustomerRecord[];
  follow_ups: FollowUpRecord[];
  payments: PaymentRecord[];
  services: ServiceRecord[];
  activity_logs: ActivityLogRecord[];
  crm_notifications: CRMNotificationRecord[];
  crm_settings: CRMSettingsRecord;
}

const DEFAULT_SERVICES: ServiceRecord[] = [
  { id: "srv-1", name: "Website Development", category: "Core Infrastructure", description: "Custom luxury high-performance business websites & web applications.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-2", name: "E-commerce Website", category: "Core Infrastructure", description: "Conversion-engineered online stores with integrated checkout & payments.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-3", name: "Product Listing", category: "Marketplace & Retail", description: "Professional SKU cataloging, categorization, and optimization.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-4", name: "Marketplace Services", category: "Marketplace & Retail", description: "Amazon, Flipkart, and multi-channel marketplace scaling.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-5", name: "Google Business Profile", category: "Local Domination", description: "Optimized local visibility, maps ranking, and review systems.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-6", name: "Local SEO", category: "Local Domination", description: "Geo-targeted organic search dominance for localized footfall & leads.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-7", name: "Social Media Management", category: "Brand & Content", description: "Omnichannel luxury brand presence, creative assets, and storytelling.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-8", name: "Google Ads", category: "Paid Acquisition", description: "High-intent search, shopping, and performance max campaigns.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-9", name: "Meta Ads", category: "Paid Acquisition", description: "Targeted Instagram & Facebook direct-response advertising.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-10", name: "WhatsApp Sales", category: "Conversion Automation", description: "Automated sales funnels, catalog sharing, and instant lead capture.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-11", name: "Lead Generation", category: "Conversion Automation", description: "Omnichannel B2B & B2C customer acquisition pipelines.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-12", name: "Analytics & Reporting", category: "Data & Optimization", description: "Live revenue tracking, conversion analytics, and growth reporting.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-13", name: "Online Growth Strategy", category: "Strategic Consulting", description: "Complete roadmap from traditional offline operations to online leadership.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "srv-14", name: "Technical & Marketing Support", category: "Strategic Consulting", description: "Dedicated SLA engineering, site maintenance, and growth advisory.", is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

function getFallbackStore(): LocalCRMStorage {
  try {
    if (!fs.existsSync(FALLBACK_DATA_DIR)) {
      fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(FALLBACK_CRM_FILE)) {
      const initial: LocalCRMStorage = {
        leads: [],
        customers: [],
        follow_ups: [],
        payments: [],
        services: DEFAULT_SERVICES,
        activity_logs: [],
        crm_notifications: [],
        crm_settings: {
          id: "default",
          business_name: "VANIX Digital Growth",
          business_email: "info@vanix.in",
          business_phone: "+91 9457727770",
          business_whatsapp: "+91 9457727770",
          default_inquiry_status: "NEW",
          currency: "INR",
          notification_preferences: { email: true, whatsapp: true },
          updated_at: new Date().toISOString(),
        },
      };
      fs.writeFileSync(FALLBACK_CRM_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const raw = fs.readFileSync(FALLBACK_CRM_FILE, "utf-8");
    return JSON.parse(raw) as LocalCRMStorage;
  } catch (err) {
    console.error("[DB Fallback Storage Error]:", err);
    return {
      leads: [],
      customers: [],
      follow_ups: [],
      payments: [],
      services: DEFAULT_SERVICES,
      activity_logs: [],
      crm_notifications: [],
      crm_settings: {
        id: "default",
        business_name: "VANIX Digital Growth",
        business_email: "info@vanix.in",
        business_phone: "+91 9457727770",
        business_whatsapp: "+91 9457727770",
        default_inquiry_status: "NEW",
        currency: "INR",
        notification_preferences: { email: true, whatsapp: true },
        updated_at: new Date().toISOString(),
      },
    };
  }
}

function saveFallbackStore(store: LocalCRMStorage): void {
  try {
    if (!fs.existsSync(FALLBACK_DATA_DIR)) {
      fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_CRM_FILE, JSON.stringify(store, null, 2));
  } catch (err) {
    console.error("[DB Save Fallback Error]:", err);
  }
}

// ----------------------------------------------------------------------------
// ACTIVITY LOGGING & NOTIFICATIONS
// ----------------------------------------------------------------------------

export async function logActivity(input: {
  inquiry_id?: string | null;
  customer_id?: string | null;
  payment_id?: string | null;
  action: string;
  description: string;
  actor?: string;
  metadata?: Record<string, unknown>;
}): Promise<ActivityLogRecord> {
  const record: ActivityLogRecord = {
    id: crypto.randomUUID(),
    inquiry_id: input.inquiry_id || null,
    customer_id: input.customer_id || null,
    payment_id: input.payment_id || null,
    action: input.action,
    description: input.description,
    actor: input.actor || "Admin",
    metadata: input.metadata || {},
    created_at: new Date().toISOString(),
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.from("activity_logs").insert([record]).select().single();
      if (!error && data) return data as ActivityLogRecord;
      if (error) console.warn("[Supabase logActivity Error]:", error.message || error);
    } catch (err) {
      console.warn("[Supabase logActivity Exception]:", err);
    }
  }

  const store = getFallbackStore();
  store.activity_logs.unshift(record);
  saveFallbackStore(store);
  return record;
}

export async function createNotification(input: {
  type: string;
  title: string;
  message: string;
  link?: string | null;
}): Promise<CRMNotificationRecord> {
  const record: CRMNotificationRecord = {
    id: crypto.randomUUID(),
    type: input.type,
    title: input.title,
    message: input.message,
    link: input.link || null,
    is_read: false,
    created_at: new Date().toISOString(),
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client.from("crm_notifications").insert([record]).select().single();
      if (!error && data) return data as CRMNotificationRecord;
      if (error) console.warn("[Supabase createNotification Error]:", error.message || error);
    } catch (err) {
      console.warn("[Supabase createNotification Exception]:", err);
    }
  }

  const store = getFallbackStore();
  store.crm_notifications.unshift(record);
  saveFallbackStore(store);
  return record;
}

// ----------------------------------------------------------------------------
// 1. INQUIRIES (LEADS)
// ----------------------------------------------------------------------------

export async function createInquiry(input: CreateInquiryInput): Promise<InquiryRecord> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const record: InquiryRecord = {
    id,
    name: input.name,
    email: input.email || null,
    phone: input.phone,
    whatsapp: input.whatsapp || null,
    service: input.service || "General Growth Consultation",
    business_type: input.business_type || null,
    company: input.company || null,
    website: input.website || null,
    message: input.message || null,
    budget: input.budget || null,
    source_page: input.source_page || "/",
    utm_source: input.utm_source || null,
    utm_medium: input.utm_medium || null,
    utm_campaign: input.utm_campaign || null,
    utm_term: input.utm_term || null,
    utm_content: input.utm_content || null,
    referrer: input.referrer || null,
    device_info: input.device_info || null,
    ip_address: input.ip_address || null,
    status: input.status || "NEW",
    notes: input.notes || "",
    email_notification_status: "PENDING",
    customer_email_status: "PENDING",
    whatsapp_notification_status: "PENDING",
    handoff_status: "NONE",
    handoff_reason: null,
    followup_stage: 0,
    conversation_history: input.message
      ? [
          {
            id: crypto.randomUUID(),
            sender: "customer",
            message: input.message,
            timestamp: now,
          },
        ]
      : [],
    created_at: now,
    updated_at: now,
  };

  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client.from("leads").insert([record]).select().single();
    if (error) {
      console.error("[Supabase createInquiry Error]:", error.message || error);
      throw new Error(`Failed to save inquiry to database: ${error.message || "Database insert error"}`);
    }
    if (!data) {
      throw new Error("Failed to save inquiry to database: No record returned from Supabase insert");
    }

    try {
      await logActivity({
        inquiry_id: id,
        action: "INQUIRY_CREATED",
        description: `New inquiry received from ${record.name} (${record.service})`,
        actor: "Website",
      });
      await createNotification({
        type: "NEW_INQUIRY",
        title: "New Inquiry Received",
        message: `${record.name} inquired for ${record.service}`,
        link: `/admin/inquiries/${id}`,
      });
    } catch (activityErr) {
      console.warn("[CRM Activity Log Warning]:", activityErr);
    }

    return data as InquiryRecord;
  }

  // If Supabase client is not available
  const isProduction =
    process.env.NODE_ENV === "production" ||
    !!process.env.VERCEL ||
    !!process.env.NETLIFY;

  if (isProduction) {
    console.error("[Supabase DB Error]: Supabase database is not configured. Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
    throw new Error("Database service is unavailable. Supabase environment variables are missing.");
  }

  // Local development fallback only when running offline without Supabase configured
  console.warn("[DB Warning]: Supabase not configured. Saving inquiry to local fallback storage.");
  const store = getFallbackStore();
  store.leads.unshift(record);
  saveFallbackStore(store);

  await logActivity({
    inquiry_id: id,
    action: "INQUIRY_CREATED",
    description: `New inquiry created for ${record.name}`,
    actor: "System",
  });

  return record;
}

// Backward compatibility alias
export const createLead = createInquiry;

export async function getInquiries(filters: InquiryFilterParams = {}): Promise<{ inquiries: InquiryRecord[]; total: number }> {
  const {
    search = "",
    status = "ALL",
    service = "",
    source = "",
    handoffOnly = false,
    sortBy = "newest",
    dateRange = "all",
    startDate,
    endDate,
    page = 1,
    limit = 20,
  } = filters;

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      let query = supabase.from("leads").select("*", { count: "exact" });

      if (status && status !== "ALL") {
        query = query.eq("status", status);
      }

      if (service && service !== "ALL") {
        query = query.eq("service", service);
      }

      if (source && source !== "ALL") {
        query = query.ilike("source_page", `%${source}%`);
      }

      if (handoffOnly) {
        query = query.eq("handoff_status", "REQUESTED");
      }

      if (search.trim()) {
        const s = `%${search.trim()}%`;
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(search.trim());
        if (isUUID) {
          query = query.or(`id.eq.${search.trim()},name.ilike.${s},company.ilike.${s},phone.ilike.${s},email.ilike.${s}`);
        } else {
          query = query.or(`name.ilike.${s},company.ilike.${s},phone.ilike.${s},email.ilike.${s},message.ilike.${s}`);
        }
      }

      if (startDate && endDate) {
        query = query.gte("created_at", startDate).lte("created_at", endDate);
      } else if (dateRange && dateRange !== "all") {
        const now = new Date();
        let fromDate = new Date();
        if (dateRange === "today") fromDate.setHours(0, 0, 0, 0);
        else if (dateRange === "week") fromDate.setDate(now.getDate() - 7);
        else if (dateRange === "month") fromDate.setMonth(now.getMonth() - 1);
        else if (dateRange === "year") fromDate.setFullYear(now.getFullYear() - 1);
        query = query.gte("created_at", fromDate.toISOString());
      }

      if (sortBy === "oldest") {
        query = query.order("created_at", { ascending: true });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (!error && data) {
        return { inquiries: data as InquiryRecord[], total: count || 0 };
      }
      console.error("[Supabase getInquiries Error]:", error);
    } catch (err) {
      console.error("[Supabase getInquiries Exception]:", err);
    }
  }

  // Fallback local query
  const store = getFallbackStore();
  let inquiries = [...store.leads];

  if (status && status !== "ALL") {
    inquiries = inquiries.filter((l) => l.status === status);
  }
  if (service && service !== "ALL") {
    inquiries = inquiries.filter((l) => l.service === service);
  }
  if (search.trim()) {
    const s = search.toLowerCase().trim();
    inquiries = inquiries.filter(
      (l) =>
        (l.name && l.name.toLowerCase().includes(s)) ||
        (l.company && l.company.toLowerCase().includes(s)) ||
        (l.phone && l.phone.toLowerCase().includes(s)) ||
        (l.email && l.email.toLowerCase().includes(s))
    );
  }

  inquiries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const total = inquiries.length;
  const start = (page - 1) * limit;
  const paginated = inquiries.slice(start, start + limit);

  return { inquiries: paginated, total };
}

// Backward compatibility alias
export async function getLeads(filters: LeadFilterParams = {}) {
  const res = await getInquiries(filters);
  return { leads: res.inquiries, total: res.total };
}

export async function getInquiryById(id: string): Promise<InquiryRecord | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
      if (!error && data) return data as InquiryRecord;
    } catch (err) {
      console.error("[Supabase getInquiryById Exception]:", err);
    }
  }

  const store = getFallbackStore();
  return store.leads.find((l) => l.id === id) || null;
}

// Backward compatibility alias
export const getLeadById = getInquiryById;

export async function updateInquiry(id: string, updates: Partial<InquiryRecord>): Promise<InquiryRecord | null> {
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from("leads").update(updatedData).eq("id", id).select().single();
      if (!error && data) {
        if (updates.status) {
          await logActivity({
            inquiry_id: id,
            action: "STATUS_CHANGED",
            description: `Inquiry status changed to ${updates.status}`,
          });
        }
        return data as InquiryRecord;
      }
      console.error("[Supabase updateInquiry Error]:", error);
    } catch (err) {
      console.error("[Supabase updateInquiry Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const idx = store.leads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    store.leads[idx] = { ...store.leads[idx], ...updatedData };
    saveFallbackStore(store);
    return store.leads[idx];
  }
  return null;
}

// Backward compatibility alias
export const updateLead = updateInquiry;

export async function deleteInquiry(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (!error) return true;
    } catch (err) {
      console.error("[Supabase deleteInquiry Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const before = store.leads.length;
  store.leads = store.leads.filter((l) => l.id !== id);
  saveFallbackStore(store);
  return store.leads.length !== before;
}

// Backward compatibility alias
export const deleteLead = deleteInquiry;

export async function convertInquiryToCustomer(inquiryId: string): Promise<CustomerRecord | null> {
  const inquiry = await getInquiryById(inquiryId);
  if (!inquiry) throw new Error("Inquiry not found.");

  // Check if customer already exists for this phone/email
  const existingCustomers = await getCustomers({ search: inquiry.phone });
  if (existingCustomers.customers.length > 0) {
    const existing = existingCustomers.customers[0];
    await updateInquiry(inquiryId, {
      customer_id: existing.id,
      status: "WON",
    });
    await logActivity({
      inquiry_id: inquiryId,
      customer_id: existing.id,
      action: "CONVERTED_TO_CUSTOMER",
      description: `Inquiry linked to existing customer ${existing.name}`,
    });
    return existing;
  }

  const newCustomer = await createCustomer({
    name: inquiry.name,
    company: inquiry.company || undefined,
    email: inquiry.email || undefined,
    phone: inquiry.phone,
    website: inquiry.website || undefined,
    services: inquiry.service ? [inquiry.service] : ["Website Development"],
    notes: inquiry.notes || `Converted from inquiry ${inquiry.id}`,
    converted_from_inquiry_id: inquiry.id,
  });

  await updateInquiry(inquiryId, {
    customer_id: newCustomer.id,
    status: "WON",
  });

  await logActivity({
    inquiry_id: inquiryId,
    customer_id: newCustomer.id,
    action: "CONVERTED_TO_CUSTOMER",
    description: `Inquiry successfully converted to new customer record ${newCustomer.name}`,
  });

  return newCustomer;
}

// ----------------------------------------------------------------------------
// 2. CUSTOMERS
// ----------------------------------------------------------------------------

export async function createCustomer(input: CreateCustomerInput): Promise<CustomerRecord> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const record: CustomerRecord = {
    id,
    name: input.name,
    company: input.company || null,
    email: input.email || null,
    phone: input.phone,
    website: input.website || null,
    services: input.services || [],
    status: "ACTIVE",
    total_paid: 0,
    pending_amount: 0,
    notes: input.notes || "",
    converted_from_inquiry_id: input.converted_from_inquiry_id || null,
    last_contact_at: now,
    created_at: now,
    updated_at: now,
  };

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from("customers").insert([record]).select().single();
      if (!error && data) {
        await logActivity({
          customer_id: id,
          action: "CUSTOMER_CREATED",
          description: `Customer ${record.name} created`,
        });
        return data as CustomerRecord;
      }
      console.error("[Supabase createCustomer Error]:", error);
    } catch (err) {
      console.error("[Supabase createCustomer Exception]:", err);
    }
  }

  const store = getFallbackStore();
  store.customers.unshift(record);
  saveFallbackStore(store);

  await logActivity({
    customer_id: id,
    action: "CUSTOMER_CREATED",
    description: `Customer ${record.name} created`,
  });

  return record;
}

export async function getCustomers(filters: CustomerFilterParams = {}): Promise<{ customers: CustomerRecord[]; total: number }> {
  const { search = "", status = "ALL", sortBy = "newest", page = 1, limit = 20 } = filters;

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      let query = supabase.from("customers").select("*", { count: "exact" });

      if (status && status !== "ALL") {
        query = query.eq("status", status);
      }

      if (search.trim()) {
        const s = `%${search.trim()}%`;
        query = query.or(`name.ilike.${s},company.ilike.${s},phone.ilike.${s},email.ilike.${s}`);
      }

      if (sortBy === "oldest") query = query.order("created_at", { ascending: true });
      else if (sortBy === "paid") query = query.order("total_paid", { ascending: false });
      else if (sortBy === "name") query = query.order("name", { ascending: true });
      else query = query.order("created_at", { ascending: false });

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (!error && data) {
        return { customers: data as CustomerRecord[], total: count || 0 };
      }
      console.error("[Supabase getCustomers Error]:", error);
    } catch (err) {
      console.error("[Supabase getCustomers Exception]:", err);
    }
  }

  const store = getFallbackStore();
  let customers = [...store.customers];

  if (status && status !== "ALL") {
    customers = customers.filter((c) => c.status === status);
  }

  if (search.trim()) {
    const s = search.toLowerCase().trim();
    customers = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        (c.company && c.company.toLowerCase().includes(s)) ||
        c.phone.includes(s) ||
        (c.email && c.email.toLowerCase().includes(s))
    );
  }

  customers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const total = customers.length;
  const start = (page - 1) * limit;
  return { customers: customers.slice(start, start + limit), total };
}

export async function getCustomerById(id: string): Promise<CustomerRecord | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("customers").select("*, inquiries:leads(*), payments(*), follow_ups(*)").eq("id", id).single();
      if (!error && data) return data as CustomerRecord;
    } catch (err) {
      console.error("[Supabase getCustomerById Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const customer = store.customers.find((c) => c.id === id);
  if (!customer) return null;

  return {
    ...customer,
    inquiries: store.leads.filter((l) => l.customer_id === id),
    payments: store.payments.filter((p) => p.customer_id === id),
    follow_ups: store.follow_ups.filter((f) => f.customer_id === id),
  };
}

export async function updateCustomer(id: string, updates: Partial<CustomerRecord>): Promise<CustomerRecord | null> {
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from("customers").update(updatedData).eq("id", id).select().single();
      if (!error && data) return data as CustomerRecord;
    } catch (err) {
      console.error("[Supabase updateCustomer Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const idx = store.customers.findIndex((c) => c.id === id);
  if (idx !== -1) {
    store.customers[idx] = { ...store.customers[idx], ...updatedData };
    saveFallbackStore(store);
    return store.customers[idx];
  }
  return null;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("customers").delete().eq("id", id);
      if (!error) return true;
    } catch (err) {
      console.error("[Supabase deleteCustomer Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const before = store.customers.length;
  store.customers = store.customers.filter((c) => c.id !== id);
  saveFallbackStore(store);
  return store.customers.length !== before;
}

// ----------------------------------------------------------------------------
// 3. FOLLOW-UPS
// ----------------------------------------------------------------------------

export async function scheduleFollowUp(input: ScheduleFollowUpInput): Promise<FollowUpRecord> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const record: FollowUpRecord = {
    id,
    inquiry_id: input.inquiry_id || null,
    customer_id: input.customer_id || null,
    title: input.title,
    scheduled_at: input.scheduled_at,
    type: input.type,
    status: "PENDING",
    note: input.note || "",
    completed_at: null,
    created_at: now,
    updated_at: now,
  };

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from("follow_ups").insert([record]).select().single();
      if (!error && data) {
        if (input.inquiry_id) {
          await updateInquiry(input.inquiry_id, { next_followup_at: input.scheduled_at });
        }
        await logActivity({
          inquiry_id: input.inquiry_id,
          customer_id: input.customer_id,
          action: "FOLLOWUP_SCHEDULED",
          description: `Scheduled ${input.type} follow-up: "${input.title}" for ${new Date(input.scheduled_at).toLocaleDateString()}`,
        });
        return data as FollowUpRecord;
      }
    } catch (err) {
      console.error("[Supabase scheduleFollowUp Exception]:", err);
    }
  }

  const store = getFallbackStore();
  store.follow_ups.unshift(record);
  saveFallbackStore(store);

  if (input.inquiry_id) {
    await updateInquiry(input.inquiry_id, { next_followup_at: input.scheduled_at });
  }

  await logActivity({
    inquiry_id: input.inquiry_id,
    customer_id: input.customer_id,
    action: "FOLLOWUP_SCHEDULED",
    description: `Scheduled ${input.type} follow-up: "${input.title}"`,
  });

  return record;
}

export async function getFollowUps(filters: FollowUpFilterParams = {}): Promise<FollowUpRecord[]> {
  const { tab = "all", inquiry_id, customer_id, status } = filters;

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      let query = supabase.from("follow_ups").select("*, inquiry:leads(id, name, phone, email, company, service), customer:customers(id, name, phone, email, company)");

      if (inquiry_id) query = query.eq("inquiry_id", inquiry_id);
      if (customer_id) query = query.eq("customer_id", customer_id);
      if (status && status !== "ALL") query = query.eq("status", status);

      const now = new Date();
      if (tab === "today") {
        const start = new Date(now.setHours(0, 0, 0, 0)).toISOString();
        const end = new Date(now.setHours(23, 59, 59, 999)).toISOString();
        query = query.gte("scheduled_at", start).lte("scheduled_at", end);
      } else if (tab === "upcoming") {
        query = query.gte("scheduled_at", new Date().toISOString()).eq("status", "PENDING");
      } else if (tab === "overdue") {
        query = query.lt("scheduled_at", new Date().toISOString()).eq("status", "PENDING");
      } else if (tab === "completed") {
        query = query.eq("status", "COMPLETED");
      }

      query = query.order("scheduled_at", { ascending: true });
      const { data, error } = await query;
      if (!error && data) return data as FollowUpRecord[];
    } catch (err) {
      console.error("[Supabase getFollowUps Exception]:", err);
    }
  }

  const store = getFallbackStore();
  let followups = store.follow_ups.map((f) => ({
    ...f,
    inquiry: store.leads.find((l) => l.id === f.inquiry_id) || null,
    customer: store.customers.find((c) => c.id === f.customer_id) || null,
  }));

  if (inquiry_id) followups = followups.filter((f) => f.inquiry_id === inquiry_id);
  if (customer_id) followups = followups.filter((f) => f.customer_id === customer_id);
  if (status && status !== "ALL") followups = followups.filter((f) => f.status === status);

  const now = new Date();
  if (tab === "today") {
    const todayStr = now.toDateString();
    followups = followups.filter((f) => new Date(f.scheduled_at).toDateString() === todayStr);
  } else if (tab === "upcoming") {
    followups = followups.filter((f) => new Date(f.scheduled_at) >= now && f.status === "PENDING");
  } else if (tab === "overdue") {
    followups = followups.filter((f) => new Date(f.scheduled_at) < now && f.status === "PENDING");
  } else if (tab === "completed") {
    followups = followups.filter((f) => f.status === "COMPLETED");
  }

  return followups.sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
}

export async function updateFollowUp(id: string, updates: Partial<FollowUpRecord>): Promise<FollowUpRecord | null> {
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
    ...(updates.status === "COMPLETED" ? { completed_at: new Date().toISOString() } : {}),
  };

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from("follow_ups").update(updatedData).eq("id", id).select().single();
      if (!error && data) {
        if (updates.status === "COMPLETED") {
          await logActivity({
            inquiry_id: data.inquiry_id,
            customer_id: data.customer_id,
            action: "FOLLOWUP_COMPLETED",
            description: `Follow-up "${data.title}" completed`,
          });
        }
        return data as FollowUpRecord;
      }
    } catch (err) {
      console.error("[Supabase updateFollowUp Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const idx = store.follow_ups.findIndex((f) => f.id === id);
  if (idx !== -1) {
    store.follow_ups[idx] = { ...store.follow_ups[idx], ...updatedData };
    saveFallbackStore(store);
    return store.follow_ups[idx];
  }
  return null;
}

// ----------------------------------------------------------------------------
// 4. PAYMENTS
// ----------------------------------------------------------------------------

export async function recordPayment(input: RecordPaymentInput): Promise<PaymentRecord> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const record: PaymentRecord = {
    id,
    customer_id: input.customer_id || null,
    inquiry_id: input.inquiry_id || null,
    amount: Number(input.amount),
    currency: input.currency || "INR",
    method: input.method,
    status: input.status || "PAID",
    transaction_id: input.transaction_id || `TXN-${Date.now()}`,
    invoice_number: input.invoice_number || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    notes: input.notes || "",
    paid_at: input.status === "PAID" ? input.paid_at || now : null,
    created_at: now,
    updated_at: now,
  };

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from("payments").insert([record]).select().single();
      if (!error && data) {
        // Update customer total paid if customer_id is linked
        if (input.customer_id && record.status === "PAID") {
          const cust = await getCustomerById(input.customer_id);
          if (cust) {
            await updateCustomer(cust.id, {
              total_paid: Number(cust.total_paid || 0) + Number(record.amount),
            });
          }
        }
        await logActivity({
          customer_id: input.customer_id,
          inquiry_id: input.inquiry_id,
          payment_id: id,
          action: "PAYMENT_RECORDED",
          description: `Payment of ₹${record.amount.toLocaleString()} recorded via ${record.method} (${record.status})`,
        });
        await createNotification({
          type: "PAYMENT_RECEIVED",
          title: "Payment Recorded",
          message: `₹${record.amount.toLocaleString()} via ${record.method}`,
          link: `/admin/payments/${id}`,
        });
        return data as PaymentRecord;
      }
    } catch (err) {
      console.error("[Supabase recordPayment Exception]:", err);
    }
  }

  const store = getFallbackStore();
  store.payments.unshift(record);
  if (input.customer_id && record.status === "PAID") {
    const custIdx = store.customers.findIndex((c) => c.id === input.customer_id);
    if (custIdx !== -1) {
      store.customers[custIdx].total_paid = Number(store.customers[custIdx].total_paid || 0) + Number(record.amount);
    }
  }
  saveFallbackStore(store);

  await logActivity({
    customer_id: input.customer_id,
    inquiry_id: input.inquiry_id,
    payment_id: id,
    action: "PAYMENT_RECORDED",
    description: `Payment of ₹${record.amount.toLocaleString()} recorded (${record.status})`,
  });

  return record;
}

export async function getPayments(filters: PaymentFilterParams = {}): Promise<{ payments: PaymentRecord[]; total: number }> {
  const { customer_id, inquiry_id, status, method, page = 1, limit = 20 } = filters;

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      let query = supabase.from("payments").select("*, customer:customers(id, name, company, email, phone), inquiry:leads(id, name, company, service)", { count: "exact" });

      if (customer_id) query = query.eq("customer_id", customer_id);
      if (inquiry_id) query = query.eq("inquiry_id", inquiry_id);
      if (status && status !== "ALL") query = query.eq("status", status);
      if (method && method !== "ALL") query = query.eq("method", method);

      query = query.order("created_at", { ascending: false });

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (!error && data) {
        return { payments: data as PaymentRecord[], total: count || 0 };
      }
    } catch (err) {
      console.error("[Supabase getPayments Exception]:", err);
    }
  }

  const store = getFallbackStore();
  let payments = store.payments.map((p) => ({
    ...p,
    customer: store.customers.find((c) => c.id === p.customer_id) || null,
    inquiry: store.leads.find((l) => l.id === p.inquiry_id) || null,
  }));

  if (customer_id) payments = payments.filter((p) => p.customer_id === customer_id);
  if (inquiry_id) payments = payments.filter((p) => p.inquiry_id === inquiry_id);
  if (status && status !== "ALL") payments = payments.filter((p) => p.status === status);
  if (method && method !== "ALL") payments = payments.filter((p) => p.method === method);

  payments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const total = payments.length;
  const start = (page - 1) * limit;
  return { payments: payments.slice(start, start + limit), total };
}

export async function getPaymentById(id: string): Promise<PaymentRecord | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("payments").select("*, customer:customers(*), inquiry:leads(*)").eq("id", id).single();
      if (!error && data) return data as PaymentRecord;
    } catch (err) {
      console.error("[Supabase getPaymentById Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const payment = store.payments.find((p) => p.id === id);
  if (!payment) return null;

  return {
    ...payment,
    customer: store.customers.find((c) => c.id === payment.customer_id) || null,
    inquiry: store.leads.find((l) => l.id === payment.inquiry_id) || null,
  };
}

export async function updatePayment(id: string, updates: Partial<PaymentRecord>): Promise<PaymentRecord | null> {
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from("payments").update(updatedData).eq("id", id).select().single();
      if (!error && data) return data as PaymentRecord;
    } catch (err) {
      console.error("[Supabase updatePayment Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const idx = store.payments.findIndex((p) => p.id === id);
  if (idx !== -1) {
    store.payments[idx] = { ...store.payments[idx], ...updatedData };
    saveFallbackStore(store);
    return store.payments[idx];
  }
  return null;
}

// ----------------------------------------------------------------------------
// 5. SERVICES
// ----------------------------------------------------------------------------

export async function getServices(): Promise<ServiceRecord[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("services").select("*").order("name", { ascending: true });
      if (!error && data && data.length > 0) return data as ServiceRecord[];
    } catch (err) {
      console.error("[Supabase getServices Exception]:", err);
    }
  }

  const store = getFallbackStore();
  return store.services || DEFAULT_SERVICES;
}

export async function toggleServiceStatus(id: string, is_active: boolean): Promise<ServiceRecord | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("services").update({ is_active, updated_at: new Date().toISOString() }).eq("id", id).select().single();
      if (!error && data) return data as ServiceRecord;
    } catch (err) {
      console.error("[Supabase toggleServiceStatus Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const idx = store.services.findIndex((s) => s.id === id);
  if (idx !== -1) {
    store.services[idx].is_active = is_active;
    saveFallbackStore(store);
    return store.services[idx];
  }
  return null;
}

// ----------------------------------------------------------------------------
// 6. DASHBOARD & KPIS (Real Database Data)
// ----------------------------------------------------------------------------

export async function getDashboardKPIs(dateRange: string = "all"): Promise<DashboardKPIs> {
  const kpis: DashboardKPIs = {
    totalInquiries: 0,
    newInquiries: 0,
    qualifiedInquiries: 0,
    activePipelineCount: 0,
    totalCustomers: 0,
    pendingPaymentsAmount: 0,
    paidRevenueAmount: 0,
    followupsDueCount: 0,
    pipelineStageCounts: {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      PROPOSAL: 0,
      NEGOTIATION: 0,
      WON: 0,
      LOST: 0,
    },
    recentInquiries: [],
    upcomingFollowUps: [],
    recentPayments: [],
    recentActivities: [],
    revenueByMonth: [],
  };

  const inquiriesRes = await getInquiries({ limit: 1000, dateRange: dateRange as any });
  const allInquiries = inquiriesRes.inquiries;

  kpis.totalInquiries = inquiriesRes.total;
  for (const inq of allInquiries) {
    const st = inq.status || "NEW";
    if (st === "NEW") kpis.newInquiries++;
    if (st === "QUALIFIED") kpis.qualifiedInquiries++;
    if (["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "PROPOSAL_SENT", "NEGOTIATION"].includes(st)) {
      kpis.activePipelineCount++;
    }
    const normalizedStage = st === "PROPOSAL_SENT" ? "PROPOSAL" : st;
    if (kpis.pipelineStageCounts[normalizedStage] !== undefined) {
      kpis.pipelineStageCounts[normalizedStage]++;
    }
  }

  kpis.recentInquiries = allInquiries.slice(0, 5);

  const customersRes = await getCustomers({ limit: 1000 });
  kpis.totalCustomers = customersRes.total;

  const paymentsRes = await getPayments({ limit: 1000 });
  for (const p of paymentsRes.payments) {
    if (p.status === "PAID") {
      kpis.paidRevenueAmount += Number(p.amount);
    } else if (p.status === "PENDING") {
      kpis.pendingPaymentsAmount += Number(p.amount);
    }
  }
  kpis.recentPayments = paymentsRes.payments.slice(0, 5);

  const followups = await getFollowUps({ status: "PENDING" });
  const now = new Date();
  kpis.followupsDueCount = followups.filter((f) => new Date(f.scheduled_at) <= now || new Date(f.scheduled_at).toDateString() === now.toDateString()).length;
  kpis.upcomingFollowUps = followups.slice(0, 5);

  kpis.recentActivities = await getActivityLogs(10);

  return kpis;
}

export async function getActivityLogs(limit: number = 20): Promise<ActivityLogRecord[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(limit);
      if (!error && data) return data as ActivityLogRecord[];
    } catch (err) {
      console.error("[Supabase getActivityLogs Exception]:", err);
    }
  }

  const store = getFallbackStore();
  return (store.activity_logs || []).slice(0, limit);
}

// ----------------------------------------------------------------------------
// 7. GLOBAL SEARCH
// ----------------------------------------------------------------------------

export async function globalSearch(queryStr: string): Promise<GlobalSearchResult> {
  const result: GlobalSearchResult = {
    inquiries: [],
    customers: [],
    payments: [],
    follow_ups: [],
  };

  const q = queryStr.trim();
  if (!q) return result;

  const inqRes = await getInquiries({ search: q, limit: 5 });
  result.inquiries = inqRes.inquiries.map((i) => ({
    id: i.id,
    name: i.name,
    company: i.company || undefined,
    email: i.email || undefined,
    phone: i.phone,
    status: i.status,
  }));

  const custRes = await getCustomers({ search: q, limit: 5 });
  result.customers = custRes.customers.map((c) => ({
    id: c.id,
    name: c.name,
    company: c.company || undefined,
    email: c.email || undefined,
    phone: c.phone,
    total_paid: c.total_paid,
  }));

  const payRes = await getPayments({ limit: 100 });
  const matchedPayments = payRes.payments.filter(
    (p) =>
      (p.transaction_id && p.transaction_id.toLowerCase().includes(q.toLowerCase())) ||
      (p.customer?.name && p.customer.name.toLowerCase().includes(q.toLowerCase()))
  );
  result.payments = matchedPayments.slice(0, 5).map((p) => ({
    id: p.id,
    amount: p.amount,
    method: p.method,
    status: p.status,
    transaction_id: p.transaction_id || undefined,
    customer_name: p.customer?.name,
  }));

  const followUps = await getFollowUps({});
  const matchedFollowUps = followUps.filter(
    (f) =>
      f.title.toLowerCase().includes(q.toLowerCase()) ||
      (f.inquiry?.name && f.inquiry.name.toLowerCase().includes(q.toLowerCase())) ||
      (f.customer?.name && f.customer.name.toLowerCase().includes(q.toLowerCase()))
  );
  result.follow_ups = matchedFollowUps.slice(0, 5).map((f) => ({
    id: f.id,
    title: f.title,
    scheduled_at: f.scheduled_at,
    type: f.type,
    status: f.status,
    contact_name: f.inquiry?.name || f.customer?.name,
  }));

  return result;
}

// ----------------------------------------------------------------------------
// 8. NOTIFICATIONS & SETTINGS
// ----------------------------------------------------------------------------

export async function getNotifications(limit: number = 20): Promise<CRMNotificationRecord[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("crm_notifications").select("*").order("created_at", { ascending: false }).limit(limit);
      if (!error && data) return data as CRMNotificationRecord[];
    } catch (err) {
      console.error("[Supabase getNotifications Exception]:", err);
    }
  }

  const store = getFallbackStore();
  return (store.crm_notifications || []).slice(0, limit);
}

export async function markNotificationRead(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("crm_notifications").update({ is_read: true }).eq("id", id);
      if (!error) return true;
    } catch (err) {
      console.error("[Supabase markNotificationRead Exception]:", err);
    }
  }

  const store = getFallbackStore();
  const n = store.crm_notifications.find((item) => item.id === id);
  if (n) {
    n.is_read = true;
    saveFallbackStore(store);
    return true;
  }
  return false;
}

export async function getCRMSettings(): Promise<CRMSettingsRecord> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("crm_settings").select("*").eq("id", "default").single();
      if (!error && data) return data as CRMSettingsRecord;
    } catch (err) {
      console.error("[Supabase getCRMSettings Exception]:", err);
    }
  }

  const store = getFallbackStore();
  return store.crm_settings;
}

export async function updateCRMSettings(updates: Partial<CRMSettingsRecord>): Promise<CRMSettingsRecord> {
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from("crm_settings").upsert({ id: "default", ...updatedData }).select().single();
      if (!error && data) return data as CRMSettingsRecord;
    } catch (err) {
      console.error("[Supabase updateCRMSettings Exception]:", err);
    }
  }

  const store = getFallbackStore();
  store.crm_settings = { ...store.crm_settings, ...updatedData };
  saveFallbackStore(store);
  return store.crm_settings;
}

// Backward compatibility helper
export async function getLeadStats(): Promise<LeadStats> {
  const kpis = await getDashboardKPIs();
  return {
    total: kpis.totalInquiries,
    new: kpis.newInquiries,
    contacted: kpis.pipelineStageCounts.CONTACTED || 0,
    qualified: kpis.qualifiedInquiries,
    proposal_sent: kpis.pipelineStageCounts.PROPOSAL || 0,
    won: kpis.pipelineStageCounts.WON || 0,
    lost: kpis.pipelineStageCounts.LOST || 0,
    spam: 0,
    handoffs_pending: 0,
  };
}

export async function findLeadByPhone(rawPhone: string): Promise<InquiryRecord | null> {
  const cleanDigits = rawPhone.replace(/\D/g, "");
  const last10 = cleanDigits.slice(-10);

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .or(`phone.ilike.%${last10}%,whatsapp.ilike.%${last10}%`)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) return data[0] as InquiryRecord;
    } catch (err) {
      console.error("[Supabase findLeadByPhone Exception]:", err);
    }
  }

  const store = getFallbackStore();
  return (
    store.leads.find((l) => {
      const p = (l.phone || "").replace(/\D/g, "");
      const w = (l.whatsapp || "").replace(/\D/g, "");
      return (p && p.includes(last10)) || (w && w.includes(last10));
    }) || null
  );
}

export async function appendConversationMessage(leadId: string, message: ChatMessage): Promise<InquiryRecord | null> {
  const lead = await getInquiryById(leadId);
  if (!lead) return null;

  const updatedHistory = [...(lead.conversation_history || []), message];
  return await updateInquiry(leadId, { conversation_history: updatedHistory });
}
