import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Digital Growth Partner for Businesses`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "VANIX",
    "Digital Growth Partner",
    "Traditional Business Digital Transformation",
    "Website Development",
    "E-commerce Store",
    "Amazon Meesho IndiaMART Product Listing",
    "Google Business Profile Local SEO",
    "Google Meta Ads",
    "WhatsApp Sales Funnels",
    "Lead Generation",
    "Business Growth Solutions",
  ],
  authors: [{ name: "Kunal Rajput" }, { name: "VANIX Growth Solutions" }],
  creator: "VANIX",
  publisher: "VANIX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} | Digital Growth Partner for Businesses`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "VANIX Master Digital Growth Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Digital Growth Partner for Businesses`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/vanix-02.png`,
        description: siteConfig.description,
        email: siteConfig.links.email,
        telephone: siteConfig.links.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Shamli",
          addressRegion: "Uttar Pradesh",
          postalCode: "247776",
          addressCountry: "IN",
        },
        founder: {
          "@type": "Person",
          name: siteConfig.founder.name,
          jobTitle: siteConfig.founder.role,
          sameAs: [siteConfig.links.linkedin, siteConfig.links.youtube],
        },
        sameAs: [
          siteConfig.links.whatsapp,
          siteConfig.links.linkedin,
          siteConfig.links.youtube,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "Service",
        serviceType: "Digital Transformation & Business Growth",
        provider: {
          "@id": `${siteConfig.url}/#organization`,
        },
        description:
          "Comprehensive end-to-end digital growth systems for traditional and offline businesses.",
        areaServed: {
          "@type": "Country",
          name: "India",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-white antialiased selection:bg-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}
