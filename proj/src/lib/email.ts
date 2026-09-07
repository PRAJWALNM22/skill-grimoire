import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const FROM_NAME = process.env.EMAIL_FROM_NAME || "Skill Grimoire";
const FROM_EMAIL = process.env.GMAIL_USER || "noreply@skillgrimoire.com";

// ── Shared HTML builder ───────────────────────────────────────────────────────

function buildEmailHtml(heading: string, bodyText: string, otpOrContent: string, footerNote?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${heading}</title>
</head>
<body style="margin:0;padding:0;background:#05080F;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05080F;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0B1525,#101E36);border:1px solid rgba(229,184,105,0.3);border-radius:20px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#12213A,#1A2D4A);padding:28px 32px;text-align:center;border-bottom:1px solid rgba(229,184,105,0.2);">
              <div style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#E5B869;letter-spacing:2px;">
                ✦ SKILL GRIMOIRE
              </div>
              <div style="font-size:11px;color:#8A9DB8;margin-top:4px;letter-spacing:1px;text-transform:uppercase;">
                Your Gateway to Expert Skills
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#FFFFFF;font-family:Georgia,serif;">
                ${heading}
              </h1>
              <p style="margin:0 0 28px;font-size:14px;color:#A8BCCE;line-height:1.6;">
                ${bodyText}
              </p>

              ${otpOrContent}

              <p style="margin:0;font-size:12px;color:#4A5E72;line-height:1.7;">
                ${footerNote || "If you didn't request this, you can safely ignore this email."}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <div style="font-size:11px;color:#2E4055;">
                © ${new Date().getFullYear()} Skill Grimoire · All rights reserved
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function otpBox(otp: string): string {
  return `
    <div style="background:#080F1C;border:2px solid rgba(229,184,105,0.4);border-radius:16px;padding:28px;text-align:center;margin-bottom:28px;">
      <div style="font-size:11px;color:#E5B869;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;">
        Verification Code
      </div>
      <div style="font-size:48px;font-weight:800;letter-spacing:12px;color:#F5D075;font-family:Georgia,serif;text-shadow:0 0 30px rgba(229,184,105,0.6);">
        ${otp}
      </div>
      <div style="margin-top:14px;font-size:12px;color:#5A6E82;">
        Expires in <strong style="color:#E5B869;">10 minutes</strong>
      </div>
    </div>
  `;
}

// ── OTP Email (signup/login - legacy) ─────────────────────────────────────────

function getOtpEmailHtml(otp: string, type: "SIGNUP" | "LOGIN"): string {
  const heading = type === "SIGNUP" ? "Complete Your Registration" : "Login Verification Code";
  const body =
    type === "SIGNUP"
      ? "You're almost there! Enter this code to verify your email and create your account."
      : "Use this code to log in to your Skill Grimoire account. It expires in 10 minutes.";

  return buildEmailHtml(heading, body, otpBox(otp));
}

export async function sendOtpEmail(
  to: string,
  otp: string,
  type: "SIGNUP" | "LOGIN"
): Promise<void> {
  const subject =
    type === "SIGNUP"
      ? "Verify your Skill Grimoire account"
      : `${otp} is your Skill Grimoire login code`;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject,
    html: getOtpEmailHtml(otp, type),
    text: `Your ${type === "SIGNUP" ? "signup verification" : "login"} code is: ${otp}\n\nIt expires in 10 minutes.\n\nIf you didn't request this, ignore this email.`,
  });
}

// ── First Login / Password Change OTP ─────────────────────────────────────────

export async function sendFirstLoginOtpEmail(to: string, name: string, otp: string): Promise<void> {
  const heading = "Verify Your Email to Set Password";
  const body = `Welcome to Skill Grimoire, ${name}! Your account has been created by an administrator. To set your new password, please verify your email with the code below.`;

  const html = buildEmailHtml(
    heading,
    body,
    otpBox(otp),
    "This is a mandatory step to secure your account. If you didn't expect this email, contact your institution administrator."
  );

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: "Verify your email — Set your Skill Grimoire password",
    html,
    text: `Welcome to Skill Grimoire! Verify your email to set your password.\n\nCode: ${otp}\n\nExpires in 10 minutes.`,
  });
}

// ── Forgot / Reset Password OTP ───────────────────────────────────────────────

export async function sendPasswordResetEmail(to: string, otp: string): Promise<void> {
  const heading = "Reset Your Password";
  const body = "We received a request to reset your Skill Grimoire password. Use the code below to proceed. If you didn't request this, ignore this email.";

  const html = buildEmailHtml(heading, body, otpBox(otp));

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: `${otp} — Reset your Skill Grimoire password`,
    html,
    text: `Your password reset code is: ${otp}\n\nIt expires in 10 minutes.`,
  });
}

// ── Welcome Email (admin creates student) ─────────────────────────────────────

export async function sendWelcomeEmail(
  to: string,
  name: string,
  temporaryPassword: string
): Promise<void> {
  const heading = `Welcome, ${name}!`;
  const body = "Your Skill Grimoire student account has been created by your administrator. Use the credentials below to log in. You will be required to change your password on first login.";

  const credBox = `
    <div style="background:#080F1C;border:2px solid rgba(229,184,105,0.4);border-radius:16px;padding:28px;margin-bottom:28px;">
      <div style="font-size:11px;color:#E5B869;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:18px;">
        Your Login Credentials
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:12px;color:#8A9DB8;padding-bottom:10px;">Email</td>
          <td style="font-size:13px;color:#FFFFFF;font-weight:600;padding-bottom:10px;text-align:right;">${to}</td>
        </tr>
        <tr>
          <td style="font-size:12px;color:#8A9DB8;">Temporary Password</td>
          <td style="font-size:13px;color:#F5D075;font-weight:700;font-family:monospace;letter-spacing:1px;text-align:right;">${temporaryPassword}</td>
        </tr>
      </table>
      <div style="margin-top:18px;padding-top:14px;border-top:1px solid rgba(229,184,105,0.15);font-size:11px;color:#5A6E82;">
        ⚠️ You will be asked to change this password on your first login.
      </div>
    </div>
  `;

  const html = buildEmailHtml(
    heading,
    body,
    credBox,
    "Please log in at your earliest convenience and change your password. Do not share these credentials with anyone."
  );

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: `Welcome to Skill Grimoire — Your account is ready`,
    html,
    text: `Welcome ${name}!\n\nYour account has been created.\nEmail: ${to}\nTemporary Password: ${temporaryPassword}\n\nPlease login and change your password immediately.`,
  });
}
