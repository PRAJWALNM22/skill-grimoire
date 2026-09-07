"use client";

import React from "react";
import { CheckCircle2, Award } from "lucide-react";

export default function SkillProgressCard() {
  const percentage = 85;
  // Use a slightly smaller radius so the stroke (width 8) fits cleanly inside the 120-unit viewBox
  const r = 46;
  const circumference = 2 * Math.PI * r; // ~289.03
  const offset = circumference * (1 - percentage / 100); // ~43.35

  const domains = ["Finance", "Marketing", "HR", "AI Tools"];

  return (
    <div className="sg-card p-4 w-full h-full flex flex-col group hover:border-[#E5B869]/60 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E5B869]/15">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#E5B869]" />
          <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            Skill Progress
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-emerald-400">Mastery</span>
        </div>
      </div>

      {/* Radial Donut — pure SVG, no CSS gradient on text (cross-browser safe) */}
      <div className="flex items-center justify-center flex-1 py-2">
        <div className="relative w-32 h-32">
          <svg
            className="w-full h-full"
            viewBox="0 0 120 120"
            aria-label="85% overall skill progress"
          >
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF5D6" />
                <stop offset="50%" stopColor="#E5B869" />
                <stop offset="100%" stopColor="#C69234" />
              </linearGradient>
            </defs>

            {/* Background track */}
            <circle
              cx="60" cy="60" r={r}
              fill="none"
              stroke="#1a2845"
              strokeWidth="8"
            />

            {/* Progress arc — rotated so it starts at 12 o'clock */}
            <circle
              cx="60" cy="60" r={r}
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
              className="transition-all duration-1000 ease-out"
            />

            {/* Centre percentage — plain solid colour so it's always visible */}
            <text
              x="60" y="55"
              textAnchor="middle" dominantBaseline="middle"
              fontSize="22" fontWeight="800"
              fill="#F5D075"
              fontFamily="serif"
            >
              85%
            </text>

            {/* Sub-label — solid colour, never obscured by gradient */}
            <text
              x="60" y="72"
              textAnchor="middle" dominantBaseline="middle"
              fontSize="7" fontWeight="600"
              letterSpacing="0.08em"
              fill="#9CA3AF"
              fontFamily="sans-serif"
            >
              OVERALL PROGRESS
            </text>
          </svg>
        </div>
      </div>

      {/* Domain checklist 2×2 */}
      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-[#E5B869]/15">
        {domains.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 bg-[#0e1627]/70 border border-[#E5B869]/15 rounded-lg px-2 py-1.5 group-hover:border-[#E5B869]/30 transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
            <span className="text-[11px] font-medium text-gray-200 truncate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
