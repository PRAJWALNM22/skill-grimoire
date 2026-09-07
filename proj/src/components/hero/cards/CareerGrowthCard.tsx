"use client";

import React from "react";
import { TrendingUp, Star, Award } from "lucide-react";

export default function CareerGrowthCard() {
  const steps = ["Learn", "Practice", "Certify", "Apply", "Lead"];

  return (
    <div className="sg-card p-3.5 w-full h-full flex flex-col justify-between group hover:border-[#E5B869]/60 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-[#E5B869]/15">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-[#E5B869]" />
          <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            Career Growth
          </h3>
        </div>
        <span className="text-[10px] text-[#E5B869] font-bold bg-[#E5B869]/10 border border-[#E5B869]/25 px-2 py-0.5 rounded-full">
          10x Trajectory
        </span>
      </div>

      <p className="text-[11px] text-gray-300 my-1">
        Your journey from learning to leading.
      </p>

      {/* Ascending Golden Growth Chart */}
      <div className="relative w-full h-22 my-1 rounded-xl bg-[#090F1C] border border-[#E5B869]/20 p-2 flex flex-col justify-between overflow-hidden">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141F35_1px,transparent_1px),linear-gradient(to_bottom,#141F35_1px,transparent_1px)] bg-[size:14px_14px] opacity-35" />

        <svg className="w-full h-full" viewBox="0 0 240 70" fill="none">
          {/* Gradient Fill under curve */}
          <path
            d="M 10 60 L 60 48 L 110 40 L 165 24 L 225 8 L 225 65 L 10 65 Z"
            fill="url(#chartGlow)"
            opacity="0.35"
          />

          {/* Glowing Ascending Path Line */}
          <path
            d="M 10 60 L 60 48 L 110 40 L 165 24 L 225 8"
            stroke="#E5B869"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Milestone Node Points */}
          <circle cx="10" cy="60" r="3" fill="#E5B869" />
          <circle cx="60" cy="48" r="3" fill="#E5B869" />
          <circle cx="110" cy="40" r="3.5" fill="#E5B869" />
          <circle cx="165" cy="24" r="4" fill="#FFF0C0" />
          <circle cx="225" cy="8" r="6" fill="#FFF0C0" className="animate-ping opacity-75" />
          <circle cx="225" cy="8" r="4.5" fill="#F5D075" />

          <defs>
            <linearGradient id="chartGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E5B869" />
              <stop offset="100%" stopColor="#E5B869" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Star at top summit */}
        <div className="absolute top-1 right-2">
          <Star className="w-3.5 h-3.5 text-[#FFF0C0] fill-[#FFF0C0] animate-pulse" />
        </div>
      </div>

      {/* X-Axis Milestone Labels */}
      <div className="flex items-center justify-between text-[9px] text-gray-400 font-medium pt-1 px-1 border-t border-[#E5B869]/10">
        {steps.map((s, idx) => (
          <span
            key={idx}
            className={idx === steps.length - 1 ? "text-[#E5B869] font-bold" : "text-gray-400"}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
