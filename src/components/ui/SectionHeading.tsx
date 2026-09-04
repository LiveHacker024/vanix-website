import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  size?: "default" | "large";
}

export function SectionHeading({
  tag,
  title,
  titleAccent,
  subtitle,
  align = "center",
  className,
  size = "default",
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-4xl mb-12 sm:mb-16", alignClasses[align], className)}>
      {tag && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          {tag}
        </div>
      )}

      <h2
        className={cn(
          "font-display font-bold uppercase tracking-tight text-white leading-[1.15]",
          size === "large"
            ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        )}
      >
        {title}{" "}
        {titleAccent && (
          <span className="text-gradient-gold block sm:inline">{titleAccent}</span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
