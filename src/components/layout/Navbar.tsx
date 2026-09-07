"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { VanixLogo } from "@/components/ui/VanixLogo";
import { GoldButton } from "@/components/ui/GoldButton";
import { GrowthJourneyModal } from "@/components/ui/GrowthJourneyModal";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/60"
            : "bg-transparent py-5 sm:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <VanixLogo size="sm" showSubtitle={true} href="/" />

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-text-secondary hover:text-gold transition-colors duration-200 rounded-sm hover:bg-white/[0.04]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Desktop CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <GoldButton onClick={() => setIsJourneyModalOpen(true)} size="sm" variant="primary">
              START YOUR GROWTH
            </GoldButton>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold rounded"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-x-0 top-[60px] bg-background/95 backdrop-blur-2xl border-b border-gold/20 px-6 py-8 transition-all duration-300 shadow-2xl overflow-y-auto max-h-[85vh]",
            mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-4">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-widest text-text-secondary hover:text-gold py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-gold opacity-60" />
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <GoldButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsJourneyModalOpen(true);
                }}
                size="md"
                variant="primary"
                className="w-full text-center"
              >
                START YOUR GROWTH
              </GoldButton>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-center text-text-muted hover:text-gold py-2"
              >
                Or chat directly on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Growth Journey Interactive Modal */}
      <GrowthJourneyModal
        isOpen={isJourneyModalOpen}
        onClose={() => setIsJourneyModalOpen(false)}
      />
    </>
  );
}
