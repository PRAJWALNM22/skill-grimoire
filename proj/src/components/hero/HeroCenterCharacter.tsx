"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function HeroCenterCharacter() {
  return (
    // Fill the parent cell entirely; overflow is clipped by parent
    <div className="sg-card w-full h-full flex flex-col items-center justify-center gap-6 p-3 relative group hover:border-[#E5B869]/60 transition-all duration-300 overflow-hidden">

      {/* Ambient Backlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-t from-[#E5B869]/20 via-[#E5B869]/08 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Live Badge */}
      <div className="relative z-10 flex items-center gap-1 bg-[#10192A]/90 border border-[#E5B869]/35 rounded-full px-2.5 py-0.5 self-center">
        <Sparkles className="w-2.5 h-2.5 text-[#E5B869] animate-pulse" />
        <span className="text-[8px] font-bold text-[#E5B869] tracking-wider uppercase">
          Live Learning Session
        </span>
      </div>

      {/* Laptop Screen */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-28 h-18 bg-[#0B1324] border-2 border-[#E5B869]/55 rounded-t-xl shadow-[0_0_30px_rgba(229,184,105,0.5)] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#182B52] via-[#0E1A33] to-[#070D1A]" />
          <div className="relative z-10 w-12 h-12 drop-shadow-[0_0_12px_rgba(229,184,105,0.9)]">
            <Image src="/logo.png" alt="Skill Grimoire" fill className="object-contain" priority />
          </div>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400/90 shadow-[0_0_4px_#60A5FA]" />
        </div>
        {/* Keyboard deck */}
        <div className="w-34 h-1.5 bg-gradient-to-r from-[#1E293B] via-[#334155] to-[#1E293B] rounded-b-md border-t border-[#E5B869]/30" />
      </div>

    </div>
  );
}
