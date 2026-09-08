import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter, FROM_NAME, FROM_EMAIL } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { institutionName, institutionType, contactPerson, email, message } = body;

    if (!institutionName || !institutionType || !contactPerson || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Database
    const inquiry = await prisma.partnerInquiry.create({
      data: {
        institutionName,
        institutionType,
        contactPerson,
        email,
        message,
        status: "NEW",
      },
    });

    // 2. Send Email
    // Configure based on the selected institution type
    let toEmail = "";
    if (institutionType === "10th") {
      toEmail = "school@skillgrimoire.com";
    } else if (institutionType === "PU") {
      toEmail = "pu@skillgrimoire.com";
    } else if (institutionType === "Degree College") {
      toEmail = "college@skillgrimoire.com";
    } else {
      toEmail = "contact@skillgrimoire.com"; // Fallback
    }

    const mailOptions = {
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: toEmail,
      subject: `New Partnership Enquiry from ${institutionName} (${institutionType})`,
      text: `
Hello,

You have received a new partnership enquiry.

Institution Name: ${institutionName}
Institution Type: ${institutionType}
Contact Person: ${contactPerson}
Email: ${email}
Message: ${message || "N/A"}

Best,
Skill Grimoire System
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send email, but saved to DB:", emailError);
      // We don't fail the request if the email fails, as long as it's in the DB.
    }

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error("Error submitting partner inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
