import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * DELETE /api/admin/admins/[id] — Remove administrator account
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const { id } = await params;
    const currentAdminId = auth.payload?.userId;

    if (id === currentAdminId) {
      return NextResponse.json(
        { error: "You cannot delete your own administrator account." },
        { status: 400 }
      );
    }

    const targetAdmin = await prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true, name: true, email: true },
    });

    if (!targetAdmin || targetAdmin.role !== "ADMIN") {
      return NextResponse.json({ error: "Administrator not found." }, { status: 404 });
    }

    // Ensure at least 1 admin remains in the system
    const totalAdmins = await prisma.user.count({
      where: { role: "ADMIN" },
    });

    if (totalAdmins <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the only remaining administrator." },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Administrator ${targetAdmin.name || targetAdmin.email} removed successfully.`,
    });
  } catch (err) {
    console.error("[DELETE /api/admin/admins/[id]]", err);
    return NextResponse.json({ error: "Failed to delete administrator." }, { status: 500 });
  }
}
