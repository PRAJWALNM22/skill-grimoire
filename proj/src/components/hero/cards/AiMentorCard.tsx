"use client";

import React from "react";
import { Bot, Sparkles } from "lucide-react";

export default function AiMentorCard() {
  return (
    <div className="sg-card p-3.5 w-full h-full flex flex-col justify-between items-center text-center group hover:border-[#E5B869]/60 transition-all duration-300">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between pb-1 border-b border-[#E5B869]/15">
        <div className="flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-[#E5B869]" />
          <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            AI Mentor
          </h3>
        </div>
        <span className="text-[10px] text-[#E5B869] font-medium bg-[#E5B869]/10 px-2 py-0.5 rounded-full border border-[#E5B869]/25">
          24/7 Active
        </span>
      </div>

      {/* Hologram AI Avatar with Concentric Rotating Gold Rings */}
      <div className="relative w-24 h-24 my-2 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-[#E5B869]/30 border-dashed animate-spin-slow" />

        {/* Middle Ring with Orbiting Nodes */}
        <div className="absolute inset-2 rounded-full border border-[#F5D075]/40 animate-spin-reverse-slow">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFF1C5] shadow-[0_0_8px_#E5B869]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E5B869] shadow-[0_0_6px_#E5B869]" />
        </div>

        {/* Ambient Hologram Glow */}
        <div className="absolute inset-3 rounded-full bg-[#E5B869]/20 blur-md animate-pulse-glow" />

        {/* AI Avatar Core */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-[#1E2C4A] to-[#0D1525] border-2 border-[#E5B869] flex items-center justify-center shadow-[0_0_20px_rgba(229,184,105,0.5)] overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/25 via-transparent to-transparent">
            {/* Stylized AI Mentor Silhouette / Graphic */}
            <svg className="w-8 h-8 text-[#FFF1C5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
              <path d="M6 15v-1a6 6 0 0 1 12 0v1" />
              <circle cx="12" cy="7" r="1" fill="#E5B869" />
              <path d="M9 19h6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="w-full pt-1 border-t border-[#E5B869]/15">
        <p className="text-[11px] text-gray-300 font-medium leading-snug">
          Your personal guide for smarter learning
        </p>
      </div>
    </div>
  );
}
