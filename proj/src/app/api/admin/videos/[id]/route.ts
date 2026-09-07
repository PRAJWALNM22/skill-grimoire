import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, videoUrl, thumbnailUrl, pptUrl, duration, order, isPublished } = body;

    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(pptUrl !== undefined && { pptUrl }),
        ...(duration !== undefined && { duration }),
        ...(order !== undefined && { order }),
        ...(isPublished !== undefined && { isPublished }),
      },
      include: { course: { select: { id: true, title: true, slug: true } } },
    });

    return NextResponse.json({ success: true, lesson });
  } catch (err) {
    console.error("[PUT /api/admin/videos/[id]]", err);
    return NextResponse.json({ error: "Failed to update video." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const lesson = await prisma.lesson.findUnique({ where: { id } });
    if (!lesson) {
      return NextResponse.json({ error: "Video not found." }, { status: 404 });
    }

    await prisma.lesson.delete({ where: { id } });

    // Update course totalLessons count
    const lessonCount = await prisma.lesson.count({ where: { courseId: lesson.courseId } });
    await prisma.course.update({
      where: { id: lesson.courseId },
      data: { totalLessons: lessonCount },
    });

    return NextResponse.json({ success: true, message: "Video deleted." });
  } catch (err) {
    console.error("[DELETE /api/admin/videos/[id]]", err);
    return NextResponse.json({ error: "Failed to delete video." }, { status: 500 });
  }
}
