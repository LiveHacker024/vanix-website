"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { VanixLogo } from "@/components/ui/VanixLogo";
import {
  Users,
  ShieldCheck,
  LogOut,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>("");

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
        <span className="text-xs uppercase tracking-widest text-text-muted">
          Authenticating VANIX Command Center...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-gold selection:text-black flex flex-col">
      {/* Top Luxury Admin Header */}
      <header className="sticky top-0 z-40 bg-surface-1/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 shadow-xl shadow-black/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand & Portal Tag */}
          <div className="flex items-center gap-4">
            <VanixLogo size="sm" showSubtitle={false} href="/" />
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold-bright" />
                <span>Command Center</span>
              </span>
              <span className="text-xs text-text-muted">|</span>
              <span className="text-xs text-text-muted font-medium">Lead Intelligence</span>
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="flex items-center gap-2">
              <Link
                href="/admin/leads"
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
                  pathname === "/admin/leads"
                    ? "bg-gold/15 text-gold border border-gold/30"
                    : "text-text-secondary hover:text-white hover:bg-surface-2"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Leads & Inquiries</span>
              </Link>
            </nav>

            {/* Live Site Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-xs text-text-muted hover:text-gold transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Admin User Badge & Logout */}
            <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-6 border-l border-white/10">
              {adminEmail && (
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Administrator
                  </span>
                  <span className="text-[10px] text-text-muted">{adminEmail}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-surface-2 hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-text-secondary text-xs font-medium transition-all flex items-center gap-1.5"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-surface-1 border-t border-white/5 py-4 px-6 text-center text-xs text-text-muted">
        <span>VANIX Production Lead Management Engine &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
