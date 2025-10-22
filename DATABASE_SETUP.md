# Database Setup for Tournament Management

This document explains how to set up the MongoDB database for the tournament management system.

## Prerequisites

1. MongoDB installed and running on your system
2. Node.js and npm installed

## Setup Steps

1. **Install MongoDB**
   - Download and install MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Start MongoDB service on your system

2. **Environment Configuration**
   - The `.env.local` file has been created with the MongoDB connection string
   - Make sure MongoDB is running at `mongodb://localhost:27017/game-arena`

3. **Seed the Database**
   - Run the following command to populate the database with initial tournament data:
   ```
   npm run seed
   ```

## Database Schema

The tournament data is stored in the `tournaments` collection with the following schema:

```javascript
{
  name: String,
  game: String,
  description: String,
  startDate: String,
  endDate: String,
  startTime: String,
  endTime: String,
  location: String,
  maxParticipants: Number,
  currentParticipants: Number,
  status: String, // "upcoming", "live", "completed"
  prize: String,
  rules: String,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

The following API endpoints are available for tournament management:

- `GET /api/tournaments` - Get all tournaments
- `GET /api/tournaments?status=<status>` - Get tournaments by status
- `POST /api/tournaments` - Create a new tournament
- `PUT /api/tournaments` - Update a tournament
- `DELETE /api/tournaments?id=<id>` - Delete a tournament

## Troubleshooting

1. **Connection Issues**
   - Make sure MongoDB is running
   - Check the connection string in `.env.local`
   - Verify the database name is correct

2. **Data Not Showing**
   - Run the seed script to populate initial data
   - Check the browser console for any errors
   - Verify the API endpoints are working correctly

3. **Edit/Delete Not Working**
   - Make sure you're using the correct `_id` field from MongoDB
   - Check the network tab in browser developer tools for API errors
