import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * GET /api/admin/domains — List all domains (for course creation dropdowns)
 * POST /api/admin/domains — Create a new domain
 */

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const domains = await prisma.domain.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, domains });
  } catch (err) {
    console.error("[GET /api/admin/domains]", err);
    return NextResponse.json({ error: "Failed to fetch domains." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { name, slug, description, icon } = body as {
      name: string;
      slug: string;
      description?: string;
      icon?: string;
    };

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required." }, { status: 400 });
    }

    const domain = await prisma.domain.upsert({
      where: { slug },
      update: { name, description, icon },
      create: { name, slug, description, icon },
    });

    return NextResponse.json({ success: true, domain }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/domains]", err);
    return NextResponse.json({ error: "Failed to create domain." }, { status: 500 });
  }
}
