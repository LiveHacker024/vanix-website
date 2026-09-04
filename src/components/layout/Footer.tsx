"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { VanixLogo } from "@/components/ui/VanixLogo";
import {
  ArrowUp,
  ArrowUpRight,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-surface-1 border-t border-white/10 pt-16 pb-12 overflow-hidden select-none">
      {/* Subtle Ambient Background Glow */}
      <div className="ambient-gold-glow bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Col 1 & 2: Brand Info & Verified Contact Details */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <VanixLogo size="md" showSubtitle={true} href="#hero" />

            <p className="text-sm text-text-secondary leading-relaxed max-w-sm font-light">
              VANIX transforms traditional and offline businesses into dominant digital growth engines through bespoke technology, marketplace scale, local search, and conversion systems.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-text-muted">
              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.links.phoneRaw}`}
                  className="hover:text-gold transition-colors font-medium text-text-secondary"
                >
                  {siteConfig.links.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="hover:text-gold transition-colors font-medium text-text-secondary"
                >
                  {siteConfig.links.email}
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary">{siteConfig.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs text-text-secondary hover:text-white transition-colors"
                aria-label="Kunal Rajput LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-text-muted" />
              </a>

              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs text-text-secondary hover:text-white transition-colors"
                aria-label="HackWithKunal YouTube Channel"
              >
                <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>{siteConfig.links.youtubeHandle}</span>
                <ArrowUpRight className="w-3 h-3 text-text-muted" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              {siteConfig.navItems.slice(0, 5).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Solutions */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold">
              Growth Engine
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-secondary">
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Custom Web Architecture
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  E-Commerce Systems
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Amazon & IndiaMART
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Google Maps 3-Pack SEO
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  WhatsApp Commerce Funnels
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Analytics & Scaling
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Action */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold">
              Direct Strategy
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Speak directly with our team regarding your digital expansion roadmap.
            </p>
            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-surface-2 hover:bg-surface-3 border border-gold/40 text-xs font-bold uppercase tracking-wider text-gold hover:text-white transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 text-gold" />
              <span>CHAT WITH VANIX</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {currentYear} {siteConfig.legalName}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-text-muted hover:text-gold transition-colors focus:outline-none"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-gold" />
          </button>
        </div>
      </div>
    </footer>
  );
}
