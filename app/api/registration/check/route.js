import { connectDB } from "@/lib/databaseConnection";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tournamentId = searchParams.get("tournamentId");
    const email = searchParams.get("email");

    if (!tournamentId || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400 }
      );
    }

    // Validate tournament ID
    if (!ObjectId.isValid(tournamentId)) {
      return Response.json(
        { error: "Invalid tournament ID" },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // Check if player is already registered for this tournament
    const existingRegistration = await db.db.collection("tournamentRegistrations").findOne({
      tournamentId: new ObjectId(tournamentId),
      playerEmail: email
    });

    return new Response(JSON.stringify({
      isRegistered: !!existingRegistration
    }), { status: 200 });
  } catch (error) {
    console.error("Error checking registration:", error);
    return Response.json(
      { error: "Failed to check registration" },
      { status: 500 }
    );
  }
}
