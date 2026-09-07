import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoldButton } from "@/components/ui/GoldButton";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";

export const metadata = {
  title: "Page Not Found | VANIX",
  description: "The requested page could not be located on VANIX Digital Growth Solutions.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-gold selection:text-black flex flex-col justify-between">
      <Navbar />

      <section className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32 sm:py-44 overflow-hidden select-none">
        {/* Ambient background glows */}
        <div className="ambient-gold-glow top-1/3 left-1/2 -translate-x-1/2 opacity-20" />
        <div className="cinematic-vignette" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-1/80 border border-gold/40 text-gold text-xs font-bold uppercase tracking-[0.25em] shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
            <span>ERROR 404</span>
          </div>

          <h1 className="font-display font-extrabold uppercase text-white tracking-tight text-4xl sm:text-5xl md:text-6xl leading-tight">
            PAGE NOT <span className="text-gradient-gold">FOUND.</span>
          </h1>

          <p className="text-sm sm:text-base text-text-secondary max-w-md mx-auto leading-relaxed font-light">
            The page or service you are searching for might have moved, been renamed, or does not exist.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoldButton href="/" size="md" variant="primary">
              RETURN HOME
            </GoldButton>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-surface-2 hover:bg-surface-3 border border-white/15 hover:border-gold/60 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:text-gold transition-all"
            >
              <Compass className="w-4 h-4 text-gold" />
              <span>EXPLORE ALL SERVICES</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
