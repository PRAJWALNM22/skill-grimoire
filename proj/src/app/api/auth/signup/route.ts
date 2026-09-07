import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, hashOtp, generateOtp } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/email";

/**
 * POST /api/auth/signup
 * Body: { email, username, password, confirmPassword }
 *
 * Validates fields, checks uniqueness, then sends a signup OTP.
 * Does NOT create the User yet — account is created only after OTP verification.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, password, confirmPassword } = body as {
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
    };

    // ── Validation ────────────────────────────────────────────────────────────
    if (!email || !username || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          error:
            "Username must be 3–20 characters and contain only letters, numbers, or underscores.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    // ── Uniqueness checks ─────────────────────────────────────────────────────
    const existingEmail = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: "This username is already taken. Please choose another." },
        { status: 409 }
      );
    }

    // ── Generate OTP & store pending signup data ──────────────────────────────
    const otp = generateOtp();
    const tokenHash = await hashOtp(otp);
    const passwordHash = await hashPassword(password);

    // Delete any previous pending signup OTPs for this email
    await prisma.otpToken.deleteMany({
      where: { email: email.toLowerCase(), type: "SIGNUP" },
    });

    // Store the hashed OTP with pending signup metadata
    await prisma.otpToken.create({
      data: {
        email: email.toLowerCase(),
        tokenHash,
        type: "SIGNUP",
        metadata: JSON.stringify({
          username: username.toLowerCase(),
          passwordHash,
          displayUsername: username,
        }),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // ── Send OTP email ────────────────────────────────────────────────────────
    await sendOtpEmail(email, otp, "SIGNUP");

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (err) {
    console.error("[POST /api/auth/signup]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
