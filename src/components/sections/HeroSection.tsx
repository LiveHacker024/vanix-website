"use client";

import React, { useState } from "react";
import { videoManifest } from "@/config/videos";
import { GoldButton } from "@/components/ui/GoldButton";
import { GrowthJourneyModal } from "@/components/ui/GrowthJourneyModal";
import { ChevronDown, Sparkles } from "lucide-react";

export function HeroSection() {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Cinematic Fullscreen Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          src={videoManifest.hero.src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.03] transform transition-transform duration-1000"
        />

        {/* Multi-layered Vignette & Dark Overlay for crisp HTML text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/50 pointer-events-none" />
        <div className="cinematic-vignette" />
        <div className="ambient-gold-glow top-1/4 left-1/2 -translate-x-1/2 opacity-30" />
      </div>

      {/* Main Hero HTML Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center flex flex-col items-center select-none">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-1/80 backdrop-blur-md border border-gold/40 text-gold text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-6 shadow-lg shadow-gold/10">
          <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
          <span>DIGITAL GROWTH PARTNER</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display font-extrabold uppercase tracking-tight text-white leading-[1.08] text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 drop-shadow-2xl">
          YOUR BUSINESS IS <span className="text-text-muted">OFFLINE.</span>
          <br />
          YOUR CUSTOMERS ARE <span className="text-gradient-gold">ONLINE.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed font-light mb-10">
          VANIX turns traditional businesses into powerful digital growth engines through custom websites, e-commerce, multi-marketplace scale, local SEO, and automated conversion systems.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <GoldButton
            onClick={() => setIsJourneyModalOpen(true)}
            size="lg"
            variant="primary"
            className="w-full sm:w-auto shadow-2xl"
          >
            START YOUR GROWTH JOURNEY
          </GoldButton>
          <GoldButton href="#journey" size="lg" variant="secondary" className="w-full sm:w-auto" icon={false}>
            EXPLORE SERVICES
          </GoldButton>
        </div>

        {/* Growth Journey Interactive Modal */}
        <GrowthJourneyModal
          isOpen={isJourneyModalOpen}
          onClose={() => setIsJourneyModalOpen(false)}
        />

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-text-muted opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll To Explore</span>
          <a
            href="#transformation"
            aria-label="Scroll to Transformation section"
            className="p-1 text-gold animate-bounce focus:outline-none"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
