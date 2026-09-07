import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

/**
 * GET /api/admin/init — One-time admin initialization
 * Only creates admin if it doesn't exist. Remove this endpoint in production.
 */
export async function GET() {
  try {
    const adminAccounts = [
      { name: "Admin", email: "admin@skillgrimoire.com", username: "admin" },
      { name: "Founder", email: "founder@skillgrimoire.com", username: "founder" },
      { name: "CEO", email: "ceo@skillgrimoire.com", username: "ceo" },
      { name: "Prajwal N M", email: "prajwalnm22@gmail.com", username: "prajwalnm22" },
    ];

    const hash = await hashPassword("Admin@1234");
    const created: string[] = [];

    for (const adm of adminAccounts) {
      const existing = await prisma.user.findUnique({ where: { email: adm.email } });
      if (!existing) {
        await prisma.user.create({
          data: {
            name: adm.name,
            email: adm.email,
            username: adm.username,
            passwordHash: hash,
            emailVerified: true,
            mustChangePassword: false,
            role: "ADMIN",
          },
        });
        created.push(adm.email);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Admin initialization complete. Created: ${created.length > 0 ? created.join(", ") : "All already exist."}`,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
