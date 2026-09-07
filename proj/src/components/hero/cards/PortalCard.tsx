"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function PortalCard() {
  return (
    <div className="sg-card p-3.5 w-full h-full flex items-center gap-3.5 group hover:border-[#E5B869]/60 transition-all duration-300">
      {/* Radiant Glowing Golden Doorway Artwork */}
      <div className="relative w-20 h-24 rounded-xl bg-[#090F1C] border border-[#E5B869]/30 shrink-0 overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(229,184,105,0.2)]">
        {/* Doorway Light Beam Radiance */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-500/25 to-amber-300/40 animate-pulse-glow" />

        {/* Golden Door Frame */}
        <div className="relative w-11 h-18 border-t-2 border-x-2 border-[#F5D075] bg-gradient-to-b from-[#FFF5D6] via-[#E5B869] to-[#8C6B1C] shadow-[0_0_25px_rgba(229,184,105,0.7)] flex items-end justify-center pb-0.5">
          {/* Silhouette Figure */}
          <div className="w-5 h-10 bg-[#090E1A] rounded-t-full flex flex-col items-center justify-start pt-1">
            <div className="w-2 h-2 rounded-full bg-[#050810]" />
            <div className="w-3.5 h-6 bg-[#050810] rounded-t-sm" />
          </div>
        </div>

        {/* Ethereal Light rays */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#E5B869]/50 to-transparent" />
      </div>

      {/* Inspirational Transformation Creed */}
      <div className="flex-1 flex flex-col justify-center space-y-0.5">
        <div className="text-xs sm:text-sm font-serif font-bold text-gray-200 leading-snug">
          <span className="text-gray-300">Step in.</span>
          <br />
          <span className="text-[#E5B869]">Upskill.</span>
          <br />
          <span className="text-gray-300">Step out.</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#E5B869] to-[#D4A043]">
            Lead the future.
          </span>
        </div>
      </div>
    </div>
  );
}
