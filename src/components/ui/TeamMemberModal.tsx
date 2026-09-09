"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { TeamMember } from "@/config/team";
import {
  X,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  Wrench,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";

interface TeamMemberModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-name"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-surface-2/95 border border-gold/40 shadow-2xl z-10 max-h-[90vh] overflow-y-auto card-depth">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-surface-3/90 hover:bg-gold/20 text-text-muted hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
          aria-label="Close Profile Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8">
          {/* Header Profile Hero */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-white/10">
            {/* Portrait Image */}
            <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-xl overflow-hidden glass-panel-gold border border-gold/40 flex-shrink-0 shadow-lg group">
              <Image
                src={member.image}
                alt={member.altText}
                fill
                sizes="(max-width: 640px) 144px, 160px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Profile Header Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-bright" />
                <span>{member.badge}</span>
              </div>

              <h3
                id="team-modal-name"
                className="text-2xl sm:text-3xl font-display font-bold uppercase text-white tracking-wide"
              >
                {member.name}
              </h3>

              <p className="text-sm font-semibold text-gold mt-1">
                {member.role}
              </p>

              <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed mt-3">
                {member.fullBio}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start mt-4">
                {member.expertise.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-surface-3 border border-white/10 text-[11px] font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Body Sections */}
          <div className="space-y-6 pt-6">
            {/* VANIX Responsibility */}
            <div className="p-4 rounded-xl bg-surface-3/60 border border-gold/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-gold-bright" />
                <span>VANIX Responsibilities & Focus</span>
              </h4>
              <ul className="space-y-2 text-xs text-text-secondary">
                {member.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Tools & Skills Matrix */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-gold-bright" />
                <span>Technical & Domain Skills</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.technicalTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-surface-3 border border-white/5 text-xs text-text-secondary font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Project Highlights */}
            {member.projectHighlights && member.projectHighlights.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-3 flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-gold-bright" />
                  <span>Key Project Highlights</span>
                </h4>
                <div className="space-y-2">
                  {member.projectHighlights.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-surface-3/40 border border-white/5 text-xs text-text-secondary leading-relaxed"
                    >
                      {proj}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education, Experience & Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Education */}
              <div className="p-4 rounded-xl bg-surface-3/40 border border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2.5 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold-bright" />
                  <span>Education</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary">
                  {member.education.map((edu, idx) => (
                    <li key={idx} className="leading-relaxed">
                      • {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications (if present) */}
              {member.certifications && member.certifications.length > 0 && (
                <div className="p-4 rounded-xl bg-surface-3/40 border border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2.5 flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold-bright" />
                    <span>Certifications</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-secondary">
                    {member.certifications.map((cert, idx) => (
                      <li key={idx} className="leading-relaxed">
                        • {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Experience Highlights */}
              {member.experienceHighlights && member.experienceHighlights.length > 0 && (
                <div className={`p-4 rounded-xl bg-surface-3/40 border border-white/5 ${(!member.certifications || member.certifications.length === 0) ? '' : 'md:col-span-2'}`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2.5 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gold-bright" />
                    <span>Experience Background</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-secondary">
                    {member.experienceHighlights.map((exp, idx) => (
                      <li key={idx} className="leading-relaxed">
                        • {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Bottom Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-text-muted text-center sm:text-left">
                Verified member of the <strong className="text-white">VANIX</strong> growth & engineering team.
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <GoldButton
                  href="#contact"
                  size="sm"
                  variant="primary"
                  onClick={onClose}
                  className="w-full sm:w-auto text-center"
                >
                  START YOUR PROJECT
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
