import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { inngest } from "@/config/inngest";

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const { items, address } = await request.json()
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }
        if (!items || items.length === 0) {
            return NextResponse.json({ success: false, message: "No items in cart" }, { status: 400 })
        }
        if (!address) {
            return NextResponse.json({ success: false, message: "Address not found" }, { status: 400 })
        }

        const totalAmount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product)
            const productPrice = product.offerPrice || product.price
            if (!product) {
                return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
            }   
            return acc + productPrice * item.quantity
        }, 0)
        await inngest.send({
            name: "order/create",
            data: {
                userId,
                items,
                address,
                amount: totalAmount + Math.floor(totalAmount * 0.02),
                date: Date.now(),
            }
        })
        return NextResponse.json({ success: true, message: "Order created successfully" }, { status: 200 }) 
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}