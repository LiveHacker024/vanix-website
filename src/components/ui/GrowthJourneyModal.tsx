"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BusinessType,
  GrowthGoal,
  OnlineAsset,
  AssessmentAnswers,
  GrowthRoadmapResult,
  RecommendedServiceItem,
  generateGrowthRoadmap,
} from "@/lib/recommendation-engine";
import { ServiceItem, getServiceBySlug } from "@/config/services";
import { siteConfig } from "@/config/site";
import { contactConfig } from "@/config/contact";
import { ServiceBookingModal } from "@/components/ui/ServiceBookingModal";
import { ServiceInquiryModal } from "@/components/ui/ServiceInquiryModal";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Store,
  Briefcase,
  Factory,
  Truck,
  ShoppingBag,
  Utensils,
  Gem,
  Building2,
  Stethoscope,
  GraduationCap,
  Scale,
  Compass,
  TrendingUp,
  Target,
  Globe,
  Search,
  ShoppingCart,
  Megaphone,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GrowthJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUSINESS_TYPE_OPTIONS: { label: BusinessType; icon: React.ElementType; description: string }[] = [
  { label: "Local / Retail", icon: Store, description: "Physical stores, shops, showrooms, and local outlets" },
  { label: "Service Business", icon: Briefcase, description: "Contractors, agencies, salons, cleaning, repairs, etc." },
  { label: "Manufacturer", icon: Factory, description: "Industrial fabrication, machinery, OEM, consumer goods" },
  { label: "Wholesale / Distributor", icon: Truck, description: "B2B supply, bulk inventory, dealership distribution" },
  { label: "E-commerce", icon: ShoppingBag, description: "D2C online brands and digital merchandise stores" },
  { label: "Restaurant / Food", icon: Utensils, description: "Cafes, dine-ins, cloud kitchens, bakeries, food chains" },
  { label: "Jewellery / Fashion", icon: Gem, description: "Apparel, luxury jewellery, footwear, fashion accessories" },
  { label: "Real Estate", icon: Building2, description: "Builders, property developers, brokers, commercial spaces" },
  { label: "Healthcare", icon: Stethoscope, description: "Clinics, diagnostic labs, hospitals, wellness centers" },
  { label: "Education", icon: GraduationCap, description: "Institutes, coaching centers, academies, private schools" },
  { label: "Professional Services", icon: Scale, description: "Lawyers, CAs, financial advisors, consulting firms" },
  { label: "Other", icon: Compass, description: "Specialized, hybrid, or emerging business models" },
];

const GROWTH_GOAL_OPTIONS: { label: GrowthGoal; icon: React.ElementType; description: string }[] = [
  { label: "Get More Customers", icon: TrendingUp, description: "Increase store footfall, phone inquiries, and buyer volume" },
  { label: "Generate More Leads", icon: Target, description: "Capture high-intent B2B or high-ticket service inquiries" },
  { label: "Build an Online Presence", icon: Globe, description: "Establish authoritative digital credibility and branding" },
  { label: "Get Found on Google", icon: Search, description: "Rank top on Google Search and Google Maps for local queries" },
  { label: "Sell Products Online", icon: ShoppingCart, description: "Direct-to-consumer store with online payments & checkout" },
  { label: "Improve Digital Marketing", icon: Megaphone, description: "Optimize paid ads, social media, and return on spend" },
  { label: "Improve Customer Follow-up", icon: MessageCircle, description: "Automate WhatsApp follow-ups and lead response systems" },
  { label: "I'm Not Sure", icon: HelpCircle, description: "Explore the most logical starting roadmap for our industry" },
];

const ONLINE_ASSET_OPTIONS: { label: OnlineAsset; description: string }[] = [
  { label: "Website", description: "Active commercial website or landing page" },
  { label: "Google Business Profile", description: "Verified Google Maps / local business listing" },
  { label: "Instagram / Facebook", description: "Active social media profiles with brand followers" },
  { label: "Online Store", description: "Shopify / WooCommerce / custom digital shop" },
  { label: "Google Ads", description: "Active or previous Google Search / PMax ad campaigns" },
  { label: "Meta Ads", description: "Active or previous Facebook / Instagram ad campaigns" },
  { label: "WhatsApp Business", description: "Dedicated WhatsApp business number or catalog" },
  { label: "Nothing Yet", description: "Starting fresh with zero existing digital assets" },
  { label: "Not Sure", description: "Uncertain about our current digital setup" },
];

export function GrowthJourneyModal({ isOpen, onClose }: GrowthJourneyModalProps) {
  // Wizard state: 1, 2, 3, 4, 5 or "RESULT"
  const [currentStep, setCurrentStep] = useState<number | "RESULT">(1);

  // Form answers
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [primaryGoal, setPrimaryGoal] = useState<GrowthGoal | null>(null);
  const [currentPresence, setCurrentPresence] = useState<OnlineAsset[]>([]);
  const [location, setLocation] = useState("");
  const [validationError, setValidationError] = useState("");

  // Result state
  const [roadmapResult, setRoadmapResult] = useState<GrowthRoadmapResult | null>(null);

  // Child modal triggers
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryInitialService, setInquiryInitialService] = useState<string>("");
  const [inquiryInitialMessage, setInquiryInitialMessage] = useState<string>("");

  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !bookingService && !isInquiryOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, bookingService, isInquiryOpen]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Scroll to top of modal on step change
  useEffect(() => {
    if (modalContainerRef.current) {
      modalContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  if (!isOpen) return null;

  // Handle Next Navigation
  const handleNextStep = () => {
    setValidationError("");

    if (currentStep === 1) {
      if (!businessName.trim()) {
        setValidationError("Please enter your business or company name to continue.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!businessType) {
        setValidationError("Please select your business type to proceed.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!primaryGoal) {
        setValidationError("Please select your primary growth goal.");
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (currentPresence.length === 0) {
        setValidationError("Please select at least one option (or 'Nothing Yet').");
        return;
      }
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // Generate Roadmap
      const answers: AssessmentAnswers = {
        businessName: businessName.trim(),
        businessType: businessType || "Service Business",
        primaryGoal: primaryGoal || "Get More Customers",
        currentPresence: currentPresence.length > 0 ? currentPresence : ["Nothing Yet"],
        location: location.trim() || undefined,
      };

      const result = generateGrowthRoadmap(answers);
      setRoadmapResult(result);
      setCurrentStep("RESULT");
    }
  };

  const handlePreviousStep = () => {
    setValidationError("");
    if (currentStep === "RESULT") {
      setCurrentStep(5);
    } else if (typeof currentStep === "number" && currentStep > 1) {
      setCurrentStep((prev) => (typeof prev === "number" ? prev - 1 : 1));
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setBusinessName("");
    setBusinessType(null);
    setPrimaryGoal(null);
    setCurrentPresence([]);
    setLocation("");
    setValidationError("");
    setRoadmapResult(null);
  };

  // Toggle multi-select online assets with "Nothing Yet" exclusivity
  const toggleOnlineAsset = (asset: OnlineAsset) => {
    setValidationError("");
    if (asset === "Nothing Yet" || asset === "Not Sure") {
      setCurrentPresence([asset]);
    } else {
      setCurrentPresence((prev) => {
        const cleaned = prev.filter((a) => a !== "Nothing Yet" && a !== "Not Sure");
        if (cleaned.includes(asset)) {
          const next = cleaned.filter((a) => a !== asset);
          return next;
        } else {
          return [...cleaned, asset];
        }
      });
    }
  };

  // Trigger Booking Modal for a specific recommended service
  const handleOpenBooking = (serviceItem: ServiceItem) => {
    setBookingService(serviceItem);
  };

  // Trigger Inquiry Modal for the full plan
  const handleOpenInquiryPlan = () => {
    if (!roadmapResult) return;
    const topServiceTitle = roadmapResult.highPriorityService.service.title;
    const allServicesTitles = roadmapResult.allRecommended.map((r) => r.service.title).join(", ");
    
    setInquiryInitialService(topServiceTitle);
    setInquiryInitialMessage(
      `I completed the VANIX Growth Journey Assessment for ${roadmapResult.businessName} (${roadmapResult.businessType}). Primary Goal: ${roadmapResult.primaryGoal}. Recommended Services: ${allServicesTitles}.`
    );
    setIsInquiryOpen(true);
  };

  // Generate WhatsApp Message URL
  const getWhatsAppAssessmentUrl = () => {
    if (!roadmapResult) return siteConfig.links.whatsapp;
    
    const text = `Hello VANIX,

I completed the VANIX Growth Journey assessment.

Business:
${roadmapResult.businessName}

Business Type:
${roadmapResult.businessType}

Goal:
${roadmapResult.primaryGoal}

Recommended Starting Service:
${roadmapResult.highPriorityService.service.title}

Please help me understand the next steps.`;

    const rawDigits = contactConfig.whatsappNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${rawDigits}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="growth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
    >
      {/* Outer Modal Container */}
      <div
        ref={modalContainerRef}
        className={cn(
          "relative w-full max-w-4xl bg-surface-1 border border-gold/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(200,164,93,0.15)] flex flex-col max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-surface-2",
          currentStep === "RESULT" && "max-w-5xl"
        )}
      >
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-30 bg-surface-1/95 backdrop-blur-md px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <Sparkles className="w-4 h-4 text-gold-bright" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gold block">
                VANIX GROWTH ENGINE
              </span>
              <span className="text-xs sm:text-sm font-medium text-white">
                {currentStep === "RESULT" ? "Personalized Growth Roadmap" : "Business-Growth Assessment"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Growth Journey Assessment"
            className="p-2 rounded-full text-text-muted hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Bar (Only during steps 1–5) */}
        {currentStep !== "RESULT" && (
          <div className="px-5 sm:px-8 pt-4 pb-2 bg-surface-1">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
              <span className="text-gold">STEP {currentStep} OF 5</span>
              <span>
                {currentStep === 1 && "Business Name"}
                {currentStep === 2 && "Business Type"}
                {currentStep === 3 && "Primary Goal"}
                {currentStep === 4 && "Online Presence"}
                {currentStep === 5 && "Target Location"}
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-gradient transition-all duration-500 ease-out rounded-full shadow-sm shadow-gold"
                style={{ width: `${((currentStep as number) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="p-5 sm:p-8 md:p-10 flex-1">
          {/* STEP 1: BUSINESS NAME */}
          {currentStep === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="text-center sm:text-left">
                <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-2">
                  LET&apos;S UNDERSTAND YOUR BUSINESS
                </span>
                <h2
                  id="growth-modal-title"
                  className="font-display font-extrabold uppercase text-white tracking-tight text-2xl sm:text-3xl md:text-4xl"
                >
                  What&apos;s your business or company name?
                </h2>
                <p className="text-sm text-text-secondary mt-2">
                  We use this to customize your step-by-step growth architecture and tailored service roadmap.
                </p>
              </div>

              <div className="pt-2">
                <label htmlFor="assessment-business-name" className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Business / Company Name <span className="text-gold">*</span>
                </label>
                <input
                  id="assessment-business-name"
                  type="text"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    if (validationError) setValidationError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNextStep();
                    }
                  }}
                  placeholder="e.g. Sharma Furniture, Apex Dental Clinic, or Zenith Logistics"
                  className="w-full px-5 py-4 rounded-xl bg-surface-2 border border-white/15 text-white text-base sm:text-lg placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all shadow-inner"
                  autoFocus
                />
              </div>

              {validationError && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: BUSINESS TYPE */}
          {currentStep === 2 && (
            <div className="space-y-6 py-2">
              <div className="text-center sm:text-left">
                <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-2">
                  STEP 2 · INDUSTRY MODEL
                </span>
                <h2 className="font-display font-extrabold uppercase text-white tracking-tight text-2xl sm:text-3xl md:text-4xl">
                  What type of business do you run?
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Select the primary category that best reflects your core revenue operations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {BUSINESS_TYPE_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = businessType === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setBusinessType(item.label);
                        if (validationError) setValidationError("");
                      }}
                      className={cn(
                        "group relative text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-gold",
                        isSelected
                          ? "bg-surface-3 border-gold shadow-[0_0_20px_rgba(200,164,93,0.25)] ring-1 ring-gold"
                          : "bg-surface-2/70 border-white/10 hover:border-white/25 hover:bg-surface-2"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                            isSelected ? "bg-gold text-black font-bold" : "bg-white/5 text-gold group-hover:bg-white/10"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-colors",
                            isSelected ? "border-gold bg-gold text-black font-bold" : "border-white/20"
                          )}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <div>
                        <span className={cn("text-sm font-bold block mb-1", isSelected ? "text-gold" : "text-white")}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-text-secondary leading-tight block">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {validationError && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PRIMARY GROWTH GOAL */}
          {currentStep === 3 && (
            <div className="space-y-6 py-2">
              <div className="text-center sm:text-left">
                <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-2">
                  STEP 3 · PRIMARY OBJECTIVE
                </span>
                <h2 className="font-display font-extrabold uppercase text-white tracking-tight text-2xl sm:text-3xl md:text-4xl">
                  What is your biggest growth goal right now?
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Choose the single most impactful commercial milestone for your business right now.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {GROWTH_GOAL_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = primaryGoal === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setPrimaryGoal(item.label);
                        if (validationError) setValidationError("");
                      }}
                      className={cn(
                        "group relative text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-gold",
                        isSelected
                          ? "bg-surface-3 border-gold shadow-[0_0_20px_rgba(200,164,93,0.25)] ring-1 ring-gold"
                          : "bg-surface-2/70 border-white/10 hover:border-white/25 hover:bg-surface-2"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                          isSelected ? "bg-gold text-black font-bold" : "bg-white/5 text-gold group-hover:bg-white/10"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={cn("text-sm font-bold", isSelected ? "text-gold" : "text-white")}>
                            {item.label}
                          </span>
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border flex items-center justify-center text-[10px]",
                              isSelected ? "border-gold bg-gold text-black font-bold" : "border-white/20"
                            )}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <span className="text-xs text-text-secondary leading-relaxed block">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {validationError && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: CURRENT ONLINE PRESENCE */}
          {currentStep === 4 && (
            <div className="space-y-6 py-2">
              <div className="text-center sm:text-left">
                <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-2">
                  STEP 4 · DIGITAL ASSET INVENTORY
                </span>
                <h2 className="font-display font-extrabold uppercase text-white tracking-tight text-2xl sm:text-3xl md:text-4xl">
                  What do you already have?
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Select all active digital assets currently in place. (Multiple selections allowed)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {ONLINE_ASSET_OPTIONS.map((item) => {
                  const isSelected = currentPresence.includes(item.label);
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleOnlineAsset(item.label)}
                      className={cn(
                        "group relative text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 focus:outline-none focus:ring-2 focus:ring-gold",
                        isSelected
                          ? "bg-surface-3 border-gold shadow-[0_0_20px_rgba(200,164,93,0.25)] ring-1 ring-gold"
                          : "bg-surface-2/70 border-white/10 hover:border-white/25 hover:bg-surface-2"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                          isSelected ? "border-gold bg-gold text-black font-bold" : "border-white/30 bg-surface-1"
                        )}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1">
                        <span className={cn("text-xs sm:text-sm font-bold block mb-0.5", isSelected ? "text-gold" : "text-white")}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-text-secondary leading-tight block">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {validationError && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: OPTIONAL LOCATION */}
          {currentStep === 5 && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="text-center sm:text-left">
                <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-2">
                  STEP 5 · TARGET SERVICE AREA (OPTIONAL)
                </span>
                <h2 className="font-display font-extrabold uppercase text-white tracking-tight text-2xl sm:text-3xl md:text-4xl">
                  Where does your business primarily serve customers?
                </h2>
                <p className="text-sm text-text-secondary mt-2">
                  Specify your city, regional territory, or target customer market. (Optional)
                </p>
              </div>

              <div className="pt-2">
                <label htmlFor="assessment-location" className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                  City / State / Service Area <span className="text-text-muted font-normal">(Optional)</span>
                </label>
                <input
                  id="assessment-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNextStep();
                    }
                  }}
                  placeholder="e.g. Mumbai & Thane, Delhi NCR, Bangalore, or Pan-India"
                  className="w-full px-5 py-4 rounded-xl bg-surface-2 border border-white/15 text-white text-base sm:text-lg placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all shadow-inner"
                  autoFocus
                />
              </div>

              <div className="p-4 rounded-xl bg-surface-2/60 border border-white/10 flex items-start gap-3 text-xs text-text-secondary">
                <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  Our deterministic recommendation engine will evaluate your business type (<strong>{businessType}</strong>), core objective (<strong>{primaryGoal}</strong>), and existing digital assets to formulate your prioritized 3–5 service growth roadmap.
                </span>
              </div>
            </div>
          )}

          {/* STEP RESULT: PERSONALIZED ROADMAP */}
          {currentStep === "RESULT" && roadmapResult && (
            <div className="space-y-10 py-2">
              {/* Header & Business Profile Summary */}
              <div className="bg-gradient-to-b from-surface-2/90 to-surface-1 border border-gold/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                <div className="ambient-gold-glow -top-20 -right-20 opacity-20" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-gold-bright" />
                      <span>YOUR PERSONALIZED VANIX GROWTH JOURNEY</span>
                    </div>

                    <h2 className="font-display font-extrabold uppercase text-white tracking-tight text-2xl sm:text-3xl md:text-4xl leading-tight">
                      Growth Roadmap for <span className="text-gradient-gold">{roadmapResult.businessName}</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-text-secondary mt-2 max-w-2xl font-light">
                      Based on what you told us, VANIX has formulated a structured, high-impact growth plan focusing strictly on your highest-return digital levers.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-3 hover:bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-white transition-all flex-shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Assessment</span>
                  </button>
                </div>

                {/* Profile Badges */}
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-surface-3/80 p-3 rounded-lg border border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                      Business Type
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block mt-0.5">
                      {roadmapResult.businessType}
                    </span>
                  </div>

                  <div className="bg-surface-3/80 p-3 rounded-lg border border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                      Primary Goal
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gold truncate block mt-0.5">
                      {roadmapResult.primaryGoal}
                    </span>
                  </div>

                  <div className="bg-surface-3/80 p-3 rounded-lg border border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                      Current Presence
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block mt-0.5">
                      {roadmapResult.currentPresence.slice(0, 2).join(", ")}
                      {roadmapResult.currentPresence.length > 2 ? ` +${roadmapResult.currentPresence.length - 2}` : ""}
                    </span>
                  </div>

                  <div className="bg-surface-3/80 p-3 rounded-lg border border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                      Serving Area
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate block mt-0.5">
                      {roadmapResult.location || "Regional / National"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ROADMAP SECTION 01: HIGH PRIORITY (START HERE) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold text-black text-[11px] font-extrabold uppercase tracking-widest">
                      01
                    </span>
                    <h3 className="font-display font-extrabold uppercase text-white tracking-wider text-base sm:text-lg">
                      WHERE WE RECOMMEND YOU START · HIGH PRIORITY
                    </h3>
                  </div>
                  <span className="text-xs text-gold font-bold hidden sm:inline-block uppercase tracking-wider">
                    Immediate Focus
                  </span>
                </div>

                {/* High Priority Showcase Card */}
                <div className="relative rounded-2xl bg-surface-2 border-2 border-gold p-6 sm:p-8 shadow-[0_15px_40px_rgba(200,164,93,0.15)] overflow-hidden">
                  <div className="ambient-gold-glow -top-24 right-0 opacity-25" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-[11px] font-bold uppercase tracking-widest">
                          {roadmapResult.highPriorityService.service.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/5 text-text-muted text-[11px] font-mono">
                          SERVICE #{roadmapResult.highPriorityService.service.number}
                        </span>
                      </div>

                      <h4 className="font-display font-extrabold uppercase text-white tracking-tight text-2xl sm:text-3xl">
                        {roadmapResult.highPriorityService.service.title}
                      </h4>

                      {/* Why this comes first */}
                      <div className="p-4 rounded-xl bg-surface-1/90 border border-gold/30">
                        <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
                          Why VANIX Recommends This First:
                        </span>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                          {roadmapResult.highPriorityService.whyRecommended}
                        </p>
                      </div>

                      {/* What VANIX Can Do */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white block">
                          What VANIX Can Do:
                        </span>
                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                          {roadmapResult.highPriorityService.whatVanixCanDo}
                        </p>
                      </div>

                      {/* KPIs to monitor */}
                      {roadmapResult.highPriorityService.kpis.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-white/10">
                          <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                            Key Outcomes & KPIs to Monitor:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {roadmapResult.highPriorityService.kpis.map((kpi, idx) => (
                              <div key={idx} className="p-2.5 rounded-lg bg-surface-3/60 border border-white/5">
                                <span className="text-xs font-bold text-white block">{kpi.label}</span>
                                <span className="text-[10px] text-text-muted block mt-0.5">{kpi.context}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Column for #1 Service */}
                    <div className="lg:w-72 flex flex-col gap-3 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <Link
                        href={`/services/${roadmapResult.highPriorityService.slug}`}
                        onClick={onClose}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-3 hover:bg-surface-1 border border-white/15 hover:border-gold/60 text-xs font-bold uppercase tracking-wider text-white hover:text-gold transition-all"
                      >
                        <span>Explore This Service</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gold" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenBooking(roadmapResult.highPriorityService.service)}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-gold-gradient text-black text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all border border-gold-bright"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Book This Service — ₹999</span>
                      </button>

                      <span className="text-[11px] text-text-muted text-center block">
                        Fully refundable ₹999 discovery & strategy consultation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROADMAP SECTION 02: NEXT STEPS */}
              {roadmapResult.nextSteps.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-3 border border-white/15 text-white text-[11px] font-extrabold uppercase tracking-widest">
                      02
                    </span>
                    <h3 className="font-display font-extrabold uppercase text-white tracking-wider text-base sm:text-lg">
                      NEXT STEP · FOUNDATION EXPANSION
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roadmapResult.nextSteps.map((item) => (
                      <div
                        key={item.slug}
                        className="rounded-xl bg-surface-2/80 border border-white/10 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-surface-3 text-gold text-[10px] font-bold uppercase tracking-widest">
                              {item.tierLabel}
                            </span>
                            <span className="text-[11px] font-mono text-text-muted">
                              SERVICE #{item.service.number}
                            </span>
                          </div>

                          <h4 className="font-display font-bold uppercase text-white text-lg sm:text-xl">
                            {item.service.title}
                          </h4>

                          <p className="text-xs text-text-secondary leading-relaxed font-light">
                            {item.whyRecommended}
                          </p>

                          <div className="pt-2 border-t border-white/5 space-y-1">
                            <span className="text-[11px] font-bold uppercase text-text-muted block">Deliverables:</span>
                            <p className="text-xs text-text-muted leading-tight line-clamp-2">
                              {item.whatVanixCanDo}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center gap-2.5">
                          <Link
                            href={`/services/${item.slug}`}
                            onClick={onClose}
                            className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-surface-3 hover:bg-surface-1 border border-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:text-gold transition-colors text-center"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleOpenBooking(item.service)}
                            className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-gold/15 hover:bg-gold/25 border border-gold/40 text-xs font-bold uppercase tracking-wider text-gold hover:text-white transition-all text-center"
                          >
                            <span>Book — ₹999</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ROADMAP SECTION 03: SCALE & OPTIMIZE */}
              {roadmapResult.scaleServices.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-3 border border-white/15 text-white text-[11px] font-extrabold uppercase tracking-widest">
                      03
                    </span>
                    <h3 className="font-display font-extrabold uppercase text-white tracking-wider text-base sm:text-lg">
                      SCALE & OPTIMIZE · ACQUISITION ENGINE
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roadmapResult.scaleServices.map((item) => (
                      <div
                        key={item.slug}
                        className="rounded-xl bg-surface-2/60 border border-white/10 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-surface-3 text-gold text-[10px] font-bold uppercase tracking-widest">
                              {item.tierLabel}
                            </span>
                            <span className="text-[11px] font-mono text-text-muted">
                              SERVICE #{item.service.number}
                            </span>
                          </div>

                          <h4 className="font-display font-bold uppercase text-white text-lg sm:text-xl">
                            {item.service.title}
                          </h4>

                          <p className="text-xs text-text-secondary leading-relaxed font-light">
                            {item.whyRecommended}
                          </p>

                          <div className="pt-2 border-t border-white/5 space-y-1">
                            <span className="text-[11px] font-bold uppercase text-text-muted block">Deliverables:</span>
                            <p className="text-xs text-text-muted leading-tight line-clamp-2">
                              {item.whatVanixCanDo}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center gap-2.5">
                          <Link
                            href={`/services/${item.slug}`}
                            onClick={onClose}
                            className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-surface-3 hover:bg-surface-1 border border-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:text-gold transition-colors text-center"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleOpenBooking(item.service)}
                            className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-gold/15 hover:bg-gold/25 border border-gold/40 text-xs font-bold uppercase tracking-wider text-gold hover:text-white transition-all text-center"
                          >
                            <span>Book — ₹999</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GLOBAL CALLS TO ACTION */}
              <div className="p-6 sm:p-8 rounded-2xl bg-surface-2 border border-gold/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center lg:text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">
                    READY TO COMMENCE YOUR DIGITAL SCALE?
                  </span>
                  <h4 className="font-display font-extrabold uppercase text-white text-xl sm:text-2xl">
                    Execute This Complete Growth Plan With VANIX
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary max-w-xl font-light">
                    Initiate a direct audit consultation or discuss the specifics with our growth architects over WhatsApp.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-[14px] w-full lg:w-auto md:flex-wrap">
                  <button
                    type="button"
                    onClick={handleOpenInquiryPlan}
                    className="w-full md:w-auto h-[52px] inline-flex items-center justify-center gap-2 px-6 rounded-lg bg-gold-gradient text-black text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all border border-gold-bright flex-shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface-2"
                  >
                    <span>Start This Growth Plan</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  </button>

                  <a
                    href="https://wa.me/919457727770?text=Hi%20VANIX%2C%20I%20want%20to%20discuss%20the%20digital%20growth%20plan%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discuss digital growth plan with VANIX on WhatsApp"
                    className="group w-full md:w-auto h-[52px] inline-flex items-center justify-center gap-2.5 px-6 rounded-lg bg-[#0d0d0d] hover:bg-gold/10 border border-[#d4af37]/45 hover:border-gold text-white text-xs sm:text-sm font-semibold tracking-[0.5px] uppercase shadow-md hover:shadow-[0_0_16px_rgba(212,175,55,0.2)] active:scale-[0.98] transition-all duration-300 flex-shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:text-gold transition-colors flex-shrink-0" aria-hidden="true" />
                    <span>Discuss on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Wizard Footer Navigation (Only steps 1–5) */}
        {currentStep !== "RESULT" && (
          <div className="sticky bottom-0 z-30 bg-surface-1/95 backdrop-blur-md px-5 sm:px-8 py-4 border-t border-white/10 flex items-center justify-between">
            <div>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <span className="text-[11px] text-text-muted uppercase tracking-wider hidden sm:inline-block">
                  Confidential & Rule-Based Assessment
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg bg-gold-gradient text-black text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all border border-gold-bright"
            >
              <span>{currentStep === 5 ? "Generate My Growth Roadmap" : "Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Child Modal: Service Booking Modal (₹999) */}
      {bookingService && (
        <ServiceBookingModal
          isOpen={!!bookingService}
          onClose={() => setBookingService(null)}
          service={bookingService}
          initialBusinessName={roadmapResult?.businessName || businessName}
          initialLocation={roadmapResult?.location || location}
        />
      )}

      {/* Child Modal: Service Inquiry Modal (Growth Plan) */}
      {isInquiryOpen && (
        <ServiceInquiryModal
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          initialService={inquiryInitialService}
          initialBusinessName={roadmapResult?.businessName || businessName}
          initialMessage={inquiryInitialMessage}
        />
      )}
    </div>
  );
}
