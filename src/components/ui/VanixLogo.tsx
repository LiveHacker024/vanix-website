import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  href = "/",
}: VanixLogoProps) {
  const sizeClasses = {
    sm: {
      image: "w-8 h-8",
      text: "text-lg tracking-wider",
      sub: "text-[8px] tracking-[0.25em]",
    },
    md: {
      image: "w-10 h-10",
      text: "text-2xl tracking-widest",
      sub: "text-[9px] tracking-[0.28em]",
    },
    lg: {
      image: "w-14 h-14",
      text: "text-3xl tracking-widest",
      sub: "text-[11px] tracking-[0.3em]",
    },
    xl: {
      image: "w-18 h-18",
      text: "text-4xl tracking-widest",
      sub: "text-xs tracking-[0.35em]",
    },
  };

  const currentSize = sizeClasses[size];

  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none group", className)}>
      {/* Official Metallic Gold & White VX Emblem */}
      <div className={cn("relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105 rounded-lg overflow-hidden border border-gold/30 shadow-[0_0_15px_rgba(200,164,93,0.25)]", currentSize.image)}>
        <Image
          src="/images/vanix-logo.png"
          alt="VANIX Logo"
          width={72}
          height={72}
          className="w-full h-full object-cover"
          priority
        />
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
