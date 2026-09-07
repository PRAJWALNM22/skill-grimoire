"use client";

import React from "react";
import { PlayCircle, Video, Clock } from "lucide-react";

interface VideoLesson {
  title: string;
  duration: string;
  tag: string;
}

const lessons: VideoLesson[] = [
  { title: "AI in Finance", duration: "20:45", tag: "Analytics" },
  { title: "AI in Marketing", duration: "22:10", tag: "Growth" },
  { title: "AI in HR", duration: "35:20", tag: "People AI" },
];

export default function RecordedClassesCard() {
  return (
    <div className="sg-card p-3.5 w-full h-full flex flex-col justify-between group hover:border-[#E5B869]/60 transition-all duration-300">
      <div className="flex items-center justify-between pb-1.5 border-b border-[#E5B869]/15">
        <div className="flex items-center gap-1.5">
          <Video className="w-4 h-4 text-[#E5B869]" />
          <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            Recorded Classes
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#E5B869] font-medium">
          <PlayCircle className="w-3 h-3 text-[#E5B869]" />
          <span>On-Demand</span>
        </div>
      </div>

      {/* Video Thumbnails List */}
      <div className="space-y-1.5 my-1">
        {lessons.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-1.5 rounded-lg bg-[#111B2E]/90 border border-[#E5B869]/15 hover:border-[#E5B869]/40 hover:bg-[#16233B] transition cursor-pointer group/vid"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-6 rounded bg-[#1A2640] border border-[#E5B869]/30 flex items-center justify-center shrink-0 relative overflow-hidden group-hover/vid:border-[#E5B869]">
                <PlayCircle className="w-3 h-3 text-[#E5B869]" />
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate group-hover/vid:text-[#E5B869] transition">
                  {item.title}
                </p>
                <span className="text-[9px] text-gray-400">{item.tag}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[9px] text-[#E5B869] bg-[#E5B869]/10 px-1.5 py-0.5 rounded shrink-0">
              <Clock className="w-2.5 h-2.5" />
              <span>{item.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-1.5 border-t border-[#E5B869]/15 flex items-center justify-between text-[10px] text-gray-400">
        <span>Unlimited Replays</span>
        <span className="text-[#E5B869] font-medium">1080p HD</span>
      </div>
    </div>
  );
}
