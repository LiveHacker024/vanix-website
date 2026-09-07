import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ServicesIndexClient } from "@/components/services/ServicesIndexClient";

export const metadata: Metadata = {
  title: "All 14 Integrated Digital Growth Services | VANIX",
  description:
    "Explore the complete 14-pillar digital growth system by VANIX. Custom websites, e-commerce, Google Maps SEO, marketplace scaling, WhatsApp commerce, and lead generation.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "All 14 Integrated Digital Growth Services | VANIX",
    description:
      "Explore the complete 14-pillar digital growth system by VANIX. Custom websites, e-commerce, Google Maps SEO, marketplace scaling, WhatsApp commerce, and lead generation.",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "VANIX 14-Pillar Digital Growth Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All 14 Integrated Digital Growth Services | VANIX",
    description:
      "Explore the complete 14-pillar digital growth system by VANIX. Custom websites, e-commerce, Google Maps SEO, marketplace scaling, WhatsApp commerce, and lead generation.",
    images: [siteConfig.ogImage],
  },
};

export default function ServicesIndexPage() {
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
        name: "Services",
        item: `${siteConfig.url}/services`,
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
        <ServicesIndexClient />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
