import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services";
import { blogPostsData } from "@/config/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import {
  Compass,
  ArrowUpRight,
  Sparkles,
  Layers,
  BookOpen,
  ShieldCheck,
  Globe,
  FileCode2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Website Sitemap | VANIX Digital Growth Solutions",
  description:
    "Explore the complete HTML sitemap for VANIX. Browse all core pages, 14 integrated digital growth services, 10 educational blog guides, and legal policies.",
  alternates: {
    canonical: `${siteConfig.url}/sitemap`,
  },
  openGraph: {
    title: "Website Sitemap | VANIX Digital Growth Solutions",
    description:
      "Explore the complete HTML sitemap for VANIX. Browse all core pages, 14 integrated digital growth services, 10 educational blog guides, and legal policies.",
    url: `${siteConfig.url}/sitemap`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "VANIX Sitemap" }],
  },
};

const mainPages = [
  { title: "Home Page", href: "/", description: "Full digital growth engine presentation, client proof, and systems architecture." },
  { title: "About VANIX", href: "/about", description: "Company mission, founder background (Kunal Rajput), and technical team." },
  { title: "All Services (14-Pillar Suite)", href: "/services", description: "Overview of all 14 integrated digital transformation and marketing services." },
  { title: "Blog & Resource Guides", href: "/blog", description: "10 in-depth educational articles on local SEO, websites, Google Ads, and e-commerce." },
  { title: "Frequently Asked Questions (FAQ)", href: "/faq", description: "Answers to common questions regarding our process, tech stack, and pricing." },
  { title: "Contact & Strategy Inquiry", href: "/contact", description: "Direct inquiry form, WhatsApp connection, and business consultation booking." },
];

const legalPages = [
  { title: "Privacy Policy", href: "/privacy-policy", description: "Data collection transparency, Supabase storage security, and legal privacy rights." },
  { title: "Terms & Conditions", href: "/terms-and-conditions", description: "Website usage terms, intellectual property, and service agreements." },
  { title: "Disclaimer & Disclosures", href: "/disclaimer", description: "Performance transparency, search ranking disclosures, and platform independence." },
];

export default function SitemapPage() {
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
        name: "Sitemap",
        item: `${siteConfig.url}/sitemap`,
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

        <div className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
          {/* Ambient Glow */}
          <div className="ambient-gold-glow top-20 left-1/2 -translate-x-1/2 opacity-20" />

          {/* Breadcrumbs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gold font-medium">Sitemap</span>
            </nav>
          </div>

          {/* Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5 text-gold-bright" />
              <span>NAVIGATION DIRECTORY</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
              Website <span className="text-gradient-gold">Sitemap</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-text-secondary leading-relaxed font-light mb-6">
              A comprehensive index of all public web pages, service breakdown portals, educational resources, and legal policies on the VANIX platform.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-2 border border-white/10 text-xs text-text-muted">
              <FileCode2 className="w-4 h-4 text-gold" />
              <span>Looking for machine crawlers? Access our technical XML sitemap at: </span>
              <a href="/sitemap.xml" target="_blank" className="text-gold hover:underline font-mono font-medium">
                /sitemap.xml
              </a>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* 1. Core Website Pages */}
            <section className="space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <Globe className="w-5 h-5 text-gold" />
                <h2 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                  Core Website Pages
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="p-5 rounded-xl bg-surface-2/70 border border-white/10 hover:border-gold/50 transition-all card-depth group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-bold text-base uppercase text-white group-hover:text-gold transition-colors">
                          {page.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors" />
                      </div>
                      <p className="text-xs text-text-secondary font-light leading-relaxed">
                        {page.description}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-gold/80 mt-4 block">
                      {page.href}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* 2. All 14 Digital Growth Services */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-gold" />
                  <h2 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                    Integrated 14-Pillar Services Suite
                  </h2>
                </div>
                <Link href="/services" className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline">
                  View All Overview →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicesData.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="p-4 rounded-xl bg-surface-2/50 border border-white/5 hover:border-gold/40 transition-colors group flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-gold font-bold">{service.number}</span>
                        <span className="text-[10px] uppercase font-bold text-text-muted px-2 py-0.5 rounded bg-white/5">
                          {service.category}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-sm text-white group-hover:text-gold-bright transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-text-secondary font-light mt-1 line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-gold flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </section>

            {/* 3. 10 Educational Blog & Resource Guides */}
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <h2 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                    Educational Blog & Resource Guides
                  </h2>
                </div>
                <Link href="/blog" className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline">
                  Browse All Articles →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPostsData.map((post, idx) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="p-5 rounded-xl bg-surface-2/60 border border-white/10 hover:border-gold/40 transition-colors group flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-text-muted">
                        <span className="text-gold font-bold font-mono">0{idx + 1}</span>
                        <span>•</span>
                        <span className="uppercase tracking-wider font-semibold text-text-secondary">{post.category}</span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-gold transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-text-secondary font-light line-clamp-2">
                        {post.summary}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-gold flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </section>

            {/* 4. Legal & Compliance Pages */}
            <section className="space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <ShieldCheck className="w-5 h-5 text-gold" />
                <h2 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                  Legal, Trust & Compliance Policies
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {legalPages.map((legal) => (
                  <Link
                    key={legal.href}
                    href={legal.href}
                    className="p-5 rounded-xl bg-surface-2/70 border border-white/10 hover:border-gold/50 transition-all card-depth group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-bold text-base uppercase text-white group-hover:text-gold transition-colors">
                          {legal.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors" />
                      </div>
                      <p className="text-xs text-text-secondary font-light leading-relaxed">
                        {legal.description}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-gold/80 mt-4 block">
                      {legal.href}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
