import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { AlertTriangle, Mail, Phone, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer & Performance Transparency | VANIX",
  description:
    "Read the official Disclaimer of VANIX. Clear disclosures regarding digital marketing outcomes, search rankings, educational resources, and third-party platform independence.",
  alternates: {
    canonical: `${siteConfig.url}/disclaimer`,
  },
  openGraph: {
    title: "Disclaimer & Performance Transparency | VANIX",
    description:
      "Read the official Disclaimer of VANIX. Clear disclosures regarding digital marketing outcomes, search rankings, educational resources, and third-party platform independence.",
    url: `${siteConfig.url}/disclaimer`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "VANIX Disclaimer" }],
  },
};

export default function DisclaimerPage() {
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
        name: "Disclaimer",
        item: `${siteConfig.url}/disclaimer`,
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
          {/* Subtle Ambient Glow */}
          <div className="ambient-gold-glow top-20 left-1/2 -translate-x-1/2 opacity-20" />

          {/* Breadcrumbs */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gold font-medium">Disclaimer</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-gold-bright" />
              <span>TRANSPARENCY & DISCLOSURES</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
              Legal <span className="text-gradient-gold">Disclaimer</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted border-b border-white/10 pb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>Last Updated: March 1, 2025</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                <span>Full Operational Transparency</span>
              </span>
            </div>
          </div>

          {/* Disclaimer Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-text-secondary leading-relaxed text-sm sm:text-base space-y-10">
            {/* 01. Nature of Services */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">01.</span> Nature of Services
              </h2>
              <p>
                <strong>VANIX</strong> (operated under <strong>{siteConfig.legalName}</strong>) provides digital technology consulting, bespoke website development, e-commerce systems, search engine optimization (SEO), paid advertising management, and CRM workflow automation for businesses.
              </p>
              <p>
                All strategies, case studies, architectural blueprints, and recommendations provided on this website or in consultations are designed to help businesses transition from offline operations to scalable digital channels using established technical and marketing best practices.
              </p>
            </section>

            {/* 02. No Guarantee of Specific Financial Outcomes or Rankings */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">02.</span> No Guarantee of Specific Rankings, Leads, or Revenue
              </h2>
              <div className="p-4 rounded-lg bg-surface-2 border border-gold/40 text-sm">
                <strong className="text-white">Important Disclosure:</strong> Results in digital marketing, search engine optimization, and paid advertising depend on a wide spectrum of external factors that operate outside the control of any agency.
              </div>
              <p>
                These factors include but are not limited to: your product or service quality, market pricing competitiveness, consumer demand trends, local geographic density, competitor ad budgets, third-party search engine algorithm updates (such as Google Core updates), and ad auction volatility.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                <li><strong>No Guaranteed Rank #1:</strong> VANIX does not and cannot guarantee specific #1 keyword rankings on Google Search or the Google Maps Local 3-Pack.</li>
                <li><strong>No Guaranteed Revenue:</strong> We do not guarantee fixed sales revenue, return on investment percentages, or specific lead volumes.</li>
                <li><strong>Our Commitment:</strong> We guarantee adherence to ethical white-hat SEO practices, clean and secure codebase architecture, disciplined ad campaign testing, and transparent analytics reporting.</li>
              </ul>
            </section>

            {/* 03. Educational & Informational Content */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">03.</span> Educational Content & Case Studies
              </h2>
              <p>
                Articles, blog posts, video guides, and resource materials published on this website are provided strictly for general educational and informational purposes. While we strive to ensure that all information is accurate, up-to-date, and actionable, digital marketing technologies and platform policies change frequently.
              </p>
              <p>
                Content on this site should not be construed as legal, tax, accounting, or formal corporate financial advice. You should consult with qualified professional advisors regarding your specific business circumstances.
              </p>
            </section>

            {/* 04. Third-Party Platform Independence */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">04.</span> Third-Party Platform Independence & Trademarks
              </h2>
              <p>
                References to third-party platforms, trademarks, service marks, and trade names (including Google, Google Ads, Google Business Profile, Google Maps, Meta, Facebook, Instagram, WhatsApp, Amazon, Meesho, IndiaMART, Razorpay, Cashfree, Shiprocket, and YouTube) are for identification and descriptive purposes only.
              </p>
              <p>
                VANIX is an independent digital growth and engineering solutions agency. We are not affiliated with, sponsored by, authorized by, or endorsed by Google LLC, Meta Platforms Inc., Amazon.com Inc., Meesho Inc., IndiaMART InterMESH Ltd., or any of their parent companies or subsidiaries. All respective trademarks and logos remain the property of their respective trademark holders.
              </p>
            </section>

            {/* 05. External Links */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">05.</span> External Links & Outbound References
              </h2>
              <p>
                This website may contain links to external third-party websites or services (e.g., social media profiles, directory portals, or client websites). VANIX does not oversee, endorse, or assume responsibility for the content, privacy policies, or operational practices of any third-party websites.
              </p>
            </section>

            {/* Contact Box */}
            <section className="space-y-4 p-6 rounded-xl bg-surface-2 border border-white/10">
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>Contact for Clarifications</span>
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                If you have any questions or require clarification regarding any aspect of our disclosures and policies, please reach out to:
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-text-secondary pt-2">
                <p><strong>Entity:</strong> {siteConfig.legalName}</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span><strong>Address:</strong> {siteConfig.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span><strong>Email:</strong> <a href={`mailto:${siteConfig.links.email}`} className="text-gold hover:underline">{siteConfig.links.email}</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span><strong>Phone:</strong> <a href={`tel:${siteConfig.links.phoneRaw}`} className="text-gold hover:underline">{siteConfig.links.phone}</a></span>
                </div>
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
