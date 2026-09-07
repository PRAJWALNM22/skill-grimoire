"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  LogOut,
  Menu,
  X,
  ChevronRight,
  GraduationCap,
  Settings,
  Shield,
  Mail,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/enquiries", label: "Partner Enquiries", icon: Mail },
  { href: "/admin/rural-access", label: "Rural Access", icon: Mail },
  { href: "/admin/student-enquiries", label: "Student Enquiries", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Skip layout for admin login page
  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    if (isLoginPage) return;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user || d.user.role !== "ADMIN") {
          router.replace("/admin");
        } else {
          setAdmin(d.user);
        }
      })
      .catch(() => router.replace("/admin"));
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin");
  };

  if (isLoginPage) return <>{children}</>;

  if (!admin) {
    return (
      <div className="min-h-screen bg-[#05080F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E5B869] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080F] flex" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* ── Sidebar ── */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            fixed top-0 left-0 h-full w-64 z-50 flex flex-col
            bg-gradient-to-b from-[#080F1E] to-[#060C18]
            border-r border-[#E5B869]/10
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:static lg:z-auto
          `}
        >
          {/* Logo */}
          <div className="px-5 py-6 border-b border-[#E5B869]/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E5B869] to-[#C69234] flex items-center justify-center shadow-[0_0_16px_rgba(229,184,105,0.4)]">
                <GraduationCap className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="text-sm font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>Skill Grimoire</div>
                <div className="text-[10px] text-[#E5B869] font-semibold tracking-widest uppercase flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" /> Admin Panel
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (pathname.startsWith(href) && href !== "/admin/dashboard") || (href === "/admin/dashboard" && pathname === "/admin/dashboard");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${active
                      ? "bg-gradient-to-r from-[#E5B869]/20 to-[#C69234]/10 text-[#E5B869] border border-[#E5B869]/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#E5B869]" : "text-gray-500 group-hover:text-gray-300"}`} />
                  <span className="flex-1">{label}</span>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-[#E5B869]" />}
                </Link>
              );
            })}
          </nav>

          {/* Admin user + logout */}
          <div className="px-3 py-4 border-t border-[#E5B869]/10 space-y-2">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E5B869] to-[#C69234] flex items-center justify-center text-black text-xs font-bold shrink-0">
                {(admin.name || admin.email)?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">{admin.name || "Admin"}</div>
                <div className="text-[10px] text-gray-500 truncate">{admin.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 w-full transition-all duration-200"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </aside>
      </>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top bar (mobile) */}
        <header className="flex items-center gap-4 px-4 py-3 border-b border-[#E5B869]/10 bg-[#060C18] lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-sm font-semibold text-white">Admin Panel</div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
