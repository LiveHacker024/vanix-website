import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { teamMembers } from "@/config/team";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { GoldButton } from "@/components/ui/GoldButton";
import {
  Sparkles,
  Shield,
  Code2,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Search,
  Target,
  BarChart3,
  MapPin,
  Building2,
  Store,
  Factory,
  Truck,
  Stethoscope,
  Briefcase,
} from "lucide-react";
import { LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "About Us | VANIX Digital Growth Solutions",
  description:
    "Learn about VANIX, an independent digital growth and technology agency based in Shamli, UP. Meet founder Kunal Rajput and our core engineering team helping traditional businesses transition online.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About Us | VANIX Digital Growth Solutions",
    description:
      "Learn about VANIX, an independent digital growth and technology agency based in Shamli, UP. Meet founder Kunal Rajput and our core engineering team helping traditional businesses transition online.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "About VANIX" }],
  },
};

const whoWeServe = [
  {
    icon: <Store className="w-5 h-5 text-gold" />,
    title: "Retail & Boutique Stores",
    description: "Physical retail shops seeking localized customer footfall and direct online catalog ordering.",
  },
  {
    icon: <Factory className="w-5 h-5 text-gold" />,
    title: "Manufacturers & Factories",
    description: "Industrial producers requiring verified B2B inquiry pipelines across India and export markets.",
  },
  {
    icon: <Truck className="w-5 h-5 text-gold" />,
    title: "Wholesalers & Distributors",
    description: "Distribution networks establishing digital catalogs on IndiaMART and automated WhatsApp ordering.",
  },
  {
    icon: <Stethoscope className="w-5 h-5 text-gold" />,
    title: "Local Service Providers & Clinics",
    description: "Healthcare clinics, consultants, and local firms aiming to dominate Google Maps 3-Pack search.",
  },
  {
    icon: <Building2 className="w-5 h-5 text-gold" />,
    title: "Traditional Family Businesses",
    description: "Established brick-and-mortar operations ready to build modern, secure digital assets.",
  },
  {
    icon: <Briefcase className="w-5 h-5 text-gold" />,
    title: "D2C Brands & Creators",
    description: "Direct-to-consumer lifestyle and apparel labels launching high-converting online stores.",
  },
];

const pillars = [
  {
    number: "01",
    title: "Digital Foundation",
    description: "Custom-coded, mobile-first responsive websites and secure e-commerce storefronts built on Next.js.",
    icon: <Layers className="w-5 h-5 text-gold" />,
  },
  {
    number: "02",
    title: "Search & Discovery",
    description: "Google Business Profile optimization, local map pack dominance, and multi-marketplace onboarding.",
    icon: <Search className="w-5 h-5 text-gold" />,
  },
  {
    number: "03",
    title: "Targeted Acquisition",
    description: "High-intent Google Search ads, visual Meta campaigns, and direct Click-to-WhatsApp conversation funnels.",
    icon: <Target className="w-5 h-5 text-gold" />,
  },
  {
    number: "04",
    title: "Operations & Analytics",
    description: "Instant CRM lead alerts, transparent ROAS reporting dashboards, and ongoing technical support.",
    icon: <BarChart3 className="w-5 h-5 text-gold" />,
  },
];

export default function AboutPage() {
  const { founder, links } = siteConfig;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteConfig.url}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-background text-white selection:bg-gold selection:text-black overflow-x-hidden">
        <Navbar />

        {/* Hero Section */}
        <div className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/5">
          {/* Ambient Glow */}
          <div className="ambient-gold-glow top-20 left-1/2 -translate-x-1/2 opacity-25" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted mb-8">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gold font-medium">About</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
                <span>ABOUT VANIX</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight mb-6">
                Technical Rigor.{" "}
                <span className="text-gradient-gold block sm:inline">Commercial Impact.</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed font-light mb-8">
                VANIX is an independent digital growth partner and technology solutions agency headquartered in Shamli, Uttar Pradesh. We engineer custom digital architectures to help traditional, retail, wholesale, and offline businesses scale into dominant online brands.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <GoldButton href="/contact" size="md" variant="primary">
                  START YOUR GROWTH ROADMAP
                </GoldButton>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & What We Do */}
        <section className="py-20 sm:py-28 bg-surface-1 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
                  <Shield className="w-4 h-4" />
                  <span>OUR CORE MISSION</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-tight leading-snug">
                  Bridging the Gap Between Offline Legacy and Modern Digital Scalability
                </h2>

                <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                  Millions of exceptional businesses in India produce quality products, operate strong retail counters, and maintain deep industry knowledge. However, when potential buyers search on Google, browse social media, or explore e-commerce marketplaces, these traditional businesses are often absent or poorly represented.
                </p>

                <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                  VANIX exists to solve this fundamental gap. Rather than offering superficial marketing gimmicks, we deploy end-to-end digital infrastructure—custom-built web applications, verified local Google Maps dominance, targeted search ads, and automated WhatsApp conversion pipelines.
                </p>

                <div className="pt-2 flex items-center gap-3 text-xs text-text-muted">
                  <div className="flex items-center gap-1.5 text-white">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>Based in {siteConfig.location}</span>
                  </div>
                </div>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="p-6 rounded-xl bg-surface-2/80 border border-white/10 hover:border-gold/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display font-black text-xl text-white/20">
                          {pillar.number}
                        </span>
                        <div className="p-2 rounded-lg bg-surface-3 border border-white/10">
                          {pillar.icon}
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-base uppercase text-white mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed font-light">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who Our Services Are For */}
        <section className="py-20 sm:py-28 bg-background border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                <Building2 className="w-3.5 h-3.5 text-gold-bright" />
                <span>WHO WE SERVE</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase text-white tracking-tight mb-4">
                Engineered for Real Businesses
              </h2>
              <p className="text-sm sm:text-base text-text-secondary font-light">
                We partner with business owners across sectors who demand tangible inquiries, verified visibility, and measurable return on their digital investment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whoWeServe.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-surface-2/60 border border-white/10 hover:border-gold/40 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-surface-3 border border-white/10 w-fit mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-bold text-base uppercase text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder & Leadership Section */}
        <section className="py-20 sm:py-28 bg-surface-1 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Founder Image */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden glass-panel-gold border border-gold/40 p-2 shadow-2xl">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface-3">
                    <Image
                      src="/images/kunal-founder.jpeg"
                      alt={`${founder.name} — Founder & Lead Technologist at VANIX`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent pointer-events-none" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">
                        FOUNDER & LEAD TECHNOLOGIST
                      </span>
                      <h3 className="text-xl font-display font-bold uppercase text-white">
                        {founder.name}
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5">
                        {founder.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3 mt-4 w-full max-w-sm">
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs text-text-secondary hover:text-white transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-text-muted" />
                  </a>
                  <a
                    href={links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs text-text-secondary hover:text-white transition-colors"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
                    <span>{links.youtubeHandle}</span>
                    <ArrowUpRight className="w-3 h-3 text-text-muted" />
                  </a>
                </div>
              </div>

              {/* Founder Bio */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
                  <Code2 className="w-4 h-4" />
                  <span>FOUNDER LEADERSHIP</span>
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-tight leading-snug">
                  Engineering Systems with Technical Precision and Commercial Awareness
                </h2>

                <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                  {founder.bio}
                </p>

                <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
                  At VANIX, Kunal leads technical architecture and product security, ensuring that client platforms are not only visually impressive, but also secure, fast, and engineered to turn traffic into paying customers.
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3">
                    Technical Disciplines & Expertise
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {founder.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-surface-2 border border-white/5 text-xs text-text-secondary"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Team Section */}
        <section className="py-20 sm:py-28 bg-background border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                <Shield className="w-3.5 h-3.5 text-gold-bright" />
                <span>CORE ENGINEERING TEAM</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase text-white tracking-tight mb-4">
                The Specialists Powering VANIX
              </h2>
              <p className="text-sm sm:text-base text-text-secondary font-light">
                Our multidisciplinary team combines frontend engineering, systems architecture, and cybersecurity auditing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-6 sm:p-8 rounded-2xl bg-surface-2/80 border border-white/10 hover:border-gold/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-3 border border-gold/30 flex-shrink-0">
                        <Image
                          src={member.image}
                          alt={member.altText}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/10 border border-gold/30 inline-block mb-1">
                          {member.badge}
                        </span>
                        <h3 className="font-display font-bold text-lg text-white">
                          {member.name}
                        </h3>
                        <p className="text-xs text-text-muted">{member.role}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed mb-4">
                      {member.fullBio}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-white/5">
                      <h4 className="text-[11px] font-bold uppercase text-gold tracking-wider mb-2">
                        Core Competencies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded bg-white/5 text-[11px] text-text-secondary border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparent How to Contact CTA */}
        <section className="py-16 sm:py-24 bg-surface-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-display font-bold text-2xl sm:text-4xl uppercase text-white tracking-tight">
              Ready to Discuss Your Business Growth?
            </h2>
            <p className="text-sm sm:text-base text-text-secondary font-light max-w-2xl mx-auto leading-relaxed">
              We provide transparent assessments, actionable project roadmaps, and dedicated technical implementation. Reach out to schedule a consultation with our team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <GoldButton href="/contact" size="lg" variant="primary">
                SUBMIT A SERVICE INQUIRY
              </GoldButton>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-surface-2 hover:bg-surface-3 border border-gold/40 text-xs font-bold uppercase tracking-wider text-gold hover:text-white transition-colors"
              >
                <span>Direct WhatsApp Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
