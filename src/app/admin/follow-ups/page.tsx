"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Calendar,
  Clock,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  Users,
  XCircle,
} from "lucide-react";
import { FollowUpRecord, FollowUpStatus, FollowUpType } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { EmptyState } from "@/components/crm/EmptyState";
import { ScheduleFollowupModal } from "@/components/crm/ScheduleFollowupModal";

const TABS = [
  { id: "all", label: "All Tasks" },
  { id: "today", label: "Today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "overdue", label: "Overdue" },
  { id: "completed", label: "Completed" },
];

export default function FollowUpsPage() {
  const [followups, setFollowups] = useState<FollowUpRecord[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const fetchFollowups = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/crm/followups?tab=${activeTab}`);
      const data = await res.json();
      if (data.success) {
        setFollowups(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchFollowups();
  }, [fetchFollowups]);

  const handleStatusUpdate = async (id: string, newStatus: FollowUpStatus) => {
    try {
      await fetch(`/api/admin/crm/followups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchFollowups();
    } catch (err) {
      console.error(err);
    }
  };

  const isOverdue = (scheduledAt: string, status: FollowUpStatus) => {
    return new Date(scheduledAt) < new Date() && status === "PENDING";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Task &amp; Call Management</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Follow-ups &amp; Action Items
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 font-light">
            Keep deals warm, schedule pitch calls, and maintain client communication rhythms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setScheduleOpen(true)}
          className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/15 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Follow-up</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between gap-4 p-2 rounded-2xl bg-[#0E0E0E] border border-white/10 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? "bg-gold text-black shadow-md shadow-gold/20"
                  : "text-text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={fetchFollowups}
          className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-muted hover:text-white"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Follow-ups Content */}
      <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 overflow-hidden p-6">
        {loading && followups.length === 0 ? (
          <div className="py-12 text-center text-gold space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto" />
            <span className="text-xs uppercase tracking-widest text-text-muted">Loading follow-ups...</span>
          </div>
        ) : followups.length === 0 ? (
          <EmptyState
            icon={PhoneCall}
            title={activeTab === "overdue" ? "No overdue tasks!" : "No follow-ups found"}
            description="Schedule calls, pitch presentations, or WhatsApp touchpoints to keep client velocity high."
            actionLabel="Schedule Follow-up"
            onAction={() => setScheduleOpen(true)}
          />
        ) : (
          <div className="space-y-3">
            {followups.map((f) => {
              const overdue = isOverdue(f.scheduled_at, f.status);
              return (
                <div
                  key={f.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    overdue
                      ? "bg-red-500/[0.04] border-red-500/30 hover:border-red-500/50"
                      : f.status === "COMPLETED"
                      ? "bg-white/[0.01] border-white/5 opacity-60 hover:opacity-100"
                      : "bg-[#121212] border-white/10 hover:border-gold/40"
                  }`}
                >
                  {/* Left Info */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={f.type} size="sm" />
                      <StatusBadge status={f.status} size="sm" />
                      {overdue && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>OVERDUE</span>
                        </span>
                      )}
                      <span className="font-bold text-sm text-white">{f.title}</span>
                    </div>

                    {/* Target Contact / Company */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted font-light">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        <span>
                          {new Date(f.scheduled_at).toLocaleString([], {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {f.inquiry && (
                        <Link
                          href={`/admin/inquiries/${f.inquiry.id}`}
                          className="flex items-center gap-1 text-cyan-400 hover:underline"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Inquiry: {f.inquiry.name}</span>
                        </Link>
                      )}

                      {f.customer && (
                        <Link
                          href={`/admin/customers/${f.customer.id}`}
                          className="flex items-center gap-1 text-emerald-400 hover:underline"
                        >
                          <Users className="w-3 h-3" />
                          <span>Client: {f.customer.name}</span>
                        </Link>
                      )}
                    </div>

                    {f.note && (
                      <p className="text-xs text-text-secondary bg-[#0A0A0A] p-2.5 rounded-lg border border-white/5 font-light leading-relaxed max-w-2xl">
                        {f.note}
                      </p>
                    )}
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                    {f.status === "PENDING" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(f.id, "COMPLETED")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Complete</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(f.id, "CANCELLED")}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-red-500/20 text-text-muted hover:text-red-400 border border-white/10 transition-colors"
                          title="Cancel Task"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ScheduleFollowupModal
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        onScheduled={fetchFollowups}
      />
    </div>
  );
}
