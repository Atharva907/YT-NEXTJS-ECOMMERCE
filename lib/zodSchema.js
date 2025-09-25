// Import zod for schema validation
import { z } from 'zod'

// ---------------------
// Zod Schema Definition
// ---------------------
export const zSchema = z.object({

  // -----------------
  // Name Validation
  // -----------------
  name: z
      .string()  // Must be a string
      .min(2, "Name must be at least 2 characters long")   // Minimum length 2
      .max(50, "Name must not exceed 50 characters")       // Maximum length 50
      .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"), // Only letters & spaces allowed

  // -----------------
  // Email Validation
  // -----------------
  email: z
    .string()                // Must be a string
    .email("Invalid email address")  // Must be a valid email format
    .min(5, "Email must be at least 5 characters long")   // Minimum length 5
    .max(100, "Email must not exceed 100 characters"),    // Maximum length 100

  // -----------------
  // Password Validation
  // -----------------
  password: z
    .string()                     // Must be a string
    .min(8, "Password must be at least 8 characters long")  // Minimum length 8
    .max(50, "Password must not exceed 50 characters")      // Maximum length 50
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")  // At least 1 uppercase
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")  // At least 1 lowercase
    .regex(/[0-9]/, "Password must contain at least one number")            // At least 1 number
    .regex(/[@$!%*?&#]/, "Password must contain at least one special character"), // At least 1 special character

  // -----------------
  // OTP Validation
  // -----------------
  otp: z
    .string()                      // Must be a string
    .regex(/^\d{6}$/, "Must be a 6-digit number") // Exactly 6 digits
})
