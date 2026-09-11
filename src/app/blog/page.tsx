"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { blogPostsData } from "@/config/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  ArrowUpRight,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Web & Tech",
  "Local SEO",
  "Digital Strategy",
  "Paid Advertising",
  "Customer Retention",
  "E-Commerce",
] as const;

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPostsData[0];

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
        name: "Blog",
        item: `${siteConfig.url}/blog`,
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
              <span className="text-gold font-medium">Blog & Resources</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5 text-gold-bright" />
              <span>INSIGHTS & GUIDES</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
              Digital Growth <span className="text-gradient-gold">Resources</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-text-secondary leading-relaxed font-light mb-8">
              In-depth, actionable guides on website engineering, Google Maps local SEO, paid ad funnels, and e-commerce growth strategies for businesses in India.
            </p>

            {/* Search Input Bar */}
            <div className="max-w-xl mx-auto relative mb-8">
              <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles (e.g., local SEO, Google Ads, WhatsApp, e-commerce)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-2 border border-white/10 text-white text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Featured Post Hero Banner (When no search filter is active) */}
            {searchQuery === "" && selectedCategory === "All" && (
              <div className="relative rounded-2xl p-6 sm:p-10 bg-surface-2/90 border border-gold/40 card-depth overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="px-3 py-1 rounded-full bg-gold/15 text-gold font-bold uppercase tracking-wider border border-gold/30">
                        FEATURED GUIDE
                      </span>
                      <span className="text-text-muted font-medium uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                      <span className="text-text-muted">•</span>
                      <span className="text-text-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        {featuredPost.readingTime}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-tight leading-tight group-hover:text-gold transition-colors">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                      {featuredPost.subtitle}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-xs text-text-muted">
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-surface-3 border border-gold/30 relative">
                          <Image
                            src={featuredPost.author.image}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span>By <strong className="text-white font-medium">{featuredPost.author.name}</strong></span>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold group-hover:text-gold-bright"
                      >
                        <span>Read Full Guide</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-surface-3 border border-white/10">
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white">
                  All Articles ({filteredPosts.length})
                </h3>
                <span className="text-xs text-text-muted uppercase tracking-wider">
                  Category: {selectedCategory}
                </span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 p-8 rounded-2xl bg-surface-2/60 border border-white/10">
                  <p className="text-sm text-text-muted mb-4">
                    No articles found matching your query.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group rounded-2xl bg-surface-2/80 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all duration-300 card-depth flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {/* Featured Image Thumbnail */}
                        <div className="relative aspect-video w-full bg-surface-3 overflow-hidden">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-gold border border-gold/30">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Text Details */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-[11px] text-text-muted mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gold" />
                              {post.publishedAt}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gold" />
                              {post.readingTime}
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-base sm:text-lg uppercase text-white tracking-wide group-hover:text-gold transition-colors leading-snug mb-2.5">
                            {post.title}
                          </h4>

                          <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed line-clamp-3">
                            {post.summary}
                          </p>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <User className="w-3.5 h-3.5 text-gold" />
                          <span>{post.author.name}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gold group-hover:text-gold-bright">
                          <span>Read</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
