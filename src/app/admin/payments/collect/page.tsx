"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  IndianRupee,
  Users,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { CustomerRecord, PaymentMethod, PaymentStatus } from "@/lib/types";

export default function CollectPaymentPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("UPI");
  const [status, setStatus] = useState<PaymentStatus>("PAID");
  const [transactionId, setTransactionId] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await fetch("/api/admin/crm/customers?limit=100");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setCustomers(data.data);
          if (data.data.length > 0) {
            setSelectedCustomerId(data.data[0].id);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadCustomers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const numericAmount = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid numeric amount.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/crm/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: selectedCustomerId || undefined,
          amount: numericAmount,
          method,
          status,
          transaction_id: transactionId,
          notes,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to record payment");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/payments");
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 pb-6 border-b border-white/10">
        <Link
          href="/admin/payments"
          className="p-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-secondary hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-display font-black text-2xl text-white uppercase tracking-tight">
            Collect Payment &amp; Generate Receipt
          </h1>
          <p className="text-xs text-text-muted">Register a direct client settlement in VANIX CRM</p>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0D0D0D] border border-white/10 p-6 sm:p-8 shadow-2xl">
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center text-emerald-400 space-y-2">
            <CheckCircle2 className="w-12 h-12 animate-bounce" />
            <span className="font-bold text-lg text-white">Payment Recorded Successfully!</span>
            <span className="text-xs text-text-muted">Redirecting to payments ledger...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Customer Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Select Client Account
              </label>
              {customers.length === 0 ? (
                <div className="p-3 rounded-xl bg-[#141414] border border-white/5 text-xs text-text-muted">
                  No registered customers found. You can enter an anonymous settlement or create a customer first.
                </div>
              ) : (
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.company ? `(${c.company})` : ""} - {c.phone}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Amount Received (INR ₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-gold font-bold text-sm">₹</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="75000"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-gold focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Method & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Payment Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="BANK_TRANSFER">Bank Transfer (NEFT / RTGS / IMPS)</option>
                  <option value="CARD">Debit / Credit Card</option>
                  <option value="CASH">Cash Deposit</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Payment Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PaymentStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
                >
                  <option value="PAID">PAID (Settled in Bank)</option>
                  <option value="PENDING">PENDING (Awaiting Transfer)</option>
                  <option value="FAILED">FAILED</option>
                </select>
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Bank UTR / Transaction Reference ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g. UTR/9457727770123"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none font-mono"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Payment Description / Milestone Terms
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. 50% upfront retainer for E-commerce & Marketplace launch..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-white text-xs focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <Link
                href="/admin/payments"
                className="px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-secondary text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/15 flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Record &amp; Issue Receipt</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
