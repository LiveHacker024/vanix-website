"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { faqsData, faqCategories } from "@/config/faq";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { GoldButton } from "@/components/ui/GoldButton";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        name: "FAQ",
        item: `${siteConfig.url}/faq`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
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

        <div className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
          {/* Ambient Glow */}
          <div className="ambient-gold-glow top-20 left-1/2 -translate-x-1/2 opacity-20" />

          {/* Breadcrumbs */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gold font-medium">Frequently Asked Questions</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-gold-bright" />
              <span>TRANSPARENT ANSWERS</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-text-secondary leading-relaxed font-light mb-8">
              Everything you need to know about our custom web engineering, Google Maps local SEO, paid ad funnels, delivery workflows, and realistic performance standards.
            </p>

            {/* Search Input Bar */}
            <div className="max-w-xl mx-auto relative mb-8">
              <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g. websites, Google Ads, pricing, timelines)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-2 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none",
                    selectedCategory === cat
                      ? "bg-gold-gradient text-black font-bold shadow-lg shadow-gold/20"
                      : "bg-surface-2 text-text-secondary hover:text-white hover:bg-surface-3 border border-white/5"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 p-8 rounded-2xl bg-surface-2/60 border border-white/10">
                <p className="text-sm text-text-muted mb-4">
                  No questions found matching your search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-xl bg-surface-2/80 backdrop-blur-md border border-white/10 hover:border-gold/30 transition-all overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-display font-bold text-sm sm:text-base text-white pr-2">
                        {faq.question}
                      </span>
                      <div
                        className={cn(
                          "w-7 h-7 rounded-full bg-surface-3 border border-white/10 flex items-center justify-center text-gold flex-shrink-0 transition-transform duration-300",
                          isOpen ? "rotate-180 bg-gold/10 border-gold/40" : ""
                        )}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/5 text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                        <p>{faq.answer}</p>
                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-text-muted">
                          <span className="uppercase tracking-wider">
                            Category: <strong className="text-gold font-normal">{faq.category}</strong>
                          </span>
                          <Link href="/contact" className="hover:text-gold transition-colors">
                            Need more details? →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Help Banner CTA */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="p-8 rounded-2xl bg-surface-2/90 border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>HAVE A SPECIFIC QUESTION?</span>
                </div>
                <h3 className="font-display font-bold text-xl uppercase text-white">
                  Speak Directly With Our Growth Team
                </h3>
                <p className="text-xs text-text-secondary font-light max-w-md">
                  We are available on WhatsApp and email to answer any technical or strategy questions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <GoldButton href="/contact" size="sm" variant="primary" className="w-full sm:w-auto text-center justify-center">
                  SUBMIT INQUIRY
                </GoldButton>
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded bg-surface-3 hover:bg-surface-2 border border-white/10 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-gold" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-text-muted" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
