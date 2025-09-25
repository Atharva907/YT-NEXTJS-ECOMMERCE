import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.models";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    const validationSchema = zSchema.pick({ email: true });
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or missing input field.",
          error: validatedData.error,
        },
        { status: 200 }
      );
    }

    const email = validatedData.data.email.trim();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 200 }
      );
    }

    // Optional: check if email is verified before sending OTP
    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is not verified. Please verify your email first.",
        },
        { status: 200 }
      );
    }

    // Delete previous OTPs for this email
    await OTPModel.deleteMany({ email });

    const otp = generateOTP();
    const newOtpData = new OTPModel({ email, otp });
    await newOtpData.save();

    const otpSendStatus = await sendMail(
      "Your login verification code",
      email,
      otpEmail(otp)
    );

    if (!otpSendStatus.success) {
      return NextResponse.json(
        { success: false, message: "Failed to send OTP." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, message: "OTP sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    return catchError(error);
  }
}
