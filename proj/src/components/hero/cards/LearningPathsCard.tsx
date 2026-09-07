"use client";

import React from "react";
import { GraduationCap, BookOpen, ChevronRight, Briefcase, TrendingUp, Users } from "lucide-react";

export default function LearningPathsCard() {
  return (
    <div className="sg-card p-3.5 w-full h-full flex flex-col justify-between group hover:border-[#E5B869]/60 transition-all duration-300">
      <div className="flex items-center justify-between pb-1.5 border-b border-[#E5B869]/15">
        <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
          Learning Paths for School Students
        </h3>
        <span className="text-[10px] text-[#E5B869] uppercase font-bold tracking-wider">
          Tracks
        </span>
      </div>

      {/* Pathways List */}
      <div className="space-y-2 my-1">
        {/* Track 1 */}
        <div className="p-2 rounded-xl bg-[#10192A]/90 border border-[#E5B869]/20 hover:border-[#E5B869]/50 hover:bg-[#142036] transition flex items-center justify-between cursor-pointer group/track">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#E5B869]/15 border border-[#E5B869]/40 flex items-center justify-center shrink-0">
              <GraduationCap className="w-3.5 h-3.5 text-[#E5B869]" />
            </div>
            <div className="truncate">
              <h4 className="text-xs font-semibold text-white group-hover/track:text-[#E5B869] transition truncate">
                After 10th - Career Guidance
              </h4>
              <p className="text-[10px] text-gray-400 truncate">
                Discover the right path. Plan your bright future.
              </p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#E5B869] group-hover/track:translate-x-1 transition shrink-0 ml-1" />
        </div>

        {/* Track 2 */}
        <div className="p-2 rounded-xl bg-[#10192A]/90 border border-[#E5B869]/20 hover:border-[#E5B869]/50 hover:bg-[#142036] transition flex items-center justify-between cursor-pointer group/track">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#E5B869]/15 border border-[#E5B869]/40 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-[#E5B869]" />
            </div>
            <div className="truncate">
              <h4 className="text-xs font-semibold text-white group-hover/track:text-[#E5B869] transition truncate">
                11th & 12th - Basic AI Skills
              </h4>
              <p className="text-[10px] text-gray-400 truncate">
                Build a strong foundation in AI for tomorrow.
              </p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#E5B869] group-hover/track:translate-x-1 transition shrink-0 ml-1" />
        </div>
      </div>

      {/* Core Domains Footer */}
      <div className="pt-2 border-t border-[#E5B869]/15 flex items-center justify-between text-[10px] text-gray-300">
        <span className="font-semibold text-gray-400 uppercase tracking-wider text-[9px]">
          Core Domains
        </span>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 text-gray-200 hover:text-[#E5B869] transition">
            <Briefcase className="w-3 h-3 text-[#E5B869]" /> Finance
          </span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-1 text-gray-200 hover:text-[#E5B869] transition">
            <TrendingUp className="w-3 h-3 text-[#E5B869]" /> Marketing
          </span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-1 text-gray-200 hover:text-[#E5B869] transition">
            <Users className="w-3 h-3 text-[#E5B869]" /> HR
          </span>
        </div>
      </div>
    </div>
  );
}
