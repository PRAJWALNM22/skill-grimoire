import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title, slug, subtitle, description, domainId,
      level, durationHours, totalLessons, featured, badge,
      thumbnailUrl, videoIntroUrl, targetClass,
    } = body;

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(subtitle !== undefined && { subtitle }),
        ...(description && { description }),
        ...(domainId && { domainId }),
        ...(level && { level }),
        ...(durationHours !== undefined && { durationHours }),
        ...(totalLessons !== undefined && { totalLessons }),
        ...(featured !== undefined && { featured }),
        ...(badge !== undefined && { badge }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(videoIntroUrl !== undefined && { videoIntroUrl }),
        ...(targetClass !== undefined && { targetClass }),
      },
      include: { domain: true },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, course });
  } catch (err) {
    console.error("[PUT /api/admin/courses/[id]]", err);
    return NextResponse.json({ error: "Failed to update course." }, { status: 500 });
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
    await prisma.course.delete({ where: { id } });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Course deleted." });
  } catch (err) {
    console.error("[DELETE /api/admin/courses/[id]]", err);
    return NextResponse.json({ error: "Failed to delete course." }, { status: 500 });
  }
}
