"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlayCircle, ArrowLeft, CheckCircle, Info, Lock, FileText } from "lucide-react";

export default function CoursePlayerPage() {
  const { slug } = useParams();
  const router = useRouter();
  
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${slug}`, { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.course) {
          setCourse(data.course);
          if (data.course.lessons && data.course.lessons.length > 0) {
            setActiveLesson(data.course.lessons[0]);
          }
        } else {
          setError(data.error || "Course not found.");
        }
      } catch (err) {
        setError("Failed to load course.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourse();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060B14] flex flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-[#E5B869] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400">Loading course content...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#060B14] flex flex-col items-center justify-center text-white p-6">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Error Loading Course</h1>
        <p className="text-gray-400 mb-6">{error}</p>
        <button 
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-[#E5B869] text-[#0A101C] font-semibold rounded-lg hover:bg-[#D4A758] transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060B14] text-white flex flex-col overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="h-16 shrink-0 bg-[#0A101C] border-b border-[#E5B869]/20 px-4 sm:px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/")}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-bold truncate max-w-xs sm:max-w-md">{course.title}</h1>
        </div>
        <div className="text-xs text-[#E5B869] font-semibold bg-[#E5B869]/10 px-3 py-1.5 rounded-full border border-[#E5B869]/20 hidden sm:flex items-center gap-2">
           <CheckCircle className="w-3.5 h-3.5" /> 0 of {course.lessons?.length || 0} Complete
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row flex-1 h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Column: Lesson Content & Course Info */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar p-6 sm:p-10 space-y-10">
          
          {/* Active Lesson Banner Area */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-[#0A101C] border border-[#E5B869]/20 p-8 rounded-2xl shadow-xl">
            {/* Left: Title, Desc, Button */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">{activeLesson?.title || "Overview"}</h2>
              {activeLesson?.description ? (
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap mb-8">{activeLesson.description}</p>
              ) : (
                <p className="text-gray-500 text-sm italic mb-8">No description provided for this lesson.</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4">
                {activeLesson?.videoUrl && (
                  <a 
                    href={activeLesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      fetch("/api/progress", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ courseId: course.id, lessonId: activeLesson.id })
                      }).catch(console.error).finally(() => {
                        if (activeLesson.videoUrl) {
                          window.open(activeLesson.videoUrl, "_blank");
                        }
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:brightness-110 shadow-[0_4px_20px_rgba(229,184,105,0.4)] transition-all transform hover:-translate-y-0.5"
                  >
                    <PlayCircle className="w-5 h-5 fill-black" />
                    View Skill
                  </a>
                )}
                {activeLesson?.pptUrl && (
                  <a 
                    href={activeLesson.pptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#1E2D45] hover:bg-[#2A3F5C] border border-[#E5B869]/30 hover:border-[#E5B869] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all transform hover:-translate-y-0.5"
                  >
                    <FileText className="w-5 h-5" />
                    View PPT
                  </a>
                )}
              </div>
            </div>

            {/* Right: Banner Image */}
            {activeLesson?.thumbnailUrl && (
              <div className="w-full md:w-1/2 lg:w-2/5 aspect-video rounded-xl overflow-hidden border border-[#E5B869]/30 shadow-2xl shrink-0">
                <img 
                  src={activeLesson.thumbnailUrl} 
                  alt={activeLesson.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="max-w-4xl w-full mx-auto pb-10">
             <div>
               <h3 className="text-lg font-bold text-[#E5B869] mb-3">About this Course</h3>
               <p className="text-gray-300 text-sm leading-relaxed mb-6">{course.description}</p>
               
               <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 text-sm bg-[#0A101C] p-4 rounded-xl border border-white/5">
                 <div>
                   <span className="block text-gray-500 text-xs mb-1">Level</span>
                   <span className="font-semibold text-white">{course.level}</span>
                 </div>
                 <div>
                   <span className="block text-gray-500 text-xs mb-1">Duration</span>
                   <span className="font-semibold text-white">{course.durationHours}h</span>
                 </div>
                 <div>
                   <span className="block text-gray-500 text-xs mb-1">Domain</span>
                   <span className="font-semibold text-white">{course.domain?.name}</span>
                 </div>
                 <div>
                   <span className="block text-gray-500 text-xs mb-1">Enrolled</span>
                   <span className="font-semibold text-white">{course.enrolledCount}</span>
                 </div>
                 {course.targetClass && (
                   <div>
                     <span className="block text-gray-500 text-xs mb-1">Class</span>
                     <span className="font-semibold text-[#E5B869]">{course.targetClass}</span>
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Syllabus Sidebar */}
        <div className="w-full lg:w-96 bg-[#0A101C] border-l border-[#E5B869]/20 h-full flex flex-col shrink-0">
          <div className="p-4 border-b border-[#E5B869]/10 shrink-0">
             <h3 className="font-bold text-white">Course Content</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {course.lessons && course.lessons.length > 0 ? (
              <div className="space-y-1">
                {course.lessons.map((lesson: any, index: number) => {
                  const isActive = activeLesson?.id === lesson.id;
                  return (
                    <button 
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left p-3 rounded-lg flex gap-3 transition-colors ${
                        isActive 
                          ? "bg-[#E5B869]/10 border border-[#E5B869]/30" 
                          : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="shrink-0 relative w-24 h-16 rounded-md overflow-hidden bg-gray-800 border border-white/10">
                        {lesson.thumbnailUrl ? (
                          <img src={lesson.thumbnailUrl} alt={lesson.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <PlayCircle className="w-6 h-6 text-gray-600" />
                          </div>
                        )}
                        {isActive && (
                          <div className="absolute inset-0 bg-[#E5B869]/30 flex items-center justify-center">
                            <PlayCircle className="w-8 h-8 text-white fill-black/50" />
                          </div>
                        )}
                        <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[9px] text-white font-bold">
                          {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                         <h4 className={`text-sm font-semibold line-clamp-2 leading-tight ${isActive ? "text-[#E5B869]" : "text-gray-200"}`}>
                           {lesson.title}
                         </h4>
                         {lesson.description && (
                           <p className="text-xs text-gray-500 mt-1 line-clamp-1">{lesson.description}</p>
                         )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center text-center text-gray-500">
                <Lock className="w-8 h-8 mb-3 opacity-30" />
                <p className="text-sm">No lessons are available for this course yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
