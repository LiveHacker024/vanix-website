"use client";

import React, { useState } from "react";
import { X, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { PaymentMethod, PaymentStatus } from "@/lib/types";

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId?: string;
  inquiryId?: string;
  customerName?: string;
  onRecorded?: () => void;
}

export function RecordPaymentModal({
  isOpen,
  onClose,
  customerId,
  inquiryId,
  customerName,
  onRecorded,
}: RecordPaymentModalProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("UPI");
  const [status, setStatus] = useState<PaymentStatus>("PAID");
  const [transactionId, setTransactionId] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const numericAmount = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/crm/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: numericAmount,
          method,
          status,
          transaction_id: transactionId,
          notes,
          customer_id: customerId,
          inquiry_id: inquiryId,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to record payment");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onRecorded) onRecorded();
      }, 1000);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0D0D0D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
              Record Payment
            </h2>
            <p className="text-xs text-text-muted">
              {customerName ? `For: ${customerName}` : "Register transaction in CRM"}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {success ? (
          <div className="py-10 flex flex-col items-center justify-center text-center text-emerald-400">
            <CheckCircle2 className="w-12 h-12 mb-3 animate-bounce" />
            <span className="font-bold text-base">Payment Recorded</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Amount (INR ₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-gold font-bold text-sm">₹</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="50000"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Payment Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                >
                  <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                  <option value="BANK_TRANSFER">Bank Transfer (NEFT/IMPS)</option>
                  <option value="CARD">Credit / Debit Card</option>
                  <option value="CASH">Cash</option>
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                >
                  <option value="PAID">PAID (Received)</option>
                  <option value="PENDING">PENDING (Invoice Sent)</option>
                  <option value="FAILED">FAILED</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                UTR / Transaction Reference ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g. UPI/123456789012"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Notes & Terms
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Advance 50% for Website Development milestone"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-secondary text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/10 flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Payment</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
