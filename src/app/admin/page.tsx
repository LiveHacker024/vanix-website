"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  Kanban,
  CreditCard,
  PhoneCall,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  RefreshCw,
  Calendar,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";
import { DashboardKPIs } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { EmptyState } from "@/components/crm/EmptyState";
import { ActivityTimeline } from "@/components/crm/ActivityTimeline";
import { NewInquiryModal } from "@/components/crm/NewInquiryModal";
import { ScheduleFollowupModal } from "@/components/crm/ScheduleFollowupModal";
import { RecordPaymentModal } from "@/components/crm/RecordPaymentModal";

export default function CRMDashboardPage() {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("all");
  const [newInquiryOpen, setNewInquiryOpen] = useState(false);
  const [scheduleFollowupOpen, setScheduleFollowupOpen] = useState(false);
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false);

  const fetchKPIs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/crm/kpis?dateRange=${dateRange}`);
      const data = await res.json();
      if (data.success) {
        setKpis(data.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard KPIs:", err);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  const handleCompleteFollowup = async (id: string) => {
    try {
      await fetch(`/api/admin/crm/followups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" }),
      });
      fetchKPIs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Date Range Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
            <span>Executive Dashboard</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            VANIX Growth Command Center
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 font-light">
            Real-time pipeline metrics, client conversions, and financial performance.
          </p>
        </div>

        {/* Date Filter & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-[#111111] border border-white/10 rounded-xl p-1">
            {["all", "today", "week", "month", "year"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setDateRange(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  dateRange === tab
                    ? "bg-gold text-black shadow-sm"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {tab === "all" ? "All Time" : tab}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={fetchKPIs}
            className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-secondary hover:text-white transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Top 8 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Total Inquiries */}
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-cyan-500/40 transition-all group">
          <div className="flex items-center justify-between text-text-muted mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="font-display font-black text-3xl text-white">
            {kpis?.totalInquiries ?? 0}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
            <span className="text-cyan-400 font-bold">{kpis?.newInquiries ?? 0} New</span>
            <span>•</span>
            <span>All Channels</span>
          </div>
        </div>

        {/* 2. Qualified Inquiries */}
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-purple-500/40 transition-all group">
          <div className="flex items-center justify-between text-text-muted mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Qualified Leads</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="font-display font-black text-3xl text-white">
            {kpis?.qualifiedInquiries ?? 0}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
            <span className="text-purple-400 font-bold">
              {kpis?.totalInquiries ? Math.round(((kpis.qualifiedInquiries || 0) / kpis.totalInquiries) * 100) : 0}%
            </span>
            <span>Qualification Rate</span>
          </div>
        </div>

        {/* 3. Active Pipeline */}
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-gold/40 transition-all group">
          <div className="flex items-center justify-between text-text-muted mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Active Pipeline</span>
            <span className="p-2 rounded-xl bg-gold/10 text-gold group-hover:scale-110 transition-transform">
              <Kanban className="w-4 h-4" />
            </span>
          </div>
          <div className="font-display font-black text-3xl text-gradient-gold">
            {kpis?.activePipelineCount ?? 0}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
            <Link href="/admin/pipeline" className="text-gold hover:underline font-bold">
              View Kanban &rarr;
            </Link>
          </div>
        </div>

        {/* 4. Total Customers */}
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-emerald-500/40 transition-all group">
          <div className="flex items-center justify-between text-text-muted mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Converted Clients</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="font-display font-black text-3xl text-white">
            {kpis?.totalCustomers ?? 0}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
            <span className="text-emerald-400 font-bold">Active Portfolio</span>
          </div>
        </div>

        {/* 5. Paid Revenue */}
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-gold-bright transition-all group">
          <div className="flex items-center justify-between text-text-muted mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Collected Revenue</span>
            <span className="p-2 rounded-xl bg-gold/15 text-gold-bright group-hover:scale-110 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </span>
          </div>
          <div className="font-display font-black text-3xl text-gradient-gold">
            ₹{Number(kpis?.paidRevenueAmount || 0).toLocaleString("en-IN")}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
            <span className="text-emerald-400 font-bold">Real Collections</span>
          </div>
        </div>

        {/* 6. Pending Payments */}
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-yellow-500/40 transition-all group">
          <div className="flex items-center justify-between text-text-muted mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Invoices</span>
            <span className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="font-display font-black text-3xl text-white">
            ₹{Number(kpis?.pendingPaymentsAmount || 0).toLocaleString("en-IN")}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
            <span className="text-yellow-400 font-bold">Awaiting Settlement</span>
          </div>
        </div>

        {/* 7. Follow-ups Due */}
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-amber-500/40 transition-all group">
          <div className="flex items-center justify-between text-text-muted mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Follow-ups Due</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </span>
          </div>
          <div className="font-display font-black text-3xl text-white">
            {kpis?.followupsDueCount ?? 0}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
            <Link href="/admin/follow-ups" className="text-amber-400 font-bold hover:underline">
              View Calendar &rarr;
            </Link>
          </div>
        </div>

        {/* 8. Quick Action Portal */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#14120B] to-[#0A0A0A] border border-gold/30 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
              Quick Actions
            </span>
            <span className="text-[11px] text-text-muted">Direct operations</span>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <button
              type="button"
              onClick={() => setNewInquiryOpen(true)}
              className="w-full py-1.5 px-3 rounded-lg bg-gold text-black text-xs font-bold uppercase tracking-wider hover:bg-gold-bright transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Inquiry</span>
            </button>
            <button
              type="button"
              onClick={() => setRecordPaymentOpen(true)}
              className="w-full py-1.5 px-3 rounded-lg bg-[#161616] text-white border border-white/10 text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-gold" />
              <span>Record Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Left Column (Inquiries & Pipeline) + Right Column (Followups & Revenue) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Columns */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section A: Recent Inquiries */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-gold" />
                <h2 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  Recent Inquiries
                </h2>
              </div>
              <Link
                href="/admin/inquiries"
                className="inline-flex items-center gap-1 text-xs text-gold hover:underline font-bold"
              >
                <span>View All ({kpis?.totalInquiries || 0})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {!kpis?.recentInquiries || kpis.recentInquiries.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title="No inquiries yet"
                description="Inquiries submitted on the website or added manually will appear here."
                actionLabel="Create First Inquiry"
                onAction={() => setNewInquiryOpen(true)}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-text-muted uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Client / Company</th>
                      <th className="pb-3 font-semibold">Service</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {kpis.recentInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-3.5 pr-3">
                          <Link href={`/admin/inquiries/${inq.id}`} className="block">
                            <span className="font-bold text-white group-hover:text-gold block">
                              {inq.name}
                            </span>
                            <span className="text-[11px] text-text-muted">
                              {inq.company || inq.phone}
                            </span>
                          </Link>
                        </td>
                        <td className="py-3.5 pr-3 text-text-secondary">
                          {inq.service || "General"}
                        </td>
                        <td className="py-3.5 pr-3">
                          <StatusBadge status={inq.status} size="sm" />
                        </td>
                        <td className="py-3.5 text-right text-text-muted">
                          {new Date(inq.created_at).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section B: Pipeline Overview Funnel */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <Kanban className="w-5 h-5 text-gold" />
                <h2 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  Pipeline Funnel Distribution
                </h2>
              </div>
              <Link
                href="/admin/pipeline"
                className="inline-flex items-center gap-1 text-xs text-gold hover:underline font-bold"
              >
                <span>Open Kanban</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { stage: "NEW", label: "New", color: "text-cyan-400", bg: "bg-cyan-500/10" },
                { stage: "CONTACTED", label: "Contacted", color: "text-blue-400", bg: "bg-blue-500/10" },
                { stage: "QUALIFIED", label: "Qualified", color: "text-purple-400", bg: "bg-purple-500/10" },
                { stage: "PROPOSAL", label: "Proposal", color: "text-amber-400", bg: "bg-amber-500/10" },
                { stage: "NEGOTIATION", label: "Negotiation", color: "text-orange-400", bg: "bg-orange-500/10" },
                { stage: "WON", label: "Won", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { stage: "LOST", label: "Lost", color: "text-red-400", bg: "bg-red-500/10" },
              ].map((s) => {
                const count = kpis?.pipelineStageCounts?.[s.stage] || 0;
                return (
                  <div key={s.stage} className="p-3.5 rounded-xl bg-[#121212] border border-white/5 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                      {s.label}
                    </span>
                    <span className={`font-display font-black text-xl ${s.color}`}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Columns */}
        <div className="lg:col-span-5 space-y-8">
          {/* Section C: Upcoming Follow-ups */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-5 h-5 text-amber-400" />
                <h2 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  Upcoming Follow-ups
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setScheduleFollowupOpen(true)}
                className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs flex items-center gap-1"
                title="Schedule Follow-up"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {!kpis?.upcomingFollowUps || kpis.upcomingFollowUps.length === 0 ? (
              <EmptyState
                icon={PhoneCall}
                title="No follow-ups scheduled"
                description="Stay on top of client deals by scheduling follow-up calls or meetings."
                actionLabel="Schedule Follow-up"
                onAction={() => setScheduleFollowupOpen(true)}
              />
            ) : (
              <div className="space-y-3">
                {kpis.upcomingFollowUps.map((f) => (
                  <div
                    key={f.id}
                    className="p-3 rounded-xl bg-[#121212] border border-white/5 flex items-start justify-between gap-3 group hover:border-amber-500/30 transition-all"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={f.type} size="sm" />
                        <span className="font-bold text-xs text-white truncate">{f.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-text-muted">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(f.scheduled_at).toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {f.inquiry && (
                          <>
                            <span>•</span>
                            <span className="text-text-secondary truncate">{f.inquiry.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCompleteFollowup(f.id)}
                      className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black transition-colors flex-shrink-0"
                      title="Mark Complete"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section D & E: Recent Payments & Revenue Summary */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-gold-bright" />
                <h2 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  Recent Collections
                </h2>
              </div>
              <Link
                href="/admin/payments"
                className="inline-flex items-center gap-1 text-xs text-gold hover:underline font-bold"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {!kpis?.recentPayments || kpis.recentPayments.length === 0 ? (
              <EmptyState
                icon={CreditCard}
                title="No payments yet"
                description="Recorded client advances and milestone settlements will show up here."
                actionLabel="Record Payment"
                onAction={() => setRecordPaymentOpen(true)}
              />
            ) : (
              <div className="space-y-3">
                {kpis.recentPayments.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-[#121212] border border-white/5 flex items-center justify-between gap-3 hover:border-gold/30 transition-all"
                  >
                    <div>
                      <div className="font-bold text-xs text-white">
                        ₹{Number(p.amount).toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] text-text-muted mt-0.5">
                        {p.customer?.name || p.inquiry?.name || "Client"} • {p.method}
                      </div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={p.status} size="sm" />
                      <span className="text-[10px] text-text-muted block mt-1">
                        {new Date(p.created_at).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section F: Live Activity Stream */}
          <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6">
            <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-white/5">
              <Clock className="w-5 h-5 text-gold" />
              <h2 className="font-display font-bold text-base text-white uppercase tracking-wider">
                Recent Activity
              </h2>
            </div>
            <ActivityTimeline activities={kpis?.recentActivities || []} />
          </div>
        </div>
      </div>

      {/* Global Action Modals */}
      <NewInquiryModal
        isOpen={newInquiryOpen}
        onClose={() => setNewInquiryOpen(false)}
        onCreated={fetchKPIs}
      />
      <ScheduleFollowupModal
        isOpen={scheduleFollowupOpen}
        onClose={() => setScheduleFollowupOpen(false)}
        onScheduled={fetchKPIs}
      />
      <RecordPaymentModal
        isOpen={recordPaymentOpen}
        onClose={() => setRecordPaymentOpen(false)}
        onRecorded={fetchKPIs}
      />
    </div>
  );
}
