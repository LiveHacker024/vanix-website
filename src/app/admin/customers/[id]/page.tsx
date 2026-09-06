"use client";

import React, { useEffect, useState, useCallback, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  Building,
  Phone,
  Mail,
  Globe,
  CreditCard,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Save,
  Trash2,
  ExternalLink,
  Plus,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { CustomerRecord, ActivityLogRecord } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { ActivityTimeline } from "@/components/crm/ActivityTimeline";
import { ScheduleFollowupModal } from "@/components/crm/ScheduleFollowupModal";
import { RecordPaymentModal } from "@/components/crm/RecordPaymentModal";
import { ConfirmDialog } from "@/components/crm/ConfirmDialog";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerRecord | null>(null);
  const [activities, setActivities] = useState<ActivityLogRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [servicesStr, setServicesStr] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Modals
  const [scheduleFollowupOpen, setScheduleFollowupOpen] = useState(false);
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCustomerData = useCallback(async () => {
    setLoading(true);
    try {
      const [custRes, actRes] = await Promise.all([
        fetch(`/api/admin/crm/customers/${id}`),
        fetch(`/api/admin/crm/activities?limit=20`),
      ]);

      const custData = await custRes.json();
      if (custData.success) {
        const c: CustomerRecord = custData.data;
        setCustomer(c);
        setName(c.name || "");
        setPhone(c.phone || "");
        setEmail(c.email || "");
        setCompany(c.company || "");
        setWebsite(c.website || "");
        setNotes(c.notes || "");
        setServicesStr((c.services || []).join(", "));
      }

      const actData = await actRes.json();
      if (actData.success && Array.isArray(actData.data)) {
        setActivities(actData.data.filter((a: ActivityLogRecord) => a.customer_id === id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/crm/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          website,
          notes,
          services: servicesStr.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
        fetchCustomerData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCustomer = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/crm/customers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.replace("/admin/customers");
      }
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
    }
  };

  if (loading && !customer) {
    return (
      <div className="py-24 text-center text-gold space-y-3">
        <Sparkles className="w-8 h-8 animate-spin mx-auto" />
        <span className="text-xs uppercase tracking-widest text-text-muted">Loading Customer 360...</span>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-12 text-center text-text-muted space-y-4">
        <p>Customer profile not found.</p>
        <Link href="/admin/customers" className="px-4 py-2 bg-gold text-black rounded-lg text-xs font-bold uppercase">
          Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/customers"
            className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-secondary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {customer.name}
              </span>
              <StatusBadge status={customer.status} type="customer" size="md" />
            </div>
            <span className="text-xs text-text-muted">
              Client ID: <span className="font-mono text-gold">{customer.id.slice(0, 8)}...</span> • Client Since{" "}
              {new Date(customer.created_at).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
            className="px-3.5 py-2 rounded-xl bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/15 flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Record Payment</span>
          </button>
          <button
            type="button"
            onClick={() => setDeleteDialogOpen(true)}
            className="p-2 rounded-xl bg-surface-2 hover:bg-red-500/20 text-text-muted hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-colors"
            title="Delete Customer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Financial Summary Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10">
          <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Lifetime Revenue Paid</span>
          <div className="font-display font-black text-2xl sm:text-3xl text-gradient-gold">
            ₹{Number(customer.total_paid || 0).toLocaleString("en-IN")}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10">
          <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Pending Amount</span>
          <div className="font-display font-black text-2xl sm:text-3xl text-yellow-400">
            ₹{Number(customer.pending_amount || 0).toLocaleString("en-IN")}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10">
          <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Active Services Count</span>
          <div className="font-display font-black text-2xl sm:text-3xl text-white">
            {customer.services?.length || 0}
          </div>
        </div>
      </div>

      {/* Main Grid: 8 Cols (Profile & Sub-records) + 4 Cols (Activities) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Profile Edit Form */}
          <form onSubmit={handleSaveChanges} className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                Account Information &amp; Contacts
              </h3>
              <button
                type="submit"
                disabled={isSaving}
                className="px-3.5 py-1.5 rounded-lg bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Active Services (Comma separated)
                </label>
                <input
                  type="text"
                  value={servicesStr}
                  onChange={(e) => setServicesStr(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Internal Account Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </form>

          {/* Sub-Records: Inquiries & Payments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Connected Inquiries */}
            <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                    Inquiry History ({customer.inquiries?.length || 0})
                  </h3>
                </div>
              </div>

              {!customer.inquiries || customer.inquiries.length === 0 ? (
                <p className="text-xs text-text-muted py-4 text-center">No inquiry history linked.</p>
              ) : (
                <div className="space-y-2">
                  {customer.inquiries.map((inq) => (
                    <Link
                      key={inq.id}
                      href={`/admin/inquiries/${inq.id}`}
                      className="p-3 rounded-xl bg-[#141414] border border-white/5 hover:border-gold/30 transition-all block text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{inq.service || "Inquiry"}</span>
                        <StatusBadge status={inq.status} size="sm" />
                      </div>
                      <span className="text-[10px] text-text-muted block mt-1">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Connected Payments */}
            <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gold-bright" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                    Payment History ({customer.payments?.length || 0})
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

              {!customer.payments || customer.payments.length === 0 ? (
                <p className="text-xs text-text-muted py-4 text-center">No payments recorded yet.</p>
              ) : (
                <div className="space-y-2">
                  {customer.payments.map((p) => (
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

        {/* Right 4 Cols: Follow-ups & Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Follow-ups List */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                  Follow-ups ({customer.follow_ups?.length || 0})
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

            {!customer.follow_ups || customer.follow_ups.length === 0 ? (
              <p className="text-xs text-text-muted py-4 text-center">No follow-ups scheduled.</p>
            ) : (
              <div className="space-y-2">
                {customer.follow_ups.map((f) => (
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

          {/* Activity Timeline */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-text-muted border-b border-white/5 pb-3">
              Account Activity Log
            </h3>
            <ActivityTimeline activities={activities} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ScheduleFollowupModal
        isOpen={scheduleFollowupOpen}
        customerId={customer.id}
        contactName={customer.name}
        onClose={() => setScheduleFollowupOpen(false)}
        onScheduled={fetchCustomerData}
      />
      <RecordPaymentModal
        isOpen={recordPaymentOpen}
        customerId={customer.id}
        customerName={customer.name}
        onClose={() => setRecordPaymentOpen(false)}
        onRecorded={fetchCustomerData}
      />
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Customer Account"
        message="Are you sure you want to delete this customer account? All associated records will be detached."
        confirmLabel="Delete Account"
        isDestructive
        isLoading={isDeleting}
        onConfirm={handleDeleteCustomer}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
}
