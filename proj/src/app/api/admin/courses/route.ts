import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

/**
 * GET /api/admin/courses — List all courses (admin view)
 * POST /api/admin/courses — Create a new course
 */

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const courses = await prisma.course.findMany({
      include: {
        domain: true,
        lessons: { orderBy: { order: "asc" } },
        _count: { select: { enrollments: true, lessons: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, courses });
  } catch (err) {
    console.error("[GET /api/admin/courses]", err);
    return NextResponse.json({ error: "Failed to fetch courses." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const {
      title, slug, subtitle, description, domainId,
      level, durationHours, totalLessons, featured, badge,
      thumbnailUrl, videoIntroUrl, targetClass
    } = body as {
      title: string;
      slug: string;
      subtitle?: string;
      description: string;
      domainId: string;
      level?: string;
      durationHours?: number;
      totalLessons?: number;
      featured?: boolean;
      badge?: string;
      thumbnailUrl?: string;
      videoIntroUrl?: string;
      targetClass: string;
    };

    if (!title || !slug || !description || !domainId || !targetClass) {
      return NextResponse.json({ error: "Title, slug, description, domain, and target class are required." }, { status: 400 });
    }

    const existing = await prisma.course.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A course with this slug already exists." }, { status: 409 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        subtitle,
        description,
        domainId,
        level: level || "All Levels",
        durationHours: durationHours || 0,
        totalLessons: totalLessons || 0,
        featured: featured || false,
        badge,
        thumbnailUrl,
        videoIntroUrl,
        targetClass,
      },
      include: { domain: true },
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/courses]", err);
    return NextResponse.json({ error: "Failed to create course." }, { status: 500 });
  }
}
