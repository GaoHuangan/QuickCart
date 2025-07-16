import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // User ID (e.g. from auth provider like Auth0 or Firebase)
    name: { type: String, required: true }, // User's display name
    email: { type: String, required: true, unique: true }, // Email must be unique
    cartItem: { type: Object, default: {} }, // User's shopping cart, can be empty object
  },
  { minimize: false } // Keep empty objects (e.g. cartItem: {}) in the database
);

// Prevent model overwrite in development environments
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
