import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { parseClerkUserData } from "./parseClerkUserData";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "quickcart-next",
  signingKey: process.env.INNGEST_SIGNING_KEY,
  eventKey: process.env.INNGEST_EVENT_KEY,
});


// inngest functions to save user data to database
export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
    },
    {
        event: "clerk/user.created",
    },
    async ({ event }) => {
        const { id, name, email, imageUrl } = parseClerkUserData(event.data);
        const userData = { 
            _id: id,
            email: email,
            name: name,
            imageUrl: imageUrl,
        }
        try {
            console.log(`[Inngest] Syncing user ${id} - event: user.created`);
            await connectDB();
            await User.create(userData);
        } catch (error) {
            console.error("Error syncing user from clerk:", error);
        }
    }
)

// Inngest function to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: "update-user-from-clerk",
    },
    {
        event: "clerk/user.updated",
    },
    async ({ event }) => {
        //const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const { id, name, email, imageUrl } = parseClerkUserData(event.data);
        const userData = {
            name: name,
            email: email,
            imageUrl: imageUrl,
        }

        try {
            await connectDB();
            await User.findByIdAndUpdate(id, userData);
        } catch (error) {
            console.error("Error updating user from clerk:", error);
        }
    }
)

// Inngest function to delete user data from database
export const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-from-clerk",
    },
    {
        event: "clerk/user.deleted",
    },
    async ({ event }) => {
        const { id } = event.data;
        try {
            await connectDB();
            await User.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error deleting user from clerk:", error);
        }
    }
)
