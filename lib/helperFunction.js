// Import NextResponse for sending responses in Next.js API routes
import { NextResponse } from "next/server"

// ---------------------
// Standard JSON Response
// ---------------------
export const response = (success, statusCode, message, data = {}) => {
    // Returns a consistent JSON response structure
    return NextResponse.json({
        success,       // Boolean: true/false
        statusCode,    // HTTP status code (e.g., 200, 400, 500)
        message,       // Custom message
        data           // Optional data object
    })
}

// ---------------------
// Error Handling Utility
// ---------------------
export const catchError = (error, customMessage) => {
    // Handle MongoDB duplicate key error
    if(error.code === 11000){
        const keys = Object.keys(error.keyPattern).join(',')
        error.message = `Duplicate field: ${keys}. These fields value must be unique.`
    }

    let errorObj = {}

    // Detailed error in development environment
    if(process.env.NODE_ENV === 'development'){
        errorObj = {
            message: error.message,
            error          // Full error object
        }
    } else {
        // Generic message in production
        errorObj = {
            message: customMessage || 'Internal server error',
        }
    }

    // Return structured error response
    return NextResponse.json({
        success: false,
        statusCode: error.code,  // HTTP error code (or MongoDB error code)
        ...errorObj
    })
}

// ---------------------
// OTP Generation Utility
// ---------------------
export const generateOTP = () => {
    // Generate a random 6-digit number as string
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    return otp
}
