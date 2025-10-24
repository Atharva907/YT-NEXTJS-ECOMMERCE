import { connectDB } from "@/lib/databaseConnection";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // Find all registrations for this user
    const registrations = await db.db.collection("tournamentRegistrations")
      .find({ playerEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return Response.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
