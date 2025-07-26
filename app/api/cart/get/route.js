import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import User from "@/models/User";

export async function GET(req) {
    try {
        const { userID } = getAuth(req)
        await connectDB()
        const user = await User.findById(userID)
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        const cartItems = user.cartItems
        return NextResponse.json({ success: true, cartItems }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}