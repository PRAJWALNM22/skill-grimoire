import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * GET /api/admin/admins — List all administrators
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        emailVerified: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      admins,
      totalAdmins: admins.length,
      currentAdminId: auth.payload?.userId,
    });
  } catch (err) {
    console.error("[GET /api/admin/admins]", err);
    return NextResponse.json({ error: "Failed to fetch administrators." }, { status: 500 });
  }
}

/**
 * POST /api/admin/admins — Create a new administrator
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const { name, email, username, password } = body as {
      name?: string;
      email?: string;
      username?: string;
      password?: string;
    };

    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!username || !username.trim()) {
      return NextResponse.json({ error: "Username is required." }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });
    if (existingEmail) {
      return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });
    if (existingUsername) {
      return NextResponse.json({ error: "This username is already taken." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const newAdmin = await prisma.user.create({
      data: {
        name: name?.trim() || cleanUsername,
        email: cleanEmail,
        username: cleanUsername,
        passwordHash,
        emailVerified: true,
        mustChangePassword: false,
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Administrator account created successfully.",
      admin: newAdmin,
    }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/admins]", err);
    return NextResponse.json({ error: "Failed to create administrator." }, { status: 500 });
  }
}
