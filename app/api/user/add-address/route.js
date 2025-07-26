import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Address from "@/models/Address";

export async function POST(req) {
    try {   
        const { userId } = getAuth(req);
        const { address } = await req.json()
        await connectDB()
        const newAddress = await Address.create({
            ...address,
            userId
        })
        return NextResponse.json({ success: true, message: "Address added successfully", address: newAddress }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}