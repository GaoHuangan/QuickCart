import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/config/db";
import authSeller from "@/lib/authSeller";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }
        const isSeller = await authSeller(userId)
        if (!isSeller) {
            return NextResponse.json({ success: false, message: "User is not a seller" }, { status: 404 })
        }
        await connectDB()
        const orders = await Order.find({})
        return NextResponse.json({ success: true, orders: orders || [] }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}   