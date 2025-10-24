import { connectDB } from "@/lib/databaseConnection";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const {
      tournamentId,
      playerEmail,
      playerName,
      dateOfBirth,
      city,
      state,
      teamName,
      contactNumber
    } = await request.json();

    // Validate required fields
    if (!tournamentId || !playerEmail || !playerName || !dateOfBirth || !city || !state) {
      return Response.json(
        { error: "Missing required fields" },
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

    // Check if tournament exists
    const tournament = await db.db.collection("tournaments").findOne({ _id: new ObjectId(tournamentId) });
    if (!tournament) {
      return Response.json(
        { error: "Tournament not found" },
        { status: 404 }
      );
    }

    // Check if player is already registered for this tournament
    const existingRegistration = await db.db.collection("tournamentRegistrations").findOne({
      tournamentId: new ObjectId(tournamentId),
      playerEmail: playerEmail
    });

    if (existingRegistration) {
      return Response.json(
        { error: "You are already registered for this tournament" },
        { status: 400 }
      );
    }

    // Create new registration
    const newRegistration = {
      tournamentId: new ObjectId(tournamentId),
      playerEmail,
      playerName,
      dateOfBirth,
      city,
      state,
      teamName: teamName || "",
      contactNumber: contactNumber || "",
      paid: true,
      createdAt: new Date()
    };

    const result = await db.db.collection("tournamentRegistrations").insertOne(newRegistration);

    if (result.acknowledged) {
      return Response.json({
        success: true,
        message: "Registration successful",
        data: {
          id: result.insertedId,
          ...newRegistration,
          tournamentId: tournamentId // Convert back to string for JSON response
        }
      });
    } else {
      return Response.json(
        { error: "Failed to register for tournament" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error registering for tournament:", error);
    return Response.json(
      { error: "Failed to register for tournament" },
      { status: 500 }
    );
  }
}
