"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  RefreshCw,
  Phone,
  Mail,
  Building,
  CreditCard,
  PhoneCall,
  Globe,
  ExternalLink,
  IndianRupee,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { CustomerRecord, CustomerStatus } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { EmptyState } from "@/components/crm/EmptyState";
import { ScheduleFollowupModal } from "@/components/crm/ScheduleFollowupModal";
import { RecordPaymentModal } from "@/components/crm/RecordPaymentModal";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CustomerStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "paid" | "name">("newest");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // New Customer Modal
  const [newCustomerOpen, setNewCustomerOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newServices, setNewServices] = useState("Website Development");
  const [newNotes, setNewNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  // Action Modals
  const [paymentCustomer, setPaymentCustomer] = useState<CustomerRecord | null>(null);
  const [followupCustomer, setFollowupCustomer] = useState<CustomerRecord | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status,
        sortBy,
        page: page.toString(),
        limit: limit.toString(),
      });
      const res = await fetch(`/api/admin/crm/customers?${params}`);
      const data = await res.json();
      if (data.success) {
        setCustomers(data.data);
        setTotal(data.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, status, sortBy, page, limit]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/crm/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
          email: newEmail,
          company: newCompany,
          website: newWebsite,
          services: newServices.split(",").map((s) => s.trim()).filter(Boolean),
          notes: newNotes,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to create customer");
      }

      setNewCustomerOpen(false);
      setNewName("");
      setNewPhone("");
      setNewEmail("");
      setNewCompany("");
      setNewWebsite("");
      setNewNotes("");
      fetchCustomers();
    } catch (err: any) {
      setModalError(err?.message || "Failed to create customer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Active Client Directory</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Customers &amp; Accounts ({total})
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 font-light">
            Manage your permanent client relationships, active contracts, and lifetime account value.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setNewCustomerOpen(true)}
          className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/15 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Customer</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by customer name, company, email, phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141414] border border-white/10 text-white placeholder:text-text-muted text-xs focus:border-gold focus:outline-none"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as any);
              setPage(1);
            }}
            className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
          >
            <option value="ALL">All Account Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>

        <div className="sm:col-span-3 flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="paid">Highest Paid Revenue</option>
            <option value="name">Alphabetical</option>
          </select>
          <button
            type="button"
            onClick={fetchCustomers}
            className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-muted hover:text-white"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Customers List */}
      <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 overflow-hidden">
        {loading && customers.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-gold space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin" />
            <span className="text-xs uppercase tracking-widest text-text-muted">Loading customers...</span>
          </div>
        ) : customers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No customers yet"
            description="Convert qualified inquiries into customers or create direct client accounts."
            actionLabel="Add Customer"
            onAction={() => setNewCustomerOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#121212] border-b border-white/10 text-text-muted uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Customer &amp; Company</th>
                  <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                  <th className="py-3.5 px-4 font-semibold">Active Services</th>
                  <th className="py-3.5 px-4 font-semibold">Total Paid</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="py-4 px-4">
                      <Link href={`/admin/customers/${cust.id}`} className="block">
                        <span className="font-bold text-sm text-white group-hover:text-gold block">
                          {cust.name}
                        </span>
                        {cust.company && (
                          <span className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3" />
                            <span>{cust.company}</span>
                          </span>
                        )}
                      </Link>
                    </td>

                    <td className="py-4 px-4 space-y-1">
                      <a href={`tel:${cust.phone}`} className="flex items-center gap-1.5 text-text-secondary hover:text-gold">
                        <Phone className="w-3 h-3 text-gold" />
                        <span>{cust.phone}</span>
                      </a>
                      {cust.email && (
                        <a href={`mailto:${cust.email}`} className="flex items-center gap-1.5 text-text-muted hover:text-white truncate max-w-[180px]">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{cust.email}</span>
                        </a>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[220px]">
                        {cust.services && cust.services.length > 0 ? (
                          cust.services.map((srv, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-[#161616] border border-white/5 text-[10px] text-text-secondary font-medium">
                              {srv}
                            </span>
                          ))
                        ) : (
                          <span className="text-text-muted text-[11px]">No active services</span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-sm text-emerald-400 font-mono">
                        ₹{Number(cust.total_paid || 0).toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-text-muted block mt-0.5">
                        Client since {new Date(cust.created_at).toLocaleDateString([], { month: "short", year: "numeric" })}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <StatusBadge status={cust.status} type="customer" size="sm" />
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentCustomer(cust)}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-gold/20 text-text-muted hover:text-gold transition-colors"
                          title="Record Payment"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFollowupCustomer(cust)}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-amber-500/20 text-text-muted hover:text-amber-400 transition-colors"
                          title="Schedule Follow-up"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/admin/customers/${cust.id}`}
                          className="px-2.5 py-1 rounded-lg bg-surface-2 hover:bg-gold hover:text-black border border-white/10 text-[11px] font-bold uppercase tracking-wider text-text-secondary transition-colors"
                        >
                          Profile
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/10 bg-[#121212] text-xs text-text-muted">
            <span>
              Showing page {page} of {totalPages} ({total} total customers)
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

      {/* New Customer Modal */}
      {newCustomerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              type="button"
              onClick={() => setNewCustomerOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-text-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                  Create Customer Account
                </h2>
                <p className="text-xs text-text-muted">Add new client to active portfolio</p>
              </div>
            </div>

            {modalError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {modalError}
              </div>
            )}

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="e.g. +91 9457727770"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Acme Enterprises"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Services (Comma separated)
                </label>
                <input
                  type="text"
                  value={newServices}
                  onChange={(e) => setNewServices(e.target.value)}
                  placeholder="Website Development, Local SEO, WhatsApp Sales"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Account Notes
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Account specifications, billing frequency, or contract notes..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewCustomerOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-secondary text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Customer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Action Modals */}
      {paymentCustomer && (
        <RecordPaymentModal
          isOpen={!!paymentCustomer}
          customerId={paymentCustomer.id}
          customerName={paymentCustomer.name}
          onClose={() => setPaymentCustomer(null)}
          onRecorded={fetchCustomers}
        />
      )}
      {followupCustomer && (
        <ScheduleFollowupModal
          isOpen={!!followupCustomer}
          customerId={followupCustomer.id}
          contactName={followupCustomer.name}
          onClose={() => setFollowupCustomer(null)}
          onScheduled={fetchCustomers}
        />
      )}
    </div>
  );
}
