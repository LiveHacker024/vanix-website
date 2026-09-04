"use client";

import React, { useEffect, useState } from "react";
import { VanixLogo } from "./VanixLogo";

export function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Quick, non-intrusive 600ms brand introduction
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setMounted(false), 500);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 pointer-events-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative flex flex-col items-center gap-6">
        <VanixLogo size="lg" showSubtitle={false} />
        
        {/* Sleek Gold Progress Bar */}
        <div className="w-32 h-[2px] bg-white/10 overflow-hidden relative rounded-full">
          <div className="absolute inset-y-0 left-0 bg-gold-gradient w-full animate-[shimmer_1.2s_infinite]" />
        </div>
        
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium">
          Digital Growth Partner
        </span>
      </div>
    </div>
  );
}
