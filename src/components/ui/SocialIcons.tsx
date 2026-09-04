import React from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function LinkedinIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-4 h-4", className)}
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function YoutubeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-4 h-4", className)}
      {...props}
    >
      <path d="M21.58 7.19a2.76 2.76 0 0 0-1.94-1.95C17.92 4.75 12 4.75 12 4.75s-5.92 0-7.64.49A2.76 2.76 0 0 0 2.42 7.19C2 8.91 2 12 2 12s0 3.09.42 4.81a2.76 2.76 0 0 0 1.94 1.95c1.72.49 7.64.49 7.64.49s5.92 0 7.64-.49a2.76 2.76 0 0 0 1.94-1.95C22 15.09 22 12 22 12s0-3.09-.42-4.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}
