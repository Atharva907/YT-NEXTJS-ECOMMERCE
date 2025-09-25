// Import mongoose for MongoDB interactions
import mongoose from "mongoose";

// ---------------------
// OTP Schema Definition
// ---------------------
const otpSchema = new mongoose.Schema({
    email: {
        type: String,            // User's email to which OTP is sent
        required: true           // Must always have an email
    },
    otp: {
        type: String,            // The OTP (One-Time Password) value
        required: true           // OTP is mandatory
    },
    expiresAt: {
        type: Date,              // When the OTP expires
        required: true,          // Must have a value
        default: () => new Date(Date.now() + 10 * 60 * 1000) 
        // Defaults to 10 minutes from now (600,000 milliseconds)
    }
}, { timestamps: true })       // Automatically adds createdAt & updatedAt fields

// ---------------------
// Index to auto-delete expired OTPs
// ---------------------
// MongoDB will automatically remove documents once expiresAt < current time
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

// ---------------------
// Create OTP Model
// ---------------------
// Prevents model overwrite during hot-reload (like in Next.js)
const OTPModel = mongoose.models.OTP || mongoose.model('OTP', otpSchema, 'otps')

// Export the OTP model to use in controllers
export default OTPModel;
