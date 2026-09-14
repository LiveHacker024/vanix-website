"use client";

import React, { useState } from "react";
import { googleTrustData } from "@/data/google-review";
import { siteConfig } from "@/config/site";
import { GoldButton } from "@/components/ui/GoldButton";
import { GrowthJourneyModal } from "@/components/ui/GrowthJourneyModal";
import {
  Star,
  ExternalLink,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Quote,
  ShieldCheck,
  Building2,
  Users,
  Compass,
} from "lucide-react";

export function GoogleTrustSection() {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);

  const starArray = Array.from({ length: 5 });

  const principleIcons = [
    <Building2 key="p1" className="w-5 h-5 text-gold" />,
    <CheckCircle2 key="p2" className="w-5 h-5 text-emerald-400" />,
    <Compass key="p3" className="w-5 h-5 text-gold" />,
    <Users key="p4" className="w-5 h-5 text-gold" />,
  ];

  return (
    <section
      id="google-trust"
      className="relative py-24 sm:py-32 bg-background overflow-hidden select-none border-b border-white/5"
    >
      {/* Subtle Ambient Gold Glow */}
      <div className="ambient-gold-glow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-2/90 border border-gold/40 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-lg">
            {/* Google G icon svg */}
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#E3C47A"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#D4AF69"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#C8A45D"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#E3C47A"
              />
            </svg>
            <span>{googleTrustData.eyebrow}</span>
          </div>

          {/* Heading */}
          <h2 className="font-display font-extrabold uppercase tracking-tight text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
            {googleTrustData.heading}{" "}
            <span className="text-gradient-gold block sm:inline">
              {googleTrustData.headingAccent}
            </span>
          </h2>

          {/* Subheading */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-text-secondary font-light max-w-xl leading-relaxed">
            {googleTrustData.subheading}
          </p>
        </div>

        {/* Top Trust & Review Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14 sm:mb-18">
          {/* Card 1: Google Trust Summary Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl glass-panel-gold border border-gold/30 p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(200,164,93,0.12)] card-depth">
            {/* Ambient inner soft highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Card Header with Google Logo & Verified Tag */}
              <div className="flex items-center justify-between gap-3 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-2 border border-gold/30 flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                      {googleTrustData.businessName}
                    </h3>
                    <p className="text-xs text-text-muted">
                      {googleTrustData.googleProfileLabel}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Rating Big Numbers & Stars */}
              <div className="py-6 sm:py-8">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                    {googleTrustData.rating.toFixed(1)}
                  </span>
                  <span className="text-lg sm:text-xl text-text-muted font-medium">
                    / {googleTrustData.maxRating}
                  </span>
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-1.5 mb-3">
                  {starArray.map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 fill-gold-bright text-gold-bright drop-shadow-[0_0_8px_rgba(227,196,122,0.4)]"
                    />
                  ))}
                </div>

                {/* Genuine Review Count */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary font-light">
                  <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>
                    <strong className="text-white font-semibold">
                      {googleTrustData.reviewCount} Genuine Review
                    </strong>{" "}
                    on Official Google Business Profile
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Trust CTA: Read Reviews on Google */}
            <div className="pt-4 border-t border-white/10">
              <a
                href={googleTrustData.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-gold-gradient text-black font-extrabold uppercase text-xs sm:text-sm tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-gold/40"
              >
                <span>READ REVIEWS ON GOOGLE</span>
                <ExternalLink className="w-4 h-4 text-black flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Card 2: Real Google Review Card & Review CTA (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-surface-2/80 backdrop-blur-md border border-white/10 p-6 sm:p-8 relative shadow-xl hover:border-gold/40 transition-all duration-400 card-depth">
            <div>
              {/* Card Sub-header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Quote className="w-6 h-6 text-gold/60" />
                  <span className="text-xs uppercase font-bold tracking-widest text-gold">
                    AUTHENTIC GOOGLE FEEDBACK
                  </span>
                </div>

                {/* Star Row */}
                <div className="flex items-center gap-1">
                  {starArray.map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="relative py-4 mb-6 bg-black/40 rounded-xl p-5 sm:p-6 border border-white/5">
                <p className="text-base sm:text-lg text-white font-normal italic leading-relaxed">
                  &ldquo;{googleTrustData.featuredReview.text}&rdquo;
                </p>

                {/* Reviewer Meta & Action */}
                <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-bold text-xs text-gold">
                      G
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white tracking-wide">
                        {googleTrustData.featuredReview.reviewerName}
                      </p>
                      <p className="text-xs text-text-muted">
                        {googleTrustData.featuredReview.publishedAt}
                      </p>
                    </div>
                  </div>

                  <a
                    href={googleTrustData.featuredReview.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-bright uppercase tracking-wider transition-colors self-start sm:self-auto"
                  >
                    <span>VIEW ON GOOGLE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Review Invitation Sub-section */}
            <div className="p-5 rounded-xl bg-surface-1/90 border border-gold/25 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
              <div className="text-center sm:text-left">
                <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-white tracking-wider">
                  HAD AN EXPERIENCE WITH VANIX?
                </h4>
                <p className="text-xs text-text-secondary mt-0.5 font-light">
                  Your genuine feedback helps businesses discover VANIX.
                </p>
              </div>

              <a
                href={googleTrustData.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-surface-2 hover:bg-surface-3 border border-gold/40 text-xs font-bold uppercase tracking-wider text-gold hover:text-white transition-all shadow-md"
              >
                <span>LEAVE A GOOGLE REVIEW</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>
          </div>
        </div>

        {/* Truthful Trust Signals Row (4 Principles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-18">
          {googleTrustData.trustPrinciples.map((principle, index) => (
            <div
              key={principle.id}
              className="p-5 rounded-xl bg-surface-2/60 backdrop-blur-sm border border-white/10 hover:border-gold/40 transition-all duration-300 flex items-start gap-3.5 card-depth"
            >
              <div className="p-2 rounded-lg bg-surface-1 border border-white/10 flex-shrink-0 mt-0.5">
                {principleIcons[index]}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm uppercase text-white tracking-wide">
                  {principle.text}
                </h4>
                <p className="text-xs text-text-secondary mt-1 font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Confidence Block */}
        <div className="rounded-2xl bg-gradient-to-r from-surface-2 via-surface-1 to-surface-2 border border-gold/35 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(200,164,93,0.12)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
                <span>CUSTOMER CONFIDENCE</span>
              </div>
              <h3 className="font-display font-extrabold uppercase text-white tracking-tight text-xl sm:text-2xl md:text-3xl leading-snug">
                READY TO GROW YOUR BUSINESS?
              </h3>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-text-secondary font-light leading-relaxed">
                VANIX helps businesses build their online presence, attract customers and create a structured digital growth system.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto flex-shrink-0">
              <GoldButton
                onClick={() => setIsJourneyModalOpen(true)}
                size="md"
                variant="primary"
                className="w-full sm:w-auto shadow-xl"
              >
                START YOUR GROWTH JOURNEY
              </GoldButton>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-surface-2 hover:bg-surface-3 border border-gold/40 text-xs sm:text-sm font-bold uppercase tracking-wider text-gold hover:text-white transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>DISCUSS ON WHATSAPP</span>
              </a>
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
