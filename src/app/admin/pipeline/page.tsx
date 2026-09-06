"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Kanban,
  Plus,
  RefreshCw,
  Sparkles,
  PhoneCall,
  UserCheck,
  Building,
  Calendar,
  IndianRupee,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import { InquiryRecord, InquiryStatus } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { NewInquiryModal } from "@/components/crm/NewInquiryModal";
import { ScheduleFollowupModal } from "@/components/crm/ScheduleFollowupModal";
import { ConvertToCustomerModal } from "@/components/crm/ConvertToCustomerModal";

const PIPELINE_COLUMNS: { id: InquiryStatus; title: string; color: string; border: string; bg: string }[] = [
  { id: "NEW", title: "New Inquiries", color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/5" },
  { id: "CONTACTED", title: "Contacted", color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-500/5" },
  { id: "QUALIFIED", title: "Qualified", color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/5" },
  { id: "PROPOSAL", title: "Proposal Sent", color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/5" },
  { id: "NEGOTIATION", title: "Negotiation", color: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/5" },
  { id: "WON", title: "Closed Won", color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/5" },
  { id: "LOST", title: "Closed Lost", color: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/5" },
];

export default function PipelinePage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Modals
  const [newInquiryOpen, setNewInquiryOpen] = useState(false);
  const [followupInquiry, setFollowupInquiry] = useState<InquiryRecord | null>(null);
  const [convertInquiry, setConvertInquiry] = useState<InquiryRecord | null>(null);

  const fetchPipeline = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/crm/inquiries?limit=500");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPipeline();
  }, [fetchPipeline]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggingId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: InquiryStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggingId;
    setDraggingId(null);
    if (!id) return;

    // Optimistic UI update
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: targetStatus } : inq))
    );

    try {
      await fetch(`/api/admin/crm/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus }),
      });
      fetchPipeline();
    } catch (err) {
      console.error("Failed to update status on drop:", err);
      fetchPipeline();
    }
  };

  const getInquiriesForColumn = (columnId: InquiryStatus) => {
    return inquiries.filter((inq) => {
      if (columnId === "PROPOSAL") {
        return inq.status === "PROPOSAL" || inq.status === "PROPOSAL_SENT";
      }
      return inq.status === columnId;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Kanban className="w-3.5 h-3.5" />
            <span>Interactive Deal Pipeline</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Sales &amp; Conversion Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 font-light">
            Drag and drop deals across stages to advance negotiations and close clients.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchPipeline}
            className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-secondary hover:text-white"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={() => setNewInquiryOpen(true)}
            className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/15 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Deal</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="overflow-x-auto pb-6">
        <div className="flex items-start gap-4 min-w-[1250px]">
          {PIPELINE_COLUMNS.map((col) => {
            const colInquiries = getInquiriesForColumn(col.id);
            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`w-72 flex-shrink-0 rounded-2xl bg-[#0C0C0C] border ${col.border} flex flex-col max-h-[75vh]`}
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-white/5 flex items-center justify-between bg-[#121212] rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.bg.replace('/5', '')} bg-current`} />
                    <span className={`font-display font-bold text-xs uppercase tracking-wider ${col.color}`}>
                      {col.title}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-2 text-text-muted text-[11px] font-bold">
                    {colInquiries.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1 min-h-[200px]">
                  {colInquiries.length === 0 ? (
                    <div className="h-32 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-center p-3">
                      <span className="text-[11px] text-text-muted/60">Drop deals here</span>
                    </div>
                  ) : (
                    colInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, inq.id)}
                        className="p-4 rounded-xl bg-[#141414] border border-white/10 hover:border-gold/40 transition-all shadow-md cursor-grab active:cursor-grabbing group select-none space-y-3"
                      >
                        {/* Prospect Title & Service */}
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/admin/inquiries/${inq.id}`}
                              className="font-bold text-xs text-white group-hover:text-gold block"
                            >
                              {inq.name}
                            </Link>
                            {inq.customer_id && (
                              <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                CLIENT
                              </span>
                            )}
                          </div>
                          {inq.company && (
                            <div className="text-[10px] text-text-muted flex items-center gap-1 mt-0.5">
                              <Building className="w-2.5 h-2.5" />
                              <span className="truncate">{inq.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Service Tag */}
                        <div className="p-2 rounded-lg bg-[#0E0E0E] border border-white/5 text-[11px] text-text-secondary">
                          <span className="text-gold font-medium block truncate">
                            {inq.service || "General Growth"}
                          </span>
                          {inq.budget && (
                            <span className="text-[10px] text-text-muted font-mono block mt-0.5">
                              Budget: {inq.budget}
                            </span>
                          )}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-text-muted">
                          <span>{new Date(inq.created_at).toLocaleDateString([], { month: "short", day: "numeric" })}</span>
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => setFollowupInquiry(inq)}
                              className="p-1 rounded hover:bg-amber-500/20 hover:text-amber-400"
                              title="Schedule Follow-up"
                            >
                              <PhoneCall className="w-3 h-3" />
                            </button>
                            {!inq.customer_id && inq.status !== "WON" && (
                              <button
                                type="button"
                                onClick={() => setConvertInquiry(inq)}
                                className="p-1 rounded hover:bg-emerald-500/20 hover:text-emerald-400"
                                title="Convert to Customer"
                              >
                                <UserCheck className="w-3 h-3" />
                              </button>
                            )}
                            <Link
                              href={`/admin/inquiries/${inq.id}`}
                              className="p-1 rounded hover:bg-gold/20 hover:text-gold"
                              title="Open Details"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <NewInquiryModal
        isOpen={newInquiryOpen}
        onClose={() => setNewInquiryOpen(false)}
        onCreated={fetchPipeline}
      />
      {followupInquiry && (
        <ScheduleFollowupModal
          isOpen={!!followupInquiry}
          inquiryId={followupInquiry.id}
          contactName={followupInquiry.name}
          onClose={() => setFollowupInquiry(null)}
          onScheduled={fetchPipeline}
        />
      )}
      {convertInquiry && (
        <ConvertToCustomerModal
          isOpen={!!convertInquiry}
          inquiry={convertInquiry}
          onClose={() => setConvertInquiry(null)}
          onConverted={fetchPipeline}
        />
      )}
    </div>
  );
}
