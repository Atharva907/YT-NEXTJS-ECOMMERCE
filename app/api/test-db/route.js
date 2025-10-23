import { connectDB } from "@/lib/databaseConnection";
import { response } from "@/lib/helperFunction";

export async function GET() {
    try {
        console.log("Testing MongoDB connection...");
        const conn = await connectDB();
        console.log("Connection state:", conn.connection.readyState);

        return response(true, 200, "Database connection successful", {
            readyState: conn.connection.readyState,
            host: conn.connection.host,
            name: conn.connection.name
        });
    } catch (error) {
        console.error("Database connection failed:", error);

        return response(false, 500, "Database connection failed", {
            error: error.message,
            name: error.name,
            reason: error.reason
        });
    }
}
