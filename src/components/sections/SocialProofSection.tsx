"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface ClientBrand {
  id: string;
  name: string;
  imageSrc: string;
  aspect?: string;
}

// ----------------------------------------------------------------------------
// Authentic Client Brands Extracted Strictly From Supplied Reference Asset
// ----------------------------------------------------------------------------

// Row 1 (14 Brands - Animated Left-to-Right)
const ROW_1_CLIENTS: ClientBrand[] = [
  { id: "sancus", name: "SANCUS", imageSrc: "/images/clients/sancus.png" },
  { id: "blackstone", name: "Blackstone Corporation Pvt. Ltd.", imageSrc: "/images/clients/blackstone.png" },
  { id: "archimedes", name: "Archimedes Green Energys (P) Ltd", imageSrc: "/images/clients/archimedes.png" },
  { id: "massimo", name: "MASSIMO", imageSrc: "/images/clients/massimo.png" },
  { id: "shankar-bhavan", name: "Shankar Bhavan The Business Hotel", imageSrc: "/images/clients/shankar-bhavan.png" },
  { id: "make-my-energy", name: "Make My Energy Stores", imageSrc: "/images/clients/make-my-energy-stores.png" },
  { id: "jay-maneknath", name: "Jay Maneknath", imageSrc: "/images/clients/jay-maneknath.png" },
  { id: "cream-n-frost", name: "Cream N Frost", imageSrc: "/images/clients/cream-n-frost.png" },
  { id: "prachi-organic", name: "Prachi Organic", imageSrc: "/images/clients/prachi-organic.png" },
  { id: "hbythree", name: "HbyTHREE Interactive Private Limited", imageSrc: "/images/clients/hbythree.png" },
  { id: "goodrich-interio", name: "Goodrich Interio", imageSrc: "/images/clients/goodrich-interio.png" },
  { id: "agrihita", name: "Agrihita", imageSrc: "/images/clients/agrihita.png" },
  { id: "loes", name: "LOES Real People Start Here", imageSrc: "/images/clients/loes.png" },
  { id: "aio-shop", name: "AIO shop all in one", imageSrc: "/images/clients/aio-shop.png" },
];

// Row 2 (14 Brands - Animated Right-to-Left)
const ROW_2_CLIENTS: ClientBrand[] = [
  { id: "aadhya-financial", name: "Aadhya Financial Consultancy", imageSrc: "/images/clients/aadhya-financial.png" },
  { id: "adken-engineers", name: "Adken Engineers", imageSrc: "/images/clients/adken-engineers.png" },
  { id: "jainam-fashion", name: "Jainam Fashion Touching the Soul", imageSrc: "/images/clients/jainam-fashion.png" },
  { id: "aarna-solutions", name: "Aarna Engineered Solutions", imageSrc: "/images/clients/aarna-solutions.png" },
  { id: "imperial-quartz", name: "Imperial Quartz May The Joy Be With You", imageSrc: "/images/clients/imperial-quartz.png" },
  { id: "hotel-dev", name: "Hotel Dev Redefining Hospitality", imageSrc: "/images/clients/hotel-dev.png" },
  { id: "metos", name: "Metos Eat Good", imageSrc: "/images/clients/metos.png" },
  { id: "dlesia", name: "Dlesia", imageSrc: "/images/clients/dlesia.png" },
  { id: "duston", name: "Duston", imageSrc: "/images/clients/duston.png" },
  { id: "birla-bigbasket", name: "Birla Bigbasket Shopping Reimagined", imageSrc: "/images/clients/birla-bigbasket.png" },
  { id: "exclusive-jewellery", name: "Exclusive A House of Artificial Jewellery", imageSrc: "/images/clients/exclusive-jewellery.png" },
  { id: "mozo-mica", name: "Mozo Mica Luxury Laminate", imageSrc: "/images/clients/mozo-mica.png" },
  { id: "sisnet", name: "Sisnet", imageSrc: "/images/clients/sisnet.png" },
  { id: "exotic-car-care", name: "Exotic Car Care Next Level Auto Detailing", imageSrc: "/images/clients/exotic-car-care.png" },
];

export function SocialProofSection() {
  // Seamless loop duplications
  const row1Items = [...ROW_1_CLIENTS, ...ROW_1_CLIENTS];
  const row2Items = [...ROW_2_CLIENTS, ...ROW_2_CLIENTS];

  return (
    <section
      id="clients"
      aria-label="Trusted By Growing Businesses"
      className="relative w-full bg-[#080808] overflow-hidden py-16 sm:py-24 select-none border-t border-b border-white/[0.06]"
    >
      {/* Delicate 1px Metallic-Gold Top Accent Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A45D]/40 to-transparent pointer-events-none" />

      {/* Atmospheric Soft Gold Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] pointer-events-none rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.12) 0%, rgba(200, 164, 93, 0.03) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================================================================== */}
        {/* Header Block */}
        {/* ================================================================== */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-10 sm:mb-14">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12110B] border border-[#C8A45D]/30 shadow-sm shadow-[#C8A45D]/10 mb-4 sm:mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C07B]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E5C07B]">
              TRUSTED BY GROWING BUSINESSES
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-display font-extrabold uppercase tracking-tight text-white leading-[1.15] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
            Growing With Businesses That Trust{" "}
            <span className="text-gradient-gold">VANIX</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-[#9E9E9E] leading-relaxed font-light max-w-2xl mb-6">
            Helping businesses strengthen their digital presence through websites, e-commerce, marketing and growth solutions.
          </p>

          {/* Verified 50+ Businesses Metric Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111111]/90 border border-[#C8A45D]/30 backdrop-blur-md shadow-md">
            <CheckCircle2 className="w-4 h-4 text-[#E5C07B]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              <span className="text-gradient-gold font-bold">50+</span> Businesses Worked With
            </span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* Two-Row Seamless Infinite Logo Marquees */}
        {/* ================================================================== */}
        <div className="relative w-full flex flex-col gap-4 sm:gap-6 my-4">
          {/* Subtle Left & Right Edge Fade Masks */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-36 z-20 pointer-events-none bg-gradient-to-r from-[#080808] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-36 z-20 pointer-events-none bg-gradient-to-l from-[#080808] to-transparent" />

          {/* ---------------------------------------------------------------- */}
          {/* ROW 1: Left-to-Right Continuous Glide */}
          {/* ---------------------------------------------------------------- */}
          <div className="overflow-hidden marquee-mask marquee-pause group">
            <div className="marquee-track animate-marquee-reverse flex items-center gap-4 sm:gap-6 py-1">
              {row1Items.map((brand, idx) => (
                <div
                  key={`row1-${brand.id}-${idx}`}
                  className="partner-logo-card flex-shrink-0 flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-[#0E0E0E]/90 border border-white/[0.08] hover:border-[#C8A45D]/40 backdrop-blur-sm min-w-[155px] sm:min-w-[190px] h-[64px] sm:h-[74px] cursor-default"
                  title={brand.name}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={brand.imageSrc}
                      alt={brand.name}
                      width={160}
                      height={60}
                      className="partner-logo-image object-contain max-h-[38px] sm:max-h-[46px] w-auto pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* ROW 2: Right-to-Left Continuous Glide */}
          {/* ---------------------------------------------------------------- */}
          <div className="overflow-hidden marquee-mask marquee-pause group">
            <div className="marquee-track animate-marquee flex items-center gap-4 sm:gap-6 py-1">
              {row2Items.map((brand, idx) => (
                <div
                  key={`row2-${brand.id}-${idx}`}
                  className="partner-logo-card flex-shrink-0 flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-[#0E0E0E]/90 border border-white/[0.08] hover:border-[#C8A45D]/40 backdrop-blur-sm min-w-[155px] sm:min-w-[190px] h-[64px] sm:h-[74px] cursor-default"
                  title={brand.name}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={brand.imageSrc}
                      alt={brand.name}
                      width={160}
                      height={60}
                      className="partner-logo-image object-contain max-h-[38px] sm:max-h-[46px] w-auto pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
