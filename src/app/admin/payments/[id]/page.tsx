"use client";

import React, { useEffect, useState, useCallback, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Building,
  Calendar,
  CheckCircle2,
  Sparkles,
  Printer,
  ExternalLink,
  IndianRupee,
  FileText,
} from "lucide-react";
import { PaymentRecord, PaymentStatus } from "@/lib/types";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { VanixLogo } from "@/components/ui/VanixLogo";

export default function PaymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPayment = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/crm/payments/${id}`);
      const data = await res.json();
      if (data.success) {
        setPayment(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  const handleUpdateStatus = async (newStatus: PaymentStatus) => {
    try {
      await fetch(`/api/admin/crm/payments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchPayment();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading && !payment) {
    return (
      <div className="py-24 text-center text-gold space-y-3">
        <Sparkles className="w-8 h-8 animate-spin mx-auto" />
        <span className="text-xs uppercase tracking-widest text-text-muted">Loading payment receipt...</span>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="p-12 text-center text-text-muted space-y-4">
        <p>Payment transaction not found.</p>
        <Link href="/admin/payments" className="px-4 py-2 bg-gold text-black rounded-lg text-xs font-bold uppercase">
          Back to Payments
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/payments"
            className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-secondary hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              Transaction Receipt
            </h1>
            <span className="text-xs text-text-muted">Ref: {payment.transaction_id || payment.id}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Luxury Printable Invoice / Receipt Card */}
      <div className="rounded-3xl bg-[#0D0D0D] border border-white/10 p-8 sm:p-12 shadow-2xl space-y-8 print:bg-white print:text-black print:border-none">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10 print:border-black/20">
          <div>
            <VanixLogo size="sm" showSubtitle={false} href="#" />
            <span className="text-xs text-text-muted font-light block mt-2 print:text-black/70">
              VANIX Digital Growth Agency &amp; Enterprise Systems
            </span>
          </div>
          <div className="text-left sm:text-right space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gold block print:text-black">
              Official Payment Voucher
            </span>
            <div className="font-mono text-xs text-text-muted print:text-black/60">
              Receipt No: <strong className="text-white print:text-black">{payment.invoice_number || `REC-${payment.id.slice(0, 8)}`}</strong>
            </div>
            <div className="text-xs text-text-muted print:text-black/60">
              Date: {new Date(payment.created_at).toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </div>

        {/* Client & Amount Hero */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 print:bg-gray-100 print:text-black">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">Received From Client</span>
            <div className="font-display font-black text-lg text-white print:text-black">
              {payment.customer?.name || payment.inquiry?.name || "Client"}
            </div>
            {(payment.customer?.company || payment.inquiry?.company) && (
              <span className="text-xs text-text-muted block mt-0.5 print:text-black/70">
                {payment.customer?.company || payment.inquiry?.company}
              </span>
            )}
            {(payment.customer?.phone || payment.inquiry?.phone) && (
              <span className="text-xs text-text-muted block print:text-black/70">
                {payment.customer?.phone || payment.inquiry?.phone}
              </span>
            )}
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">Settlement Amount</span>
            <div className="font-display font-black text-3xl text-gradient-gold print:text-black">
              ₹{Number(payment.amount).toLocaleString("en-IN")}
            </div>
            <div className="mt-1">
              <StatusBadge status={payment.status} type="payment" size="sm" />
            </div>
          </div>
        </div>

        {/* Payment Specifications Table */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-text-muted">
            Transaction Specifications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#141414] border border-white/5 print:bg-gray-50">
              <span className="text-[10px] text-text-muted uppercase block">Payment Mode</span>
              <span className="font-bold text-white print:text-black">{payment.method}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141414] border border-white/5 print:bg-gray-50">
              <span className="text-[10px] text-text-muted uppercase block">Bank / UTR Ref</span>
              <span className="font-bold text-white print:text-black font-mono text-[11px] truncate block">
                {payment.transaction_id || "N/A"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#141414] border border-white/5 print:bg-gray-50">
              <span className="text-[10px] text-text-muted uppercase block">Currency</span>
              <span className="font-bold text-white print:text-black">{payment.currency || "INR (₹)"}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141414] border border-white/5 print:bg-gray-50">
              <span className="text-[10px] text-text-muted uppercase block">Payment Status</span>
              <span className="font-bold text-emerald-400 print:text-black">{payment.status}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {payment.notes && (
          <div className="p-4 rounded-xl bg-[#141414] border border-white/5 text-xs text-text-secondary leading-relaxed print:bg-gray-50 print:text-black">
            <span className="font-bold uppercase tracking-wider text-[10px] text-text-muted block mb-1">
              Terms &amp; Milestone Notes:
            </span>
            {payment.notes}
          </div>
        )}

        {/* Status Switcher (Admin Control, Hidden on Print) */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <span className="text-xs text-text-muted">Update Settlement Status:</span>
          <div className="flex items-center gap-2">
            {["PAID", "PENDING", "FAILED", "REFUNDED"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => handleUpdateStatus(st as PaymentStatus)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  payment.status === st
                    ? "bg-gold text-black shadow-sm"
                    : "bg-surface-2 text-text-secondary hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
