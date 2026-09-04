"use client";

import React from "react";
import Image from "next/image";
import { videoManifest } from "@/config/videos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CinematicVideo } from "@/components/ui/CinematicVideo";
import { GoldButton } from "@/components/ui/GoldButton";
import { Store, Globe, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function TransformationSection() {
  return (
    <section
      id="transformation"
      className="relative py-24 sm:py-32 bg-background overflow-hidden select-none border-t border-white/5"
    >
      {/* Subtle Background Glow */}
      <div className="ambient-gold-glow top-1/2 left-0 -translate-y-1/2 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="THE DIGITAL SHIFT"
          title="FROM OFFLINE"
          titleAccent="TO ONLINE."
          subtitle="Your customers are already searching, comparing, and buying online every single day. VANIX builds the integrated digital system that puts your business directly in front of them."
          align="center"
          size="large"
        />

        {/* Cinematic Dual-Panel Transformation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          {/* Left Panel: Traditional Offline Physical Asset (vanix-01.png) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="group relative rounded-xl overflow-hidden glass-panel border border-white/10 p-2 shadow-2xl transition-all duration-500 hover:border-gold/50">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-2">
                <Image
                  src="/images/vanix-01.png"
                  alt="Traditional offline retail store and physical business front"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold tracking-wider text-text-secondary">
                  <Store className="w-3.5 h-3.5 text-gold" />
                  <span>Physical Storefront</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Limited By Physical Geography
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    Footfall relies solely on street passersby and localized word-of-mouth.
                  </p>
                </div>
              </div>
            </div>

            {/* Shift Indicators */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="p-3.5 rounded-lg bg-surface-1/60 border border-white/5 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">Brand Heritage</h5>
                  <p className="text-[11px] text-text-muted mt-0.5">Retain offline trust and business authenticity.</p>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-1/60 border border-white/5 flex items-start gap-3">
                <Zap className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">Instant Scale</h5>
                  <p className="text-[11px] text-text-muted mt-0.5">Unlock national reach 24 hours a day, 7 days a week.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Transition Flow Arrow */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
            <div className="w-12 h-12 rounded-full bg-surface-2 border border-gold/40 flex items-center justify-center text-gold shadow-lg shadow-gold/20 animate-pulse">
              <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold mt-2">
              TRANSFORMATION
            </span>
          </div>

          {/* Right Panel: Cinematic Digital Highway Animation (Animation 02) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-xl overflow-hidden glass-panel-gold p-2 shadow-2xl">
              <div className="relative rounded-lg overflow-hidden bg-surface-2">
                <CinematicVideo
                  src={videoManifest.transformation.src}
                  aspectRatio="16/9"
                  className="rounded-lg"
                  containerClassName="h-auto"
                />

                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/40 text-[11px] font-semibold tracking-wider text-gold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Digital Growth Highway</span>
                </div>
              </div>

              <div className="p-4 bg-surface-1/90 rounded-b-lg border-t border-white/5 mt-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Unlimited Digital Discovery
                </h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  VANIX deploys your custom web architecture, marketplace channels, and search engines so qualified buyers discover and purchase effortlessly.
                </p>
              </div>
            </div>

            <div className="mt-2 flex justify-end">
              <GoldButton href="#journey" size="sm" variant="outline">
                EXPLORE THE 10 GROWTH STAGES
              </GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
