const mongoose = require('mongoose');

const MONGODB_URL = "mongodb+srv://gamearena083_db_user:MyGvI59NO744lkez@cluster0.jbt8w7x.mongodb.net/game-arena?retryWrites=true&w=majority";

async function testConnection() {
    try {
        console.log("Testing MongoDB connection...");
        console.log("Connection URI:", MONGODB_URL);

        const conn = await mongoose.connect(MONGODB_URL, {
            dbName: 'game-arena',
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });

        console.log("Successfully connected to MongoDB!");
        console.log("Connection state:", conn.connection.readyState);

        // Test a simple query
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log("Collections in database:", collections.map(c => c.name));

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);

        if (error.name === 'MongooseServerSelectionError') {
            console.error("Server selection error details:", error.reason);
        }
    }
}

testConnection();
