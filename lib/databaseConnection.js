// Import mongoose for MongoDB interactions
import mongoose from "mongoose";

// MongoDB connection URI from environment variables
const MONGODB_URL = process.env.MONGODB_URI

// ---------------------
// Global cache for Next.js hot reload
// ---------------------
// When using Next.js (or serverless), the app reloads often.
// Without caching, multiple connections can be created leading to errors.
// We store cached connection globally.
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {
        conn: null,      // Stores the active connection
        promise: null,   // Stores the promise for pending connection
    }
}

// ---------------------
// Connect to MongoDB
// ---------------------
export const connectDB = async () => {
    // If connection already exists, return it
    if (cached.conn) return cached.conn

    // If connection is not yet created, create a promise to connect
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: 'YT-NEXTJS-ECOMMERCE', // Database name
            bufferCommands: false           // Disable mongoose buffering commands until connected
        })
    }

    // Await the connection promise
    cached.conn = await cached.promise

    // Return the active connection
    return cached.conn
}
