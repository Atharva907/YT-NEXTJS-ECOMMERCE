// Import nodemailer for sending emails
import nodemailer from "nodemailer"

// ---------------------
// Function to send emails
// ---------------------
export const sendMail = async (subject, receiver, body) => {
    // Create a transporter using SMTP settings from environment variables
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,     // SMTP host (e.g., smtp.gmail.com)
        port: process.env.NODEMAILER_PORT,     // SMTP port (usually 587 for TLS)
        secure: false,                          // false for TLS, true for SSL
        auth: {
            user: process.env.NODEMAILER_EMAIL, // Email address from which mail is sent
            pass: process.env.NODEMAILER_PASSWORD, // App password or email password
        }
    })

    // Email options
    const options = {
        from: `"GameArena" <${process.env.NODEMAILER_EMAIL}>`, // Sender name and email
        to: receiver,       // Receiver's email address
        subject: subject,   // Email subject
        html: body          // Email body in HTML format
    }

    try {
        // Send the email
        await transporter.sendMail(options)
        return { success: true } // Return success if mail sent
    } catch (error) {
        // Return error message if sending fails
        return { success: false, message: error.message }
    }
}