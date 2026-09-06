"use client";

import React, { useState } from "react";
import { X, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { InquiryStatus } from "@/lib/types";

interface NewInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const VANIX_SERVICES = [
  "Website Development",
  "E-commerce Website",
  "Product Listing",
  "Marketplace Services",
  "Google Business Profile",
  "Local SEO",
  "Social Media Management",
  "Google Ads",
  "Meta Ads",
  "WhatsApp Sales",
  "Lead Generation",
  "Analytics & Reporting",
  "Online Growth Strategy",
  "Technical & Marketing Support",
];

export function NewInquiryModal({ isOpen, onClose, onCreated }: NewInquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("Website Development");
  const [budget, setBudget] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<InquiryStatus>("NEW");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/crm/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          service,
          budget,
          website,
          message,
          status,
          notes,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to create inquiry");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onCreated) onCreated();
      }, 1000);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D0D0D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
            <Sparkles className="w-4 h-4 text-gold-bright" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
              Create New Inquiry
            </h2>
            <p className="text-xs text-text-muted">Directly inject lead into VANIX CRM pipeline</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center text-emerald-400">
            <CheckCircle2 className="w-12 h-12 mb-3 animate-bounce" />
            <span className="font-bold text-base">Inquiry Created Successfully</span>
            <span className="text-xs text-text-muted mt-1">Updating CRM database...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kunal Sharma"
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. business@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. SANCUS Enterprise"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Requested Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                >
                  {VANIX_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Budget (INR)
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. ₹50,000 - ₹1,50,000"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Initial Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InquiryStatus)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="PROPOSAL">PROPOSAL</option>
                  <option value="NEGOTIATION">NEGOTIATION</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Website / URL
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://clientwebsite.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Client Message / Requirements
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Inquiry notes or requirements..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#141414] border border-white/10 focus:border-gold focus:outline-none text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                Internal Strategy Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Internal team notes..."
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
                <span>Save Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
