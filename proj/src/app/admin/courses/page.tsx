"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen, Plus, Search, Trash2, RefreshCw, X, AlertCircle,
  CheckCircle, Star, Users, Video as VideoIcon, Edit2, Layers, Check, ChevronDown,
} from "lucide-react";

export const ALL_CLASSES = [
  "10th",
  "PU I",
  "PU II",
  "UG I",
  "UG II",
  "UG III",
  "PG I",
  "PG II",
] as const;

interface Domain {
  id: string;
  name: string;
  slug: string;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string;
  level: string;
  targetClass: string | null;
  durationHours: number;
  totalLessons: number;
  rating: number;
  enrolledCount: number;
  featured: boolean;
  badge: string | null;
  thumbnailUrl: string | null;
  domain: Domain;
  _count: { enrollments: number; lessons: number };
  createdAt: string;
}

// ── Domain Selector (with inline create) ──────────────────────────────────────

function DomainSelector({
  domains,
  value,
  onChange,
  onDomainCreated,
}: {
  domains: Domain[];
  value: string;
  onChange: (id: string) => void;
  onDomainCreated: (domain: Domain) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) { setCreateError("Domain name is required."); return; }
    setCreateError("");
    setIsCreating(true);
    try {
      const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const res = await fetch("/api/admin/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), slug }),
      });
      const data = await res.json();
      if (!res.ok) { setCreateError(data.error || "Failed to create domain."); return; }
      onDomainCreated(data.domain);
      setCreating(false);
      setNewName("");
      setIsOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  const selectedDomain = domains.find((d) => d.id === value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1.5">
        <label className="field-label" style={{ marginBottom: 0 }}>Domain</label>
        {!creating && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setCreating(true);
            }}
            className="flex items-center gap-1 text-[10px] text-[#E5B869] hover:underline font-semibold cursor-pointer"
          >
            <Layers className="w-3 h-3" /> + New Domain
          </button>
        )}
      </div>

      {!creating ? (
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between bg-[#060C18] border rounded-xl px-3.5 py-2.5 text-sm transition text-left cursor-pointer ${
              isOpen
                ? "border-[#E5B869] ring-1 ring-[#E5B869]/40"
                : "border-[#1E2D45] hover:border-gray-600"
            }`}
          >
            <span className={selectedDomain ? "text-white font-medium" : "text-gray-400"}>
              {selectedDomain
                ? selectedDomain.name
                : domains.length === 0
                ? "No domains yet — create one →"
                : "Select domain..."}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180 text-[#E5B869]" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-50 left-0 right-0 mt-1.5 bg-[#0B1525] border border-[#1E2D45] rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.6)] overflow-hidden py-1 max-h-56 overflow-y-auto">
              {domains.length === 0 ? (
                <div className="px-3.5 py-3 text-xs text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>No domains exist. Click &quot;+ New Domain&quot; to create one.</span>
                </div>
              ) : (
                domains.map((d) => {
                  const isSelected = d.id === value;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        onChange(d.id);
                        setIsOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 text-sm flex items-center justify-between text-left transition cursor-pointer ${
                        isSelected
                          ? "bg-[#E5B869]/15 text-[#E5B869] font-semibold"
                          : "text-gray-200 hover:bg-[#1E2D45]/70 hover:text-white"
                      }`}
                    >
                      <span>{d.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#E5B869]" />}
                    </button>
                  );
                })
              )}
            </div>
          )}

          {domains.length === 0 && (
            <p className="text-[10px] text-amber-400 flex items-center gap-1 mt-1.5">
              ⚠ No domains exist. Click &quot;+ New Domain&quot; to create one first.
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E5B869]/30 bg-[#E5B869]/5 p-3 space-y-2">
          <p className="text-[10px] font-semibold text-[#E5B869] uppercase tracking-wide">Create New Domain</p>
          {createError && <p className="text-[10px] text-red-400">{createError}</p>}
          <input
            className="field-input text-sm"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleCreate())}
            placeholder="e.g. Artificial Intelligence"
            autoFocus
          />
          <p className="text-[10px] text-gray-500">
            Slug: <code className="text-gray-400">{newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "—"}</code>
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => { setCreating(false); setNewName(""); setCreateError(""); }}
              className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-gray-400 border border-[#1E2D45] hover:border-gray-500 transition cursor-pointer">
              Cancel
            </button>
            <button type="button" onClick={handleCreate} disabled={isCreating}
              className="flex-1 py-1.5 rounded-lg text-xs font-bold text-black bg-[#E5B869] hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer">
              {isCreating ? <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <><Plus className="w-3 h-3" />Create</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Add/Edit Course Modal ─────────────────────────────────────────────────────

function CourseModal({
  course,
  domains: initialDomains,
  onClose,
  onSuccess,
}: {
  course?: Course;
  domains: Domain[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const isEdit = !!course;

  const [localDomains, setLocalDomains] = useState<Domain[]>(initialDomains);
  const [title, setTitle] = useState(course?.title || "");
  const [slug, setSlug] = useState(course?.slug || "");
  const [subtitle, setSubtitle] = useState(course?.subtitle || "");
  const [description, setDescription] = useState(course?.description || "");
  const [domainId, setDomainId] = useState(course?.domain.id || "");
  const [level, setLevel] = useState(course?.level || "All Levels");
  const [selectedClasses, setSelectedClasses] = useState<string[]>(() => {
    if (!course?.targetClass) return [];
    return course.targetClass.split(",").map((s) => s.trim()).filter(Boolean);
  });
  const [durationHours, setDurationHours] = useState(String(course?.durationHours || ""));
  const [featured, setFeatured] = useState(course?.featured || false);
  const [badge, setBadge] = useState(course?.badge || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(course?.thumbnailUrl || "");
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const selectAllClasses = () => {
    if (selectedClasses.length === ALL_CLASSES.length) {
      setSelectedClasses([]);
    } else {
      setSelectedClasses([...ALL_CLASSES]);
    }
  };

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!isEdit) {
      setSlug(v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingThumbnail(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setThumbnailUrl(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description || !domainId) { setError("Title, slug, description, and domain are required."); return; }
    if (selectedClasses.length === 0) { setError("Please select at least one target class."); return; }
    setError("");
    setIsSubmitting(true);
    try {
      const url = isEdit ? `/api/admin/courses/${course!.id}` : "/api/admin/courses";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, slug, subtitle, description, domainId, level,
          targetClass: selectedClasses.join(", "),
          durationHours: Number(durationHours) || 0,
          featured, badge: badge || null,
          thumbnailUrl: thumbnailUrl || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save course."); return; }
      setSuccess(true);
      setTimeout(() => { onSuccess(); onClose(); }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg max-h-[88vh] flex flex-col rounded-2xl bg-[#0B1525] border border-[#E5B869]/25 shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden my-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2D45] shrink-0 bg-[#0B1525]">
          <h3 className="text-base font-bold text-white">{isEdit ? "Edit Course" : "Add New Course"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/5 cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1 overscroll-contain">
          {success ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-emerald-400" />
              </div>
              <p className="font-semibold text-white">Course {isEdit ? "updated" : "created"}!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />{error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="field-label">Course Title</label>
                  <input className="field-input" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="AI in Finance" />
                </div>
                <div>
                  <label className="field-label">Slug</label>
                  <input className="field-input" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ai-in-finance" />
                </div>
                <div>
                  <DomainSelector
                    domains={localDomains}
                    value={domainId}
                    onChange={setDomainId}
                    onDomainCreated={(d) => {
                      setLocalDomains((prev) => [...prev, d]);
                      setDomainId(d.id);
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <label className="field-label">Subtitle</label>
                  <input className="field-input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Short tagline" />
                </div>
                <div className="col-span-2">
                  <label className="field-label">Description</label>
                  <textarea className="field-input resize-none" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course description..." />
                </div>
                <div>
                  <label className="field-label">Level</label>
                  <div className="relative">
                    <select
                      className="field-input cursor-pointer appearance-none pr-9"
                      style={{ colorScheme: "dark" }}
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      {["All Levels", "Beginner", "Intermediate", "Advanced"].map((l) => (
                        <option key={l} value={l} className="bg-[#0B1525] text-white" style={{ backgroundColor: "#0B1525", color: "#ffffff" }}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="field-label" style={{ marginBottom: 0 }}>
                      Target Classes (Choose one or more)
                    </label>
                    <button
                      type="button"
                      onClick={selectAllClasses}
                      className="text-[10px] text-[#E5B869] hover:underline font-semibold"
                    >
                      {selectedClasses.length === ALL_CLASSES.length ? "Deselect All" : "Select All Classes"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-[#060C18] border border-[#1E2D45]">
                    {ALL_CLASSES.map((cls) => {
                      const isSelected = selectedClasses.includes(cls);
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => toggleClass(cls)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-gradient-to-r from-[#F5D075] to-[#E5B869] text-black shadow-[0_2px_10px_rgba(229,184,105,0.3)] font-bold scale-[1.02]"
                              : "bg-[#0B1525] border border-[#1E2D45] text-gray-400 hover:text-white hover:border-[#E5B869]/40"
                          }`}
                        >
                          <span>{cls}</span>
                          {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {selectedClasses.length === 0
                      ? "⚠ No classes selected (please select at least one)"
                      : `Selected: ${selectedClasses.join(", ")}`}
                  </p>
                </div>
                <div>
                  <label className="field-label">Duration (hours)</label>
                  <input className="field-input" type="number" min="0" value={durationHours} onChange={(e) => setDurationHours(e.target.value)} placeholder="20" />
                </div>
                <div>
                  <label className="field-label">Badge (optional)</label>
                  <input className="field-input" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Bestseller" />
                </div>
                <div className="col-span-2">
                  <label className="field-label">Thumbnail Image (optional)</label>
                  <div className="flex items-center gap-3">
                    <input className="field-input flex-1" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
                    <label className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-[#E5B869] hover:brightness-110 cursor-pointer flex items-center justify-center transition disabled:opacity-50">
                      {isUploadingThumbnail ? "Uploading..." : "Upload File"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} disabled={isUploadingThumbnail} />
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 pt-5">
                  <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 rounded accent-[#E5B869]" />
                  <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#E5B869]" /> Featured
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-400 border border-[#1E2D45] hover:border-gray-500 transition">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <>{isEdit ? <><Edit2 className="w-4 h-4" />Update</> : <><Plus className="w-4 h-4" />Create</>}</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .field-label { display: block; font-size: 11px; font-weight: 600; color: #6b7280; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
        .field-input { width: 100%; background: #060C18; border: 1px solid #1E2D45; border-radius: 12px; padding: 10px 14px; font-size: 14px; color: white; outline: none; transition: border-color 0.2s; color-scheme: dark; }
        .field-input:focus { border-color: rgba(229,184,105,0.6); }
        .field-input option { background-color: #0B1525 !important; color: #FFFFFF !important; }
      `}</style>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Course | null>(null);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/admin/courses").then((r) => r.json()),
      fetch("/api/admin/domains").then((r) => r.json()),
    ]).then(([cData, dData]) => {
      if (cData.success) setCourses(cData.courses);
      if (dData.success) setDomains(dData.domains);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = courses.filter((c) =>
    [c.title, c.slug, c.domain.name].some((v) => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (course: Course) => {
    if (!confirm(`Delete "${course.title}"? All lessons will be removed.`)) return;
    await fetch(`/api/admin/courses/${course.id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>Courses</h1>
          <p className="text-sm text-gray-500 mt-1">{courses.length} course{courses.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:brightness-110 shadow-[0_4px_16px_rgba(229,184,105,0.3)] transition"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="w-full bg-[#0B1525] border border-[#1E2D45] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#E5B869]/40 transition" />
        </div>
        <button onClick={fetchData} className="p-2.5 rounded-xl bg-[#0B1525] border border-[#1E2D45] text-gray-400 hover:text-white hover:border-[#E5B869]/30 transition">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Course Cards Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#E5B869] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-[#1E2D45] bg-[#0B1525]">
          <BookOpen className="w-10 h-10 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">{search ? "No courses match your search." : "No courses yet."}</p>
          {!search && <button onClick={() => setShowAddModal(true)} className="mt-4 text-xs text-[#E5B869] hover:underline flex items-center gap-1 mx-auto"><Plus className="w-3 h-3" /> Add Course</button>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="rounded-2xl bg-[#0B1525] border border-[#1E2D45] hover:border-[#E5B869]/20 transition-all overflow-hidden group">
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E5B869]/15 text-[#E5B869] border border-[#E5B869]/20">
                        {c.domain.name}
                      </span>
                      {c.featured && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400"><Star className="inline w-2.5 h-2.5 mr-0.5" />Featured</span>}
                      {c.badge && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/15 text-purple-400">{c.badge}</span>}
                      {c.targetClass && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/20">
                          {c.targetClass}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">{c.title}</h3>
                    {c.subtitle && <p className="text-xs text-gray-500 mt-0.5">{c.subtitle}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setEditTarget(c)} className="p-1.5 rounded-lg text-gray-500 hover:text-[#E5B869] hover:bg-[#E5B869]/10 transition"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(c)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 mb-4">{c.description}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c._count.enrollments}</span>
                  <span className="flex items-center gap-1"><VideoIcon className="w-3 h-3" />{c._count.lessons} videos</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[#E5B869]" />{c.rating}</span>
                  <span className="ml-auto text-[10px]">{c.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddModal && <CourseModal domains={domains} onClose={() => setShowAddModal(false)} onSuccess={fetchData} />}
      {editTarget && <CourseModal course={editTarget} domains={domains} onClose={() => setEditTarget(null)} onSuccess={fetchData} />}
    </div>
  );
}
