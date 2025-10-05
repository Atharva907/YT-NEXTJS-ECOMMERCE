import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Debug logs
    console.log("Cloudinary signature body:", body);

    // Use all params sent by the widget (usually includes upload_preset, timestamp, etc.)
    const { paramsToSign } = body;

    // Sign all required parameters
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_SECRET_KEY
    );

    // Return signature and all signed params
    return NextResponse.json({ signature, ...paramsToSign });
  } catch (error) {
    console.error("Signature generation error:", error);
    return NextResponse.json(
      { error: error?.message || "signature generation failed" },
      { status: 500 }
    );
  }
}
