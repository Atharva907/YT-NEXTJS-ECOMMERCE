// API endpoint to fetch tournaments
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/databaseConnection';
import Tournament from '@/models/Tournament';

export async function GET(request) {
  try {
    // Connect to the database
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Create query based on status filter
    const query = status ? { status } : {};
    
    // Fetch tournaments from database
    const tournaments = await Tournament.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ data: tournaments });
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    
    // Check for specific MongoDB connection errors
    if (error.code === 'ENOTFOUND' || error.message.includes('querySrv ENOTFOUND')) {
      return NextResponse.json(
        { 
          message: "Database connection error. Please check your MongoDB configuration.",
          error: "Invalid MongoDB connection string" 
        },
        { status: 500 }
      );
    }
    
    // Check for authentication errors
    if (error.code === 18 || error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { 
          message: "Database authentication error. Please check your credentials.",
          error: "Invalid MongoDB credentials" 
        },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { message: "An error occurred while fetching tournaments." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();
    
    const tournamentData = await request.json();

    // Create a new tournament in the database
    const newTournament = new Tournament({
      ...tournamentData,
      currentParticipants: 0 // Initialize with 0 participants
    });
    
    // Save the tournament to the database
    await newTournament.save();

    return NextResponse.json(newTournament, { status: 201 });
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the tournament." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    // Connect to the database
    await connectDB();
    
    const tournamentData = await request.json();
    const { id } = tournamentData;
    
    // Debug logs
    console.log("Updating tournament with ID:", id);
    console.log("Tournament data:", tournamentData);

    if (!id) {
      return NextResponse.json(
        { message: "Tournament ID is required." },
        { status: 400 }
      );
    }

    // Find and update the tournament in the database
    console.log("Attempting to update tournament with ID:", id);
    console.log("Update data:", tournamentData);
    
    // Remove the id from the update data to prevent updating it
    const { id: tournamentId, ...updateData } = tournamentData;
    
    const updatedTournament = await Tournament.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    console.log("Update result:", updatedTournament);

    if (!updatedTournament) {
      console.log("Tournament not found with ID:", id);
      return NextResponse.json(
        { message: "Tournament not found." },
        { status: 404 }
      );
    }

    console.log("Tournament successfully updated:", updatedTournament);
    
    // Verify the update by querying the database directly
    try {
      const verifiedTournament = await Tournament.findById(id);
      console.log("Verified tournament from database:", verifiedTournament);
    } catch (verifyError) {
      console.error("Error verifying tournament update:", verifyError);
    }
    
    return NextResponse.json(updatedTournament);
  } catch (error) {
    console.error("Error updating tournament:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the tournament." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Connect to the database
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: "Tournament ID is required." },
        { status: 400 }
      );
    }

    // Find and delete the tournament from the database
    const deletedTournament = await Tournament.findByIdAndDelete(id);

    if (!deletedTournament) {
      return NextResponse.json(
        { message: "Tournament not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tournament deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the tournament." },
      { status: 500 }
    );
  }
}
