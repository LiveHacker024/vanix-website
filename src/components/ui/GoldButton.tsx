"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  icon?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function GoldButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  icon = true,
  type = "button",
  disabled = false,
}: GoldButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-semibold tracking-wider",
    md: "px-6 py-3 text-xs sm:text-sm font-bold tracking-widest",
    lg: "px-8 py-4 text-sm sm:text-base font-bold tracking-widest",
  };

  const variantClasses = {
    primary:
      "bg-gold-gradient text-black font-extrabold uppercase shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98] border border-gold-bright/60",
    secondary:
      "bg-surface-2 text-white border border-white/15 hover:border-gold/60 hover:bg-surface-3 hover:text-gold uppercase tracking-wider",
    outline:
      "bg-transparent text-gold border border-gold/40 hover:bg-gold/10 hover:border-gold uppercase tracking-wider",
    ghost:
      "bg-transparent text-text-secondary hover:text-white hover:bg-white/5 uppercase tracking-wider",
  };

  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2.5 rounded-sm transition-all duration-300 font-sans cursor-pointer select-none overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 disabled:cursor-not-allowed",
    sizeClasses[size],
    variantClasses[variant],
    variant === "primary" && "animate-gold-shimmer",
    className
  );

  const innerContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {innerContent}
    </button>
  );
}
