import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP } from "@/lib/helperFunction";
import { otpEmail } from "@/email/otpEmail";
import { sendMail } from "@/lib/sendMail";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.models";
import { NextResponse } from "next/server";
import { zSchema } from "@/lib/zodSchema";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();

    // Validate email
    const validationSchema = zSchema.pick({ email: true });
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input.", error: validatedData.error },
        { status: 400 }
      );
    }

    const { email } = validatedData.data;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Delete previous OTPs
    await OTPModel.deleteMany({ email });

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    const newOtp = new OTPModel({ email, otp, expiresAt });
    await newOtp.save();

    // Send OTP via email
    const mailStatus = await sendMail("Your verification code", email, otpEmail(otp));
    if (!mailStatus.success) {
      return NextResponse.json(
        { success: false, message: "Failed to send OTP." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully." }, { status: 200 });
  } catch (error) {
    return catchError(error);
  }
}