"use client";

import React, { useState } from "react";
import { videoManifest } from "@/config/videos";
import { siteConfig } from "@/config/site";
import { VanixLogo } from "@/components/ui/VanixLogo";
import { GoldButton } from "@/components/ui/GoldButton";
import { CinematicVideo } from "@/components/ui/CinematicVideo";
import { GrowthJourneyModal } from "@/components/ui/GrowthJourneyModal";
import { MessageCircle, Sparkles } from "lucide-react";

export function FinalCTASection() {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);

  return (
    <section
      id="final-cta"
      className="relative py-28 sm:py-36 bg-background overflow-hidden select-none border-b border-white/5"
    >
      {/* Background Cinematic Video Stage (Animation 13) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-gold/40 p-3 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(200,164,93,0.2)]">
          {/* Background Video (Animation 13) */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-surface-3">
            <CinematicVideo
              src={videoManifest.cta.src}
              aspectRatio="full"
              className="w-full h-full object-cover"
              containerClassName="h-full w-full absolute inset-0"
            />

            {/* Dark gradient mask allowing video center/logo to shine while keeping text super readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40 pointer-events-none" />
            <div className="cinematic-vignette" />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 sm:p-12 max-w-4xl mx-auto">
              {/* Top Clean Brand Emblem */}
              <div className="mb-6">
                <VanixLogo size="lg" showSubtitle={false} />
              </div>

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold uppercase tracking-[0.25em] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
                <span>THE NEXT EVOLUTION</span>
              </div>

              {/* Main Headline */}
              <h2 className="font-display font-extrabold uppercase text-white tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4 drop-shadow-2xl">
                FROM OFFLINE BUSINESS
                <br />
                <span className="text-gradient-gold">TO ONLINE GROWTH.</span>
              </h2>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base md:text-lg text-text-secondary font-light max-w-xl mb-8 leading-relaxed">
                LET'S BUILD YOUR DIGITAL GROWTH ENGINE. Partner with VANIX to scale your reach, leads, and revenue.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <GoldButton
                  onClick={() => setIsJourneyModalOpen(true)}
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto shadow-2xl"
                >
                  LET&apos;S GROW YOUR BUSINESS
                </GoldButton>
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-surface-2 hover:bg-surface-3 border border-gold/40 text-xs sm:text-sm font-bold uppercase tracking-widest text-gold hover:text-white transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  <span>TALK TO VANIX</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Journey Interactive Modal */}
      <GrowthJourneyModal
        isOpen={isJourneyModalOpen}
        onClose={() => setIsJourneyModalOpen(false)}
      />
    </section>
  );
}
