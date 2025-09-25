import UserModel from "@/models/User.models";
import { catchError, response } from "@/lib/helperFunction";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, token } = body;

    if (!email || !password || !token) {
      return response(false, 400, "Missing required fields.");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response(false, 404, "User not found.");
    }

    // Check if new password is same as previous (if previous password exists)
    if (user.password) {
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return response(false, 400, "New password cannot be the same as the previous password.");
      }
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    return response(true, 200, "Password updated successfully.");
  } catch (error) {
    return catchError(error);
  }
}
