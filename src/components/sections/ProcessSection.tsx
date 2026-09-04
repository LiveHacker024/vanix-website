"use client";

import React from "react";
import { processSteps } from "@/config/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 bg-background overflow-hidden select-none border-b border-white/5"
    >
      {/* Ambient background glow */}
      <div className="ambient-gold-glow top-1/4 right-0 opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="STRUCTURED EXECUTION"
          title="HOW VANIX"
          titleAccent="WORKS."
          subtitle="A clear, battle-tested 5-step implementation framework designed to transition your offline business into a high-growth digital engine with zero guesswork."
          align="center"
          size="large"
        />

        {/* Process Steps Timeline */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              className="group relative p-6 sm:p-8 rounded-2xl bg-surface-2/70 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all duration-400 card-depth"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Step Number & Phase */}
                <div className="md:col-span-4 flex flex-col justify-start">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display font-black text-3xl sm:text-4xl text-gradient-gold">
                      {step.step}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-gold/10 border border-gold/30 text-[10px] font-bold uppercase tracking-widest text-gold">
                      PHASE 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl uppercase text-white tracking-wide group-hover:text-gold-bright transition-colors">
                    {step.title}
                  </h3>
                </div>

                {/* Description & Deliverables */}
                <div className="md:col-span-8 flex flex-col gap-4">
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/5">
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-16 text-center">
          <GoldButton href="#contact" size="lg" variant="primary">
            GET YOUR 5-PHASE GROWTH ROADMAP
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
