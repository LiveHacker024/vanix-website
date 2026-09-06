import React from "react";
import { LucideIcon, Inbox, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl bg-[#0B0B0B]/80 border border-white/5 shadow-inner",
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-[#14120B] border border-gold/20 flex items-center justify-center text-gold mb-4 shadow-sm">
        <Icon className="w-6 h-6 text-[#E5C07B]" />
      </div>
      <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wide mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-text-muted max-w-sm leading-relaxed mb-6 font-light">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-black hover:bg-gold-bright text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-gold/10 hover:shadow-gold/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
