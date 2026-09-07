"use client";

import React from "react";
import { Award, ShieldCheck } from "lucide-react";

export default function CertificateCard() {
  return (
    <div className="sg-card p-3.5 w-full h-full flex flex-col justify-between group hover:border-[#E5B869]/60 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-[#E5B869]/15">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#E5B869]" />
          <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            Certificate Earned
          </h3>
        </div>
        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full">
          Verified ✓
        </span>
      </div>

      {/* Certificate Parchment Visual */}
      <div className="w-full relative bg-gradient-to-b from-[#FFFDF9] via-[#F5EFE0] to-[#E8DCBF] text-[#2C2416] p-2.5 my-1.5 rounded-xl border-2 border-[#D4AF37] shadow-[0_6px_20px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Ornate inner border */}
        <div className="border border-[#B8860B]/40 p-2 rounded-lg flex flex-col items-center justify-center text-center relative bg-[#FFFDF9]/60 backdrop-blur-sm">

          <div className="text-[8px] tracking-[0.2em] font-serif uppercase font-black text-[#8C6B1C] mb-0.5">
            CERTIFICATE
          </div>
          <div className="text-[6.5px] tracking-wider text-[#5C4515] uppercase font-bold mb-1">
            OF ACHIEVEMENT
          </div>

          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#8C6B1C] to-transparent my-0.5" />

          <div className="font-serif font-bold text-xs text-[#1C150A] my-0.5 tracking-wide">
            AI in Finance
          </div>

          <div className="text-[7.5px] font-bold text-[#8C6B1C] tracking-wide uppercase">
            ADVANCED CERTIFICATION
          </div>

          {/* Golden Ribbon Medal Stamp */}
          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-gradient-to-br from-[#FFF0C0] via-[#E5B869] to-[#996515] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#D4AF37] rounded-full flex items-center justify-center border border-[#FFF0C0]">
              <Award className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
