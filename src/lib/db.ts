import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ChatMessage, CreateLeadInput, LeadFilterParams, LeadRecord, LeadStats } from "./types";
import fs from "fs";
import path from "path";

// Helper to sanitize & normalize Supabase Project URL
function getCleanSupabaseUrl(): string | null {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const projectId = process.env.SUPABASE_PROJECT_ID;

  if (!url && projectId) {
    url = `https://${projectId.trim()}.supabase.co`;
  }

  if (!url) return null;

  url = url.trim().replace(/\/+$/, ""); // Remove trailing slashes
  url = url.replace(/\/rest\/v1\/?$/, ""); // Remove /rest/v1 suffix if pasted

  if (url.includes("your-project") || !url.startsWith("http")) {
    return null;
  }

  return url;
}

// Helper to resolve Supabase API key
function getSupabaseKey(): string | null {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_API_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (!key || key.includes("your_supabase") || key.length < 10) {
    return null;
  }

  // If the key is accidentally set to the URL, return null so it falls back gracefully
  if (key.startsWith("http://") || key.startsWith("https://")) {
    return null;
  }

  return key.trim();
}

// Initialize Supabase Client
let supabase: SupabaseClient | null = null;

const supabaseUrl = getCleanSupabaseUrl();
const supabaseKey = getSupabaseKey();

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log(`[Supabase DB]: Successfully initialized client with endpoint: ${supabaseUrl}`);
  } catch (initErr) {
    console.error("[Supabase DB]: Initialization error:", initErr);
    supabase = null;
  }
} else {
  if (supabaseUrl && !supabaseKey) {
    console.warn(
      `[Supabase DB]: Supabase URL is configured (${supabaseUrl}), but no valid API Key / Service Role Key found in environment variables. Falling back to local JSON storage.`
    );
  } else {
    console.log("[Supabase DB]: Supabase not configured. Using local JSON buffer storage (.data/leads.json).");
  }
}

// Fallback Local Storage Path (resilient offline/dev safety buffer)
const FALLBACK_DATA_DIR = path.join(process.cwd(), ".data");
const FALLBACK_DATA_FILE = path.join(FALLBACK_DATA_DIR, "leads.json");

function ensureFallbackStorage(): LeadRecord[] {
  try {
    if (!fs.existsSync(FALLBACK_DATA_DIR)) {
      fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(FALLBACK_DATA_FILE)) {
      fs.writeFileSync(FALLBACK_DATA_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const raw = fs.readFileSync(FALLBACK_DATA_FILE, "utf-8");
    return JSON.parse(raw) as LeadRecord[];
  } catch (err) {
    console.error("[DB Fallback Storage Error]:", err);
    return [];
  }
}

function saveFallbackStorage(leads: LeadRecord[]): void {
  try {
    if (!fs.existsSync(FALLBACK_DATA_DIR)) {
      fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_DATA_FILE, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error("[DB Save Fallback Error]:", err);
  }
}

/**
 * Insert a new lead directly into Supabase PostgreSQL.
 * Throws explicit error if Supabase credentials are missing or insert fails.
 */
export async function createLead(input: CreateLeadInput): Promise<LeadRecord> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const record: LeadRecord = {
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
    status: "NEW",
    notes: "",
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

  if (!supabase) {
    const errorMsg =
      "Supabase backend is not initialized. Please configure SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.";
    console.error(`[DB Error]: ${errorMsg}`);
    
    // Check if offline dev fallback was explicitly requested
    if (process.env.ENABLE_OFFLINE_DEV_FALLBACK === "true") {
      const fallback = ensureFallbackStorage();
      fallback.unshift(record);
      saveFallbackStorage(fallback);
      return record;
    }

    throw new Error(errorMsg);
  }

  const { data, error } = await supabase.from("leads").insert([record]).select().single();

  if (error) {
    console.error("[Supabase Insert Error]:", error);
    throw new Error(`Supabase insert failed: ${error.message} (Code: ${error.code || "UNKNOWN"})`);
  }

  if (!data) {
    throw new Error("Supabase insert succeeded but returned no record data.");
  }

  return data as LeadRecord;
}

/**
 * Fetch filtered, searched, and paginated leads.
 */
export async function getLeads(filters: LeadFilterParams = {}): Promise<{ leads: LeadRecord[]; total: number }> {
  const {
    search = "",
    status = "ALL",
    service = "",
    handoffOnly = false,
    sortBy = "newest",
    dateRange = "all",
    page = 1,
    limit = 20,
  } = filters;

  if (supabase) {
    try {
      let query = supabase.from("leads").select("*", { count: "exact" });

      if (status && status !== "ALL") {
        query = query.eq("status", status);
      }

      if (service && service !== "ALL") {
        query = query.eq("service", service);
      }

      if (handoffOnly) {
        query = query.eq("handoff_status", "REQUESTED");
      }

      if (search.trim()) {
        const s = `%${search.trim()}%`;
        query = query.or(`name.ilike.${s},company.ilike.${s},phone.ilike.${s},email.ilike.${s},message.ilike.${s}`);
      }

      if (dateRange && dateRange !== "all") {
        const now = new Date();
        let fromDate = new Date();
        if (dateRange === "today") {
          fromDate.setHours(0, 0, 0, 0);
        } else if (dateRange === "week") {
          fromDate.setDate(now.getDate() - 7);
        } else if (dateRange === "month") {
          fromDate.setMonth(now.getMonth() - 1);
        }
        query = query.gte("created_at", fromDate.toISOString());
      }

      query = query.order("created_at", { ascending: sortBy === "oldest" });

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (!error && data) {
        return { leads: data as LeadRecord[], total: count || 0 };
      }
      console.error("[Supabase getLeads Error]:", error);
    } catch (err) {
      console.error("[Supabase getLeads Exception]:", err);
    }
  }

  // Fallback Local Storage Query
  let leads = ensureFallbackStorage();

  if (status && status !== "ALL") {
    leads = leads.filter((l) => l.status === status);
  }

  if (service && service !== "ALL") {
    leads = leads.filter((l) => l.service === service);
  }

  if (handoffOnly) {
    leads = leads.filter((l) => l.handoff_status === "REQUESTED");
  }

  if (search.trim()) {
    const s = search.toLowerCase().trim();
    leads = leads.filter(
      (l) =>
        (l.name && l.name.toLowerCase().includes(s)) ||
        (l.company && l.company.toLowerCase().includes(s)) ||
        (l.phone && l.phone.toLowerCase().includes(s)) ||
        (l.email && l.email.toLowerCase().includes(s)) ||
        (l.message && l.message.toLowerCase().includes(s))
    );
  }

  if (dateRange && dateRange !== "all") {
    const now = Date.now();
    let threshold = 0;
    if (dateRange === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      threshold = today.getTime();
    } else if (dateRange === "week") {
      threshold = now - 7 * 24 * 60 * 60 * 1000;
    } else if (dateRange === "month") {
      threshold = now - 30 * 24 * 60 * 60 * 1000;
    }
    leads = leads.filter((l) => new Date(l.created_at).getTime() >= threshold);
  }

  leads.sort((a, b) => {
    const tA = new Date(a.created_at).getTime();
    const tB = new Date(b.created_at).getTime();
    return sortBy === "oldest" ? tA - tB : tB - tA;
  });

  const total = leads.length;
  const start = (page - 1) * limit;
  const paginated = leads.slice(start, start + limit);

  return { leads: paginated, total };
}

/**
 * Fetch a single lead by ID.
 */
export async function getLeadById(id: string): Promise<LeadRecord | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
      if (!error && data) {
        return data as LeadRecord;
      }
    } catch (err) {
      console.error("[Supabase getLeadById Exception]:", err);
    }
  }

  const leads = ensureFallbackStorage();
  return leads.find((l) => l.id === id) || null;
}

/**
 * Find a lead by phone number (for WhatsApp incoming message routing).
 */
export async function findLeadByPhone(rawPhone: string): Promise<LeadRecord | null> {
  const cleanDigits = rawPhone.replace(/\D/g, "");
  const last10 = cleanDigits.slice(-10);

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .or(`phone.ilike.%${last10}%,whatsapp.ilike.%${last10}%`)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        return data[0] as LeadRecord;
      }
    } catch (err) {
      console.error("[Supabase findLeadByPhone Exception]:", err);
    }
  }

  const leads = ensureFallbackStorage();
  return (
    leads.find((l) => {
      const p = (l.phone || "").replace(/\D/g, "");
      const w = (l.whatsapp || "").replace(/\D/g, "");
      return (p && p.includes(last10)) || (w && w.includes(last10));
    }) || null
  );
}

/**
 * Append a message to the lead's conversation history.
 */
export async function appendConversationMessage(
  leadId: string,
  message: ChatMessage
): Promise<LeadRecord | null> {
  const lead = await getLeadById(leadId);
  if (!lead) return null;

  const updatedHistory = [...(lead.conversation_history || []), message];

  return await updateLead(leadId, {
    conversation_history: updatedHistory,
  });
}

/**
 * Update a lead record (e.g. status, notes, notification states).
 */
export async function updateLead(id: string, updates: Partial<LeadRecord>): Promise<LeadRecord | null> {
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .update(updatedData)
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return data as LeadRecord;
      }
      console.error("[Supabase updateLead Error]:", error);
    } catch (err) {
      console.error("[Supabase updateLead Exception]:", err);
    }
  }

  const leads = ensureFallbackStorage();
  const index = leads.findIndex((l) => l.id === id);
  if (index !== -1) {
    leads[index] = { ...leads[index], ...updatedData };
    saveFallbackStorage(leads);
    return leads[index];
  }
  return null;
}

/**
 * Delete a lead record.
 */
export async function deleteLead(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (!error) return true;
      console.error("[Supabase deleteLead Error]:", error);
    } catch (err) {
      console.error("[Supabase deleteLead Exception]:", err);
    }
  }

  const leads = ensureFallbackStorage();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length !== leads.length) {
    saveFallbackStorage(filtered);
    return true;
  }
  return false;
}

/**
 * Calculate lead statistics for dashboard KPI cards.
 */
export async function getLeadStats(): Promise<LeadStats> {
  const stats: LeadStats = {
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal_sent: 0,
    won: 0,
    lost: 0,
    spam: 0,
    handoffs_pending: 0,
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from("leads").select("status, handoff_status");
      if (!error && data) {
        stats.total = data.length;
        for (const row of data) {
          const st = (row.status as string)?.toLowerCase();
          if (st === "new") stats.new++;
          else if (st === "contacted") stats.contacted++;
          else if (st === "qualified") stats.qualified++;
          else if (st === "proposal_sent") stats.proposal_sent++;
          else if (st === "won") stats.won++;
          else if (st === "lost") stats.lost++;
          else if (st === "spam") stats.spam++;

          if (row.handoff_status === "REQUESTED") {
            stats.handoffs_pending++;
          }
        }
        return stats;
      }
    } catch (err) {
      console.error("[Supabase getLeadStats Exception]:", err);
    }
  }

  const leads = ensureFallbackStorage();
  stats.total = leads.length;
  for (const lead of leads) {
    const st = lead.status?.toLowerCase();
    if (st === "new") stats.new++;
    else if (st === "contacted") stats.contacted++;
    else if (st === "qualified") stats.qualified++;
    else if (st === "proposal_sent") stats.proposal_sent++;
    else if (st === "won") stats.won++;
    else if (st === "lost") stats.lost++;
    else if (st === "spam") stats.spam++;

    if (lead.handoff_status === "REQUESTED") {
      stats.handoffs_pending++;
    }
  }

  return stats;
}
