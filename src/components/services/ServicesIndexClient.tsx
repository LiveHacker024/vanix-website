"use client";

import React, { useState } from "react";
import Link from "next/link";
import { servicesData, ServiceItem } from "@/config/services";
import { ServiceInquiryModal } from "@/components/ui/ServiceInquiryModal";
import { ServiceBookingModal } from "@/components/ui/ServiceBookingModal";
import {
  Globe,
  ShoppingCart,
  Layers,
  Store,
  MapPin,
  Search,
  Share2,
  Target,
  Flame,
  MessageCircle,
  UserCheck,
  BarChart3,
  Compass,
  ShieldCheck,
  ArrowUpRight,
  Check,
  Sparkles,
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

const categories = [
  "All",
  "FOUNDATION",
  "VISIBILITY",
  "ACQUISITION",
  "OPERATIONS",
  "STRATEGY",
] as const;

export function ServicesIndexClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceModal, setSelectedServiceModal] = useState<string>("");
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem>(servicesData[0]);

  const filteredServices = servicesData.filter((service) =>
    selectedCategory === "All" ? true : service.category === selectedCategory
  );

  const handleOpenInquiry = (serviceTitle: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedServiceModal(serviceTitle);
    setInquiryModalOpen(true);
  };

  const handleOpenBooking = (service: ServiceItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedServiceForBooking(service);
    setBookingModalOpen(true);
  };

  return (
    <div className="relative pt-24 pb-24">
      {/* Ambient Glow */}
      <div className="ambient-gold-glow top-20 left-1/2 -translate-x-1/2 opacity-20" />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gold font-medium">Services</span>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span>INTEGRATED 14-PILLAR SUITE</span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Everything Your Business Needs{" "}
          <span className="text-gradient-gold block sm:inline">To Scale Online</span>
        </h1>

        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed font-light mb-12">
          VANIX delivers an interconnected growth ecosystem engineered specifically for traditional and offline businesses transitioning into dominant digital brands.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none",
                selectedCategory === cat
                  ? "bg-gold-gradient text-black font-bold shadow-lg shadow-gold/20"
                  : "bg-surface-2 text-text-secondary hover:text-white hover:bg-surface-3 border border-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 14 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative rounded-xl p-6 bg-surface-2/80 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all duration-300 card-depth flex flex-col justify-between"
            >
              <div>
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display font-black text-2xl text-white/20 group-hover:text-gold transition-colors duration-300">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-surface-3 border border-white/10 flex items-center justify-center text-gold group-hover:border-gold/50 group-hover:bg-gold/10 transition-colors">
                    {iconMap[service.iconName] || <Globe className="w-5 h-5" />}
                  </div>
                </div>

                {/* Badge */}
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-text-muted mb-2 border border-white/5">
                  {service.category}
                </span>

                {/* Title */}
                <h2 className="font-display font-bold text-lg uppercase text-white tracking-wide group-hover:text-gold-bright transition-colors mb-2.5">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  {service.deliverables.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-text-muted">
                      <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold group-hover:text-gold-bright">
                  <span>Explore Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleOpenBooking(service, e)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/40 px-2.5 py-1 rounded transition-colors"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Book ₹999</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleOpenInquiry(service.title, e)}
                    className="text-[11px] font-bold uppercase tracking-wider text-text-muted hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={selectedServiceModal}
      />

      {/* Service Booking Modal (₹999 Flow) */}
      <ServiceBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        service={selectedServiceForBooking}
      />
    </div>
  );
}
