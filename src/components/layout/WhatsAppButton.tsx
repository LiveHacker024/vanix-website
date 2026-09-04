"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 200px
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="WhatsApp Contact"
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-500 select-none flex items-center gap-3",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      )}
    >
      {/* Floating Interactive Gold CTA */}
      <a
        href={siteConfig.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-surface-1/90 backdrop-blur-md border border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(200,164,93,0.25)] hover:border-gold hover:shadow-[0_10px_35px_rgba(200,164,93,0.4)] transition-all duration-300 hover:scale-105"
        aria-label="Chat with VANIX Growth Consultant on WhatsApp"
      >
        {/* Pulsing Status Dot */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>

        {/* WhatsApp Icon with Gold Accent */}
        <div className="w-6 h-6 flex items-center justify-center text-emerald-400 group-hover:text-gold transition-colors">
          <MessageCircle className="w-5 h-5 fill-emerald-400/20" />
        </div>

        {/* Text */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white group-hover:text-gold transition-colors">
            CHAT WITH VANIX
          </span>
          <span className="text-[9px] text-text-muted">Direct Strategy Call</span>
        </div>
      </a>
    </aside>
  );
}
