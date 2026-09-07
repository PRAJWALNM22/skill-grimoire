import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt, SESSION_COOKIE } from "@/lib/auth";

/**
 * Admin auth helper — verifies the session and ensures ADMIN role.
 * Returns the payload or a 401/403 response.
 */
export async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return { error: NextResponse.json({ error: "Not authenticated." }, { status: 401 }) };
  }

  const payload = await verifyJwt(token);
  if (!payload) {
    return { error: NextResponse.json({ error: "Invalid session." }, { status: 401 }) };
  }

  if (payload.role !== "ADMIN") {
    return { error: NextResponse.json({ error: "Forbidden. Admin access only." }, { status: 403 }) };
  }

  return { payload };
}
