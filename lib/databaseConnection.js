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
        console.log("Attempting to connect to MongoDB...")
        console.log("Connection URI:", MONGODB_URL)

        // Add connection options to help with potential network issues
        const options = {
            dbName: 'game-arena', // Database name
            bufferCommands: false, // Disable mongoose buffering commands until connected
            serverSelectionTimeoutMS: 30000, // Timeout after 30s to allow more time for connection
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            maxPoolSize: 50, // Maintain up to 50 socket connections
            // Additional options for MongoDB Atlas
            connectTimeoutMS: 10000, // How long to try connecting
            heartbeatFrequencyMS: 10000, // How often to check connection status
            retryWrites: true, // Retry write operations if they fail
            w: 'majority', // Write concern
            // Debugging options
            autoIndex: false, // Don't build indexes
            maxIdleTimeMS: 30000, // How long a connection can be idle before being closed
        }

        // Set mongoose debug mode
        mongoose.set('debug', true);

        cached.promise = mongoose.connect(MONGODB_URL, options)
            .then(conn => {
                console.log("Successfully connected to MongoDB!");
                console.log("Connection state:", conn.connection.readyState);
                return conn;
            })
            .catch(error => {
                console.error("Error connecting to MongoDB:", error);

                // Provide more detailed error information
                if (error.name === 'MongooseServerSelectionError') {
                    console.error("Server selection error details:", error.reason);
                }

                cached.promise = null; // Reset promise to allow retry
                throw error;
            });
    }

    try {
        // Await the connection promise
        cached.conn = await cached.promise
    } catch (error) {
        console.error("Failed to establish MongoDB connection:", error);
        cached.promise = null; // Reset promise to allow retry
        throw error;
    }

    // Return the active connection
    return cached.conn
}
