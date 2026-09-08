"use client";

import React, { useEffect, useState } from "react";
import { PlayCircle, FileText, Download, Info, Layers, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LearnTab() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setCourses(data.courses || []);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
          <BookOpenIcon className="w-6 h-6 text-[#E5B869]" />
          My Courses
        </h1>
        <p className="text-sm text-gray-400">Access your course content and track your progress.</p>
      </div>

      {/* Courses Section */}
      <section className="bg-[#10192A]/60 border border-[#E5B869]/20 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-sm font-semibold text-white flex items-center gap-2">
             <Layers className="w-4 h-4 text-[#E5B869]" />
             Enrolled Courses
           </h3>
        </div>
        
        {isLoading ? (
          <div className="text-gray-400 text-sm animate-pulse">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-gray-400 text-sm">No courses assigned to your class yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <div 
                key={i} 
                onClick={() => router.push(`/learn/${course.slug}`)}
                className="group cursor-pointer rounded-xl overflow-hidden bg-[#0A101C] border border-[#E5B869]/15 hover:border-[#E5B869]/60 transition-all flex flex-col shadow-md hover:shadow-[0_0_15px_rgba(229,184,105,0.15)]"
              >
                {/* Thumbnail Area */}
                <div className="relative h-40 w-full bg-[#16233B] flex flex-col justify-end p-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A101C] via-[#0A101C]/60 to-transparent z-10 pointer-events-none" />
                  
                  {course.thumbnailUrl && (
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                    />
                  )}
                  
                  <div className="relative z-20 flex items-center justify-between w-full">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-[#E5B869]/20 text-[#E5B869] border border-[#E5B869]/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {course.domain?.name || "General"}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {course.targetClass && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm border ${
                          course.targetClass.includes("FC")
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        }`}>
                          {course.targetClass.includes("FC") ? `Free • ${course.targetClass}` : course.targetClass}
                        </span>
                      )}
                      {course.badge && (
                        <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          {course.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Details Area */}
                <div className="p-4 bg-[#0D1525] flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-100 group-hover:text-[#E5B869] transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </h4>
                    {course.subtitle && (
                      <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{course.subtitle}</p>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.durationHours}h</span>
                      <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {course.totalLessons} Lessons</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
