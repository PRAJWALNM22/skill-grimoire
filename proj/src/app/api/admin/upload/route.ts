import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      return NextResponse.json({ error: "File must be an image or video." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadPromise = new Promise((resolve, reject) => {
      const resourceType = file.type.startsWith("video/") ? "video" : "image";
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType, folder: "skillgrimoire" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    const result: any = await uploadPromise;

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (err: any) {
    console.error("[POST /api/admin/upload]", err);
    return NextResponse.json({ error: err.message || "Failed to upload file to Cloudinary." }, { status: 500 });
  }
}
