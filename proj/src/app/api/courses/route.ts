import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";
import { verifyJwt, SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Seed database call removed to improve performance

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const payload = token ? await verifyJwt(token) : null;
    const userEmail = payload?.email;

    let student = null;
    let targetClass = null;

    if (userEmail) {
      student = await prisma.user.findUnique({
        where: { email: userEmail },
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
          certificates: true,
          scholarships: true,
        },
      });
      targetClass = student?.studentClass;
    }

    let allCourses = await prisma.course.findMany({
      include: {
        domain: true,
      },
      orderBy: {
        enrolledCount: "desc",
      },
    });

    let courses = allCourses;

    if (targetClass && targetClass.trim() !== "") {
      const sClass = targetClass.trim().toLowerCase();
      const sClassClean = sClass.replace(/\s+/g, "");

      const filtered = allCourses.filter((course) => {
        if (!course.targetClass || course.targetClass.trim() === "") return true;
        const allowedClasses = course.targetClass
          .split(",")
          .map((c) => c.trim().toLowerCase());
        return (
          allowedClasses.includes("all") ||
          allowedClasses.includes(sClass) ||
          allowedClasses.some((c) => c.replace(/\s+/g, "") === sClassClean)
        );
      });

      if (filtered.length > 0) {
        courses = filtered;
      }
    }

    console.log("[GET /api/courses] studentEmail:", student?.email, "targetClass:", targetClass);
    console.log("[GET /api/courses] returning", courses.length, "courses");
    if (courses.length === 0) {
      console.log("[GET /api/courses] Checking if any courses exist at all...");
      const allCourses = await prisma.course.findMany();
      console.log("[GET /api/courses] Total courses in DB:", allCourses.length);
    }
    
    return NextResponse.json({
      success: true,
      courses,
      student,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
