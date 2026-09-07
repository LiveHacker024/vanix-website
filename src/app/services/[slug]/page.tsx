import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  servicesData,
  getServiceBySlug,
  getAllServiceSlugs,
  ServiceItem,
} from "@/config/services";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ServicePageClient } from "@/components/services/ServicePageClient";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | VANIX",
      description: "The requested service detail page could not be found.",
    };
  }

  const canonicalUrl = `${siteConfig.url}/services/${service.slug}`;
  const ogImageUrl = service.accentImage
    ? `${siteConfig.url}${service.accentImage}`
    : siteConfig.ogImage;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${service.title} - VANIX Growth Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Find related services for internal linking
  const relatedServices: ServiceItem[] = (service.relatedSlugs || [])
    .map((relSlug) => getServiceBySlug(relSlug))
    .filter((s): s is ServiceItem => s !== undefined)
    .slice(0, 4);

  // If less than 3 related services, fill with adjacent services
  if (relatedServices.length < 3) {
    const others = servicesData.filter((s) => s.slug !== service.slug);
    for (const other of others) {
      if (!relatedServices.some((r) => r.slug === other.slug)) {
        relatedServices.push(other);
      }
      if (relatedServices.length >= 4) break;
    }
  }

  const canonicalUrl = `${siteConfig.url}/services/${service.slug}`;

  // 1. Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      telephone: siteConfig.links.phone,
      email: siteConfig.links.email,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: service.category,
    url: canonicalUrl,
  };

  // 2. BreadcrumbList Schema
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
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: canonicalUrl,
      },
    ],
  };

  // 3. FAQPage Schema (Strictly synchronized with visible rendered FAQs)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-background text-white selection:bg-gold selection:text-black overflow-x-hidden">
        <Navbar />
        <ServicePageClient service={service} relatedServices={relatedServices} />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
