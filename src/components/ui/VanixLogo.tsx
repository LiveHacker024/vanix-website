import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface VanixLogoProps {
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
}

export function VanixLogo({
  className,
  showSubtitle = true,
  subtitleText = "DIGITAL GROWTH PARTNER",
  size = "md",
  href = "#hero",
}: VanixLogoProps) {
  const sizeClasses = {
    sm: {
      icon: "w-7 h-7",
      text: "text-lg tracking-wider",
      sub: "text-[8px] tracking-[0.25em]",
    },
    md: {
      icon: "w-9 h-9",
      text: "text-2xl tracking-widest",
      sub: "text-[9px] tracking-[0.28em]",
    },
    lg: {
      icon: "w-12 h-12",
      text: "text-3xl tracking-widest",
      sub: "text-[11px] tracking-[0.3em]",
    },
    xl: {
      icon: "w-16 h-16",
      text: "text-4xl tracking-widest",
      sub: "text-xs tracking-[0.35em]",
    },
  };

  const currentSize = sizeClasses[size];

  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none group", className)}>
      {/* Precision Geometric Gold V Emblem */}
      <div className={cn("relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105", currentSize.icon)}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_10px_rgba(200,164,93,0.35)]"
        >
          <defs>
            <linearGradient id="vanixGoldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#E3C47A" />
              <stop offset="65%" stopColor="#C8A45D" />
              <stop offset="100%" stopColor="#8E6A26" />
            </linearGradient>
            <linearGradient id="vanixGoldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D1" />
              <stop offset="40%" stopColor="#D4AF69" />
              <stop offset="100%" stopColor="#7A5618" />
            </linearGradient>
            <linearGradient id="vanixGoldGradInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E3C47A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C8A45D" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Outer Layered Left Wing */}
          <path
            d="M 12 18 L 32 18 L 50 78 L 38 78 Z"
            fill="url(#vanixGoldGrad1)"
          />

          {/* Inner Layered Left Wing */}
          <path
            d="M 28 18 L 42 18 L 50 56 L 42 56 Z"
            fill="url(#vanixGoldGradInner)"
            opacity="0.9"
          />

          {/* Outer Layered Right Wing */}
          <path
            d="M 88 18 L 68 18 L 50 78 L 62 78 Z"
            fill="url(#vanixGoldGrad2)"
          />

          {/* Inner Layered Right Wing */}
          <path
            d="M 72 18 L 58 18 L 50 56 L 58 56 Z"
            fill="url(#vanixGoldGradInner)"
            opacity="0.9"
          />

          {/* Apex Facet Accent */}
          <polygon
            points="50,78 44,78 50,92 56,78"
            fill="url(#vanixGoldGrad1)"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={cn(
            "font-display font-extrabold uppercase leading-none text-white tracking-widest transition-colors duration-300 group-hover:text-gold-bright",
            currentSize.text
          )}
        >
          VANIX
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "font-sans font-semibold uppercase text-gold leading-tight mt-1 opacity-90",
              currentSize.sub
            )}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
        {content}
      </Link>
    );
  }

  return content;
}
