import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.models";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    // ---------------------
    // Validate Input
    // ---------------------
    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field",
        validatedData.error
      );
    }

    const { name, email, password } = validatedData.data;

    // ---------------------
    // Check if user already exists
    // ---------------------
    const checkUser = await UserModel.exists({ email, deletedAt: null });
    if (checkUser) {
      return response(false, 409, "User already registered");
    }

    // ---------------------
    // Hash password before saving
    // ---------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // ---------------------
    // Create new user
    // ---------------------
    const NewRegisteration = new UserModel({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
    });

    await NewRegisteration.save();

    // ---------------------
    // Create JWT token for email verification
    // ---------------------
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: NewRegisteration._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h") // token valid for 1 hour
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    // ---------------------
    // Build baseUrl (works locally + on Vercel)
    // ---------------------
    const host = request?.headers?.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    // Use NEXT_PUBLIC_BASE_URL if available, otherwise construct from request headers
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `${protocol}://${host}`);

    const verificationUrl = `${baseUrl}/auth/verify-email/${token}`;

    // ---------------------
    // Send verification email
    // ---------------------
    await sendMail(
      "Email Verification Request from GameArena",
      email,
      emailVerificationLink(verificationUrl)
    );

    return response(
      true,
      200,
      "Registration success, please verify your email address."
    );
  } catch (error) {
    return catchError(error);
  }
}
