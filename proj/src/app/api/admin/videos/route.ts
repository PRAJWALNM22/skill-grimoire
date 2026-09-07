import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * GET /api/admin/videos — List all lessons/videos grouped by course
 * POST /api/admin/videos — Add a new lesson to a course
 */

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        course: { select: { id: true, title: true, slug: true } },
      },
      orderBy: [{ courseId: "asc" }, { order: "asc" }],
    });

    return NextResponse.json({ success: true, lessons });
  } catch (err) {
    console.error("[GET /api/admin/videos]", err);
    return NextResponse.json({ error: "Failed to fetch videos." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { courseId, title, description, videoUrl, thumbnailUrl, pptUrl, duration, order, isPublished } = body as {
      courseId: string;
      title: string;
      description?: string;
      videoUrl?: string;
      thumbnailUrl?: string;
      pptUrl?: string;
      duration?: number;
      order?: number;
      isPublished?: boolean;
    };

    if (!courseId || !title) {
      return NextResponse.json({ error: "Course ID and title are required." }, { status: 400 });
    }

    // Verify course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    // Auto-assign order if not specified
    let lessonOrder = order;
    if (lessonOrder === undefined) {
      const lastLesson = await prisma.lesson.findFirst({
        where: { courseId },
        orderBy: { order: "desc" },
      });
      lessonOrder = (lastLesson?.order ?? -1) + 1;
    }

    const lesson = await prisma.lesson.create({
      data: {
        courseId,
        title,
        description,
        videoUrl,
        thumbnailUrl,
        pptUrl,
        duration: duration || 0,
        order: lessonOrder,
        isPublished: isPublished !== undefined ? isPublished : true,
      },
      include: { course: { select: { id: true, title: true, slug: true } } },
    });

    // Update course totalLessons count
    const lessonCount = await prisma.lesson.count({ where: { courseId } });
    await prisma.course.update({
      where: { id: courseId },
      data: { totalLessons: lessonCount },
    });

    return NextResponse.json({ success: true, lesson }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/videos]", err);
    return NextResponse.json({ error: "Failed to add video." }, { status: 500 });
  }
}
