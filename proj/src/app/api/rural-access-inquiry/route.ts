import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter, FROM_NAME, FROM_EMAIL } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { institutionName, institutionType, place, contactPerson, email, phone, message } = body;

    if (!institutionName || !institutionType || !place || !contactPerson || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Database
    const inquiry = await prisma.ruralAccessInquiry.create({
      data: {
        institutionName,
        institutionType,
        place,
        contactPerson,
        email,
        phone,
        message,
        status: "NEW",
      },
    });

    // 2. Send Email
    let toEmail = "office@skillgrimoire.com"; // Fallback
    if (institutionType === "10th") {
      toEmail = "school@skillgrimoire.com";
    } else if (institutionType === "PU") {
      toEmail = "pu@skillgrimoire.com";
    } else if (institutionType === "College") {
      toEmail = "college@skillgrimoire.com";
    }

    const mailOptions = {
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: toEmail,
      subject: `New Rural Access Initiative Enquiry from ${institutionName} (${institutionType})`,
      text: `
Hello,

You have received a new Rural Access Initiative partnership enquiry.

Institution Name: ${institutionName}
Institution Type: ${institutionType}
Place: ${place}
Contact Person: ${contactPerson}
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
    console.error("Error submitting rural access inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
