"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { VanixLogo } from "@/components/ui/VanixLogo";
import {
  LayoutDashboard,
  MessageSquare,
  Kanban,
  Users,
  PhoneCall,
  CreditCard,
  Briefcase,
  Settings,
  Search,
  Plus,
  LogOut,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { GlobalSearchModal } from "@/components/crm/GlobalSearchModal";
import { NotificationsDropdown } from "@/components/crm/NotificationsDropdown";
import { NewInquiryModal } from "@/components/crm/NewInquiryModal";

const NAVIGATION_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Pipeline", href: "/admin/pipeline", icon: Kanban },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Follow-ups", href: "/admin/follow-ups", icon: PhoneCall },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [newInquiryOpen, setNewInquiryOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/me");
        const data = await res.json();
        if (data.authenticated && data.user) {
          setIsAuthenticated(true);
          setAdminEmail(data.user.email);
        } else {
          setIsAuthenticated(false);
          router.replace("/admin/login");
        }
      } catch (err) {
        setIsAuthenticated(false);
        router.replace("/admin/login");
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.replace("/admin/login");
    } catch (err) {
      router.replace("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-gold space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin" />
        <span className="text-xs uppercase tracking-widest text-text-muted font-light">
          Authenticating VANIX Command Center...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-gold selection:text-black flex flex-col">
      {/* Top Luxury Admin Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 shadow-2xl shadow-black">
        <div className="flex items-center justify-between gap-4">
          {/* Brand & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-secondary"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <VanixLogo size="sm" showSubtitle={false} href="/admin" />
            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/10">
              <span className="px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold uppercase tracking-wider text-gold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold-bright" />
                <span>Enterprise CRM</span>
              </span>
            </div>
          </div>

          {/* Search Trigger Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#121212] border border-white/10 text-text-muted hover:border-gold/40 hover:text-white transition-all text-xs"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-gold" />
                <span>Search anything...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-2 text-[10px] text-text-muted border border-white/5 font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Action New Inquiry */}
            <button
              type="button"
              onClick={() => setNewInquiryOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold hover:bg-gold-bright text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/15"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Inquiry</span>
            </button>

            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2 rounded-lg bg-surface-2 border border-white/10 text-text-secondary"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Realtime Notifications */}
            <NotificationsDropdown />

            {/* Live Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-white/10 text-xs text-text-secondary hover:text-gold transition-colors"
              title="View Public Website"
            >
              <span>Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* User & Logout */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/10">
              {adminEmail && (
                <div className="hidden 2xl:flex flex-col text-right">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider leading-none">
                    Admin
                  </span>
                  <span className="text-[10px] text-text-muted leading-tight truncate max-w-[120px]">
                    {adminEmail}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-lg bg-surface-2 hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-text-secondary text-xs transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main CRM Body (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#090909] border-r border-white/10 pt-16 md:pt-0 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              CRM Navigation
            </div>
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-gold/15 text-gold border border-gold/35 shadow-sm shadow-gold/10"
                      : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-gold" : "text-text-muted"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/5">
            <div className="p-3 rounded-xl bg-[#111111] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
                  VANIX CRM Engine
                </span>
                <span className="text-[9px] text-text-muted">v3.0 Production Ready</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Live" />
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#070707] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NewInquiryModal
        isOpen={newInquiryOpen}
        onClose={() => setNewInquiryOpen(false)}
        onCreated={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
