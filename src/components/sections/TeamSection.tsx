"use client";

import React, { useState } from "react";
import Image from "next/image";
import { teamMembers, TeamMember } from "@/config/team";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamMemberModal } from "@/components/ui/TeamMemberModal";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section
      id="team"
      className="relative py-24 sm:py-32 bg-surface-1 border-b border-white/5 overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="ambient-gold-glow top-1/3 left-1/4 opacity-15" />
      <div className="ambient-gold-glow bottom-10 right-1/4 opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="OUR SPECIALISTS"
          title="VANIX EXPERT TEAM"
          subtitle="Meet the people working behind VANIX to help businesses build, grow and manage their digital presence."
          align="center"
          size="large"
        />

        {/* 2-Column Responsive Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mt-14">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative rounded-2xl bg-surface-2/80 hover:bg-surface-2 border border-white/10 hover:border-gold/50 transition-all duration-500 p-6 sm:p-7 flex flex-col justify-between card-depth shadow-xl"
            >
              {/* Gold Top Accent Line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold/40 group-hover:via-gold to-transparent transition-all duration-500" />

              <div>
                {/* Member Top Row: Photo + Core Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  {/* Photo Container */}
                  <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden glass-panel-gold border border-gold/30 flex-shrink-0 group-hover:border-gold/70 transition-colors shadow-md">
                    <Image
                      src={member.image}
                      alt={member.altText}
                      fill
                      sizes="(max-width: 640px) 112px, 128px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Name, Role & Badge */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-[10px] font-bold text-gold uppercase tracking-widest mb-2">
                      <Sparkles className="w-3 h-3 text-gold-bright" />
                      <span>{member.badge}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wide group-hover:text-gold transition-colors">
                      {member.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-gold-bright mt-0.5">
                      {member.role}
                    </p>

                    <p className="text-xs text-text-secondary font-light leading-relaxed mt-3 line-clamp-3">
                      {member.shortBio}
                    </p>
                  </div>
                </div>

                {/* Skill & Expertise Tags */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
                    Core Focus & Capabilities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-3/90 border border-white/5 text-[11px] text-text-secondary font-medium group-hover:border-gold/20 transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3 text-gold/70 flex-shrink-0" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-text-muted">
                  Verified Team Profile
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-3 hover:bg-gold-gradient text-text-secondary hover:text-black border border-white/10 hover:border-gold text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group/btn"
                  aria-label={`View full profile of ${member.name}`}
                >
                  <span>VIEW PROFILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover/btn:text-black transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}
