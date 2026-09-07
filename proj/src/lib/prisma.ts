import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

function getConnectionString(): string {
  let conn = process.env.DATABASE_URL || "";
  // Automatically route direct IPv6 Supabase host to IPv4 pooler for Netlify/serverless
  if (conn.includes("db.xmiocnsesljynkwmpbzb.supabase.co")) {
    conn = conn
      .replace("db.xmiocnsesljynkwmpbzb.supabase.co:5432", "aws-0-ap-southeast-1.pooler.supabase.com:6543")
      .replace("postgres:", "postgres.xmiocnsesljynkwmpbzb:");
  }
  return conn;
}

const connectionString = getConnectionString();
const isRemoteDb =
  connectionString.includes("supabase") ||
  connectionString.includes("sslmode=") ||
  process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString,
  ssl: isRemoteDb ? { rejectUnauthorized: false } : undefined,
});
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
