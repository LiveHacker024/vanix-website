"use client";

import React, { useState, useEffect, useCallback } from "react";
import { LeadRecord, LeadStats, LeadStatus } from "@/lib/types";
import { servicesData } from "@/config/services";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Globe,
  Tag,
  FileText,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  HelpCircle,
  Check,
  Ban,
  AlertTriangle,
  RotateCcw,
  Bot,
  UserCheck,
} from "lucide-react";

const statusOptions: { value: LeadStatus | "ALL"; label: string; color: string }[] = [
  { value: "ALL", label: "All Statuses", color: "bg-surface-3 text-text-secondary border-white/10" },
  { value: "NEW", label: "New", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
  { value: "CONTACTED", label: "Contacted", color: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  { value: "QUALIFIED", label: "Qualified", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
  { value: "PROPOSAL_SENT", label: "Proposal Sent", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
  { value: "WON", label: "Won", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  { value: "LOST", label: "Lost", color: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
  { value: "SPAM", label: "Spam", color: "bg-neutral-800 text-neutral-400 border-neutral-700" },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [stats, setStats] = useState<LeadStats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal_sent: 0,
    won: 0,
    lost: 0,
    spam: 0,
    handoffs_pending: 0,
  });

  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "ALL">("ALL");
  const [serviceFilter, setServiceFilter] = useState<string>("ALL");
  const [handoffOnly, setHandoffOnly] = useState(false);
  const [dateRange, setDateRange] = useState<"all" | "today" | "week" | "month">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const limit = 15;

  // Active Lead Detail Modal
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [leadNotes, setLeadNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");
  const [retryingTarget, setRetryingTarget] = useState<string | null>(null);

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  // Fetch Leads with filters
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        dateRange,
      });

      if (search.trim()) params.append("search", search.trim());
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (serviceFilter !== "ALL") params.append("service", serviceFilter);
      if (handoffOnly) params.append("handoffOnly", "true");

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setLeads(data.leads || []);
        setTotalLeads(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, serviceFilter, handoffOnly, dateRange, sortBy]);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle lead selection for detail modal
  const handleOpenLead = (lead: LeadRecord) => {
    setSelectedLead(lead);
    setLeadNotes(lead.notes || "");
    setActionSuccessMsg("");
  };

  // Update lead status
  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success && data.lead) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setActionSuccessMsg(`Status updated to ${newStatus}`);
        setTimeout(() => setActionSuccessMsg(""), 3000);
        fetchStats();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Save lead internal notes
  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    setActionSuccessMsg("");

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: leadNotes }),
      });
      const data = await res.json();

      if (data.success && data.lead) {
        setSelectedLead(data.lead);
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: leadNotes } : l))
        );
        setActionSuccessMsg("Notes saved successfully.");
        setTimeout(() => setActionSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  // Resolve Human Handoff
  const handleResolveHandoff = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}/handoff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handoff_status: "RESOLVED" }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setSelectedLead(data.lead);
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, handoff_status: "RESOLVED" } : l))
        );
        setActionSuccessMsg("Human handoff marked as resolved.");
        setTimeout(() => setActionSuccessMsg(""), 3000);
        fetchStats();
      }
    } catch (err) {
      console.error("Failed to resolve handoff:", err);
    }
  };

  // Trigger Notification Retry
  const handleRetryNotification = async (target: "internal_email" | "customer_email" | "whatsapp") => {
    if (!selectedLead) return;
    setRetryingTarget(target);
    setActionSuccessMsg("");

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });
      const data = await res.json();

      if (data.success) {
        setActionSuccessMsg(`Notification retry succeeded! Status: ${data.status}`);
        const updateKey =
          target === "internal_email"
            ? "email_notification_status"
            : target === "customer_email"
            ? "customer_email_status"
            : "whatsapp_notification_status";

        setSelectedLead((prev) => (prev ? { ...prev, [updateKey]: data.status } : null));
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, [updateKey]: data.status } : l))
        );
      } else {
        setActionSuccessMsg(`Retry failed: ${data.error || "Unknown error"}`);
      }
      setTimeout(() => setActionSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Retry failed:", err);
    } finally {
      setRetryingTarget(null);
    }
  };

  // Send Follow-up
  const handleSendFollowup = async (stage: 1 | 2) => {
    if (!selectedLead) return;
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}/followup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      });
      const data = await res.json();

      if (data.success) {
        setSelectedLead((prev) => (prev ? { ...prev, followup_stage: stage } : null));
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, followup_stage: stage } : l))
        );
        setActionSuccessMsg(`Follow-up ${stage} sent successfully!`);
        setTimeout(() => setActionSuccessMsg(""), 3000);
      } else {
        setActionSuccessMsg(`Follow-up failed: ${data.error}`);
      }
    } catch (err) {
      console.error("Follow-up send failed:", err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export.");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Phone",
      "Email",
      "Company",
      "Business Type",
      "Service",
      "Message",
      "Status",
      "Handoff Status",
      "Followup Stage",
      "Source Page",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Referrer",
      "Internal Email Alert",
      "Customer Confirmation Email",
      "WhatsApp Alert",
      "Created At",
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.name || ""}"`,
      `"${l.phone || ""}"`,
      `"${l.email || ""}"`,
      `"${l.company || ""}"`,
      `"${l.business_type || ""}"`,
      `"${l.service || ""}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.handoff_status}"`,
      `"${l.followup_stage}"`,
      `"${l.source_page || ""}"`,
      `"${l.utm_source || ""}"`,
      `"${l.utm_medium || ""}"`,
      `"${l.utm_campaign || ""}"`,
      `"${l.referrer || ""}"`,
      `"${l.email_notification_status}"`,
      `"${l.customer_email_status}"`,
      `"${l.whatsapp_notification_status}"`,
      `"${l.created_at}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `VANIX_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (st: LeadStatus) => {
    const opt = statusOptions.find((o) => o.value === st) || statusOptions[1];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${opt.color}`}
      >
        {opt.label}
      </span>
    );
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-8 select-none">
      {/* Top Banner & KPI Stat Cards */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white flex items-center gap-3">
              <span>Inquiry Command Center</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-gold/10 border border-gold/40 text-gold">
                LIVE
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Multi-channel lead management, AI qualification, human handoff, and customer follow-up hub.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                fetchStats();
                fetchLeads();
              }}
              className="p-2.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-white/10 hover:border-gold/30 text-text-secondary hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-gold" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-lg bg-surface-2 hover:bg-gold/10 border border-white/10 hover:border-gold/40 text-gold hover:text-gold-bright transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
              title="Export filtered leads to CSV"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 9-Metric KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {/* Total */}
          <div className="p-4 rounded-xl bg-surface-2/90 border border-white/10 shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Total</span>
            <span className="font-display font-black text-2xl text-white mt-1">{stats.total}</span>
          </div>

          {/* New */}
          <div className="p-4 rounded-xl bg-surface-2/90 border border-amber-500/30 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/10 rounded-bl-xl" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">New</span>
            <span className="font-display font-black text-2xl text-amber-300 mt-1">{stats.new}</span>
          </div>

          {/* Handoffs Pending */}
          <div
            onClick={() => {
              setHandoffOnly(!handoffOnly);
              setPage(1);
            }}
            className={`p-4 rounded-xl border shadow-lg flex flex-col justify-between cursor-pointer transition-all ${
              handoffOnly
                ? "bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/50"
                : "bg-surface-2/90 border-rose-500/40 hover:border-rose-500"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Handoffs</span>
            </span>
            <span className="font-display font-black text-2xl text-rose-300 mt-1">
              {stats.handoffs_pending}
            </span>
          </div>

          {/* Contacted */}
          <div className="p-4 rounded-xl bg-surface-2/90 border border-blue-500/30 shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Contacted</span>
            <span className="font-display font-black text-2xl text-blue-300 mt-1">{stats.contacted}</span>
          </div>

          {/* Qualified */}
          <div className="p-4 rounded-xl bg-surface-2/90 border border-purple-500/30 shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Qualified</span>
            <span className="font-display font-black text-2xl text-purple-300 mt-1">{stats.qualified}</span>
          </div>

          {/* Proposals */}
          <div className="p-4 rounded-xl bg-surface-2/90 border border-cyan-500/30 shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Proposals</span>
            <span className="font-display font-black text-2xl text-cyan-300 mt-1">{stats.proposal_sent}</span>
          </div>

          {/* Won */}
          <div className="p-4 rounded-xl bg-surface-2/90 border border-emerald-500/30 shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Won</span>
            <span className="font-display font-black text-2xl text-emerald-300 mt-1">{stats.won}</span>
          </div>

          {/* Lost */}
          <div className="p-4 rounded-xl bg-surface-2/90 border border-rose-500/20 shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Lost</span>
            <span className="font-display font-black text-2xl text-rose-300 mt-1">{stats.lost}</span>
          </div>

          {/* Spam */}
          <div className="p-4 rounded-xl bg-surface-2/90 border border-white/5 shadow-lg flex flex-col justify-between opacity-70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Spam</span>
            <span className="font-display font-black text-2xl text-text-muted mt-1">{stats.spam}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/80 backdrop-blur-md border border-white/10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, company, phone, or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-xs text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as LeadStatus | "ALL");
                setPage(1);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-xs text-white focus:outline-none focus:border-gold transition-colors"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-surface-3 text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Service Filter */}
          <div className="lg:col-span-3">
            <select
              value={serviceFilter}
              onChange={(e) => {
                setServiceFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-xs text-white focus:outline-none focus:border-gold transition-colors"
            >
              <option value="ALL">All Services</option>
              {servicesData.map((svc) => (
                <option key={svc.id} value={svc.title} className="bg-surface-3 text-white">
                  {svc.title}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="lg:col-span-2">
            <select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value as any);
                setPage(1);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-xs text-white focus:outline-none focus:border-gold transition-colors"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table (Desktop) / Cards (Mobile) */}
      <div className="rounded-2xl bg-surface-2/90 border border-white/10 shadow-2xl overflow-hidden card-depth">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-gold space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin" />
            <span className="text-xs uppercase tracking-widest text-text-muted">
              Loading verified inquiries...
            </span>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface-3 border border-white/10 flex items-center justify-center text-text-muted mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg uppercase text-white">No Inquiries Found</h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              No leads match your current search and filter criteria.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-1/90 border-b border-white/10 text-text-muted font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-6">Client & Business</th>
                    <th className="py-3.5 px-6">Inquired Service</th>
                    <th className="py-3.5 px-6">Contact Channels</th>
                    <th className="py-3.5 px-6">Source / UTM</th>
                    <th className="py-3.5 px-6">Alerts Status</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6">Received</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-surface-3/50 transition-colors group cursor-pointer"
                      onClick={() => handleOpenLead(lead)}
                    >
                      {/* Client */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white group-hover:text-gold transition-colors">
                            {lead.name}
                          </span>
                          {lead.handoff_status === "REQUESTED" && (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-[9px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                              <AlertTriangle className="w-2.5 h-2.5" />
                              <span>Handoff</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-text-muted mt-0.5">
                          {lead.company || lead.business_type || "Individual"}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-4 px-6 max-w-[200px]">
                        <span className="font-semibold text-text-secondary block truncate">
                          {lead.service || "Growth Consultation"}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`tel:${lead.phone}`}
                            className="font-medium text-white hover:text-gold transition-colors flex items-center gap-1.5"
                          >
                            <Phone className="w-3 h-3 text-gold flex-shrink-0" />
                            <span>{lead.phone}</span>
                          </a>

                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-text-muted hover:text-white transition-colors flex items-center gap-1.5 truncate max-w-[170px]"
                            >
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{lead.email}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Marketing Source */}
                      <td className="py-4 px-6 text-text-muted">
                        <div className="text-[11px] font-medium text-text-secondary">
                          {lead.utm_source || "Direct / Organic"}
                        </div>
                        <div className="text-[10px] text-text-muted truncate max-w-[120px]">
                          {lead.source_page || "/"}
                        </div>
                      </td>

                      {/* Alerts Status */}
                      <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          {/* Internal Email Alert */}
                          <span
                            title={`Internal Alert: ${lead.email_notification_status}`}
                            className={`p-1 rounded text-[10px] ${
                              lead.email_notification_status === "SENT"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : lead.email_notification_status === "FAILED"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-neutral-800 text-neutral-400"
                            }`}
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </span>

                          {/* Customer Confirmation Email */}
                          <span
                            title={`Customer Email: ${lead.customer_email_status}`}
                            className={`p-1 rounded text-[10px] ${
                              lead.customer_email_status === "SENT"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : lead.customer_email_status === "FAILED"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-neutral-800 text-neutral-400"
                            }`}
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </span>

                          {/* WhatsApp Alert */}
                          <span
                            title={`WhatsApp: ${lead.whatsapp_notification_status}`}
                            className={`p-1 rounded text-[10px] ${
                              lead.whatsapp_notification_status === "SENT"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : lead.whatsapp_notification_status === "FAILED"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-neutral-800 text-neutral-400"
                            }`}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                          className="px-2 py-1 rounded text-[11px] font-bold bg-surface-3 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors"
                        >
                          {statusOptions
                            .filter((o) => o.value !== "ALL")
                            .map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-text-muted">
                        <div>{formatDate(lead.created_at)}</div>
                        <div className="text-[10px] text-text-dark">{formatTime(lead.created_at)}</div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenLead(lead)}
                            className="p-1.5 rounded-lg bg-surface-3 hover:bg-gold/20 text-text-secondary hover:text-gold transition-colors"
                            title="Open Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg bg-surface-3 hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Card View */}
            <div className="block lg:hidden divide-y divide-white/5">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => handleOpenLead(lead)}
                  className="p-5 hover:bg-surface-3/40 transition-colors space-y-3 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-white">{lead.name}</h4>
                        {lead.handoff_status === "REQUESTED" && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-[9px] font-bold text-rose-300">
                            Handoff
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-muted">
                        {lead.company || lead.business_type || "Individual"}
                      </p>
                    </div>
                    {getStatusBadge(lead.status)}
                  </div>

                  <div className="text-xs text-text-secondary font-medium">
                    <span className="text-gold">Service:</span> {lead.service || "Growth Consultation"}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="flex items-center gap-1.5 text-text-muted">
                      <Phone className="w-3.5 h-3.5 text-gold" />
                      <span className="text-white">{lead.phone}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-text-muted">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(lead.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="p-4 sm:p-6 bg-surface-1/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-text-muted">
                Showing <strong className="text-white">{leads.length}</strong> of{" "}
                <strong className="text-white">{totalLeads}</strong> total inquiries (Page{" "}
                {page} of {totalPages})
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-lg bg-surface-3 border border-white/10 hover:border-gold/30 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="px-3 py-1.5 rounded-lg bg-surface-3 text-xs font-bold text-gold border border-white/5">
                  {page} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2 rounded-lg bg-surface-3 border border-white/10 hover:border-gold/30 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* LEAD DOSSIER DETAIL MODAL / DRAWER */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          {/* Backdrop */}
          <div onClick={() => setSelectedLead(null)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl rounded-2xl bg-surface-2/95 border border-gold/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto card-depth text-white">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest">
                    <Sparkles className="w-3 h-3 text-gold-bright" />
                    <span>CLIENT INQUIRY DOSSIER</span>
                  </div>

                  {selectedLead.handoff_status === "REQUESTED" && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-[10px] font-bold text-rose-300 uppercase tracking-widest animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      <span>HUMAN HANDOFF PENDING</span>
                    </div>
                  )}
                </div>

                <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white">
                  {selectedLead.name}
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Inquiry ID: <span className="text-text-muted font-mono">{selectedLead.id}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-lg bg-surface-3/80 hover:bg-gold/20 text-text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification & Action Feedback Toast */}
            {actionSuccessMsg && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            {/* Quick Status Changers & Handoff Action Bar */}
            <div className="py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              {/* Quick Status Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted mr-1">
                  Set Status:
                </span>
                {(["CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST"] as LeadStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleUpdateStatus(selectedLead.id, st)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      selectedLead.status === st
                        ? "bg-gold text-black shadow-md"
                        : "bg-surface-3 hover:bg-surface-1 border border-white/10 text-text-secondary hover:text-white"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>

              {/* Handoff Resolver */}
              {selectedLead.handoff_status === "REQUESTED" && (
                <button
                  type="button"
                  onClick={handleResolveHandoff}
                  className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resolve Handoff</span>
                </button>
              )}
            </div>

            {/* Direct Communication Channels */}
            <div className="py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-3 hover:bg-gold/20 border border-white/10 text-xs font-bold text-gold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call ({selectedLead.phone})</span>
                </a>

                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(selectedLead.name)}%2C%20this%20is%20VANIX.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-bold text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>

                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-3 hover:bg-surface-1 border border-white/10 text-xs font-bold text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                )}
              </div>

              {/* Follow-up Manual Triggers */}
              {selectedLead.email && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-text-muted uppercase">Follow-up:</span>
                  <button
                    type="button"
                    onClick={() => handleSendFollowup(1)}
                    className="px-2.5 py-1 rounded bg-surface-3 hover:bg-gold/20 border border-white/10 text-[10px] font-bold text-text-secondary hover:text-gold"
                  >
                    Send Day 1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSendFollowup(2)}
                    className="px-2.5 py-1 rounded bg-surface-3 hover:bg-gold/20 border border-white/10 text-[10px] font-bold text-text-secondary hover:text-gold"
                  >
                    Send Day 3
                  </button>
                </div>
              )}
            </div>

            {/* Dossier Grid Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-white/10">
              {/* Left Column: Customer Profile & Inquiry Scope */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>Customer Profile</span>
                </h4>

                <div className="p-4 rounded-xl bg-surface-3/70 border border-white/5 space-y-3 text-xs">
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase">Full Name</span>
                    <strong className="text-white text-sm">{selectedLead.name}</strong>
                  </div>

                  <div>
                    <span className="text-text-muted block text-[10px] uppercase">Business / Firm</span>
                    <strong className="text-gold">
                      {selectedLead.company || selectedLead.business_type || "Not Provided"}
                    </strong>
                  </div>

                  <div>
                    <span className="text-text-muted block text-[10px] uppercase">Phone & WhatsApp</span>
                    <span className="text-white font-mono">{selectedLead.phone}</span>
                  </div>

                  <div>
                    <span className="text-text-muted block text-[10px] uppercase">Email</span>
                    <span className="text-white">{selectedLead.email || "Not Provided"}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2 pt-2">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Inquiry Scope</span>
                </h4>

                <div className="p-4 rounded-xl bg-surface-3/70 border border-white/5 space-y-3 text-xs">
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase">Selected Service</span>
                    <strong className="text-white font-semibold">
                      {selectedLead.service || "Growth Consultation"}
                    </strong>
                  </div>

                  {selectedLead.business_type && (
                    <div>
                      <span className="text-text-muted block text-[10px] uppercase">Business Model</span>
                      <span className="text-text-secondary">{selectedLead.business_type}</span>
                    </div>
                  )}

                  {selectedLead.budget && (
                    <div>
                      <span className="text-text-muted block text-[10px] uppercase">Stated Budget</span>
                      <span className="text-emerald-400 font-semibold">{selectedLead.budget}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Attribution, Technical, & Delivery Logs */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Marketing Attribution</span>
                </h4>

                <div className="p-4 rounded-xl bg-surface-3/70 border border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Source Page:</span>
                    <span className="text-white">{selectedLead.source_page || "/"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-text-muted">UTM Source:</span>
                    <span className="text-amber-400">{selectedLead.utm_source || "Direct"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-text-muted">Referrer:</span>
                    <span className="text-text-secondary truncate max-w-[150px]">{selectedLead.referrer || "Direct"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-text-muted">Device:</span>
                    <span className="text-text-secondary">{selectedLead.device_info || "Desktop"}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2 pt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Automation Delivery Logs & Retries</span>
                </h4>

                <div className="p-4 rounded-xl bg-surface-3/70 border border-white/5 space-y-2.5 text-xs">
                  {/* Internal Alert */}
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Internal Email Alert:</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${selectedLead.email_notification_status === "SENT" ? "text-emerald-400" : "text-red-400"}`}>
                        {selectedLead.email_notification_status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRetryNotification("internal_email")}
                        disabled={retryingTarget === "internal_email"}
                        className="px-2 py-0.5 rounded bg-surface-2 hover:bg-gold/20 text-[10px] text-gold border border-white/5"
                      >
                        Retry
                      </button>
                    </div>
                  </div>

                  {/* Customer Confirmation Email */}
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Customer Confirmation Email:</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${selectedLead.customer_email_status === "SENT" ? "text-emerald-400" : "text-red-400"}`}>
                        {selectedLead.customer_email_status}
                      </span>
                      {selectedLead.email && (
                        <button
                          type="button"
                          onClick={() => handleRetryNotification("customer_email")}
                          disabled={retryingTarget === "customer_email"}
                          className="px-2 py-0.5 rounded bg-surface-2 hover:bg-gold/20 text-[10px] text-gold border border-white/5"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Alert */}
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">WhatsApp Notification:</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${selectedLead.whatsapp_notification_status === "SENT" ? "text-emerald-400" : "text-red-400"}`}>
                        {selectedLead.whatsapp_notification_status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRetryNotification("whatsapp")}
                        disabled={retryingTarget === "whatsapp"}
                        className="px-2 py-0.5 rounded bg-surface-2 hover:bg-gold/20 text-[10px] text-gold border border-white/5"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements / Initial Message */}
            <div className="py-5 border-b border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                Initial Inquiry Requirements
              </h4>
              <div className="p-4 rounded-xl bg-surface-3/90 border border-white/5 text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {selectedLead.message ? selectedLead.message : "No specific initial requirements provided."}
              </div>
            </div>

            {/* Live Conversation History Timeline */}
            <div className="py-5 border-b border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                <Bot className="w-3.5 h-3.5" />
                <span>Conversation Timeline & AI Interactions</span>
              </h4>

              {selectedLead.conversation_history && selectedLead.conversation_history.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto p-4 rounded-xl bg-surface-3/50 border border-white/5">
                  {selectedLead.conversation_history.map((msg, idx) => (
                    <div
                      key={msg.id || idx}
                      className={`flex flex-col ${msg.sender === "customer" ? "items-start" : "items-end"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                          msg.sender === "customer"
                            ? "bg-surface-3 border border-white/10 text-white rounded-tl-none"
                            : "bg-gold/15 border border-gold/30 text-white rounded-tr-none"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <strong className="text-[10px] uppercase font-bold text-gold">
                            {msg.sender === "customer" ? selectedLead.name : "VANIX Assistant"}
                          </strong>
                          <span className="text-[9px] text-text-muted">{formatTime(msg.timestamp)}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-text-muted italic">No interactive chat messages recorded yet.</p>
              )}
            </div>

            {/* Internal Strategy Notes Editor */}
            <div className="pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Internal Strategy Notes (Admin Only)</span>
              </h4>

              <textarea
                rows={3}
                value={leadNotes}
                onChange={(e) => setLeadNotes(e.target.value)}
                placeholder="Add private meeting notes, proposal pricing, follow-up timeline, or qualification comments..."
                className="w-full p-4 rounded-xl bg-surface-3 border border-white/10 text-xs text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="px-4 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-xs font-bold text-red-300 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Lead</span>
                </button>

                <button
                  type="button"
                  disabled={savingNotes}
                  onClick={handleSaveNotes}
                  className="px-6 py-2 rounded-lg bg-gold-gradient text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {savingNotes ? "Saving..." : "Save Internal Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
