"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CreditCard,
  Plus,
  RefreshCw,
  Search,
  IndianRupee,
  Calendar,
  Building,
  User,
  ExternalLink,
  CheckCircle2,
  Clock,
  Download,
} from "lucide-react";
import { PaymentRecord, PaymentStatus } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { EmptyState } from "@/components/crm/EmptyState";
import { RecordPaymentModal } from "@/components/crm/RecordPaymentModal";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<PaymentStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const [recordModalOpen, setRecordModalOpen] = useState(false);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status,
        page: page.toString(),
        limit: limit.toString(),
      });
      const res = await fetch(`/api/admin/crm/payments?${params}`);
      const data = await res.json();
      if (data.success) {
        setPayments(data.data);
        setTotal(data.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [status, page, limit]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const totalPaidSum = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalPendingSum = payments
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            <CreditCard className="w-3.5 h-3.5 text-gold-bright" />
            <span>Revenue &amp; Billing Ledger</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Payments &amp; Transactions ({total})
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 font-light">
            Real collections ledger for advance deposits, milestones, and contract invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/payments/collect"
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
          >
            Collect Form
          </Link>
          <button
            type="button"
            onClick={() => setRecordModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/15 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10">
          <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Total Settled Collections</span>
          <div className="font-display font-black text-2xl sm:text-3xl text-gradient-gold">
            ₹{totalPaidSum.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-emerald-400 font-bold block mt-1">100% Real Database Receipts</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10">
          <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Awaiting Payment</span>
          <div className="font-display font-black text-2xl sm:text-3xl text-yellow-400">
            ₹{totalPendingSum.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-text-muted block mt-1">Pending Invoices</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-text-muted block mb-1">Payment Gateways</span>
            <span className="font-bold text-sm text-white">UPI / NEFT / IMPS</span>
            <span className="text-[10px] text-text-muted block mt-1">Direct Bank Settlements</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
            <IndianRupee className="w-5 h-5 text-gold-bright" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 p-2 rounded-2xl bg-[#0E0E0E] border border-white/10 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {["ALL", "PAID", "PENDING", "FAILED", "REFUNDED"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                setStatus(st as any);
                setPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                status === st
                  ? "bg-gold text-black shadow-md shadow-gold/20"
                  : "text-text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              {st === "ALL" ? "All Payments" : st}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={fetchPayments}
          className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-muted hover:text-white"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 overflow-hidden">
        {loading && payments.length === 0 ? (
          <div className="py-12 text-center text-gold space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto" />
            <span className="text-xs uppercase tracking-widest text-text-muted">Loading payments...</span>
          </div>
        ) : payments.length === 0 ? (
          <EmptyState
            icon={CreditCard}
            title="No payments recorded yet"
            description="Record payments received from clients via UPI, bank transfer, or card."
            actionLabel="Record Payment"
            onAction={() => setRecordModalOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#121212] border-b border-white/10 text-text-muted uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Client / Reference</th>
                  <th className="py-3.5 px-4 font-semibold">Amount</th>
                  <th className="py-3.5 px-4 font-semibold">Method</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-4">
                      <Link href={`/admin/payments/${p.id}`} className="block">
                        <span className="font-bold text-sm text-white group-hover:text-gold block">
                          {p.customer?.name || p.inquiry?.name || "Anonymous Client"}
                        </span>
                        <span className="text-[11px] text-text-muted font-mono mt-0.5 block">
                          {p.transaction_id || p.invoice_number || `TXN-${p.id.slice(0, 6)}`}
                        </span>
                      </Link>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-display font-black text-sm text-white font-mono">
                        ₹{Number(p.amount).toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <StatusBadge status={p.method} type="payment_method" size="sm" />
                    </td>

                    <td className="py-4 px-4">
                      <StatusBadge status={p.status} type="payment" size="sm" />
                    </td>

                    <td className="py-4 px-4 text-text-muted">
                      <span>{new Date(p.created_at).toLocaleDateString()}</span>
                      <span className="text-[10px] text-text-muted/60 block mt-0.5">
                        {new Date(p.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/admin/payments/${p.id}`}
                        className="px-2.5 py-1 rounded-lg bg-surface-2 hover:bg-gold hover:text-black border border-white/10 text-[11px] font-bold uppercase tracking-wider text-text-secondary transition-colors"
                      >
                        View
                      </Link>
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
              Showing page {page} of {totalPages} ({total} transactions)
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

      <RecordPaymentModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        onRecorded={fetchPayments}
      />
    </div>
  );
}
