"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  Plus,
  RefreshCw,
  Phone,
  Mail,
  Building,
  Calendar,
  Sparkles,
  UserCheck,
  PhoneCall,
  CreditCard,
  Download,
} from "lucide-react";
import { InquiryRecord, InquiryStatus } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { EmptyState } from "@/components/crm/EmptyState";
import { NewInquiryModal } from "@/components/crm/NewInquiryModal";
import { ScheduleFollowupModal } from "@/components/crm/ScheduleFollowupModal";
import { ConvertToCustomerModal } from "@/components/crm/ConvertToCustomerModal";

const INQUIRY_STATUSES: { value: InquiryStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Inquiries" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "PROPOSAL", label: "Proposal" },
  { value: "NEGOTIATION", label: "Negotiation" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
  { value: "SPAM", label: "Spam" },
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<InquiryStatus | "ALL">("ALL");
  const [service, setService] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // Modals
  const [newInquiryOpen, setNewInquiryOpen] = useState(false);
  const [followupInquiry, setFollowupInquiry] = useState<InquiryRecord | null>(null);
  const [convertInquiry, setConvertInquiry] = useState<InquiryRecord | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status,
        service,
        sortBy,
        page: page.toString(),
        limit: limit.toString(),
      });
      const res = await fetch(`/api/admin/crm/inquiries?${params}`);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
        setTotal(data.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, status, service, sortBy, page, limit]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleQuickStatusChange = async (id: string, newStatus: InquiryStatus, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/admin/crm/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ["Name", "Phone", "Email", "Company", "Service", "Budget", "Status", "Created At"];
    const rows = inquiries.map((i) => [
      `"${i.name}"`,
      `"${i.phone}"`,
      `"${i.email || ""}"`,
      `"${i.company || ""}"`,
      `"${i.service || ""}"`,
      `"${i.budget || ""}"`,
      `"${i.status}"`,
      `"${new Date(i.created_at).toISOString()}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vanix_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Lead &amp; Inquiry Intelligence</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Inquiries ({total})
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 font-light">
            Central repository of all inbound digital growth inquiries and sales opportunities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setNewInquiryOpen(true)}
            className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/15 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Inquiry</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-white/10 space-y-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {INQUIRY_STATUSES.map((st) => (
            <button
              key={st.value}
              type="button"
              onClick={() => {
                setStatus(st.value);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                status === st.value
                  ? "bg-gold text-black shadow-sm shadow-gold/20"
                  : "bg-surface-2 text-text-muted hover:text-white hover:bg-surface-3"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, company, phone, email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141414] border border-white/10 text-white placeholder:text-text-muted text-xs focus:border-gold focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <input
              type="text"
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                setPage(1);
              }}
              placeholder="Filter by service..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#141414] border border-white/10 text-white placeholder:text-text-muted text-xs focus:border-gold focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <button
              type="button"
              onClick={fetchInquiries}
              className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-muted hover:text-white"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 overflow-hidden">
        {loading && inquiries.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-gold space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin" />
            <span className="text-xs uppercase tracking-widest text-text-muted">Loading inquiries...</span>
          </div>
        ) : inquiries.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No inquiries found"
            description={
              search || status !== "ALL"
                ? "No inquiries matched your current filter criteria. Try clearing search filters."
                : "Website inquiries will appear here automatically when prospective clients submit contact forms."
            }
            actionLabel="Create New Inquiry"
            onAction={() => setNewInquiryOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#121212] border-b border-white/10 text-text-muted uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Prospect</th>
                  <th className="py-3.5 px-4 font-semibold">Contact</th>
                  <th className="py-3.5 px-4 font-semibold">Service &amp; Budget</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Received</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    {/* Prospect Info */}
                    <td className="py-4 px-4">
                      <Link href={`/admin/inquiries/${inq.id}`} className="block">
                        <div className="font-bold text-sm text-white group-hover:text-gold flex items-center gap-1.5">
                          <span>{inq.name}</span>
                          {inq.customer_id && (
                            <span className="px-1.5 py-0.2 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                              CLIENT
                            </span>
                          )}
                        </div>
                        {inq.company && (
                          <div className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3" />
                            <span>{inq.company}</span>
                          </div>
                        )}
                      </Link>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-4 space-y-1">
                      <a
                        href={`tel:${inq.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-text-secondary hover:text-gold"
                      >
                        <Phone className="w-3 h-3 text-gold" />
                        <span>{inq.phone}</span>
                      </a>
                      {inq.email && (
                        <a
                          href={`mailto:${inq.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-text-muted hover:text-white truncate max-w-[180px]"
                        >
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{inq.email}</span>
                        </a>
                      )}
                    </td>

                    {/* Service & Budget */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-white block">{inq.service || "General"}</span>
                      {inq.budget && (
                        <span className="text-[11px] text-gold font-mono block mt-0.5">
                          Budget: {inq.budget}
                        </span>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={inq.status} size="sm" />
                      </div>
                    </td>

                    {/* Received Date */}
                    <td className="py-4 px-4 text-text-muted">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(inq.created_at).toLocaleDateString()}</span>
                      </div>
                      <span className="text-[10px] text-text-muted/70 block mt-0.5">
                        {new Date(inq.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFollowupInquiry(inq);
                          }}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-amber-500/20 text-text-muted hover:text-amber-400 transition-colors"
                          title="Schedule Follow-up"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </button>

                        {!inq.customer_id && inq.status !== "WON" && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConvertInquiry(inq);
                            }}
                            className="p-1.5 rounded-lg bg-surface-2 hover:bg-emerald-500/20 text-text-muted hover:text-emerald-400 transition-colors"
                            title="Convert to Customer"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <Link
                          href={`/admin/inquiries/${inq.id}`}
                          className="px-2.5 py-1 rounded-lg bg-surface-2 hover:bg-gold hover:text-black border border-white/10 text-[11px] font-bold uppercase tracking-wider text-text-secondary transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/10 bg-[#121212] text-xs text-text-muted">
            <span>
              Showing page {page} of {totalPages} ({total} total records)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-surface-2 disabled:opacity-40 hover:bg-surface-3 text-text-secondary"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-surface-2 disabled:opacity-40 hover:bg-surface-3 text-text-secondary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <NewInquiryModal
        isOpen={newInquiryOpen}
        onClose={() => setNewInquiryOpen(false)}
        onCreated={fetchInquiries}
      />
      {followupInquiry && (
        <ScheduleFollowupModal
          isOpen={!!followupInquiry}
          inquiryId={followupInquiry.id}
          contactName={followupInquiry.name}
          onClose={() => setFollowupInquiry(null)}
          onScheduled={fetchInquiries}
        />
      )}
      {convertInquiry && (
        <ConvertToCustomerModal
          isOpen={!!convertInquiry}
          inquiry={convertInquiry}
          onClose={() => setConvertInquiry(null)}
          onConverted={fetchInquiries}
        />
      )}
    </div>
  );
}
