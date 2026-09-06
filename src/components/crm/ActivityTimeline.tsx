import React from "react";
import { ActivityLogRecord } from "@/lib/types";
import {
  Clock,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  CreditCard,
  UserCheck,
  RefreshCw,
  FileText,
} from "lucide-react";

interface ActivityTimelineProps {
  activities: ActivityLogRecord[];
  className?: string;
}

export function ActivityTimeline({ activities, className }: ActivityTimelineProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted text-xs">
        <Clock className="w-5 h-5 mx-auto mb-2 opacity-50" />
        <span>No activity recorded yet.</span>
      </div>
    );
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "INQUIRY_CREATED":
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
      case "STATUS_CHANGED":
        return <RefreshCw className="w-3.5 h-3.5 text-purple-400" />;
      case "FOLLOWUP_SCHEDULED":
      case "FOLLOWUP_COMPLETED":
        return <PhoneCall className="w-3.5 h-3.5 text-amber-400" />;
      case "CONVERTED_TO_CUSTOMER":
      case "CUSTOMER_CREATED":
        return <UserCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case "PAYMENT_RECORDED":
        return <CreditCard className="w-3.5 h-3.5 text-gold-bright" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-text-muted" />;
    }
  };

  return (
    <div className={`flow-root ${className || ""}`}>
      <ul className="-mb-6">
        {activities.map((activity, idx) => (
          <li key={activity.id || idx}>
            <div className="relative pb-6">
              {idx !== activities.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-white/10"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3 items-start">
                <div>
                  <span className="h-8 w-8 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center ring-4 ring-background">
                    {getActionIcon(activity.action)}
                  </span>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="text-xs font-medium text-white flex items-center justify-between">
                    <span className="font-bold text-text-primary uppercase tracking-wider text-[11px]">
                      {activity.action.replace(/_/g, " ")}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {new Date(activity.created_at).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed font-light">
                    {activity.description}
                  </p>
                  {activity.actor && (
                    <span className="mt-1 text-[10px] text-text-muted block">
                      By: <strong className="text-gold font-normal">{activity.actor}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
