"use client";

import React, { useEffect, useState, useCallback, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  Building,
  Globe,
  Calendar,
  Sparkles,
  PhoneCall,
  CreditCard,
  UserCheck,
  Trash2,
  Save,
  MessageSquare,
  Clock,
  ExternalLink,
  Tag,
  AlertTriangle,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { InquiryRecord, InquiryStatus, FollowUpRecord, PaymentRecord, ActivityLogRecord } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { ActivityTimeline } from "@/components/crm/ActivityTimeline";
import { ScheduleFollowupModal } from "@/components/crm/ScheduleFollowupModal";
import { RecordPaymentModal } from "@/components/crm/RecordPaymentModal";
import { ConvertToCustomerModal } from "@/components/crm/ConvertToCustomerModal";
import { ConfirmDialog } from "@/components/crm/ConfirmDialog";

const INQUIRY_STATUSES: InquiryStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
  "SPAM",
];

export default function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [inquiry, setInquiry] = useState<InquiryRecord | null>(null);
  const [followups, setFollowups] = useState<FollowUpRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [activities, setActivities] = useState<ActivityLogRecord[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  // Modals
  const [scheduleFollowupOpen, setScheduleFollowupOpen] = useState(false);
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInquiryData = useCallback(async () => {
    setLoading(true);
    try {
      const [inqRes, followupsRes, paymentsRes, actRes] = await Promise.all([
        fetch(`/api/admin/crm/inquiries/${id}`),
        fetch(`/api/admin/crm/followups?inquiry_id=${id}`),
        fetch(`/api/admin/crm/payments?inquiry_id=${id}`),
        fetch(`/api/admin/crm/activities?limit=20`),
      ]);

      const inqData = await inqRes.json();
      if (inqData.success) {
        setInquiry(inqData.data);
        setNotes(inqData.data.notes || "");
      }

      const followupsData = await followupsRes.json();
      if (followupsData.success) {
        setFollowups(followupsData.data);
      }

      const paymentsData = await paymentsRes.json();
      if (paymentsData.success) {
        setPayments(paymentsData.data);
      }

      const actData = await actRes.json();
      if (actData.success && Array.isArray(actData.data)) {
        // Filter activities related to this inquiry
        setActivities(actData.data.filter((a: ActivityLogRecord) => a.inquiry_id === id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInquiryData();
  }, [fetchInquiryData]);

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    if (!inquiry) return;
    try {
      const res = await fetch(`/api/admin/crm/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        fetchInquiryData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    try {
      await fetch(`/api/admin/crm/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
      fetchInquiryData();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/crm/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.replace("/admin/inquiries");
      }
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
    }
  };

  if (loading && !inquiry) {
    return (
      <div className="py-24 text-center text-gold space-y-3">
        <Sparkles className="w-8 h-8 animate-spin mx-auto" />
        <span className="text-xs uppercase tracking-widest text-text-muted">Loading Inquiry 360...</span>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="p-12 text-center text-text-muted space-y-4">
        <p>Inquiry not found or deleted.</p>
        <Link href="/admin/inquiries" className="px-4 py-2 bg-gold text-black rounded-lg text-xs font-bold uppercase">
          Back to Inquiries
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {inquiry.name}
              </span>
              <StatusBadge status={inquiry.status} size="md" />
            </div>
            <span className="text-xs text-text-muted">
              Inquiry ID: <span className="font-mono text-gold">{inquiry.id.slice(0, 8)}...</span> • Received{" "}
              {new Date(inquiry.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {!inquiry.customer_id && inquiry.status !== "WON" && (
            <button
              type="button"
              onClick={() => setConvertOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Convert to Customer</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setScheduleFollowupOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 hover:border-amber-500/40 text-xs font-bold uppercase tracking-wider text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Follow-up</span>
          </button>

          <button
            type="button"
            onClick={() => setRecordPaymentOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 hover:border-gold/40 text-xs font-bold uppercase tracking-wider text-gold transition-colors flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment</span>
          </button>

          <button
            type="button"
            onClick={() => setDeleteDialogOpen(true)}
            className="p-2 rounded-xl bg-surface-2 hover:bg-red-500/20 text-text-muted hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-colors"
            title="Delete Inquiry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Details & Activities) + Right 4 Cols (Actions & Status) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer & Inquiry Overview Card */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-6">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-text-muted border-b border-white/5 pb-3">
              Prospect &amp; Requirements Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-text-muted block">Direct Phone</span>
                <a
                  href={`tel:${inquiry.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-gold"
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>{inquiry.phone}</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-text-muted block">Email Address</span>
                {inquiry.email ? (
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-gold truncate max-w-full"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    <span className="truncate">{inquiry.email}</span>
                  </a>
                ) : (
                  <span className="text-xs text-text-muted">Not provided</span>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-text-muted block">Company / Brand</span>
                <div className="flex items-center gap-2 text-sm text-white font-medium">
                  <Building className="w-3.5 h-3.5 text-text-muted" />
                  <span>{inquiry.company || "Not specified"}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-text-muted block">Existing Website</span>
                {inquiry.website ? (
                  <a
                    href={inquiry.website.startsWith("http") ? inquiry.website : `https://${inquiry.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[200px]">{inquiry.website}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ) : (
                  <span className="text-xs text-text-muted">None</span>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-text-muted block">Requested Service</span>
                <span className="text-sm font-bold text-gradient-gold block">
                  {inquiry.service || "General Growth Strategy"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-text-muted block">Proposed Budget</span>
                <span className="text-sm font-bold text-white font-mono block">
                  {inquiry.budget || "To be discussed"}
                </span>
              </div>
            </div>

            {/* Client Message */}
            {inquiry.message && (
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-text-muted block">
                  Inquiry Message / Special Requirements
                </span>
                <div className="p-4 rounded-xl bg-[#141414] border border-white/5 text-xs sm:text-sm text-text-secondary leading-relaxed font-light whitespace-pre-wrap">
                  {inquiry.message}
                </div>
              </div>
            )}

            {/* Marketing & UTM Attributes */}
            <div className="pt-4 border-t border-white/5">
              <span className="text-[11px] uppercase tracking-wider text-text-muted block mb-3">
                Source &amp; Acquisition Attribution
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-[#141414] border border-white/5">
                  <span className="text-text-muted block text-[9px] uppercase">Source Page</span>
                  <span className="font-bold text-white truncate block">{inquiry.source_page || "/"}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-white/5">
                  <span className="text-text-muted block text-[9px] uppercase">UTM Source</span>
                  <span className="font-bold text-white truncate block">{inquiry.utm_source || "Organic / Direct"}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-white/5">
                  <span className="text-text-muted block text-[9px] uppercase">Campaign</span>
                  <span className="font-bold text-white truncate block">{inquiry.utm_campaign || "—"}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-white/5">
                  <span className="text-text-muted block text-[9px] uppercase">Medium</span>
                  <span className="font-bold text-white truncate block">{inquiry.utm_medium || "—"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Notes Editor */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  Internal Strategy &amp; Call Notes
                </h3>
              </div>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="px-3.5 py-1.5 rounded-lg bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                {notesSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Notes</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add deal notes, client requirements, pricing quotes, or call summaries here..."
              className="w-full p-4 rounded-xl bg-[#141414] border border-white/10 text-white text-xs sm:text-sm focus:border-gold focus:outline-none leading-relaxed"
            />
          </div>

          {/* Follow-ups & Payment Records */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Follow-ups */}
            <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                    Follow-ups ({followups.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setScheduleFollowupOpen(true)}
                  className="text-[11px] text-amber-400 hover:underline font-bold"
                >
                  + Add
                </button>
              </div>

              {followups.length === 0 ? (
                <p className="text-xs text-text-muted py-4 text-center">No follow-ups scheduled.</p>
              ) : (
                <div className="space-y-2">
                  {followups.map((f) => (
                    <div key={f.id} className="p-3 rounded-xl bg-[#141414] border border-white/5 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{f.title}</span>
                        <StatusBadge status={f.status} size="sm" />
                      </div>
                      <div className="text-[11px] text-text-muted">
                        {new Date(f.scheduled_at).toLocaleString()} • {f.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payments */}
            <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gold-bright" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                    Payments ({payments.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setRecordPaymentOpen(true)}
                  className="text-[11px] text-gold hover:underline font-bold"
                >
                  + Record
                </button>
              </div>

              {payments.length === 0 ? (
                <p className="text-xs text-text-muted py-4 text-center">No payments recorded.</p>
              ) : (
                <div className="space-y-2">
                  {payments.map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-[#141414] border border-white/5 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">₹{Number(p.amount).toLocaleString("en-IN")}</span>
                        <StatusBadge status={p.status} size="sm" />
                      </div>
                      <div className="text-[11px] text-text-muted">
                        {p.method} • {new Date(p.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Progression Card */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-text-muted border-b border-white/5 pb-3">
              Pipeline Stage &amp; Status
            </h3>

            <div className="space-y-1.5">
              {INQUIRY_STATUSES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusChange(st)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    inquiry.status === st
                      ? "bg-gold text-black shadow-md shadow-gold/20"
                      : "bg-[#141414] text-text-secondary hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  <span>{st}</span>
                  {inquiry.status === st && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Client Relationship Card */}
          {inquiry.customer_id && (
            <div className="rounded-2xl bg-[#0D0D0D] border border-emerald-500/30 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <UserCheck className="w-4 h-4" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider">
                  Converted Client Record
                </h3>
              </div>
              <p className="text-xs text-text-muted">
                This inquiry has been linked to a permanent Customer Profile.
              </p>
              <Link
                href={`/admin/customers/${inquiry.customer_id}`}
                className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Customer Profile &rarr;</span>
              </Link>
            </div>
          )}

          {/* Activity Stream */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-text-muted border-b border-white/5 pb-3">
              Inquiry Activity History
            </h3>
            <ActivityTimeline activities={activities} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ScheduleFollowupModal
        isOpen={scheduleFollowupOpen}
        inquiryId={inquiry.id}
        contactName={inquiry.name}
        onClose={() => setScheduleFollowupOpen(false)}
        onScheduled={fetchInquiryData}
      />
      <RecordPaymentModal
        isOpen={recordPaymentOpen}
        inquiryId={inquiry.id}
        customerName={inquiry.name}
        onClose={() => setRecordPaymentOpen(false)}
        onRecorded={fetchInquiryData}
      />
      <ConvertToCustomerModal
        isOpen={convertOpen}
        inquiry={inquiry}
        onClose={() => setConvertOpen(false)}
        onConverted={() => {
          fetchInquiryData();
        }}
      />
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Inquiry"
        message="Are you sure you want to permanently remove this inquiry? This action cannot be undone."
        confirmLabel="Delete Permanently"
        isDestructive
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
}
