"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { contactConfig } from "@/config/contact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { GoldButton } from "@/components/ui/GoldButton";
import { ServiceBookingModal } from "@/components/ui/ServiceBookingModal";
import { servicesData } from "@/config/services";
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
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export default function ContactPage() {
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
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

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
        source_page: "/contact",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${siteConfig.url}/contact`,
      },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    description: "Get in touch with VANIX for custom digital growth, website development, local SEO, and advertising inquiries.",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      telephone: siteConfig.links.phone,
      email: siteConfig.links.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shamli",
        addressRegion: "Uttar Pradesh",
        postalCode: "247776",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <main className="min-h-screen bg-background text-white selection:bg-gold selection:text-black overflow-x-hidden">
        <Navbar />

        <div className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
          {/* Ambient Glow */}
          <div className="ambient-gold-glow top-20 left-1/2 -translate-x-1/2 opacity-20" />

          {/* Breadcrumbs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gold font-medium">Contact</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
              <span>GET IN TOUCH</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
              Start Your <span className="text-gradient-gold">Digital Growth</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-text-secondary leading-relaxed font-light">
              Connect with our strategy team to discuss custom web engineering, Google Maps dominance, paid ad funnels, or book a bespoke strategy audit.
            </p>
          </div>

          {/* Main Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Verified Contact Details & Response Info */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="p-8 rounded-2xl bg-surface-2/80 backdrop-blur-md border border-white/10 space-y-6">
                  <h2 className="font-display font-bold text-xl uppercase tracking-wide text-white">
                    Direct Official Channels
                  </h2>

                  <div className="space-y-4 text-sm">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-surface-3 border border-white/10 text-gold flex-shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-text-muted block uppercase tracking-wider font-semibold">
                          Direct Phone
                        </span>
                        <a
                          href={`tel:${siteConfig.links.phoneRaw}`}
                          className="font-medium text-white hover:text-gold transition-colors"
                        >
                          {siteConfig.links.phone}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-surface-3 border border-white/10 text-gold flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-text-muted block uppercase tracking-wider font-semibold">
                          Official Email
                        </span>
                        <a
                          href={`mailto:${siteConfig.links.email}`}
                          className="font-medium text-white hover:text-gold transition-colors break-all"
                        >
                          {siteConfig.links.email}
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-surface-3 border border-white/10 text-gold flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-text-muted block uppercase tracking-wider font-semibold">
                          Operational Base
                        </span>
                        <p className="text-text-secondary leading-relaxed">
                          {siteConfig.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Quick Trigger */}
                  <div className="pt-4 border-t border-white/5">
                    <a
                      href={siteConfig.links.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp Directly</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Social Profiles */}
                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={siteConfig.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-surface-3 border border-white/10 text-xs text-text-secondary hover:text-white hover:border-gold/40 transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={siteConfig.links.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-surface-3 border border-white/10 text-xs text-text-secondary hover:text-white hover:border-gold/40 transition-colors"
                    >
                      <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>

                {/* Transparency Box */}
                <div className="p-6 rounded-xl bg-surface-2/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                    <Clock className="w-4 h-4" />
                    <span>Response Timeline & Next Steps</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Our strategy team reviews all submitted inquiries and typically responds within <strong>24 to 48 business hours</strong> via WhatsApp or email.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-text-muted pt-2 border-t border-white/5">
                    <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>All inquiries are handled with strict privacy and non-disclosure.</span>
                  </div>
                </div>

                {/* Strategy Session Booking Banner */}
                <div className="p-6 rounded-xl bg-gold-gradient-subtle border border-gold/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                    <Zap className="w-4 h-4" />
                    <span>Need Immediate Strategy Alignment?</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Book a dedicated 1-on-1 Growth Strategy Session (₹999) with our technical lead to map out your digital transition roadmap.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-white transition-colors"
                  >
                    <span>Book Strategy Session (₹999) →</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Lead Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-2xl bg-surface-2/90 backdrop-blur-md border border-white/10 card-depth relative">
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white mb-2">
                      Send a Project Inquiry
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary font-light">
                      Fill out the form below to outline your requirements and request a customized growth proposal.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-gold-bright" />
                      </div>
                      <h3 className="font-display font-bold text-2xl uppercase text-white">
                        Inquiry Received
                      </h3>
                      <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out to VANIX. Our strategy team will review your business requirements and contact you via WhatsApp or email within 24 to 48 business hours.
                      </p>
                      <div className="pt-4">
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
                          className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
                        >
                          Submit another inquiry →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Honeypot anti-spam trap */}
                      <input
                        type="text"
                        name="company_website_hp"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      {errorMsg && (
                        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                            Your Name <span className="text-gold">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Business Name */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                            Business / Brand Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Sharma Textiles"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                            Phone / WhatsApp Number <span className="text-gold">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. rahul@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Business Type */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                            Business Category
                          </label>
                          <select
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                          >
                            {contactConfig.businessTypes.map((type) => (
                              <option key={type} value={type} className="bg-surface-3 text-white">
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Service Needed */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                            Primary Service Needed
                          </label>
                          <select
                            value={formData.serviceNeeded}
                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                          >
                            {contactConfig.servicesOfInterest.map((srv) => (
                              <option key={srv} value={srv} className="bg-surface-3 text-white">
                                {srv}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                          Brief Project Details / Goals
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your products, current online challenges, and what you aim to accomplish..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Sensitive Data Notice */}
                      <div className="p-3 rounded-lg bg-surface-3 border border-white/5 text-[11px] text-text-muted flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Security Notice:</strong> Please do not submit confidential financial details, passwords, or government ID numbers through this form.
                        </span>
                      </div>

                      {/* Submit CTA */}
                      <div className="pt-2">
                        <GoldButton
                          type="submit"
                          disabled={loading}
                          size="md"
                          variant="primary"
                          className="w-full justify-center text-center"
                        >
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>SUBMITTING INQUIRY...</span>
                            </span>
                          ) : (
                            <span>SUBMIT SERVICE INQUIRY</span>
                          )}
                        </GoldButton>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Session Booking Modal */}
        <ServiceBookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          service={servicesData[0]}
        />

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
