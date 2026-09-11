import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { FileText, Mail, Phone, MapPin, Calendar, Clock, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | VANIX Digital Growth Solutions",
  description:
    "Read the official Terms and Conditions governing the use of the VANIX website, digital consulting sessions, and growth services.",
  alternates: {
    canonical: `${siteConfig.url}/terms-and-conditions`,
  },
  openGraph: {
    title: "Terms & Conditions | VANIX Digital Growth Solutions",
    description:
      "Read the official Terms and Conditions governing the use of the VANIX website, digital consulting sessions, and growth services.",
    url: `${siteConfig.url}/terms-and-conditions`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "VANIX Terms and Conditions" }],
  },
};

export default function TermsAndConditionsPage() {
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
        name: "Terms & Conditions",
        item: `${siteConfig.url}/terms-and-conditions`,
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
              <span className="text-gold font-medium">Terms & Conditions</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <Scale className="w-3.5 h-3.5 text-gold-bright" />
              <span>TERMS OF SERVICE</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
              Terms & <span className="text-gradient-gold">Conditions</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted border-b border-white/10 pb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                <span>Effective Date: January 1, 2025</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>Last Updated: March 1, 2025</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-gold" />
                <span>Legally Binding Agreement</span>
              </span>
            </div>
          </div>

          {/* Terms Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-text-secondary leading-relaxed text-sm sm:text-base space-y-10">
            {/* 01. Agreement */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">01.</span> Acceptance of Terms
              </h2>
              <p>
                These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;Client&quot;, or &quot;You&quot;) and <strong>{siteConfig.legalName}</strong> (&quot;VANIX&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing, browsing, or using this website (<a href={siteConfig.url} className="text-gold hover:underline">{siteConfig.url}</a>), submitting an inquiry form, or booking a digital growth consultation, you expressly acknowledge that you have read, understood, and agreed to be bound by these Terms.
              </p>
              <p>
                If you do not agree with any part of these Terms, you must immediately discontinue using this website and refraining from submitting inquiries.
              </p>
            </section>

            {/* 02. Scope of Services */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">02.</span> Scope of Services & Inquiries
              </h2>
              <p>
                VANIX provides digital consulting, bespoke website development, e-commerce engineering, Google Business Profile local SEO, marketplace onboarding (Amazon, Meesho, IndiaMART), paid advertising campaign setup (Google Ads & Meta Ads), and WhatsApp conversion architecture.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                <li><strong>Informational Nature:</strong> Information presented on this website does not constitute a formal commercial contract or binding quotation until an official Scope of Work (SOW) or service agreement is executed between both parties.</li>
                <li><strong>Strategy Sessions (₹999):</strong> Strategy session bookings represent a dedicated consultation and business audit service. Strategy session fees are credited toward full-scope implementation packages if contracted within 30 calendar days.</li>
              </ul>
            </section>

            {/* 03. User Responsibilities */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">03.</span> User Responsibilities & Acceptable Use
              </h2>
              <p>When using this website or engaging with our team, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                <li>Provide accurate, current, and verifiable contact details and business requirements in all inquiry submissions.</li>
                <li>Refrain from submitting malicious code, automated scripts, unauthorized promotional spam, or fraudulent data through inquiry forms.</li>
                <li>Refrain from reverse-engineering, scraping, or copying website software, visual layouts, or proprietary copy without written permission.</li>
                <li>Maintain the confidentiality of any project credentials or access keys shared during technical development engagements.</li>
              </ul>
            </section>

            {/* 04. Intellectual Property */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">04.</span> Intellectual Property Rights
              </h2>
              <p>
                All content on this website—including but not limited to text copy, graphics, logos, icons, interface designs, video assets, software code, and brand trademarks—is the exclusive intellectual property of VANIX and is protected under Indian and international copyright and trademark laws.
              </p>
              <p>
                For custom client development projects, intellectual property rights and codebase ownership transfer to the client upon full receipt of contracted project payments as detailed in the applicable Scope of Work.
              </p>
            </section>

            {/* 05. Third-Party Platforms */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">05.</span> Third-Party Platforms & Services
              </h2>
              <p>
                Our services frequently integrate with or interface with third-party software and digital advertising platforms, including but not limited to Google (Google Ads, Google Business Profile), Meta (Facebook, Instagram, WhatsApp), Amazon India, Meesho, IndiaMART, and payment gateways (Razorpay, Cashfree).
              </p>
              <p>
                You acknowledge that these platforms are operated independently by third-party entities with their own terms of service, editorial policies, algorithmic updates, and ad auction pricing. VANIX is an independent agency and has no control over third-party platform policy enforcements, ad account disapprovals, or marketplace suspension decisions.
              </p>
            </section>

            {/* 06. Limitation of Liability */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">06.</span> Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, VANIX, its founder, employees, and contractors shall not be liable for any indirect, incidental, consequential, special, or punitive damages (including loss of profits, business interruption, loss of data, or reputation damage) arising out of or in connection with your use of this website, advertising campaigns, or digital systems.
              </p>
              <p>
                In no event shall our total aggregate liability exceed the total amount actually paid by you to VANIX for the specific service giving rise to the claim in the preceding three (3) months.
              </p>
            </section>

            {/* 07. Service Modifications */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">07.</span> Changes to Website & Terms
              </h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of this website or our service offerings at our sole discretion without prior notice. Any updates to these Terms will be effective immediately upon posting to this page.
              </p>
            </section>

            {/* 08. Governing Law & Jurisdiction */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">08.</span> Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the substantive laws of India.
              </p>
              <p>
                Any legal action, suit, or proceeding arising under or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Shamli / Muzaffarnagar, Uttar Pradesh, India</strong>.
              </p>
            </section>

            {/* Contact Box */}
            <section className="space-y-4 p-6 rounded-xl bg-surface-2 border border-white/10">
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>Contact for Legal Inquiries</span>
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                If you have questions regarding these Terms & Conditions, please contact us at:
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
