"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CinematicVideoProps {
  src: string;
  poster?: string;
  className?: string;
  containerClassName?: string;
  overlayClassName?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  priority?: boolean;
  showControls?: boolean;
  vignette?: boolean;
  aspectRatio?: "16/9" | "auto" | "full";
  objectFit?: "cover" | "contain";
}

export function CinematicVideo({
  src,
  poster,
  className,
  containerClassName,
  overlayClassName,
  autoPlay = true,
  loop = true,
  muted = true,
  priority = false,
  showControls = false,
  vignette = true,
  aspectRatio = "16/9",
  objectFit = "cover",
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If priority (like Hero), load immediately
    if (priority) {
      setIsInView(true);
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (videoRef.current && autoPlay) {
              videoRef.current.play().catch(() => {
                // Autoplay policy fallback
              });
            }
          } else {
            // When scrolled away, pause video to save CPU/GPU cycles
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        rootMargin: "250px 0px 250px 0px", // Preload slightly before entering viewport
        threshold: 0.05,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [autoPlay, priority]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const aspectClass =
    aspectRatio === "16/9"
      ? "aspect-video"
      : aspectRatio === "full"
      ? "h-full w-full"
      : "";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-surface-2 rounded-xl select-none",
        aspectClass,
        containerClassName
      )}
    >
      {/* Loading Skeleton / Poster */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-surface-2 flex items-center justify-center animate-pulse z-0">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}

      {isInView && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          controls={showControls}
          preload={priority ? "auto" : "metadata"}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-full transition-opacity duration-700",
            objectFit === "cover" ? "object-cover" : "object-contain",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
        />
      )}

      {/* Cinematic Edge Vignette Overlay */}
      {vignette && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-transparent to-background/30",
            overlayClassName
          )}
        />
      )}
    </div>
  );
}
