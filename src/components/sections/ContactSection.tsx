"use client";

import React, { useState } from "react";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
import { getClientTrackingData } from "@/lib/tracking";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    businessType: contactConfig.businessTypes[0],
    serviceNeeded: contactConfig.servicesOfInterest[0],
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        businessType: formData.businessType,
        service: formData.serviceNeeded,
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
      const msg = err instanceof Error ? err.message : "Failed to send inquiry.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-surface-1 overflow-hidden select-none border-t border-white/5"
    >
      {/* Ambient background glow */}
      <div className="ambient-gold-glow top-1/2 right-0 -translate-y-1/2 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="GET STARTED TODAY"
          title="READY TO TAKE YOUR"
          titleAccent="BUSINESS ONLINE?"
          subtitle={contactConfig.subtitle}
          align="center"
          size="large"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-12">
          {/* Left Column: Direct Verified Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-surface-2/80 backdrop-blur-md border border-white/10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[11px] font-bold text-gold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
                <span>DIRECT STRATEGY DESK</span>
              </div>

              <h3 className="font-display font-bold text-2xl uppercase text-white tracking-wide">
                Speak With VANIX
              </h3>

              <p className="text-sm text-text-secondary font-light leading-relaxed">
                Connect directly with our team to formulate a bespoke digital transformation plan tailored to your products, location, and business goals.
              </p>

              {/* Direct channels */}
              <div className="space-y-3.5 pt-4 border-t border-white/10">
                {/* Phone */}
                <a
                  href={`tel:${contactConfig.phoneRaw}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-3/80 hover:bg-gold/10 border border-white/5 hover:border-gold/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted">Direct Phone</span>
                    <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                      {contactConfig.phone}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={contactConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-3/80 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted">WhatsApp Chat</span>
                    <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      CHAT WITH VANIX
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-3/80 hover:bg-gold/10 border border-white/5 hover:border-gold/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 text-gold flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted">Email Inquiries</span>
                    <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                      {contactConfig.email}
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-3/80 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 text-gold flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-text-muted">Location</span>
                    <p className="text-sm font-bold text-white">
                      {contactConfig.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href={contactConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 p-2.5 rounded-lg bg-surface-3 hover:bg-surface-3/80 border border-white/5 hover:border-gold/30 text-xs text-text-secondary hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-text-muted" />
                </a>

                <a
                  href={contactConfig.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 p-2.5 rounded-lg bg-surface-3 hover:bg-surface-3/80 border border-white/5 hover:border-gold/30 text-xs text-text-secondary hover:text-white transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4 text-[#FF0000]" />
                  <span>{contactConfig.youtubeHandle}</span>
                  <ArrowUpRight className="w-3 h-3 text-text-muted" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-surface-2/90 backdrop-blur-xl border border-gold/30 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-display font-bold uppercase text-white">
                    Inquiry Received
                  </h4>
                  <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your consultation request for{" "}
                    <span className="text-gold font-medium">{formData.serviceNeeded}</span> has been securely received by our strategy team.
                  </p>
                  <p className="text-xs text-text-muted">
                    We will review your requirements and reach out to you shortly.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={contactConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat Directly On WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          businessName: "",
                          phone: "",
                          email: "",
                          businessType: contactConfig.businessTypes[0],
                          serviceNeeded: contactConfig.servicesOfInterest[0],
                          message: "",
                          honeypot: "",
                        });
                      }}
                      className="px-6 py-3 rounded bg-surface-3 hover:bg-surface-3/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display font-bold text-xl uppercase text-white tracking-wide mb-6">
                    Request A Digital Growth Consultation
                  </h3>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Honeypot field (hidden from real users, traps bots) */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Aura Fashions"
                        className="w-full px-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 94577 27770"
                        className="w-full px-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="business@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Business Type */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                        Business Type
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      >
                        {contactConfig.businessTypes.map((type) => (
                          <option key={type} value={type} className="bg-surface-3 text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Services Required */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                        Services Required
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      >
                        {contactConfig.servicesOfInterest.map((service) => (
                          <option key={service} value={service} className="bg-surface-3 text-white">
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your current products, location, or goals..."
                      className="w-full px-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-md bg-gold-gradient text-black text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SENDING INQUIRY...</span>
                        </>
                      ) : (
                        <span>START THE CONVERSATION</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
