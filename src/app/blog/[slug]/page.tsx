import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { blogPostsData, BlogPost } from "@/config/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { GoldButton } from "@/components/ui/GoldButton";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Share2,
  BookOpen,
  Tag,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/SocialIcons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | VANIX",
    };
  }

  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: `${post.seoTitle}`,
    description: post.seoDescription,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: articleUrl,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      locale: "en_IN",
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related articles
  const relatedPosts = blogPostsData
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    image: `${siteConfig.url}${post.featuredImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: post.author.socialLink,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/vanix-02.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
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
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-background text-white selection:bg-gold selection:text-black overflow-x-hidden">
        <Navbar />

        <article className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
          {/* Ambient Glow */}
          <div className="ambient-gold-glow top-20 left-1/2 -translate-x-1/2 opacity-20" />

          {/* Breadcrumbs */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-gold transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gold font-medium truncate max-w-xs">{post.category}</span>
            </nav>
          </div>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
              <span className="px-3 py-1 rounded-full bg-gold/15 text-gold font-bold uppercase tracking-wider border border-gold/30">
                {post.category}
              </span>
              <span className="text-text-muted flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                Published: {post.publishedAt}
              </span>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed font-light mb-8">
              {post.subtitle}
            </p>

            {/* Author Byline Bar */}
            <div className="flex items-center justify-between border-y border-white/10 py-4 text-xs text-text-muted">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-3 border border-gold/30 relative">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-medium text-white block">{post.author.name}</span>
                  <span className="text-[11px] text-text-muted">{post.author.role}</span>
                </div>
              </div>

              <Link
                href={`/services/${post.relatedServiceSlug}`}
                className="hidden sm:inline-flex items-center gap-1 text-gold hover:underline text-xs font-semibold"
              >
                <span>Related Service: {post.relatedServiceTitle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface-3 border border-white/10 shadow-2xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Key Takeaways Callout Card */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-2/90 border border-gold/40 card-depth">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold mb-3">
                <Sparkles className="w-4 h-4 text-gold-bright" />
                <span>KEY TAKEAWAYS & ACTION ITEMS</span>
              </div>
              <ul className="space-y-2.5">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Article Body */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-text-secondary leading-relaxed text-sm sm:text-base space-y-12">
            {post.content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white leading-snug">
                  {sec.heading}
                </h2>

                {sec.subheading && (
                  <h3 className="text-sm sm:text-base font-semibold text-gold uppercase tracking-wider">
                    {sec.subheading}
                  </h3>
                )}

                {sec.bodyParagraphs.map((para, pIdx) => (
                  <p key={pIdx} className="font-light leading-relaxed">
                    {para}
                  </p>
                ))}

                {sec.bulletPoints && (
                  <div className="space-y-2 pt-2">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary p-3 rounded-lg bg-surface-2 border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {sec.calloutText && (
                  <div className="p-4 rounded-xl bg-gold-gradient-subtle border-l-4 border-gold text-xs sm:text-sm text-white font-medium my-4">
                    {sec.calloutText}
                  </div>
                )}
              </section>
            ))}

            {/* Related Service Embedded CTA Banner */}
            <div className="p-8 rounded-2xl bg-surface-2 border border-gold/40 space-y-4 my-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>VANIX SERVICE IMPLEMENTATION</span>
              </div>

              <h3 className="font-display font-bold text-xl uppercase text-white">
                Looking to Implement This for Your Business?
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary font-light">
                Explore our full <strong className="text-white">{post.relatedServiceTitle}</strong> service package or consult directly with our technical lead to build your custom growth roadmap.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <GoldButton href={`/services/${post.relatedServiceSlug}`} size="sm" variant="primary">
                  EXPLORE {post.relatedServiceTitle.toUpperCase()}
                </GoldButton>
                <Link
                  href="/contact"
                  className="text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-gold transition-colors"
                >
                  Schedule a Consultation →
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs text-text-muted flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5 text-gold" />
                Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-surface-2 border border-white/10 text-xs text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Profile Bio Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-2/80 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-surface-3 border border-gold/30 flex-shrink-0">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {post.author.name}
                    </h3>
                    <p className="text-xs text-gold font-medium">{post.author.role}</p>
                  </div>
                  {post.author.socialLink && (
                    <a
                      href={post.author.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-surface-3 hover:bg-surface-2 border border-white/10 text-xs text-text-secondary hover:text-white transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  )}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles Showcase */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>MORE GUIDES</span>
                </div>
                <h2 className="font-display font-bold text-2xl uppercase text-white">
                  Related Growth Resources
                </h2>
              </div>
              <Link href="/blog" className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.slug}
                  href={`/blog/${rPost.slug}`}
                  className="group rounded-xl bg-surface-2/80 border border-white/10 hover:border-gold/40 transition-colors p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase font-bold tracking-wider mb-2">
                      <span className="text-gold">{rPost.category}</span>
                      <span>•</span>
                      <span>{rPost.readingTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-gold transition-colors leading-snug mb-2">
                      {rPost.title}
                    </h3>
                    <p className="text-xs text-text-secondary font-light line-clamp-2">
                      {rPost.summary}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-xs text-gold">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
