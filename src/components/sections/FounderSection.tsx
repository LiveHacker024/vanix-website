"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";
import {
  Sparkles,
  Shield,
  Code2,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export function FounderSection() {
  const { founder, links } = siteConfig;

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-surface-1 border-b border-white/5 overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="ambient-gold-glow bottom-0 right-1/4 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="ABOUT THE FOUNDER"
          title="TECHNICAL RIGOR."
          titleAccent="COMMERCIAL IMPACT."
          subtitle="Digital growth systems backed by deep technical engineering, cybersecurity principles, and modern media strategy."
          align="center"
          size="large"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-12">
          {/* Left Column: Editorial Portrait (`founder.png`) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden glass-panel-gold border border-gold/40 p-2 shadow-2xl group">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface-3">
                <Image
                  src="/images/kunal-founder.jpeg"
                  alt={`${founder.name} — Founder & Technologist at ${siteConfig.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                    <Shield className="w-3.5 h-3.5 text-gold-bright" />
                    <span>FOUNDER & TECHNOLOGIST</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wide">
                    {founder.name}
                  </h4>
                  <p className="text-xs text-gold font-medium mt-0.5">
                    {founder.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Social Connect Buttons */}
            <div className="flex items-center gap-3 mt-4 w-full max-w-md">
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-white/10 hover:border-gold/50 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-white transition-all shadow-md"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-text-muted" />
              </a>

              <a
                href={links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-white/10 hover:border-gold/50 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-white transition-all shadow-md"
              >
                <YoutubeIcon className="w-4 h-4 text-[#FF0000]" />
                <span>{links.youtubeHandle}</span>
                <ArrowUpRight className="w-3 h-3 text-text-muted" />
              </a>
            </div>
          </div>

          {/* Right Column: Mission & Factual Background */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MEET KUNAL RAJPUT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white tracking-tight leading-tight">
                BRIDGING TECHNICAL EXPERTISE WITH DIGITAL BUSINESS GROWTH.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              {founder.bio}
            </p>

            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              At <strong className="text-white font-semibold">VANIX</strong>, Kunal applies rigorous technical fundamentals, secure web architectures, and high-performance digital strategies to help traditional businesses transition seamlessly into scalable online growth engines.
            </p>

            {/* Technical Expertise Matrix */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>Technical & Digital Expertise</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {founder.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-2/70 border border-white/5 text-xs text-text-secondary"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <GoldButton href="#contact" size="md" variant="primary">
                DISCUSS YOUR GROWTH ROADMAP
              </GoldButton>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-gold transition-colors"
              >
                Or message directly on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
