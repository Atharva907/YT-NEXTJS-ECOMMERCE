// Import mongoose for MongoDB interactions
import mongoose from "mongoose";

// MongoDB connection URI from environment variables
const MONGODB_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/game-arena";

// Log the connection URI for debugging
console.log("MongoDB connection URI:", MONGODB_URL);

// ---------------------
// Global cache for Next.js hot reload
// ---------------------
// When using Next.js (or serverless), the app reloads often.
// Without caching, multiple connections can be created leading to errors.
// We store cached connection globally.
let cached = global.mongoose

// Check if we need to reset the cache (environment changed)
if (cached && cached.conn && cached.conn.readyState === 1 && process.env.MONGODB_URI !== cached.uri) {
    console.log("MongoDB URI changed, resetting connection");
    cached.conn.close();
    cached.conn = null;
    cached.promise = null;
}

if (!cached) {
    cached = global.mongoose = {
        conn: null,      // Stores the active connection
        promise: null,   // Stores the promise for pending connection
        uri: process.env.MONGODB_URI || "" // Store the current URI
    }
}

// Update the stored URI
if (cached.uri !== process.env.MONGODB_URI) {
    cached.uri = process.env.MONGODB_URI || "";
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
            dbName: 'game-arena', // Database name
            bufferCommands: false           // Disable mongoose buffering commands until connected
        })
    }

    // Await the connection promise
    cached.conn = await cached.promise

    // Return the active connection
    return cached.conn
}
