"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ServiceItem } from "@/config/services";
import { siteConfig } from "@/config/site";
import {
  X,
  Check,
  CheckCircle2,
  Copy,
  Clock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  MessageCircle,
  QrCode,
  Sparkles,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem;
  initialBusinessName?: string;
  initialLocation?: string;
}

type BookingStep = "DETAILS" | "SUMMARY" | "PAYMENT" | "VERIFY_PAYMENT" | "CONFIRMATION";

export function ServiceBookingModal({
  isOpen,
  onClose,
  service,
  initialBusinessName,
  initialLocation,
}: ServiceBookingModalProps) {
  const [step, setStep] = useState<BookingStep>("DETAILS");
  const [formData, setFormData] = useState({
    name: "",
    businessName: initialBusinessName || "",
    phone: "",
    email: "",
    location: initialLocation || "",
    note: "",
    utr: "",
    honeypot: "",
  });

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingResult, setBookingResult] = useState<{
    reference: string;
    status: string;
    amount: number;
  } | null>(null);

  useEffect(() => {
    if (initialBusinessName) {
      setFormData((prev) => ({ ...prev, businessName: initialBusinessName }));
    }
    if (initialLocation) {
      setFormData((prev) => ({ ...prev, location: initialLocation }));
    }
  }, [initialBusinessName, initialLocation]);

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

  // Lock scroll
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

  const copyUpiId = () => {
    navigator.clipboard.writeText("9457727770@ybl");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleNextToSummary = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.name.trim() || !formData.businessName.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in all required fields (Name, Business Name, Phone).");
      return;
    }
    setStep("SUMMARY");
  };

  const handleSubmitBooking = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        businessName: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        serviceSlug: service.slug,
        serviceName: service.title,
        utr: formData.utr,
        note: formData.note,
        honeypot: formData.honeypot,
      };

      const res = await fetch("/api/service-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit your booking. Please try again.");
      }

      setBookingResult({
        reference: data.booking.booking_reference,
        status: data.booking.payment_status || "PAYMENT_VERIFICATION_PENDING",
        amount: data.booking.amount || 999,
      });

      setStep("CONFIRMATION");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setStep("DETAILS");
    setErrorMsg("");
    setBookingResult(null);
    setFormData({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      location: "",
      note: "",
      utr: "",
      honeypot: "",
    });
    onClose();
  };

  const customerWhatsAppUrl = `https://wa.me/919457727770?text=${encodeURIComponent(
    `Hello VANIX,
I have submitted a ₹999 service booking.

Business: ${formData.businessName}
Service: ${service.title}
Booking Reference: ${bookingResult?.reference || "Pending"}
Payment Status: Verification Pending`
  )}`;

  const upiDeepLink = `upi://pay?pa=9457727770@ybl&pn=VANIX%20GROWTH&am=999&cu=INR&tn=VANIX%20${encodeURIComponent(
    service.title
  )}%20Booking`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-2xl bg-surface-2/95 border border-gold/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto card-depth">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-surface-3/80 hover:bg-gold/20 text-text-muted hover:text-white transition-colors focus:outline-none"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: CUSTOMER DETAILS FORM */}
        {step === "DETAILS" && (
          <form onSubmit={handleNextToSummary} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3 text-gold-bright" />
                <span>OFFICIAL SERVICE BOOKING · ₹999</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-white tracking-wide">
                Book {service.title}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Lock in your dedicated strategy & setup slot for <strong className="text-gold">₹999</strong>.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Anti-spam Honeypot */}
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

            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Full Name"
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
                  Business / Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Acme Industries"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Email Address (Optional)
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

            {/* Business Location */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                Business City / Location (Optional)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Delhi NCR, Mumbai, Surat, Shamli"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Requirement / Note */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                Specific Goals / Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Any specific timeline, current challenge, or product focus..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            {/* Selected Service Card Highlight */}
            <div className="p-3.5 rounded-xl bg-surface-3/80 border border-gold/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">
                  Selected Service
                </span>
                <div className="font-display font-bold text-sm text-white">
                  {service.title}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">
                  Booking Fee
                </span>
                <div className="font-display font-black text-lg text-gold">
                  ₹999
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded bg-gold-gradient text-black text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
              >
                <span>Continue to Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PERSONALIZED BOOKING SUMMARY */}
        {step === "SUMMARY" && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-bright" />
                <span>BOOKING OVERVIEW</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-white tracking-wide">
                Review Your Booking
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Please verify your details before proceeding to the UPI payment screen.
              </p>
            </div>

            {/* Summary Card */}
            <div className="rounded-xl bg-surface-3/90 border border-white/10 divide-y divide-white/5 overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gold/5">
                <span className="text-xs font-bold uppercase tracking-wider text-gold">
                  YOUR SELECTED SERVICE
                </span>
                <span className="font-display font-bold text-sm text-white text-right">
                  {service.title}
                </span>
              </div>

              <div className="p-4 flex items-center justify-between">
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  SERVICE BOOKING FEE
                </span>
                <span className="font-display font-black text-xl text-gold">
                  ₹999
                </span>
              </div>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-text-muted uppercase text-[10px] font-bold block mb-0.5">
                    Business Name
                  </span>
                  <span className="font-semibold text-white">{formData.businessName}</span>
                </div>
                <div>
                  <span className="text-text-muted uppercase text-[10px] font-bold block mb-0.5">
                    Contact Person
                  </span>
                  <span className="font-semibold text-white">{formData.name}</span>
                </div>
                <div>
                  <span className="text-text-muted uppercase text-[10px] font-bold block mb-0.5">
                    Phone Number
                  </span>
                  <span className="font-semibold text-white">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-text-muted uppercase text-[10px] font-bold block mb-0.5">
                    Email
                  </span>
                  <span className="font-semibold text-white">{formData.email || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("DETAILS")}
                className="w-full sm:w-1/3 py-3 px-4 rounded bg-surface-3 hover:bg-surface-3/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>

              <button
                type="button"
                onClick={() => setStep("PAYMENT")}
                className="w-full sm:w-2/3 py-3 px-6 rounded bg-gold-gradient text-black text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT SCREEN (UPI QR & UPI ID) */}
        {step === "PAYMENT" && (
          <div className="space-y-5 text-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                <QrCode className="w-3.5 h-3.5 text-gold-bright" />
                <span>UPI SECURE PAYMENT</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-white tracking-wide">
                Complete Your ₹999 Service Booking
              </h3>
              <p className="text-xs text-text-secondary mt-1 max-w-md mx-auto">
                Scan the QR code using any supported UPI app (PhonePe, Google Pay, Paytm, BHIM) to complete your booking payment.
              </p>
            </div>

            {/* QR Payment Frame */}
            <div className="relative mx-auto w-full max-w-[280px] p-4 rounded-2xl bg-white border-2 border-gold/60 shadow-[0_0_30px_rgba(200,164,93,0.3)] flex flex-col items-center">
              <div className="relative w-56 h-56 sm:w-60 sm:h-60 rounded-xl overflow-hidden">
                <Image
                  src="/images/vanix-upi-qr.png"
                  alt="VANIX UPI Payment QR"
                  width={240}
                  height={240}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              <div className="mt-2 text-center text-black">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-600 block">
                  Scan & Pay
                </span>
                <span className="font-display font-black text-xl text-neutral-950">
                  ₹999
                </span>
              </div>
            </div>

            {/* UPI ID Copy Box */}
            <div className="p-3.5 rounded-xl bg-surface-3 border border-white/10 flex items-center justify-between max-w-md mx-auto">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                  UPI ID
                </span>
                <span className="font-mono text-sm font-bold text-gold">
                  9457727770@ybl
                </span>
              </div>

              <button
                type="button"
                onClick={copyUpiId}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-gold/20 border border-white/10 hover:border-gold/40 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                {copiedUpi ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[11px]">Copy UPI</span>
                  </>
                )}
              </button>
            </div>

            {/* Deep link for mobile app */}
            <div className="block sm:hidden">
              <a
                href={upiDeepLink}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-surface-3 hover:bg-surface-3/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5 text-gold" />
                <span>Open in UPI App (Where supported)</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("SUMMARY")}
                className="w-full sm:w-1/3 py-3 px-4 rounded bg-surface-3 hover:bg-surface-3/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep("VERIFY_PAYMENT")}
                className="w-full sm:w-2/3 py-3 px-6 rounded bg-gold-gradient text-black text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
              >
                <span>I've Completed Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: OPTIONAL UTR / VERIFY PAYMENT */}
        {step === "VERIFY_PAYMENT" && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                <Clock className="w-3.5 h-3.5 text-gold-bright" />
                <span>PAYMENT CONFIRMATION</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-white tracking-wide">
                Submit for Verification
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                Your payment has been made via UPI. Provide the transaction ID / UTR so VANIX can verify your booking promptly.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                UPI Transaction ID / UTR (Optional)
              </label>
              <input
                type="text"
                value={formData.utr}
                onChange={(e) => setFormData({ ...formData, utr: e.target.value })}
                placeholder="e.g. 4256XXXXXXXX or 12-digit UTR from your UPI app"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors font-mono"
              />
              <p className="text-[11px] text-text-muted mt-1.5">
                * Found in your PhonePe / GPay / Paytm payment receipt details.
              </p>
            </div>

            {/* Security Notice */}
            <div className="p-3.5 rounded-xl bg-surface-3/60 border border-white/5 text-[11px] text-text-muted flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                VANIX will never ask for your UPI PIN, OTP, bank passwords, or debit/credit card details.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep("PAYMENT")}
                disabled={loading}
                className="w-full sm:w-1/3 py-3.5 px-4 rounded bg-surface-3 hover:bg-surface-3/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitBooking}
                disabled={loading}
                className="w-full sm:w-2/3 py-3.5 px-6 rounded bg-gold-gradient text-black text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting your booking...</span>
                  </>
                ) : (
                  <span>Submit Booking Request</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: FINAL CONFIRMATION (NO FAKE SUCCESS) */}
        {step === "CONFIRMATION" && (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
              <Clock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-300 uppercase tracking-widest">
              <span>PAYMENT VERIFICATION PENDING</span>
            </div>

            <h4 className="text-2xl font-display font-extrabold uppercase text-white tracking-wide">
              BOOKING REQUEST RECEIVED
            </h4>

            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              Your request for <strong className="text-white">{service.title}</strong> has been securely recorded. VANIX will verify your UPI transaction and contact you regarding next steps.
            </p>

            {/* Reference Summary Box */}
            <div className="p-4 rounded-xl bg-surface-3 border border-white/10 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-text-muted uppercase font-bold text-[10px]">Booking Reference</span>
                <span className="font-mono font-bold text-gold">{bookingResult?.reference}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Business</span>
                <span className="text-white font-medium">{formData.businessName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Contact Person</span>
                <span className="text-white font-medium">{formData.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Booking Fee</span>
                <span className="text-white font-medium">₹{bookingResult?.amount || 999}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={customerWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to VANIX on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-3.5 rounded bg-surface-3 hover:bg-surface-3/80 border border-white/10 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
