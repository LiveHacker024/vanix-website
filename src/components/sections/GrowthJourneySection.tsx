"use client";

import React, { useState } from "react";
import Image from "next/image";
import { growthJourneyStages, VideoStoryStage } from "@/config/videos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CinematicVideo } from "@/components/ui/CinematicVideo";
import { GoldButton } from "@/components/ui/GoldButton";
import { CheckCircle2, ChevronRight, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function GrowthJourneySection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage: VideoStoryStage = growthJourneyStages[activeStageIndex];

  return (
    <section
      id="journey"
      className="relative py-24 sm:py-32 bg-surface-1 border-t border-b border-white/5 overflow-hidden select-none"
    >
      {/* Ambient background glows */}
      <div className="ambient-gold-glow -top-40 right-0 opacity-15" />
      <div className="ambient-gold-glow -bottom-40 left-0 opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="THE 10-STAGE DIGITAL SYSTEM"
          title="THE DIGITAL GROWTH"
          titleAccent="JOURNEY."
          subtitle="A continuous, end-to-end digital transformation engine. Every stage connects seamlessly into the next, building compounding revenue velocity."
          align="center"
          size="large"
        />

        {/* Stage Timeline Navigation Tabs */}
        <div className="mt-8 mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max border-b border-white/10 pb-4">
            {growthJourneyStages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold",
                    isActive
                      ? "bg-gold-gradient text-black shadow-lg shadow-gold/20 font-bold scale-105"
                      : "bg-surface-2/80 text-text-secondary hover:text-white hover:bg-surface-3 border border-white/5"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                      isActive ? "bg-black text-gold font-bold" : "bg-white/10 text-white"
                    )}
                  >
                    {stage.stepNumber}
                  </span>
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Stage Showcase Theater */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-2/60 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Left / Top Column: Cinematic Animation Video (Animation 03–12) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-xl overflow-hidden glass-panel-gold border border-gold/30 shadow-2xl">
              <CinematicVideo
                key={activeStage.videoSrc}
                src={activeStage.videoSrc}
                aspectRatio="16/9"
                className="w-full h-full object-cover"
              />

              {/* Stage Badge Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/40 text-[11px] font-bold text-gold tracking-widest uppercase">
                  STAGE {activeStage.stepNumber}
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-1/90 backdrop-blur-md border border-white/10 text-[11px] font-medium text-text-secondary tracking-wider uppercase hidden sm:inline-block">
                  {activeStage.tag}
                </span>
              </div>
            </div>

            {/* Companion Photo Asset (if assigned) */}
            {activeStage.companionImage && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-surface-1/80 border border-white/10 rounded-xl p-3">
                <div className="sm:col-span-4 relative aspect-[16/10] rounded-lg overflow-hidden bg-surface-3">
                  <Image
                    src={activeStage.companionImage}
                    alt={activeStage.companionImageAlt || activeStage.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="sm:col-span-8 px-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                    Official Production Asset
                  </span>
                  <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                    {activeStage.companionImageAlt}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Strategic Narrative & Deliverables */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeStage.tag}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white tracking-tight leading-tight">
                {activeStage.headline}
              </h3>
              <p className="text-sm text-gold font-medium mt-2 leading-relaxed">
                {activeStage.subtitle}
              </p>
              <p className="text-sm text-text-secondary mt-3 leading-relaxed font-light">
                {activeStage.description}
              </p>
            </div>

            {/* Strategic Deliverables List */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Core System Deliverables:
              </span>
              {activeStage.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-text-secondary font-light">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Stage Navigation Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={activeStageIndex === 0}
                onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous Stage
              </button>

              {activeStageIndex < growthJourneyStages.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveStageIndex((prev) =>
                      Math.min(growthJourneyStages.length - 1, prev + 1)
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-surface-3 hover:bg-gold hover:text-black border border-gold/30 text-xs font-bold uppercase tracking-wider text-gold transition-all"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <GoldButton href="#services" size="sm" variant="primary">
                  EXPLORE ALL SERVICES
                </GoldButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
