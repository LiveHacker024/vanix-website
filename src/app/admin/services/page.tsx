"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Search,
  Globe,
  ShoppingCart,
  Layers,
  MapPin,
  Megaphone,
  BarChart3,
  Compass,
  Headphones,
  Check,
} from "lucide-react";
import { ServiceRecord } from "@/lib/types";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/crm/services");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setServices(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      // Optimistic update
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_active: !currentStatus } : s))
      );

      await fetch(`/api/admin/crm/services/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentStatus }),
      });
      fetchServices();
    } catch (err) {
      console.error(err);
      fetchServices();
    }
  };

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-gold-bright" />
            <span>Official Solution Catalog</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Services &amp; Digital Capabilities ({services.length})
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 font-light">
            Active digital infrastructure, marketing systems, and strategy modules offered by VANIX.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchServices}
          className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-white/10 text-text-secondary hover:text-white"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0E0E0E] border border-white/10 max-w-md relative">
        <Search className="w-4 h-4 text-text-muted absolute left-7 top-7" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter services by name or category..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141414] border border-white/10 text-white placeholder:text-text-muted text-xs focus:border-gold focus:outline-none"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              service.is_active
                ? "bg-[#0E0E0E] border-white/10 hover:border-gold/40"
                : "bg-[#080808] border-white/5 opacity-50 hover:opacity-80"
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-[10px] font-bold uppercase tracking-wider text-gold">
                  {service.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    service.is_active
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {service.is_active ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-white tracking-wide mt-2">
                {service.name}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed font-light mt-1.5">
                {service.description}
              </p>
            </div>

            {/* Toggle Status Button */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-text-muted">Inquiry Eligibility:</span>
              <button
                type="button"
                onClick={() => handleToggle(service.id, service.is_active)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  service.is_active
                    ? "bg-surface-2 hover:bg-red-500/20 hover:text-red-400 text-text-secondary border border-white/10"
                    : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
                }`}
              >
                {service.is_active ? (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Disable</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Enable</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
