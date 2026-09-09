import React from "react";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { GrowthJourneySection } from "@/components/sections/GrowthJourneySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SystemArchitectureSection } from "@/components/sections/SystemArchitectureSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhyVanixSection } from "@/components/sections/WhyVanixSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-gold selection:text-black overflow-x-hidden">
      {/* Lightweight Brand Preloader */}
      <Preloader />

      {/* Sticky Luxury Navbar */}
      <Navbar />

      {/* 01: Fullscreen Cinematic Hero (Animation 01) */}
      <HeroSection />

      {/* 01.5: Modern Ultra-Premium Social Proof / Trusted By Partner Marquee */}
      <SocialProofSection />

      {/* 02: Transformation Section (Offline to Online - Animation 02 + vanix-01.png) */}
      <TransformationSection />

      {/* 03: The 10-Stage Digital Growth Journey (Animations 03–12 + vanix-02 to vanix-08) */}
      <GrowthJourneySection />

      {/* 04: All 14 Official Integrated Services */}
      <ServicesSection />

      {/* 05: Master Growth System Architecture (vanix-09.png + 6 Connected Nodes) */}
      <SystemArchitectureSection />

      {/* 06: How VANIX Works 5-Phase Process Timeline */}
      <ProcessSection />

      {/* 07: About VANIX / Founder Section (founder.png) */}
      <FounderSection />

      {/* 07.5: VANIX Expert Team Section */}
      <TeamSection />

      {/* 08: Why VANIX (8 Differentiators) */}
      <WhyVanixSection />

      {/* 09: Final Cinematic Grand CTA (Animation 13) */}
      <FinalCTASection />

      {/* 10: Consultation Contact & Inquiry Form */}
      <ContactSection />

      {/* Luxury Footer */}
      <Footer />

      {/* Fixed WhatsApp Action Badge */}
      <WhatsAppButton />
    </main>
  );
}
