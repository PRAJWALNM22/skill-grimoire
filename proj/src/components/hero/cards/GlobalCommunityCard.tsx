"use client";

import React from "react";
import { Globe, Users } from "lucide-react";
import dynamic from "next/dynamic";

const MapChart = dynamic(() => import("./MapChart"), { ssr: false });

export default function GlobalCommunityCard() {
  return (
    <div className="sg-card p-3.5 w-full h-full flex flex-col justify-between group hover:border-[#E5B869]/60 transition-all duration-300">
      <div className="flex items-center justify-between pb-1 border-b border-[#E5B869]/15">
        <div className="flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-[#E5B869]" />
          <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            Global Community
          </h3>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-[#E5B869] font-medium bg-[#E5B869]/10 px-2 py-0.5 rounded-full border border-[#E5B869]/25">
          <Users className="w-3 h-3" /> 24k+ Active
        </span>
      </div>

      {/* Interactive World Map via react-simple-maps */}
      <div className="relative w-full flex-1 min-h-[120px] my-2 rounded-xl bg-[#090F1C] border border-[#E5B869]/20 flex items-center justify-center overflow-hidden">
        {/* World Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#E5B869_1px,transparent_1px)] [background-size:10px_10px] opacity-25" />

        {/* Interactive World Map via react-simple-maps */}
        <div className="absolute inset-0">
          <MapChart />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#090F1C] via-transparent to-transparent pointer-events-none" />
      </div>

      <p className="text-[10px] text-center text-gray-300 font-medium tracking-wide pt-0.5">
        Learn. Connect. Grow. Together.
      </p>
    </div>
  );
}
