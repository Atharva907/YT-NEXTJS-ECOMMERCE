import { connectDB } from "@/lib/databaseConnection";
import Player from "@/models/Player";

// GET - Fetch player profile by email
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const player = await Player.findOne({ email });

    if (!player) {
      return new Response(JSON.stringify({ error: "Player profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify(player), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching player profile:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch player profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// POST - Create or update player profile
export async function POST(request) {
  try {
    await connectDB();

    const playerData = await request.json();

    // Check if player with this email or username already exists
    const existingPlayer = await Player.findOne({
      $or: [
        { email: playerData.email },
        { username: playerData.username }
      ]
    });

    if (existingPlayer) {
      return new Response(JSON.stringify({ 
        error: "A player with this email already exists. Would you like to update your profile?" 
      }), {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Create new player
    const newPlayer = new Player(playerData);
    await newPlayer.save();

    return new Response(JSON.stringify(newPlayer), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error saving player profile:", error);
    return new Response(JSON.stringify({ error: "Failed to save player profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// PUT - Update existing player profile
export async function PUT(request) {
  try {
    await connectDB();

    const playerData = await request.json();
    const { email, ...updateData } = playerData;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required for updating profile" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Check if updating username and if it's already taken by another player
    if (updateData.username) {
      const existingPlayer = await Player.findOne({
        username: updateData.username,
        email: { $ne: email }
      });

      if (existingPlayer) {
        return new Response(JSON.stringify({ 
          error: "This username is already taken by another player" 
        }), {
          status: 409,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Update the player profile
    const updatedPlayer = await Player.findOneAndUpdate(
      { email },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPlayer) {
      return new Response(JSON.stringify({ error: "Player profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify(updatedPlayer), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating player profile:", error);
    return new Response(JSON.stringify({ error: "Failed to update player profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
