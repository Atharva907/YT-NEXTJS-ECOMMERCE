import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('MONGO')));
  throw new Error('Please define the MONGODB_URI environment variable');
}

console.log('MONGODB_URI found, length:', process.env.MONGODB_URI.length);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  console.log('connectToDatabase called');
  
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new database connection promise');
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log('Attempting to connect to MongoDB with options:', opts);
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
      .then(conn => {
        console.log('MongoDB connection established successfully');
        return conn;
      })
      .catch(err => {
        console.error('MongoDB connection failed with error:', err);
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
        throw err;
      });
  }

  try {
    console.log('Waiting for database connection...');
    cached.conn = await cached.promise;
    console.log('MongoDB Connected Successfully');
    return cached.conn;
  } catch (e) {
    console.error('MongoDB Connection Error:', e);
    console.error('Connection error details:', {
      name: e.name,
      message: e.message,
      stack: e.stack
    });
    throw e;
  }
}
