"use client";

import React, { useState, useEffect } from "react";
import { contactConfig } from "@/config/contact";
import { servicesData } from "@/config/services";
import { GoldButton } from "@/components/ui/GoldButton";
import { getClientTrackingData } from "@/lib/tracking";
import {
  X,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialBusinessName?: string;
  initialMessage?: string;
}

export function ServiceInquiryModal({
  isOpen,
  onClose,
  initialService,
  initialBusinessName,
  initialMessage,
}: ServiceInquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    businessName: initialBusinessName || "",
    phone: "",
    email: "",
    service: initialService || servicesData[0].title,
    message: initialMessage || "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
    if (initialBusinessName) {
      setFormData((prev) => ({ ...prev, businessName: initialBusinessName }));
    }
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialService, initialBusinessName, initialMessage]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const tracking = getClientTrackingData();

      const payload = {
        name: formData.name,
        businessName: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        honeypot: formData.honeypot,
        ...tracking,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg("");
    setFormData({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      service: initialService || servicesData[0].title,
      message: "",
      honeypot: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-2/95 border border-gold/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto card-depth">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-surface-3/80 hover:bg-gold/20 text-text-muted hover:text-white transition-colors focus:outline-none"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-display font-bold uppercase text-white">
              Inquiry Received
            </h4>

            <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry for{" "}
              <span className="text-gold font-medium">{formData.service}</span> has been securely
              recorded. Our strategy team will reach out to you shortly.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={contactConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat On WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-3 rounded bg-surface-3 hover:bg-surface-3/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3 text-gold-bright" />
                <span>DIRECT INQUIRY</span>
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-white tracking-wide">
                Inquire About Service
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Tell us about your business goals and receive a tailored growth plan.
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Anti-spam Honeypot (hidden) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                name="company_website_hp"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 94577 27770"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Business Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Acme Enterprises"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="business@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                Service Interested In
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white focus:outline-none focus:border-gold transition-colors"
              >
                {servicesData.map((svc) => (
                  <option key={svc.id} value={svc.title} className="bg-surface-3 text-white">
                    {svc.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                Requirements / Goals (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly describe your current setup, location, or goals..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded bg-gold-gradient text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <span>Send Service Inquiry</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
