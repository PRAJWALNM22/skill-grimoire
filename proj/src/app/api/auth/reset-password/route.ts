import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyOtp, hashPassword } from "@/lib/auth";

/**
 * POST /api/auth/reset-password
 * Body: { email, otp, newPassword, confirmPassword, type?: "RESET" | "FIRST_LOGIN" }
 *
 * Verifies OTP and updates the user's password.
 * For FIRST_LOGIN type, also sets emailVerified=true and mustChangePassword=false.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, newPassword, confirmPassword, type = "RESET" } = body as {
      email: string;
      otp: string;
      newPassword: string;
      confirmPassword: string;
      type?: "RESET" | "FIRST_LOGIN";
    };

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: "Email, OTP, and new password are required." }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    if (!/^[A-Z]/.test(newPassword) && !/[A-Z]/.test(newPassword)) {
      // soft check — allow any 8+ char password
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find OTP token
    const tokenRecord = await prisma.otpToken.findFirst({
      where: { email: normalizedEmail, type },
      orderBy: { createdAt: "desc" },
    });

    if (!tokenRecord) {
      return NextResponse.json({ error: "No verification code found. Please request a new one." }, { status: 404 });
    }

    if (new Date() > tokenRecord.expiresAt) {
      await prisma.otpToken.delete({ where: { id: tokenRecord.id } });
      return NextResponse.json({ error: "Code has expired. Please request a new one." }, { status: 410 });
    }

    const isValid = await verifyOtp(otp, tokenRecord.tokenHash);
    if (!isValid) {
      return NextResponse.json({ error: "Incorrect code. Please try again." }, { status: 401 });
    }

    // OTP verified — clean up token
    await prisma.otpToken.delete({ where: { id: tokenRecord.id } });

    // Find the user
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    // Update password
    const newHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newHash,
        mustChangePassword: false,
        emailVerified: true,
      },
    });

    return NextResponse.json({ success: true, message: "Password has been reset successfully. You can now log in." });
  } catch (err) {
    console.error("[POST /api/auth/reset-password]", err);
    return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
  }
}
