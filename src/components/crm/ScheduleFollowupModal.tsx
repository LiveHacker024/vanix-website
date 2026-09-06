"use client";

import React, { useState } from "react";
import { X, Calendar, PhoneCall, Loader2, CheckCircle2 } from "lucide-react";
import { FollowUpType } from "@/lib/types";

interface ScheduleFollowupModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryId?: string;
  customerId?: string;
  contactName?: string;
  onScheduled?: () => void;
}

export function ScheduleFollowupModal({
  isOpen,
  onClose,
  inquiryId,
  customerId,
  contactName,
  onScheduled,
}: ScheduleFollowupModalProps) {
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(11, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  });
  const [type, setType] = useState<FollowUpType>("CALL");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/crm/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || `Follow-up call with ${contactName || "Client"}`,
          scheduled_at: new Date(scheduledAt).toISOString(),
          type,
          note,
          inquiry_id: inquiryId,
          customer_id: customerId,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to schedule follow-up");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onScheduled) onScheduled();
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
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
              Schedule Follow-up
            </h2>
            <p className="text-xs text-text-muted">
              {contactName ? `For: ${contactName}` : "Add task to CRM calendar"}
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
            <span className="font-bold text-base">Follow-up Scheduled</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Title / Objective *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Discuss Scope & Proposal Pitch"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Follow-up Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as FollowUpType)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                >
                  <option value="CALL">Phone Call</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="EMAIL">Email</option>
                  <option value="MEETING">Google Meet / In-Person</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Notes / Talking Points
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Key questions or proposal details to discuss..."
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
                <span>Save Follow-up</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
