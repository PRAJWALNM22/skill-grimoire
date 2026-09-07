import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOtp, hashOtp } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/email";

/**
 * POST /api/auth/send-otp
 * Body: { email, type: "SIGNUP" | "LOGIN" }
 *
 * Resends an OTP. For LOGIN, verifies the user exists first.
 * For SIGNUP, this is called to resend (signup OTP is initially sent by /api/auth/signup).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, type } = body as { email: string; type: "SIGNUP" | "LOGIN" };

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email and type are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    if (type === "LOGIN") {
      // Verify user exists before sending login OTP
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      if (!user) {
        return NextResponse.json(
          { error: "No account found with this email address." },
          { status: 404 }
        );
      }
    }

    if (type === "SIGNUP") {
      // Check there's a pending signup (metadata must exist)
      const pending = await prisma.otpToken.findFirst({
        where: { email: normalizedEmail, type: "SIGNUP" },
        orderBy: { createdAt: "desc" },
      });
      if (!pending?.metadata) {
        return NextResponse.json(
          { error: "No pending signup found. Please start the signup process again." },
          { status: 400 }
        );
      }
    }

    // Rate-limit: prevent OTP spam — max 1 per 60 seconds
    const recent = await prisma.otpToken.findFirst({
      where: {
        email: normalizedEmail,
        type,
        createdAt: { gt: new Date(Date.now() - 60 * 1000) },
      },
    });
    if (recent) {
      return NextResponse.json(
        { error: "Please wait 60 seconds before requesting another code." },
        { status: 429 }
      );
    }

    // Generate fresh OTP
    const otp = generateOtp();
    const tokenHash = await hashOtp(otp);

    // For SIGNUP: preserve metadata from the previous pending token
    let metadata: string | undefined;
    if (type === "SIGNUP") {
      const prev = await prisma.otpToken.findFirst({
        where: { email: normalizedEmail, type: "SIGNUP" },
        orderBy: { createdAt: "desc" },
      });
      metadata = prev?.metadata ?? undefined;
    }

    // Delete old OTPs and create fresh one
    await prisma.otpToken.deleteMany({ where: { email: normalizedEmail, type } });
    await prisma.otpToken.create({
      data: {
        email: normalizedEmail,
        tokenHash,
        type,
        metadata,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendOtpEmail(normalizedEmail, otp, type);

    return NextResponse.json({ success: true, message: "New verification code sent." });
  } catch (err) {
    console.error("[POST /api/auth/send-otp]", err);
    return NextResponse.json(
      { error: "Failed to send verification code. Please try again." },
      { status: 500 }
    );
  }
}
