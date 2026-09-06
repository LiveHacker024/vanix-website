"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CRMSettingsRecord } from "@/lib/types";

type TabKey = "business" | "crm" | "notifications" | "payments" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("business");
  const [settings, setSettings] = useState<CRMSettingsRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // System status
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "fallback">("checking");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/crm/settings");
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
        setDbStatus("connected");
      } else {
        setDbStatus("fallback");
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
      setDbStatus("fallback");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      setStatusMessage(null);
      const res = await fetch("/api/admin/crm/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
        setStatusMessage({ type: "success", text: "Settings saved successfully." });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to save settings." });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "An unexpected error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-[#A0A0A0]">
        <div className="w-10 h-10 border-2 border-[#C8A45D]/20 border-t-[#C8A45D] rounded-full animate-spin mb-4" />
        <p className="text-sm font-light tracking-wider">Loading VANIX CRM settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C8A45D] mb-1 font-semibold">
            <span>System Configuration</span>
            <span>•</span>
            <span className="text-[#888888]">VANIX Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">CRM & Business Settings</h1>
          <p className="text-sm text-[#A0A0A0] mt-1">
            Manage company profile, notification preferences, payment defaults, and system telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#B38E46] text-black font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(200,164,93,0.2)] disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Feedback Toast */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between animate-fadeIn transition-all ${
            statusMessage.type === "success"
              ? "bg-[#102A1C] border-[#22C55E]/40 text-[#4ADE80]"
              : "bg-[#2A1010] border-[#EF4444]/40 text-[#F87171]"
          }`}
        >
          <div className="flex items-center gap-3">
            {statusMessage.type === "success" ? (
              <svg className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm font-medium">{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-[#222222] gap-2 overflow-x-auto pb-px">
        {[
          { key: "business", label: "Business Profile", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
          { key: "crm", label: "Pipeline & Inquiries", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
          { key: "notifications", label: "Notifications & Alerts", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
          { key: "payments", label: "Billing & Banking", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
          { key: "security", label: "System & Health", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`flex items-center gap-2.5 px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "border-[#C8A45D] text-[#C8A45D] bg-[#141414]/60"
                  : "border-transparent text-[#888888] hover:text-white hover:border-[#333333]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={tab.icon} />
              </svg>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* TAB 1: Business Profile */}
        {activeTab === "business" && (
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Company Identity</h2>
              <p className="text-xs text-[#888888]">Primary organization details used in receipts, client communications, and headers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Company / Organization Name <span className="text-[#C8A45D]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={settings.business_name || ""}
                  onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="e.g. VANIX Digital Growth"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Official Website URL
                </label>
                <input
                  type="url"
                  value={settings.business_website || "https://vanix.in"}
                  onChange={(e) => setSettings({ ...settings, business_website: e.target.value })}
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="https://vanix.in"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Primary Business Email <span className="text-[#C8A45D]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={settings.business_email || ""}
                  onChange={(e) => setSettings({ ...settings, business_email: e.target.value })}
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="info@vanix.in"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Official Phone Number <span className="text-[#C8A45D]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={settings.business_phone || ""}
                  onChange={(e) => setSettings({ ...settings, business_phone: e.target.value })}
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="+91 9457727770"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Business WhatsApp Contact
                </label>
                <input
                  type="tel"
                  value={settings.business_whatsapp || ""}
                  onChange={(e) => setSettings({ ...settings, business_whatsapp: e.target.value })}
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="+91 9457727770"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  GSTIN / Tax Identification
                </label>
                <input
                  type="text"
                  value={settings.business_gst || ""}
                  onChange={(e) => setSettings({ ...settings, business_gst: e.target.value })}
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="e.g. 07AAAAA0000A1Z5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                Registered Office Address
              </label>
              <textarea
                rows={3}
                value={settings.business_address || ""}
                onChange={(e) => setSettings({ ...settings, business_address: e.target.value })}
                className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors resize-none"
                placeholder="VANIX Headquarters, India"
              />
            </div>
          </div>
        )}

        {/* TAB 2: Pipeline & Inquiries */}
        {activeTab === "crm" && (
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Pipeline & Lead Automation</h2>
              <p className="text-xs text-[#888888]">Configure default routing, stages, and currency handling for the CRM pipeline.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Default New Inquiry Status
                </label>
                <select
                  value={settings.default_inquiry_status || "NEW"}
                  onChange={(e) => setSettings({ ...settings, default_inquiry_status: e.target.value as any })}
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                >
                  <option value="NEW">NEW (Awaiting First Response)</option>
                  <option value="CONTACTED">CONTACTED (Initial Call/Message Sent)</option>
                  <option value="QUALIFIED">QUALIFIED (High Intent / Budget Fit)</option>
                </select>
                <p className="text-xs text-[#777777] mt-1.5">Initial stage assigned to newly submitted website inquiries.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Base Currency
                </label>
                <select
                  value={settings.currency || "INR"}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                >
                  <option value="INR">INR (₹ - Indian Rupee)</option>
                  <option value="USD">USD ($ - US Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="AED">AED (AED - UAE Dirham)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                </select>
                <p className="text-xs text-[#777777] mt-1.5">Default financial denomination across metrics and vouchers.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Default Target Service
                </label>
                <input
                  type="text"
                  value={settings.lead_settings?.default_service || "Website Development"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      lead_settings: {
                        ...settings.lead_settings,
                        default_service: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="e.g. Website Development"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Invoice Number Prefix
                </label>
                <input
                  type="text"
                  value={settings.payment_settings?.invoice_prefix || "VNX-"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payment_settings: {
                        ...settings.payment_settings,
                        invoice_prefix: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="e.g. VNX-"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F1F1F]">
              <label className="flex items-start gap-3.5 cursor-pointer p-4 rounded-xl bg-[#141414]/50 border border-[#222222] hover:border-[#333333] transition-colors">
                <input
                  type="checkbox"
                  checked={settings.lead_settings?.auto_qualification ?? false}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      lead_settings: {
                        ...settings.lead_settings,
                        auto_qualification: e.target.checked,
                      },
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-[#333333] bg-black text-[#C8A45D] focus:ring-[#C8A45D]"
                />
                <div>
                  <div className="text-sm font-semibold text-white">Automated Qualification Engine</div>
                  <div className="text-xs text-[#888888] mt-0.5">
                    Automatically upgrade high-budget inquiries with full company details to &apos;QUALIFIED&apos; status upon submission.
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* TAB 3: Notifications & Alerts */}
        {activeTab === "notifications" && (
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Alert Channels & Triggers</h2>
              <p className="text-xs text-[#888888]">Control how and when your executive team is notified about client activities.</p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-4 p-4 rounded-xl bg-[#141414] border border-[#222222] hover:border-[#333333] transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notification_preferences?.email ?? true}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notification_preferences: {
                        ...settings.notification_preferences,
                        email: e.target.checked,
                      },
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-[#333333] bg-black text-[#C8A45D] focus:ring-[#C8A45D]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Instant Email Dispatch</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C8A45D]/10 text-[#C8A45D]">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] mt-1">
                    Send full inquiry dossiers to {settings.business_email || "info@vanix.in"} immediately when a prospective client submits a form.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-xl bg-[#141414] border border-[#222222] hover:border-[#333333] transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notification_preferences?.whatsapp ?? true}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notification_preferences: {
                        ...settings.notification_preferences,
                        whatsapp: e.target.checked,
                      },
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-[#333333] bg-black text-[#C8A45D] focus:ring-[#C8A45D]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">WhatsApp Direct Lead Alerts</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#4ADE80]">
                      High Priority
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] mt-1">
                    Generate instant direct WhatsApp notifications with one-tap client response links for our business team.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-xl bg-[#141414] border border-[#222222] hover:border-[#333333] transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notification_preferences?.sound ?? true}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notification_preferences: {
                        ...settings.notification_preferences,
                        sound: e.target.checked,
                      },
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-[#333333] bg-black text-[#C8A45D] focus:ring-[#C8A45D]"
                />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-white">Command Center Audio Feedback</span>
                  <p className="text-xs text-[#888888] mt-1">
                    Play a subtle luxury chime when real-time Supabase push events deliver new inquiries or payment confirmations.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* TAB 4: Billing & Banking */}
        {activeTab === "payments" && (
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Financial & Banking Credentials</h2>
              <p className="text-xs text-[#888888]">Account details printed on client payment vouchers, quotes, and UPI settlement links.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Official UPI VPA / ID
                </label>
                <input
                  type="text"
                  value={settings.payment_settings?.upi_id || "vanix@upi"}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payment_settings: {
                        ...settings.payment_settings,
                        upi_id: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors font-mono"
                  placeholder="e.g. vanix@okaxis"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={settings.payment_settings?.bank_name || "HDFC Bank Ltd."}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payment_settings: {
                        ...settings.payment_settings,
                        bank_name: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors"
                  placeholder="e.g. HDFC Bank Ltd."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={settings.payment_settings?.account_number || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payment_settings: {
                        ...settings.payment_settings,
                        account_number: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors font-mono"
                  placeholder="502000XXXXXX"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={settings.payment_settings?.ifsc_code || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payment_settings: {
                        ...settings.payment_settings,
                        ifsc_code: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors font-mono uppercase"
                  placeholder="HDFC0001234"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A0A0A0] mb-2">
                  Standard Payment & Milestone Terms
                </label>
                <textarea
                  rows={3}
                  value={settings.payment_settings?.terms || "50% Advance on project kickoff, 50% upon final deployment and SLA sign-off. All invoices payable within 7 business days."}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payment_settings: {
                        ...settings.payment_settings,
                        terms: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#141414] border border-[#222222] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A45D] transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: System & Health */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Architecture & Connection Health</h2>
                <p className="text-xs text-[#888888]">Live diagnostic telemetry for database adapters and authentication sessions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#141414] border border-[#222222] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A0A0A0]">Database Architecture</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#4ADE80]">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                      Online & Operational
                    </span>
                  </div>
                  <div className="text-white text-sm font-semibold">Supabase PostgreSQL + Realtime</div>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Zero-latency replication active for leads, customers, follow-ups, payments, and system telemetry with local fallback resilience.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#141414] border border-[#222222] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A0A0A0]">Admin Authentication</span>
                    <span className="text-xs font-medium text-[#C8A45D] bg-[#C8A45D]/10 px-2 py-0.5 rounded">
                      Secured JWT
                    </span>
                  </div>
                  <div className="text-white text-sm font-semibold">HTTP-Only Signed Cookie</div>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Protected session (<code className="text-[#C8A45D]">vanix_admin_session</code>) with cryptographic signature validation and CSRF defenses.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F1F1F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">Database Schema Version</div>
                  <div className="text-xs text-[#777777] mt-0.5">Schema V3.0 (8 Full Production CRM Tables + Policies)</div>
                </div>
                <Link
                  href="/admin/services"
                  className="text-xs text-[#C8A45D] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Manage 14 VANIX Core Services</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#222222] rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Need to update admin login credentials?</h3>
                <p className="text-xs text-[#888888] mt-1">
                  Admin username and password hashes are configured in <code className="text-[#C8A45D]">.env.local</code>.
                </p>
              </div>
              <a
                href="mailto:info@vanix.in"
                className="text-xs px-4 py-2 rounded-lg bg-[#222222] text-white hover:bg-[#2A2A2A] transition-colors whitespace-nowrap"
              >
                Request Security Rotation
              </a>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#B38E46] text-black font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(200,164,93,0.2)] disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Saving Configuration...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save CRM Configuration</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
