import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt, SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    
    console.log("[POST /api/progress] Token found?", !!token);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyJwt(token);
    console.log("[POST /api/progress] Payload:", payload);

    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    console.log("[POST /api/progress] Body:", body);
    const { courseId, lessonId } = body;
    if (!courseId || !lessonId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: { userId: payload.userId, lessonId },
      },
    });
    
    console.log("[POST /api/progress] Existing progress:", !!existingProgress);

    if (!existingProgress) {
      await prisma.lessonProgress.create({
        data: {
          userId: payload.userId,
          courseId,
          lessonId,
        },
      });
      console.log("[POST /api/progress] Created new lesson progress");
    }

    let enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: payload.userId, courseId } },
      include: { course: true }
    });

    if (!enrollment) {
      console.log("[POST /api/progress] Enrollment not found, creating one");
      const course = await prisma.course.findUnique({ where: { id: courseId } });
      if (course) {
        enrollment = await prisma.enrollment.create({
          data: {
            userId: payload.userId,
            courseId: courseId,
            status: "IN_PROGRESS",
          },
          include: { course: true }
        });
        console.log("[POST /api/progress] Created enrollment");
      }
    }

    if (enrollment) {
      const completedCount = await prisma.lessonProgress.count({
        where: { userId: payload.userId, courseId },
      });

      const totalLessons = enrollment.course.totalLessons > 0 ? enrollment.course.totalLessons : 1;
      const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));
      
      console.log(`[POST /api/progress] updating enrollment: ${completedCount}/${totalLessons} -> ${progressPercent}%`);

      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          completedLessons: completedCount,
          progressPercent,
          lastAccessedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[POST /api/progress] ERROR:", err);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
