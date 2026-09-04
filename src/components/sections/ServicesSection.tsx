"use client";

import React, { useState } from "react";
import Image from "next/image";
import { servicesData, ServiceItem } from "@/config/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
import { ServiceInquiryModal } from "@/components/ui/ServiceInquiryModal";
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

const categories = ["All", "Foundation", "Discovery", "Acquisition", "Operations", "Strategy"] as const;

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>("");

  const filteredServices = servicesData.filter((service) =>
    selectedCategory === "All" ? true : service.category === selectedCategory
  );

  const handleOpenInquiry = (serviceTitle: string) => {
    setSelectedServiceForModal(serviceTitle);
    setInquiryModalOpen(true);
  };

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 bg-background overflow-hidden select-none border-b border-white/5"
    >
      {/* Ambient background glow */}
      <div className="ambient-gold-glow top-1/3 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="INTEGRATED DIGITAL SERVICES"
          title="EVERYTHING YOUR BUSINESS NEEDS"
          titleAccent="TO GROW ONLINE."
          subtitle="VANIX does not offer disconnected tools. We deliver an integrated 14-pillar digital growth system engineered specifically for traditional and offline businesses."
          align="center"
          size="large"
        />

        {/* Category Filters */}
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

        {/* 14-Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-xl p-6 bg-surface-2/80 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all duration-400 card-depth flex flex-col justify-between"
            >
              {/* Top Row: Number & Icon */}
              <div>
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

                {/* Service Title */}
                <h3 className="font-display font-bold text-lg uppercase text-white tracking-wide group-hover:text-gold-bright transition-colors mb-2.5">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed mb-4">
                  {service.shortDescription}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-text-muted">
                      <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleOpenInquiry(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold group-hover:text-gold-bright focus:outline-none"
                >
                  <span>Inquire for business</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-secondary mb-4">
            Need a custom combination tailored to your industry?
          </p>
          <GoldButton href="#contact" size="md" variant="primary">
            REQUEST A CUSTOM GROWTH PROPOSAL
          </GoldButton>
        </div>
      </div>

      {/* Service Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={selectedServiceForModal}
      />
    </section>
  );
}
