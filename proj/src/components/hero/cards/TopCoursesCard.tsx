"use client";

import React from "react";
import { Sparkles, TrendingUp } from "lucide-react";

interface CourseItem {
  name: string;
  sub: string;
  progress: number;
}

const courses: CourseItem[] = [
  { name: "AI in Finance", sub: "Smarter financial decisions", progress: 75 },
  { name: "AI in Marketing", sub: "Data-driven AI strategies", progress: 68 },
  { name: "AI in HR", sub: "AI-powered people strategies", progress: 82 },
];

export default function TopCoursesCard() {
  return (
    <div className="sg-card p-4 w-full h-full flex flex-col justify-between group hover:border-[#E5B869]/60 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[#E5B869]/15">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#E5B869]" />
          <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            Top Courses
          </h3>
        </div>
        <span className="text-[10px] text-[#E5B869] font-semibold bg-[#E5B869]/10 border border-[#E5B869]/25 px-2 py-0.5 rounded-full">
          Trending
        </span>
      </div>

      {/* Courses List */}
      <div className="space-y-3 my-auto py-1">
        {courses.map((course, idx) => (
          <div key={idx} className="group/item">
            <div className="flex items-baseline justify-between text-xs mb-1">
              <div className="truncate pr-2">
                <span className="font-semibold text-gray-100 group-hover/item:text-[#E5B869] transition text-xs">
                  {course.name}
                </span>
                <p className="text-[10px] text-gray-400 font-normal truncate">
                  {course.sub}
                </p>
              </div>
              <span className="font-bold text-[#E5B869] text-xs shrink-0 tabular-nums">
                {course.progress}%
              </span>
            </div>

            {/* Glowing Gold Progress Bar */}
            <div className="w-full h-1.5 bg-[#121B2D] rounded-full overflow-hidden border border-[#E5B869]/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#B8860B] via-[#E5B869] to-[#FFF0C0] relative transition-all duration-1000 ease-out"
                style={{ width: `${course.progress}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 blur-[1px]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Pill */}
      <div className="pt-2 border-t border-[#E5B869]/15 flex items-center justify-between text-[10px] text-gray-400">
        <span>Verified Curriculum</span>
        <span className="text-[#E5B869] font-medium">100+ Enrolled</span>
      </div>
    </div>
  );
}
