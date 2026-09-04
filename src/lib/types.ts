export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL_SENT"
  | "WON"
  | "LOST"
  | "SPAM";

export type NotificationStatus = "PENDING" | "SENT" | "FAILED" | "SKIPPED";

export type HandoffStatus = "NONE" | "REQUESTED" | "RESOLVED";

export interface ChatMessage {
  id: string;
  sender: "customer" | "assistant" | "admin";
  message: string;
  timestamp: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  whatsapp?: string | null;
  service?: string | null;
  business_type?: string | null;
  company?: string | null;
  website?: string | null;
  message?: string | null;
  budget?: string | null;
  source_page?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  device_info?: string | null;
  ip_address?: string | null;
  status: LeadStatus;
  notes?: string | null;
  email_notification_status: NotificationStatus;
  customer_email_status: NotificationStatus;
  whatsapp_notification_status: NotificationStatus;
  handoff_status: HandoffStatus;
  handoff_reason?: string | null;
  followup_stage: number; // 0 = none/initial, 1 = Day 1 sent, 2 = Day 3 sent, 3 = stopped
  conversation_history: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface CreateLeadInput {
  name: string;
  email?: string;
  phone: string;
  whatsapp?: string;
  service?: string;
  business_type?: string;
  company?: string;
  website?: string;
  message?: string;
  budget?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  device_info?: string;
  ip_address?: string;
  honeypot?: string;
}

export interface LeadFilterParams {
  search?: string;
  status?: LeadStatus | "ALL";
  service?: string;
  handoffOnly?: boolean;
  sortBy?: "newest" | "oldest";
  dateRange?: "all" | "today" | "week" | "month";
  page?: number;
  limit?: number;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  proposal_sent: number;
  won: number;
  lost: number;
  spam: number;
  handoffs_pending: number;
}

export interface AdminUser {
  email: string;
  name: string;
  role: "admin";
}
