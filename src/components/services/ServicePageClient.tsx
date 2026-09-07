"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceItem } from "@/config/services";
import { siteConfig } from "@/config/site";
import { contactConfig } from "@/config/contact";
import { ServiceInquiryModal } from "@/components/ui/ServiceInquiryModal";
import { ServiceBookingModal } from "@/components/ui/ServiceBookingModal";
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  HelpCircle,
  Cpu,
  Workflow,
  Globe,
  ShoppingCart,
  Store,
  MapPin,
  Search,
  Share2,
  Target,
  Flame,
  UserCheck,
  BarChart3,
  Compass,
  CreditCard,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
};

interface ServicePageClientProps {
  service: ServiceItem;
  relatedServices: ServiceItem[];
}

export function ServicePageClient({
  service,
  relatedServices,
}: ServicePageClientProps) {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const scrollToDeliverables = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("deliverables");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-gold selection:text-black pt-24 pb-20">
      {/* Ambient background glow */}
      <div className="ambient-gold-glow top-20 left-1/2 -translate-x-1/2 opacity-25" />

      {/* 01. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-gold transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-gold font-medium truncate max-w-[200px] sm:max-w-none">
            {service.title}
          </span>
        </nav>
      </div>

      {/* 02. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span>{service.category} · SERVICE {service.number}</span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          {service.heroTitle.main}{" "}
          <span className="text-gradient-gold block sm:inline">
            {service.heroTitle.goldHighlight}
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed font-light mb-10">
          {service.heroDescription}
        </p>

        {/* Primary CTA Row with ₹999 Booking Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => setBookingModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded bg-gold-gradient text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-gold/25 hover:shadow-gold/45 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 animate-gold-shimmer border border-gold-bright/60"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>Book This Service — ₹999</span>
          </button>

          <button
            type="button"
            onClick={() => setInquiryModalOpen(true)}
            className="w-full sm:w-auto px-6 py-4 rounded bg-surface-2 hover:bg-surface-3 border border-white/15 hover:border-gold/50 text-white hover:text-gold text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <span>Book Free Growth Audit</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>

          <a
            href="#deliverables"
            onClick={scrollToDeliverables}
            className="w-full sm:w-auto px-5 py-4 rounded bg-transparent hover:bg-white/5 border border-white/10 text-text-secondary hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
          >
            <span>Deliverables</span>
            <ChevronDown className="w-4 h-4 text-gold" />
          </a>
        </div>
      </section>

      {/* 03. CORE PROBLEM / OFFLINE GAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="rounded-2xl bg-surface-2/90 border border-white/10 p-6 sm:p-10 lg:p-12 card-depth relative overflow-hidden">
          {/* Subtle Warning Badge */}
          <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-4 h-4" />
            <span>The Traditional Gap</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white tracking-wide mb-4">
            {service.problem.heading}
          </h2>

          <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed max-w-3xl mb-8">
            {service.problem.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            {service.problem.points.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-surface-3/50 border border-white/5"
              >
                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-400 text-xs font-bold">
                  ✕
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. DELIVERABLES GRID */}
      <section id="deliverables" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3 text-gold-bright" />
            <span>WHAT WE DELIVER</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tight text-white">
            Core Deliverables & Specifications
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary font-light">
            Every deliverable is engineered for tangible commercial outcomes, brand prestige, and technical resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.detailedDeliverables.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-xl p-6 bg-surface-2/80 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all duration-300 card-depth flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-xs text-gold/80 px-2.5 py-1 rounded bg-gold/10 border border-gold/20">
                    DELIVERABLE 0{idx + 1}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-gold opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg uppercase text-white tracking-wide group-hover:text-gold-bright transition-colors mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05. TECH STACK */}
      {service.techStack && service.techStack.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-xl bg-surface-1 border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-3 border border-white/10 flex items-center justify-center text-gold flex-shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
                  Technology & Production Stack
                </h4>
                <p className="text-xs text-text-muted">
                  Built exclusively with modern, battle-tested platforms and tools.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded bg-surface-2 border border-white/10 text-xs font-semibold text-text-secondary hover:text-white hover:border-gold/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 06. 4-STEP GROWTH PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
            <Workflow className="w-3.5 h-3.5 text-gold-bright" />
            <span>HOW WE EXECUTE</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tight text-white">
            The 4-Step Growth Process
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary font-light">
            A battle-tested transition methodology tailored to this service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {service.process.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-xl p-6 bg-surface-2/90 border border-white/10 hover:border-gold/40 transition-all duration-300 card-depth flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-2xl text-gold">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted">
                    PHASE {idx + 1}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base uppercase text-white tracking-wide mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < service.process.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-surface-3 border border-gold/40 flex items-center justify-center text-gold text-[10px]">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 07. EXPECTED GROWTH METRICS / KPIs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="rounded-2xl bg-surface-2/90 border border-gold/30 p-6 sm:p-10 lg:p-12 card-depth">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-gold-bright" />
              <span>PERFORMANCE MEASUREMENT</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Expected Growth Metrics & Monitoring
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
              We monitor specific quantitative indicators to ensure continuous optimization and positive business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {service.kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-surface-3/80 border border-white/5 flex flex-col justify-between"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-gold mb-2">
                  {kpi.label}
                </div>
                <p className="text-xs text-text-secondary font-light leading-relaxed">
                  {kpi.context}
                </p>
              </div>
            ))}
          </div>

          {service.kpiDisclaimer && (
            <p className="text-[11px] text-text-muted italic border-t border-white/10 pt-4">
              * {service.kpiDisclaimer}
            </p>
          )}
        </div>
      </section>

      {/* 08. SERVICE FAQs (EXACTLY 4) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-gold-bright" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tight text-white">
            Common Questions About {service.title}
          </h2>
        </div>

        <div className="space-y-4">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-xl border transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "bg-surface-2 border-gold/50 shadow-lg shadow-gold/5"
                    : "bg-surface-2/60 border-white/10 hover:border-white/20"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center text-gold transition-transform duration-300 flex-shrink-0",
                      isOpen && "rotate-180 bg-gold text-black"
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-text-secondary leading-relaxed font-light border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 09. BOTTOM CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="rounded-3xl bg-surface-1 border border-gold/40 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="ambient-gold-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              TAKE THE NEXT STEP
            </span>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
              Ready to scale your business online?
            </h2>

            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Lock in your dedicated onboarding slot for <strong className="text-gold">₹999</strong>, or book a free growth consultation with our strategy team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded bg-gold-gradient text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-gold/25 hover:shadow-gold/45 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-gold-bright/60"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Book This Service — ₹999</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryModalOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded bg-surface-2 hover:bg-surface-3 border border-white/15 hover:border-gold/50 text-white hover:text-gold text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Book Free Growth Audit</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <a
                href={contactConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. EXPLORE MORE VANIX SERVICES */}
      {relatedServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                ECOSYSTEM EXPLORATION
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-white tracking-wide mt-1">
                Explore More VANIX Services
              </h3>
            </div>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-bright"
            >
              <span>View All 14 Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group rounded-xl p-5 bg-surface-2/70 border border-white/10 hover:border-gold/50 transition-all duration-300 card-depth flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-white/30 group-hover:text-gold transition-colors">
                      {rel.number}
                    </span>
                    <div className="w-7 h-7 rounded bg-surface-3 flex items-center justify-center text-gold">
                      {iconMap[rel.iconName] || <Globe className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-display font-bold text-sm uppercase text-white group-hover:text-gold-bright transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-text-secondary line-clamp-2 font-light">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gold">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold"
            >
              <span>View All 14 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Service Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={service.title}
      />

      {/* Service Booking Modal (₹999 Payment Flow) */}
      <ServiceBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={service}
      />
    </div>
  );
}
