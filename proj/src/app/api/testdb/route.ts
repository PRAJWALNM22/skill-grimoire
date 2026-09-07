import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const courses = await prisma.course.findMany();
    return NextResponse.json({ success: true, count: courses.length });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || String(err),
        dbUrlDefined: !!process.env.DATABASE_URL,
        dbHost: process.env.DATABASE_URL ? process.env.DATABASE_URL.split("@")[1] : null,
        stack: err?.stack,
      },
      { status: 500 }
    );
  }
}
