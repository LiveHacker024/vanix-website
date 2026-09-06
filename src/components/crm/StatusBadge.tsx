import React from "react";
import { cn } from "@/lib/utils";
import { FollowUpStatus, FollowUpType, InquiryStatus, PaymentMethod, PaymentStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: InquiryStatus | FollowUpStatus | PaymentStatus | PaymentMethod | FollowUpType | string;
  type?: "inquiry" | "followup" | "payment" | "payment_method" | "followup_type" | "customer";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StatusBadge({ status, type = "inquiry", className, size = "md" }: StatusBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  const getStyle = () => {
    const s = String(status || "").toUpperCase();

    // Inquiry & Lead Statuses
    if (s === "NEW") {
      return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
    }
    if (s === "CONTACTED") {
      return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    }
    if (s === "QUALIFIED") {
      return "bg-purple-500/15 text-purple-300 border-purple-500/30";
    }
    if (s === "PROPOSAL" || s === "PROPOSAL_SENT") {
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    }
    if (s === "NEGOTIATION") {
      return "bg-orange-500/15 text-orange-300 border-orange-500/30";
    }
    if (s === "WON" || s === "PAID" || s === "COMPLETED" || s === "ACTIVE") {
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    }
    if (s === "LOST" || s === "FAILED" || s === "CANCELLED") {
      return "bg-red-500/15 text-red-300 border-red-500/30";
    }
    if (s === "SPAM" || s === "INACTIVE" || s === "MISSED") {
      return "bg-zinc-700/30 text-zinc-400 border-zinc-600/30";
    }
    if (s === "PENDING") {
      return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
    }
    if (s === "REFUNDED") {
      return "bg-rose-500/15 text-rose-300 border-rose-500/30";
    }

    // Follow-up types & Payment Methods
    if (s === "CALL") return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
    if (s === "WHATSAPP") return "bg-emerald-600/20 text-emerald-300 border-emerald-500/40";
    if (s === "EMAIL") return "bg-sky-500/15 text-sky-300 border-sky-500/30";
    if (s === "MEETING") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    if (s === "UPI") return "bg-green-500/15 text-green-300 border-green-500/30";
    if (s === "BANK_TRANSFER") return "bg-blue-500/15 text-blue-300 border-blue-500/30";

    return "bg-surface-2 text-text-secondary border-white/10";
  };

  const formatLabel = () => {
    const s = String(status || "");
    if (s === "PROPOSAL_SENT") return "PROPOSAL";
    if (s === "BANK_TRANSFER") return "BANK TRANSFER";
    return s.replace(/_/g, " ");
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-md border backdrop-blur-sm whitespace-nowrap",
        sizeClasses[size],
        getStyle(),
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{formatLabel()}</span>
    </span>
  );
}
