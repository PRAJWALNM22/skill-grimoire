import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter, FROM_NAME, FROM_EMAIL } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, studentClass, email, phone, message } = body;

    if (!name || !studentClass || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Database
    const inquiry = await prisma.studentInquiry.create({
      data: {
        name,
        studentClass,
        email,
        phone,
        message,
        status: "NEW",
      },
    });

    // 2. Send Email
    let toEmail = "contact@skillgrimoire.com"; // Fallback
    if (studentClass === "10th" || studentClass?.startsWith("10th")) {
      toEmail = "school@skillgrimoire.com";
    } else if (studentClass?.startsWith("PU")) {
      toEmail = "pu@skillgrimoire.com";
    } else if (studentClass?.startsWith("UG") || studentClass?.startsWith("PG") || studentClass === "Degree College" || studentClass === "College") {
      toEmail = "college@skillgrimoire.com";
    }

    const mailOptions = {
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: toEmail,
      subject: `New Individual Student Enquiry from ${name} (${studentClass})`,
      text: `
Hello,

You have received a new individual student enquiry.

Student Name: ${name}
Class: ${studentClass}
Email: ${email}
Phone: ${phone || "N/A"}
Message: ${message || "N/A"}

Best,
Skill Grimoire System
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send email, but saved to DB:", emailError);
    }

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error("Error submitting student inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
