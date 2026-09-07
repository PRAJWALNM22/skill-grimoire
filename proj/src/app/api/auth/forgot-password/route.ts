import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOtp, hashOtp } from "@/lib/auth";
import { sendPasswordResetEmail, sendFirstLoginOtpEmail } from "@/lib/email";

/**
 * POST /api/auth/forgot-password
 * Body: { email, type?: "RESET" | "FIRST_LOGIN" }
 *
 * Sends an OTP to the user's registered email for password reset.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, type = "RESET" } = body as { email: string; type?: "RESET" | "FIRST_LOGIN" };

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find the user — use a generic message to avoid email enumeration
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    // Always return success even if user not found (security: don't reveal existence)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If this email is registered, a verification code has been sent.",
      });
    }

    // Generate and store OTP
    const otp = generateOtp();
    const tokenHash = await hashOtp(otp);

    // Delete old tokens of this type
    await prisma.otpToken.deleteMany({
      where: { email: normalizedEmail, type },
    });

    await prisma.otpToken.create({
      data: {
        email: normalizedEmail,
        tokenHash,
        type,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // Send appropriate email
    console.log(`[AUTH OTP] Password reset code for ${normalizedEmail}: ${otp}`);
    if (type === "FIRST_LOGIN") {
      await sendFirstLoginOtpEmail(normalizedEmail, user.name || user.username, otp);
    } else {
      await sendPasswordResetEmail(normalizedEmail, otp);
    }

    return NextResponse.json({
      success: true,
      message: "If this email is registered, a verification code has been sent.",
    });
  } catch (err) {
    console.error("[POST /api/auth/forgot-password]", err);
    return NextResponse.json({ error: "Failed to send reset code." }, { status: 500 });
  }
}
