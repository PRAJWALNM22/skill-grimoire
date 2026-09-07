import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

/**
 * POST /api/auth/logout
 * Clears the session cookie.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });
  return await clearSessionCookie(response);
}
