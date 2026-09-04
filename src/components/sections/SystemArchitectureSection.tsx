"use client";

import React from "react";
import Image from "next/image";
import { growthEngineNodes } from "@/config/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
import {
  Eye,
  TrendingUp,
  Users,
  CreditCard,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const nodeIcons: Record<string, React.ReactNode> = {
  Eye: <Eye className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export function SystemArchitectureSection() {
  return (
    <section
      id="growth-system"
      className="relative py-24 sm:py-32 bg-surface-1 border-b border-white/5 overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="ambient-gold-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="THE CORE ENGINE"
          title="THE VANIX DIGITAL"
          titleAccent="GROWTH SYSTEM."
          subtitle="Every component in your business feeds into a compounding growth flywheel. From first customer discovery to automated checkout and lifetime retention."
          align="center"
          size="large"
        />

        {/* Master System Visual Showcase (vanix-09.png) */}
        <div className="relative rounded-2xl overflow-hidden glass-panel-gold border border-gold/40 p-3 sm:p-4 mb-16 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(200,164,93,0.15)]">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-surface-3">
            <Image
              src="/images/vanix-09.png"
              alt="VANIX Master Digital Growth System 3D Architecture Diagram"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

            {/* In-diagram Overlay Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-gold/50 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
              <span>OFFICIAL SYSTEM ARCHITECTURE</span>
            </div>

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 max-w-xl">
              <h3 className="text-lg sm:text-2xl font-display font-bold uppercase text-white tracking-wide">
                Seamless Flow From Offline Store to Omnichannel Dominance
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 font-light hidden sm:block">
                Physical retail and manufacturing integrated with high-performance web systems, marketplace engines, and continuous data feedback loops.
              </p>
            </div>
          </div>
        </div>

        {/* 6-Step Visual Connecting Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          {growthEngineNodes.map((node, index) => (
            <div
              key={node.id}
              className="relative p-5 rounded-xl bg-surface-2/80 backdrop-blur-md border border-white/10 hover:border-gold/60 transition-all duration-300 card-depth flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-surface-3 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold/15 group-hover:border-gold/40 transition-colors">
                    {nodeIcons[node.icon] || <Sparkles className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-text-muted group-hover:text-gold transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-white group-hover:text-gold transition-colors">
                  {node.title}
                </h4>

                <span className="block text-[11px] font-semibold text-gold mt-0.5 mb-2">
                  {node.subtitle}
                </span>

                <p className="text-xs text-text-secondary font-light leading-relaxed">
                  {node.description}
                </p>
              </div>

              {/* Connecting arrow for larger screens */}
              {index < growthEngineNodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-surface-1 border border-gold/30 flex items-center justify-center text-gold text-[10px]">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <GoldButton href="#contact" size="md" variant="primary">
            INTEGRATE YOUR BUSINESS NOW
          </GoldButton>
          <GoldButton href="#process" size="md" variant="secondary" icon={false}>
            HOW IT WORKS →
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
