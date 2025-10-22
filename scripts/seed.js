// Database seeding script
import { connectDB } from '../lib/databaseConnection.js';
import Tournament from '../models/Tournament.js';

async function seedDatabase() {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if tournaments already exist
    const existingTournaments = await Tournament.find();
    if (existingTournaments.length > 0) {
      console.log('Tournaments already exist in the database. Skipping seeding.');
      return;
    }

    // Create initial tournament data
    const tournaments = [
      {
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

    // Insert tournaments into the database
    await Tournament.insertMany(tournaments);
    console.log('Successfully seeded database with initial tournament data');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedDatabase();
