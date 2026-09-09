"use client";

import React, { useEffect, useState } from "react";
import { Users, BookOpen, Video, TrendingUp, Clock, AlertCircle, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalVideos: number;
  totalEnrollments: number;
  pendingPasswordChange: number;
  totalAdmins?: number;
}

interface RecentStudent {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  mustChangePassword: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentStudents, setRecentStudents] = useState<RecentStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStats(d.stats);
          setRecentStudents(d.recentStudents || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "Total Students",
      value: stats?.totalStudents ?? "—",
      icon: Users,
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/20",
      iconColor: "text-blue-400",
      href: "/admin/students",
    },
    {
      label: "Active Courses",
      value: stats?.totalCourses ?? "—",
      icon: BookOpen,
      color: "from-emerald-500/20 to-emerald-600/10",
      border: "border-emerald-500/20",
      iconColor: "text-emerald-400",
      href: "/admin/courses",
    },
    {
      label: "Total Videos",
      value: stats?.totalVideos ?? "—",
      icon: Video,
      color: "from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/20",
      iconColor: "text-purple-400",
      href: "/admin/videos",
    },
    {
      label: "Enrollments",
      value: stats?.totalEnrollments ?? "—",
      icon: TrendingUp,
      color: "from-[#E5B869]/20 to-[#C69234]/10",
      border: "border-[#E5B869]/20",
      iconColor: "text-[#E5B869]",
      href: "/admin/students",
    },
    {
      label: "Admin Team",
      value: stats?.totalAdmins ?? "—",
      icon: Shield,
      color: "from-rose-500/20 to-rose-600/10",
      border: "border-rose-500/20",
      iconColor: "text-rose-400",
      href: "/admin/admins",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your Skill Grimoire institution</p>
      </div>

      {/* Alert: pending password changes */}
      {stats && stats.pendingPasswordChange > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-300">
              {stats.pendingPasswordChange} student{stats.pendingPasswordChange > 1 ? "s" : ""} haven&apos;t set their password yet
            </p>
            <p className="text-xs text-amber-400/70 mt-0.5">These students need to log in and change their temporary password.</p>
          </div>
          <Link href="/admin/students" className="shrink-0 text-xs text-amber-400 hover:text-amber-200 font-semibold flex items-center gap-1">
            View <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, border, iconColor, href }) => (
          <Link
            key={label}
            href={href}
            className={`group rounded-2xl bg-gradient-to-br ${color} border ${border} p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}
          >
            <div className={`w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center mb-3 ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            {loading ? (
              <div className="h-7 w-12 bg-white/10 rounded-lg animate-pulse mb-1" />
            ) : (
              <div className="text-2xl font-bold text-white">{value}</div>
            )}
            <div className="text-xs text-gray-400 font-medium mt-0.5">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/students"
            className="flex items-center gap-3 p-4 rounded-xl bg-[#0B1525] border border-[#1E2D45] hover:border-[#E5B869]/30 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-[#E5B869] transition">Add Student</div>
              <div className="text-xs text-gray-500">Register a new student</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#E5B869] transition" />
          </Link>

          <Link
            href="/admin/courses"
            className="flex items-center gap-3 p-4 rounded-xl bg-[#0B1525] border border-[#1E2D45] hover:border-[#E5B869]/30 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-[#E5B869] transition">New Course</div>
              <div className="text-xs text-gray-500">Create a course</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#E5B869] transition" />
          </Link>

          <Link
            href="/admin/videos"
            className="flex items-center gap-3 p-4 rounded-xl bg-[#0B1525] border border-[#1E2D45] hover:border-[#E5B869]/30 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0">
              <Video className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-[#E5B869] transition">Add Video</div>
              <div className="text-xs text-gray-500">Upload a lesson</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-[#E5B869] transition" />
          </Link>
        </div>
      </div>

      {/* Recent Students */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Students</h2>
          <Link href="/admin/students" className="text-xs text-[#E5B869] hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="rounded-2xl border border-[#1E2D45] overflow-hidden bg-[#0B1525]">
          {loading ? (
            <div className="p-6 flex justify-center">
              <div className="w-6 h-6 border-2 border-[#E5B869] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentStudents.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">No students yet.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E2D45]">
                  <th className="text-left px-4 py-3 text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-[11px] text-gray-500 font-semibold uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="text-left px-4 py-3 text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-[11px] text-gray-500 font-semibold uppercase tracking-wider hidden md:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2D45]/50">
                {recentStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-white/2 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E5B869]/30 to-[#C69234]/20 flex items-center justify-center text-[#E5B869] text-xs font-bold shrink-0">
                          {(s.name || s.email)?.[0]?.toUpperCase()}
                        </div>
                        <span className="text-sm text-white font-medium">{s.name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">{s.email}</td>
                    <td className="px-4 py-3">
                      {s.mustChangePassword ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/20">
                          <Clock className="w-2.5 h-2.5" /> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                          ✓ Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">
                      {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
