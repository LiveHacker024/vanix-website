"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Users, MessageSquare, CreditCard, PhoneCall, Loader2 } from "lucide-react";
import { GlobalSearchResult } from "@/lib/types";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GlobalSearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/crm/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#141414]">
          <Search className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search inquiries, customers, payments, follow-ups..."
            className="w-full bg-transparent border-none text-white placeholder:text-text-muted focus:outline-none text-sm"
          />
          {loading ? (
            <Loader2 className="w-4 h-4 text-gold animate-spin flex-shrink-0" />
          ) : query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded text-text-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="px-2 py-0.5 rounded bg-surface-2 border border-white/10 text-[10px] text-text-muted">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center text-text-muted text-xs">
              <span>Type a name, company, email, phone number, or transaction ID to search...</span>
            </div>
          )}

          {results && (
            <>
              {/* Inquiries */}
              {results.inquiries.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 mb-2 px-2">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Inquiries ({results.inquiries.length})</span>
                  </h4>
                  <div className="space-y-1">
                    {results.inquiries.map((inq) => (
                      <Link
                        key={inq.id}
                        href={`/admin/inquiries/${inq.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div>
                          <span className="font-bold text-xs text-white group-hover:text-gold block">
                            {inq.name}
                          </span>
                          <span className="text-[11px] text-text-muted">
                            {inq.company ? `${inq.company} • ` : ""}
                            {inq.phone}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-surface-2 border border-white/10 text-text-secondary uppercase font-bold">
                          {inq.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Customers */}
              {results.customers.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 mb-2 px-2">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Customers ({results.customers.length})</span>
                  </h4>
                  <div className="space-y-1">
                    {results.customers.map((cust) => (
                      <Link
                        key={cust.id}
                        href={`/admin/customers/${cust.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div>
                          <span className="font-bold text-xs text-white group-hover:text-gold block">
                            {cust.name}
                          </span>
                          <span className="text-[11px] text-text-muted">
                            {cust.company ? `${cust.company} • ` : ""}
                            {cust.phone}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">
                          ₹{Number(cust.total_paid || 0).toLocaleString()} Paid
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments */}
              {results.payments.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 mb-2 px-2">
                    <CreditCard className="w-3.5 h-3.5 text-gold-bright" />
                    <span>Payments ({results.payments.length})</span>
                  </h4>
                  <div className="space-y-1">
                    {results.payments.map((p) => (
                      <Link
                        key={p.id}
                        href={`/admin/payments/${p.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div>
                          <span className="font-bold text-xs text-white group-hover:text-gold block">
                            ₹{Number(p.amount).toLocaleString()} via {p.method}
                          </span>
                          <span className="text-[11px] text-text-muted">
                            {p.customer_name ? `${p.customer_name} • ` : ""}
                            {p.transaction_id || "No Ref"}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-surface-2 border border-white/10 text-text-secondary uppercase font-bold">
                          {p.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-ups */}
              {results.follow_ups.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 mb-2 px-2">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>Follow-ups ({results.follow_ups.length})</span>
                  </h4>
                  <div className="space-y-1">
                    {results.follow_ups.map((f) => (
                      <Link
                        key={f.id}
                        href="/admin/follow-ups"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div>
                          <span className="font-bold text-xs text-white group-hover:text-gold block">
                            {f.title}
                          </span>
                          <span className="text-[11px] text-text-muted">
                            {f.contact_name ? `${f.contact_name} • ` : ""}
                            {new Date(f.scheduled_at).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-surface-2 border border-white/10 text-text-secondary uppercase font-bold">
                          {f.type}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.inquiries.length === 0 &&
                results.customers.length === 0 &&
                results.payments.length === 0 &&
                results.follow_ups.length === 0 && (
                  <div className="py-8 text-center text-text-muted text-xs">
                    <span>No records found matching &quot;{query}&quot;.</span>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
