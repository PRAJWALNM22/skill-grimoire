import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import type { NextResponse } from "next/server";

const SALT_ROUNDS = 12;
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-dev-secret-change-in-production"
);
const SESSION_COOKIE = "sg_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ── Password ─────────────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ── OTP ──────────────────────────────────────────────────────────────────────

export function generateOtp(): string {
  // 6-digit numeric OTP, zero-padded
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function hashOtp(otp: string): Promise<string> {
  return bcrypt.hash(otp, 10);
}

export async function verifyOtp(otp: string, hash: string): Promise<boolean> {
  return bcrypt.compare(otp, hash);
}

// ── JWT / Session ─────────────────────────────────────────────────────────────

export interface SessionPayload {
  userId: string;
  email: string;
  username: string;
  role: string;
}

export async function signJwt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(JWT_SECRET);
}

export async function verifyJwt(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

import { cookies } from "next/headers";

export async function setSessionCookie(
  res: NextResponse,
  token: string
): Promise<NextResponse> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}

export async function clearSessionCookie(res: NextResponse): Promise<NextResponse> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}

export { SESSION_COOKIE };
