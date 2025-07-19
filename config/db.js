import mongoose from "mongoose";

// Use a global variable to cache the connection across hot reloads (in development)
let cached = global.mongoose;

if (!cached) {
  // Initialize cache object if it doesn't exist
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no existing promise, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering to prevent unexpected behavior
    };

    // Start a new connection and store the promise
    cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts);
  }

  // Await the connection and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export { connectDB };
