import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ShieldCheck, Mail, Phone, MapPin, Calendar, Clock, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | VANIX Digital Growth Solutions",
  description:
    "Read the official Privacy Policy of VANIX. Learn how we collect, process, store, and protect your business inquiry and personal data in full compliance with data protection laws.",
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | VANIX Digital Growth Solutions",
    description:
      "Read the official Privacy Policy of VANIX. Learn how we collect, process, store, and protect your business inquiry and personal data in full compliance with data protection laws.",
    url: `${siteConfig.url}/privacy-policy`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "VANIX Privacy Policy" }],
  },
};

export default function PrivacyPolicyPage() {
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
        name: "Privacy Policy",
        item: `${siteConfig.url}/privacy-policy`,
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
              <span className="text-gold font-medium">Privacy Policy</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-bright" />
              <span>LEGAL & DATA PROTECTION</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white mb-4">
              Privacy <span className="text-gradient-gold">Policy</span>
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
                <Lock className="w-3.5 h-3.5 text-gold" />
                <span>256-Bit SSL/TLS Encryption</span>
              </span>
            </div>
          </div>

          {/* Policy Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-text-secondary leading-relaxed text-sm sm:text-base space-y-10">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">01.</span> Introduction
              </h2>
              <p>
                Welcome to <strong>VANIX</strong> (operated under <strong>{siteConfig.legalName}</strong>, hereinafter referred to as &quot;VANIX&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We respect the privacy of every individual and business representative who visits our website (<a href={siteConfig.url} className="text-gold hover:underline">{siteConfig.url}</a>) or engages with our digital growth, web development, SEO, and consulting services.
              </p>
              <p>
                This Privacy Policy outlines the types of personal and business information we collect, the lawful purposes for which we use it, how we store and safeguard that data, and your legal rights under applicable Indian data protection laws (including the Information Technology Act, 2000 and the Information Technology [Reasonable Security Practices and Procedures and Sensitive Personal Data or Information] Rules, 2011).
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">02.</span> Information We Collect
              </h2>
              <p>
                We only collect information that is strictly necessary to evaluate your business requirements, deliver our technical and marketing services, communicate project progress, and protect our systems against automated abuse. The information we collect includes:
              </p>
              <div className="space-y-3 pl-4 border-l-2 border-gold/30 my-4">
                <div>
                  <h3 className="text-white font-semibold text-sm">A. Information You Voluntarily Provide</h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1">
                    When you submit an inquiry form, book a strategy consultation session, or message us directly via WhatsApp or email, you may provide:
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-text-muted space-y-1 mt-1">
                    <li>Full Name and Contact Person Name</li>
                    <li>Business Name / Company Name</li>
                    <li>Telephone / Mobile Number / WhatsApp Number</li>
                    <li>Email Address</li>
                    <li>Industry Type and Business Category</li>
                    <li>Specific Services of Interest (e.g., Website Development, Local SEO, Paid Ads)</li>
                    <li>Project Details, Requirements, and Inquired Budget</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <h3 className="text-white font-semibold text-sm">B. Technical & Device Information (Automatically Logged)</h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1">
                    When you browse our platform or submit forms, our servers and security layers automatically log limited technical data for performance monitoring and spam prevention:
                  </p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-text-muted space-y-1 mt-1">
                    <li>Internet Protocol (IP) Address</li>
                    <li>Browser Type and Operating System</li>
                    <li>Referring URL and Source Page</li>
                    <li>Submission Timestamps</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-surface-2 border border-gold/30 text-xs text-text-secondary">
                <strong className="text-gold">Sensitive Data Notice:</strong> We do NOT collect or solicit sensitive personal data such as passwords, credit card numbers, biometric records, Aadhaar numbers, or health information through our public inquiry forms. Please do not submit confidential financial or identification records through general inquiry fields.
              </div>
            </section>

            {/* Lawful Purposes for Using Your Information */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">03.</span> How We Use Your Information
              </h2>
              <p>We use the collected information solely for legitimate business operations:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                <li>To evaluate, respond to, and process your service inquiries and quote requests.</li>
                <li>To schedule and deliver our 1-on-1 digital growth strategy consultations.</li>
                <li>To execute custom web development, e-commerce, SEO, and advertising services as per agreed scopes.</li>
                <li>To send transactional confirmations, billing invoices, and critical project updates via email or WhatsApp.</li>
                <li>To detect, prevent, and mitigate spam submissions, DDoS attempts, and fraudulent activity.</li>
                <li>To comply with applicable legal, accounting, and tax compliance obligations in India.</li>
              </ul>
              <p className="text-xs text-gold">
                We never sell, rent, monetize, or trade your personal or business contact details with third-party data brokers or marketing list aggregators.
              </p>
            </section>

            {/* Third-Party Service Providers */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">04.</span> Third-Party Service Providers
              </h2>
              <p>
                To provide a secure and reliable experience, VANIX utilizes select industry-standard cloud infrastructure providers who process data strictly on our behalf under confidentiality agreements:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                <li><strong>Supabase / PostgreSQL:</strong> Secure, encrypted cloud database storage used to store submitted contact inquiries and lead records.</li>
                <li><strong>Vercel / Cloud Hosting:</strong> High-performance serverless cloud infrastructure hosting our web application with global edge delivery and automated SSL/TLS certificate management.</li>
                <li><strong>Resend / Transactional Email:</strong> Automated transactional email dispatch used to deliver internal lead notifications and client confirmation receipts.</li>
                <li><strong>WhatsApp / Meta:</strong> When you click our direct WhatsApp links, communication takes place over Meta&apos;s end-to-end encrypted messaging platform subject to WhatsApp&apos;s terms of service.</li>
              </ul>
            </section>

            {/* Cookies & Tracking */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">05.</span> Cookies & Tracking Technologies
              </h2>
              <p>
                Our website utilizes standard technical session identifiers necessary for website functionality, security rate-limiting, and basic navigation state.
              </p>
              <p>
                We do NOT deploy invasive behavioral profiling trackers or sell your browsing history to third-party ad networks. You may configure your browser settings to block or disable cookies, though certain interactive features of the website may function with limited efficiency.
              </p>
            </section>

            {/* Data Storage & Security */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">06.</span> Data Storage, Retention & Security
              </h2>
              <p>
                We implement industry-standard technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                <li>All data in transit is encrypted using modern 256-bit TLS/SSL encryption.</li>
                <li>Database records in Supabase are protected behind strict Row Level Security (RLS) policies and authentication barriers.</li>
                <li>Inquiry forms feature automated rate limiting, IP sanity checks, and honeypot traps to prevent malicious bot submissions.</li>
              </ul>
              <p>
                We retain client inquiry and communication records only for as long as necessary to fulfill the commercial purposes outlined in this policy or to satisfy statutory accounting and tax retention periods.
              </p>
            </section>

            {/* User Rights */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">07.</span> Your Legal Rights
              </h2>
              <p>Under applicable Indian laws, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                <li><strong>Access:</strong> Request a summary of personal information we maintain regarding your inquiries.</li>
                <li><strong>Correction:</strong> Request the rectification of inaccurate or outdated contact information.</li>
                <li><strong>Deletion:</strong> Request the deletion of your inquiry records from our CRM database, subject to any legal retention requirements.</li>
                <li><strong>Opt-Out:</strong> Withdraw consent for ongoing direct commercial communications at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, please email our Grievance Officer at <a href={`mailto:${siteConfig.links.email}`} className="text-gold hover:underline">{siteConfig.links.email}</a> with the subject line &quot;Data Rights Request&quot;.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">08.</span> Children&apos;s Privacy
              </h2>
              <p>
                Our website and digital growth services are directed strictly toward business owners, commercial enterprises, and adults aged 18 years or older. We do not knowingly collect personal information from minors.
              </p>
            </section>

            {/* Policy Updates */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-3">
                <span className="text-gold font-mono text-lg">09.</span> Changes to This Privacy Policy
              </h2>
              <p>
                We may periodically update this Privacy Policy to reflect modifications in our operational practices, technical capabilities, or applicable statutory requirements. Any revisions will be published on this page with an updated &quot;Last Updated&quot; timestamp.
              </p>
            </section>

            {/* Grievance Officer Contact */}
            <section className="space-y-4 p-6 rounded-xl bg-surface-2 border border-white/10">
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>Grievance Officer & Contact Information</span>
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact our designated Grievance Officer:
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-text-secondary pt-2">
                <p><strong>Name:</strong> {siteConfig.founder.name}</p>
                <p><strong>Title:</strong> Founder & Lead Technologist</p>
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
