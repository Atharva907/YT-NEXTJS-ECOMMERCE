import mongoose from "mongoose";

let isConnected = false; // track connection state

export async function connectDB() {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    console.log("Attempting to connect to MongoDB with URI:", process.env.MONGODB_URI ? "URI provided" : "URI missing");
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "game-arena",
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected successfully to database:", db.connection.name);
    console.log("Connection state:", db.connections[0].readyState);
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}

// Optional alias for backward compatibility
export const connectToDatabase = connectDB;
