// API endpoint to fetch tournaments
import { NextResponse } from 'next/server';

// In a real app, this would connect to a database
// For now, we'll use mock data that matches the admin tournaments page
let tournaments = [
  {
    id: 1,
    name: "Summer Championship 2023",
    game: "Valorant",
    description: "The biggest Valorant tournament of the summer with teams from all over the region.",
    startDate: "2023-07-15",
    endDate: "2023-07-20",
    startTime: "10:00",
    endTime: "18:00",
    location: "Online",
    maxParticipants: 32,
    currentParticipants: 28,
    status: "live",
    prize: "$5,000",
    rules: "Standard 5v5 tournament rules. Single elimination.",
    imageUrl: "/assets/tournaments/valorant-summer.jpg"
  },
  {
    id: 2,
    name: "CS:GO Masters League",
    game: "Counter-Strike: Global Offensive",
    description: "Professional CS:GO tournament with top-tier teams competing for the championship title.",
    startDate: "2023-08-10",
    endDate: "2023-08-15",
    startTime: "14:00",
    endTime: "22:00",
    location: "Berlin, Germany",
    maxParticipants: 16,
    currentParticipants: 16,
    status: "upcoming",
    prize: "$10,000",
    rules: "Standard tournament rules. Double elimination.",
    imageUrl: "/assets/tournaments/csgo-masters.jpg"
  },
  {
    id: 3,
    name: "Fortnite Battle Royale",
    game: "Fortnite",
    description: "Epic Fortnite Battle Royale tournament with solo and duo competitions.",
    startDate: "2023-06-05",
    endDate: "2023-06-07",
    startTime: "16:00",
    endTime: "20:00",
    location: "Online",
    maxParticipants: 100,
    currentParticipants: 87,
    status: "completed",
    prize: "$3,000",
    rules: "Solo and duo modes. Standard battle royale rules.",
    imageUrl: "/assets/tournaments/fortnite-br.jpg"
  },
  {
    id: 4,
    name: "League of Legends Regional",
    game: "League of Legends",
    description: "Regional qualifying tournament for the world championship.",
    startDate: "2023-09-01",
    endDate: "2023-09-05",
    startTime: "12:00",
    endTime: "20:00",
    location: "Seoul, South Korea",
    maxParticipants: 8,
    currentParticipants: 5,
    status: "upcoming",
    prize: "$15,000",
    rules: "Standard 5v5 Summoner's Rift. Best of 3 for group stage, best of 5 for playoffs.",
    imageUrl: "/assets/tournaments/lol-regional.jpg"
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  // Filter tournaments by status if provided
  let filteredTournaments = tournaments;
  if (status) {
    filteredTournaments = tournaments.filter(tournament => tournament.status === status);
  }

  return NextResponse.json(filteredTournaments);
}

export async function POST(request) {
  try {
    const tournamentData = await request.json();

    // Create a new tournament with an ID
    const newTournament = {
      id: tournaments.length + 1,
      ...tournamentData
    };

    // Add to our "database"
    tournaments.push(newTournament);

    return NextResponse.json(newTournament, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the tournament." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const tournamentData = await request.json();
    const { id } = tournamentData;

    // Find the tournament index
    const tournamentIndex = tournaments.findIndex(t => t.id === parseInt(id));

    if (tournamentIndex === -1) {
      return NextResponse.json(
        { message: "Tournament not found." },
        { status: 404 }
      );
    }

    // Update the tournament
    tournaments[tournamentIndex] = { ...tournaments[tournamentIndex], ...tournamentData };

    return NextResponse.json(tournaments[tournamentIndex]);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating the tournament." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: "Tournament ID is required." },
        { status: 400 }
      );
    }

    // Find the tournament index
    const tournamentIndex = tournaments.findIndex(t => t.id === parseInt(id));

    if (tournamentIndex === -1) {
      return NextResponse.json(
        { message: "Tournament not found." },
        { status: 404 }
      );
    }

    // Remove the tournament
    tournaments.splice(tournamentIndex, 1);

    return NextResponse.json(
      { message: "Tournament deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the tournament." },
      { status: 500 }
    );
  }
}
