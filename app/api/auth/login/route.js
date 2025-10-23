import { emailVerificationLink } from "@/email/emailVerificationLink";
import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.models";
import { SignJWT } from "jose";
import { z } from "zod";

export async function POST(request) {
    console.log("POST /login triggered"); // Debug

    try {
        await connectDB();

        const payload = await request.json();

        // Validate email and password using Zod
        const validationSchema = zSchema
            .pick({ email: true })
            .extend({ password: z.string() });

        const validatedData = validationSchema.safeParse(payload);

        if (!validatedData.success) {
            return response(
                false,
                401,
                "Invalid or missing input field",
                validatedData.error
            );
        }

        // Trim inputs to avoid whitespace issues
        const email = validatedData.data.email.trim();
        const password = validatedData.data.password.trim();

        // Fetch user and include hashed password
        const getUser = await UserModel.findOne({ deletedAt: null, email }).select("+password");

        console.log("Fetched user from DB:", getUser); // Debug

        if (!getUser) {
            return response(false, 401, "Invalid login credentials.");
        }

        // Verify password
        const isPasswordMatched = await getUser.comparePassword(password);
        console.log("Password match result:", isPasswordMatched); // Debug

        if (!isPasswordMatched) {
            return response(false, 401, "Invalid login credentials.");
        }

        // Check if email is verified
        if (!getUser.isEmailVerified) {
            const secret = new TextEncoder().encode(process.env.SECRET_KEY);
            const token = await new SignJWT({ userId: getUser._id.toString() })
                .setIssuedAt()
                .setExpirationTime("1h")
                .setProtectedHeader({ alg: "HS256" })
                .sign(secret);

            await sendMail(
                "Email Verification request from GameArena",
                email,
                emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
            );

            return response(
                false,
                401,
                "Your email is not verified. We have sent a verification link to your registered email address."
            );
        }

        // Delete old OTPs
        await OTPModel.deleteMany({ email });

        // Generate new OTP
        const otp = generateOTP();

        // Save OTP to database
        const newOtpData = new OTPModel({ email, otp });
        await newOtpData.save();

        // Send OTP email
        const otpEmailStatus = await sendMail(
            "Your login verification code",
            email,
            otpEmail(otp)
        );

        if (!otpEmailStatus.success) {
            return response(false, 400, "Failed to send OTP.");
        }

        // Success response
        return response(true, 200, "Please verify your device.");

    } catch (error) {
        return catchError(error);
    }
}
