import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * GET /api/admin/stats — Dashboard statistics
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const [
      totalStudents,
      totalCourses,
      totalVideos,
      totalEnrollments,
      pendingPasswordChange,
      totalAdmins,
      recentStudents,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.course.count(),
      prisma.lesson.count(),
      prisma.enrollment.count(),
      prisma.user.count({ where: { role: "STUDENT", mustChangePassword: true } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.findMany({
        where: { role: "STUDENT" },
        select: { id: true, name: true, email: true, createdAt: true, mustChangePassword: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalStudents,
        totalCourses,
        totalVideos,
        totalEnrollments,
        pendingPasswordChange,
        totalAdmins,
      },
      recentStudents,
    });
  } catch (err) {
    console.error("[GET /api/admin/stats]", err);
    return NextResponse.json({ error: "Failed to fetch stats." }, { status: 500 });
  }
}
