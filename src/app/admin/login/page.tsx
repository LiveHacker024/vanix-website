"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { VanixLogo } from "@/components/ui/VanixLogo";
import { Lock, Mail, Loader2, AlertCircle, Sparkles, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid credentials.");
      }

      // Success, route to leads
      router.push("/admin/leads");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="ambient-gold-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-surface-2/90 backdrop-blur-xl border border-gold/30 rounded-2xl p-8 sm:p-10 shadow-2xl card-depth">
          {/* Logo & Header */}
          <div className="text-center mb-8 flex flex-col items-center">
            <VanixLogo size="md" showSubtitle={false} href="/" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-bright" />
              <span>Restricted Access</span>
            </div>

            <h2 className="font-display font-bold text-xl uppercase text-white tracking-wide mt-3">
              Admin Portal
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Sign in to manage inquiries and lead analytics.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5 mb-6">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vanix.in"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-3 border border-white/10 text-sm text-white placeholder-text-dark focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-md bg-gold-gradient text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <span>AUTHENTICATE & ENTER</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-text-muted mt-6">
          VANIX Security Protocol &bull; Encrypted Session Layer
        </p>
      </div>
    </div>
  );
}
