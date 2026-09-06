"use client";

import React, { useState } from "react";
import { X, UserCheck, Loader2, CheckCircle2 } from "lucide-react";
import { InquiryRecord } from "@/lib/types";

interface ConvertToCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryRecord;
  onConverted?: () => void;
}

export function ConvertToCustomerModal({
  isOpen,
  onClose,
  inquiry,
  onConverted,
}: ConvertToCustomerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConvert = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/crm/inquiries/${inquiry.id}/convert`, {
        method: "POST",
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to convert inquiry");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onConverted) onConverted();
      }, 1000);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0D0D0D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
              Convert to Customer
            </h2>
            <p className="text-xs text-text-muted">Promote inquiry to formal client portfolio</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {success ? (
          <div className="py-8 flex flex-col items-center justify-center text-center text-emerald-400">
            <CheckCircle2 className="w-12 h-12 mb-3 animate-bounce" />
            <span className="font-bold text-base">Inquiry Converted!</span>
            <span className="text-xs text-text-muted mt-1">Customer record created and linked.</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#141414] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted uppercase">Client Name:</span>
                <span className="font-bold text-white">{inquiry.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted uppercase">Company:</span>
                <span className="text-white">{inquiry.company || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted uppercase">Phone:</span>
                <span className="text-white">{inquiry.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted uppercase">Service:</span>
                <span className="text-gold">{inquiry.service || "General"}</span>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-light">
              This will create a new Customer profile, link all previous inquiries &amp; conversation history, and mark this inquiry as <strong className="text-emerald-400">WON</strong>.
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-secondary text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConvert}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Conversion</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
