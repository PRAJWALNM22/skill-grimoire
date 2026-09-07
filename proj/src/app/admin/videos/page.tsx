"use client";

import React, { useState, useEffect } from "react";
import {
  Video, Plus, Search, Trash2, RefreshCw, X, AlertCircle,
  CheckCircle, Edit2, Play, Clock, Eye, EyeOff as EyeOffIcon,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  pptUrl: string | null;
  duration: number;
  order: number;
  isPublished: boolean;
  createdAt: string;
  course: Course;
}

// ── Add/Edit Video Modal ──────────────────────────────────────────────────────

function VideoModal({
  lesson,
  courses,
  defaultCourseId,
  onClose,
  onSuccess,
}: {
  lesson?: Lesson;
  courses: Course[];
  defaultCourseId?: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const isEdit = !!lesson;

  const [courseId, setCourseId] = useState(lesson?.course.id || defaultCourseId || "");
  const [title, setTitle] = useState(lesson?.title || "");
  const [description, setDescription] = useState(lesson?.description || "");
  const [videoUrl, setVideoUrl] = useState(lesson?.videoUrl || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(lesson?.thumbnailUrl || "");
  const [pptUrl, setPptUrl] = useState(lesson?.pptUrl || "");
  const [duration, setDuration] = useState(String(lesson?.duration || ""));
  const [order, setOrder] = useState(String(lesson?.order ?? ""));
  const [isPublished, setIsPublished] = useState(lesson?.isPublished !== false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image.");
      }

      setThumbnailUrl(data.url);
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !title) { setError("Course and title are required."); return; }
    setError("");
    setIsSubmitting(true);
    try {
      const url = isEdit ? `/api/admin/videos/${lesson!.id}` : "/api/admin/videos";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId, title, description: description || null,
          videoUrl: videoUrl || null,
          thumbnailUrl: thumbnailUrl || null,
          pptUrl: pptUrl || null,
          duration: Number(duration) || 0,
          order: order !== "" ? Number(order) : undefined,
          isPublished,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save video."); return; }
      setSuccess(true);
      setTimeout(() => { onSuccess(); onClose(); }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Parse YouTube URL for embed
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match?.[1];
  };
  const youtubeId = videoUrl ? getYouTubeId(videoUrl) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg max-h-[88vh] flex flex-col rounded-2xl bg-[#0B1525] border border-[#E5B869]/25 shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden my-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2D45] shrink-0 bg-[#0B1525]">
          <h3 className="text-base font-bold text-white">{isEdit ? "Edit Video" : "Add New Video"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/5 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1 overscroll-contain">
          {success ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="font-semibold text-white">Video {isEdit ? "updated" : "added"}!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />{error}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Course</label>
                <select
                  className="w-full bg-[#060C18] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#E5B869]/60 transition"
                  value={courseId} onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="">Select a course...</option>
                  {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Video Title</label>
                <input
                  className="w-full bg-[#060C18] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/60 transition"
                  value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Introduction to AI in Finance"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Description (optional)</label>
                <textarea
                  className="w-full bg-[#060C18] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/60 transition resize-none"
                  rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What students will learn..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Drive Link (Video URL)</label>
                <input
                  className="w-full bg-[#060C18] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/60 transition"
                  value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">PPT Link (optional)</label>
                <input
                  className="w-full bg-[#060C18] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/60 transition"
                  value={pptUrl} onChange={(e) => setPptUrl(e.target.value)}
                  placeholder="https://docs.google.com/presentation/..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Thumbnail Image URL (or Upload)</label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 w-full bg-[#060C18] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/60 transition"
                    value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://.../image.jpg"
                  />
                  <label className="cursor-pointer shrink-0 flex items-center justify-center px-4 rounded-xl font-bold text-sm text-black bg-[#E5B869] hover:bg-[#F5D075] transition" style={{ opacity: isUploading ? 0.5 : 1, pointerEvents: isUploading ? 'none' : 'auto' }}>
                    {isUploading ? "Uploading..." : "Upload File"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Duration (seconds)</label>
                  <input
                    type="number" min="0"
                    className="w-full bg-[#060C18] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/60 transition"
                    value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 600"
                  />
                  {Number(duration) > 0 && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      ≈ {Math.floor(Number(duration) / 60)}m {Number(duration) % 60}s
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Order (position)</label>
                  <input
                    type="number" min="0"
                    className="w-full bg-[#060C18] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/60 transition"
                    value={order} onChange={(e) => setOrder(e.target.value)} placeholder="auto"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 rounded accent-[#E5B869]" />
                <span className="text-sm text-gray-300 flex items-center gap-1.5">
                  {isPublished ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOffIcon className="w-3.5 h-3.5 text-gray-500" />}
                  {isPublished ? "Published (visible to students)" : "Draft (hidden from students)"}
                </span>
              </label>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-400 border border-[#1E2D45] hover:border-gray-500 transition">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <>{isEdit ? <><Edit2 className="w-4 h-4" />Update</> : <><Plus className="w-4 h-4" />Add Video</>}</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function VideosPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Lesson | null>(null);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/admin/videos").then((r) => r.json()),
      fetch("/api/admin/courses").then((r) => r.json()),
    ]).then(([vData, cData]) => {
      if (vData.success) setLessons(vData.lessons);
      if (cData.success) setCourses(cData.courses.map((c: Course & { domain: unknown }) => ({ id: c.id, title: c.title, slug: c.slug })));
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = lessons.filter((l) => {
    const matchesSearch = [l.title, l.description, l.course.title].some((v) => v?.toLowerCase().includes(search.toLowerCase()));
    const matchesCourse = !filterCourse || l.course.id === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const handleDelete = async (lesson: Lesson) => {
    if (!confirm(`Delete "${lesson.title}"?`)) return;
    await fetch(`/api/admin/videos/${lesson.id}`, { method: "DELETE" });
    fetchData();
  };

  const togglePublish = async (lesson: Lesson) => {
    await fetch(`/api/admin/videos/${lesson.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !lesson.isPublished }),
    });
    fetchData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>Videos</h1>
          <p className="text-sm text-gray-500 mt-1">{lessons.length} video{lessons.length !== 1 ? "s" : ""} across {courses.length} courses</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:brightness-110 shadow-[0_4px_16px_rgba(229,184,105,0.3)] transition"
        >
          <Plus className="w-4 h-4" /> Add Video
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search videos..." className="w-full bg-[#0B1525] border border-[#1E2D45] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/40 transition" />
        </div>
        <select
          value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}
          className="bg-[#0B1525] border border-[#1E2D45] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#E5B869]/40 transition"
        >
          <option value="">All Courses</option>
          {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        <button onClick={fetchData} className="p-2.5 rounded-xl bg-[#0B1525] border border-[#1E2D45] text-gray-400 hover:text-white hover:border-[#E5B869]/30 transition">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#1E2D45] overflow-hidden bg-[#0B1525]">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 border-2 border-[#E5B869] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Video className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">{search || filterCourse ? "No videos match your filters." : "No videos yet."}</p>
            {!search && !filterCourse && (
              <button onClick={() => setShowAddModal(true)} className="mt-4 text-xs text-[#E5B869] hover:underline flex items-center gap-1 mx-auto"><Plus className="w-3 h-3" /> Add Video</button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#1E2D45]">
                  {["#", "Video", "Course", "Duration", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2D45]/50">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-white/2 transition">
                    <td className="px-4 py-3.5 text-xs text-gray-500 w-10">{l.order + 1}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/15 overflow-hidden flex items-center justify-center shrink-0">
                          {l.thumbnailUrl ? (
                            <img src={l.thumbnailUrl} alt="thumbnail" className="w-full h-full object-cover" />
                          ) : l.videoUrl ? (
                            <Play className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                          ) : (
                            <Video className="w-3.5 h-3.5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{l.title}</div>
                          {l.description && <div className="text-xs text-gray-500 line-clamp-1">{l.description}</div>}
                          {l.videoUrl && <div className="text-[10px] text-blue-400 truncate max-w-[200px]">{l.videoUrl}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-400">{l.course.title}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      {l.duration > 0 ? (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {Math.floor(l.duration / 60)}m {l.duration % 60}s
                        </span>
                      ) : <span className="text-xs text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => togglePublish(l)} className="transition">
                        {l.isPublished ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25">
                            <Eye className="w-2.5 h-2.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-500/15 text-gray-400 border border-gray-500/20 hover:bg-gray-500/25">
                            <EyeOffIcon className="w-2.5 h-2.5" /> Draft
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setEditTarget(l)} className="p-1.5 rounded-lg text-gray-500 hover:text-[#E5B869] hover:bg-[#E5B869]/10 transition"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(l)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && <VideoModal courses={courses} onClose={() => setShowAddModal(false)} onSuccess={fetchData} />}
      {editTarget && <VideoModal lesson={editTarget} courses={courses} onClose={() => setEditTarget(null)} onSuccess={fetchData} />}
    </div>
  );
}
