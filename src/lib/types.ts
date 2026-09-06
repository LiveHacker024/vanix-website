export type InquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "PROPOSAL_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST"
  | "SPAM";

// Backward compatibility alias
export type LeadStatus = InquiryStatus;

export type CustomerStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";

export type FollowUpType = "CALL" | "WHATSAPP" | "EMAIL" | "MEETING" | "OTHER";

export type FollowUpStatus = "PENDING" | "COMPLETED" | "MISSED" | "CANCELLED";

export type PaymentMethod = "UPI" | "BANK_TRANSFER" | "CARD" | "CASH" | "OTHER";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type NotificationStatus = "PENDING" | "SENT" | "FAILED" | "SKIPPED";

export type HandoffStatus = "NONE" | "REQUESTED" | "RESOLVED";

export interface ChatMessage {
  id: string;
  sender: "customer" | "assistant" | "admin";
  message: string;
  timestamp: string;
}

// ----------------------------------------------------------------------------
// Core CRM Entities
// ----------------------------------------------------------------------------

export interface InquiryRecord {
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
  status: InquiryStatus;
  notes?: string | null;
  customer_id?: string | null;
  customer?: CustomerRecord | null;
  last_contact_at?: string | null;
  next_followup_at?: string | null;
  email_notification_status: NotificationStatus;
  customer_email_status: NotificationStatus;
  whatsapp_notification_status: NotificationStatus;
  handoff_status: HandoffStatus;
  handoff_reason?: string | null;
  followup_stage: number;
  conversation_history: ChatMessage[];
  created_at: string;
  updated_at: string;
}

// Backward compatibility alias
export type LeadRecord = InquiryRecord;

export interface CustomerRecord {
  id: string;
  name: string;
  company?: string | null;
  email?: string | null;
  phone: string;
  website?: string | null;
  services: string[];
  status: CustomerStatus;
  total_paid: number;
  pending_amount: number;
  notes?: string | null;
  converted_from_inquiry_id?: string | null;
  last_contact_at?: string | null;
  created_at: string;
  updated_at: string;
  inquiries?: InquiryRecord[];
  payments?: PaymentRecord[];
  follow_ups?: FollowUpRecord[];
}

export interface FollowUpRecord {
  id: string;
  inquiry_id?: string | null;
  customer_id?: string | null;
  title: string;
  scheduled_at: string;
  type: FollowUpType;
  status: FollowUpStatus;
  note?: string | null;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
  inquiry?: InquiryRecord | null;
  customer?: CustomerRecord | null;
}

export interface PaymentRecord {
  id: string;
  customer_id?: string | null;
  inquiry_id?: string | null;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transaction_id?: string | null;
  invoice_number?: string | null;
  notes?: string | null;
  paid_at?: string | null;
  created_at: string;
  updated_at: string;
  customer?: CustomerRecord | null;
  inquiry?: InquiryRecord | null;
}

export interface ServiceRecord {
  id: string;
  name: string;
  category: string;
  description: string;
  is_active: boolean;
  inquiries_count?: number;
  customers_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ActivityLogRecord {
  id: string;
  inquiry_id?: string | null;
  customer_id?: string | null;
  payment_id?: string | null;
  action: string;
  description: string;
  actor: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface CRMNotificationRecord {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string | null;
  is_read: boolean;
  created_at: string;
}

export interface CRMSettingsRecord {
  id: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  business_whatsapp: string;
  business_address?: string;
  business_gst?: string;
  business_website?: string;
  default_inquiry_status: InquiryStatus;
  currency: string;
  notification_preferences: {
    email: boolean;
    whatsapp: boolean;
    sound?: boolean;
    browser?: boolean;
  };
  payment_settings?: {
    upi_id?: string;
    bank_name?: string;
    account_number?: string;
    ifsc_code?: string;
    qr_code_url?: string;
    invoice_prefix?: string;
    terms?: string;
  };
  lead_settings?: {
    auto_qualification?: boolean;
    notify_on_new_inquiry?: boolean;
    default_service?: string;
  };
  updated_at: string;
}

// ----------------------------------------------------------------------------
// Dashboard & Analytics
// ----------------------------------------------------------------------------

export interface DashboardKPIs {
  totalInquiries: number;
  newInquiries: number;
  qualifiedInquiries: number;
  activePipelineCount: number;
  totalCustomers: number;
  pendingPaymentsAmount: number;
  paidRevenueAmount: number;
  followupsDueCount: number;
  pipelineStageCounts: Record<string, number>;
  recentInquiries: InquiryRecord[];
  upcomingFollowUps: FollowUpRecord[];
  recentPayments: PaymentRecord[];
  recentActivities: ActivityLogRecord[];
  revenueByMonth: { month: string; paid: number; pending: number }[];
}

// ----------------------------------------------------------------------------
// Form Inputs & Filter Parameters
// ----------------------------------------------------------------------------

export interface CreateInquiryInput {
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
  notes?: string;
  status?: InquiryStatus;
}

// Backward compatibility alias
export type CreateLeadInput = CreateInquiryInput;

export interface CreateCustomerInput {
  name: string;
  company?: string;
  email?: string;
  phone: string;
  website?: string;
  services?: string[];
  notes?: string;
  converted_from_inquiry_id?: string;
}

export interface ScheduleFollowUpInput {
  inquiry_id?: string;
  customer_id?: string;
  title: string;
  scheduled_at: string;
  type: FollowUpType;
  note?: string;
}

export interface RecordPaymentInput {
  customer_id?: string;
  inquiry_id?: string;
  amount: number;
  currency?: string;
  method: PaymentMethod;
  status?: PaymentStatus;
  transaction_id?: string;
  invoice_number?: string;
  notes?: string;
  paid_at?: string;
}

export interface InquiryFilterParams {
  search?: string;
  status?: InquiryStatus | "ALL";
  service?: string;
  source?: string;
  handoffOnly?: boolean;
  sortBy?: "newest" | "oldest" | "budget";
  dateRange?: "all" | "today" | "week" | "month" | "year";
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// Backward compatibility alias
export type LeadFilterParams = InquiryFilterParams;

export interface CustomerFilterParams {
  search?: string;
  status?: CustomerStatus | "ALL";
  service?: string;
  sortBy?: "newest" | "oldest" | "paid" | "name";
  page?: number;
  limit?: number;
}

export interface FollowUpFilterParams {
  tab?: "today" | "upcoming" | "overdue" | "completed" | "all";
  inquiry_id?: string;
  customer_id?: string;
  status?: FollowUpStatus | "ALL";
  type?: FollowUpType | "ALL";
}

export interface PaymentFilterParams {
  customer_id?: string;
  inquiry_id?: string;
  status?: PaymentStatus | "ALL";
  method?: PaymentMethod | "ALL";
  page?: number;
  limit?: number;
}

export interface GlobalSearchResult {
  inquiries: { id: string; name: string; company?: string; email?: string; phone: string; status: string }[];
  customers: { id: string; name: string; company?: string; email?: string; phone: string; total_paid: number }[];
  payments: { id: string; amount: number; method: string; status: string; transaction_id?: string; customer_name?: string }[];
  follow_ups: { id: string; title: string; scheduled_at: string; type: string; status: string; contact_name?: string }[];
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
