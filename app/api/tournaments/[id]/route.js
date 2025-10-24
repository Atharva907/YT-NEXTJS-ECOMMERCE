// API endpoint to fetch a single tournament by ID
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import Tournament from "@/models/Tournament";

export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Tournament ID is required." },
        { status: 400 }
      );
    }

    // Find the tournament in the database
    const tournament = await Tournament.findById(id);

    if (!tournament) {
      return NextResponse.json(
        { message: "Tournament not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(tournament);
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the tournament." },
      { status: 500 }
    );
  }
}
