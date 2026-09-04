"use client";

import React from "react";
import { whyVanixPillars } from "@/config/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export function WhyVanixSection() {
  return (
    <section
      id="why-vanix"
      className="relative py-24 sm:py-32 bg-background overflow-hidden select-none border-b border-white/5"
    >
      {/* Ambient background glow */}
      <div className="ambient-gold-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="COMPETITIVE ADVANTAGE"
          title="BUILT FOR REAL"
          titleAccent="BUSINESS GROWTH."
          subtitle="Why traditional brands, manufacturers, distributors, and local businesses trust VANIX to power their complete digital operations."
          align="center"
          size="large"
        />

        {/* 8 Core Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {whyVanixPillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group relative p-6 rounded-xl bg-surface-2/80 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all duration-400 card-depth flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-sm text-gold bg-gold/10 px-2.5 py-1 rounded border border-gold/20">
                    {pillar.number}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
                </div>

                <h3 className="font-display font-bold text-base uppercase text-white tracking-wide group-hover:text-gold-bright transition-colors mb-2.5">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-surface-1 border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg uppercase text-white tracking-wider">
                Full-Stack Growth Accountability
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5 font-light">
                One dedicated team managing your technology, creative assets, ad campaigns, and listings.
              </p>
            </div>
          </div>

          <GoldButton href="#contact" size="md" variant="primary">
            SCHEDULE A GROWTH AUDIT
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
