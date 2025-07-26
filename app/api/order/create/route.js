import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/inngest";

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const { items, address } = await request.json()
        console.log(items)
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }
        if (!items || items.length === 0) {
            return NextResponse.json({ success: false, message: "No items in cart" }, { status: 400 })
        }
        if (!address) {
            return NextResponse.json({ success: false, message: "Address not found" }, { status: 400 })
        }
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product)
            if (!product) {
                return NextResponse.json({ success: false, message: `Product with ID ${item.product} not found` }, { status: 404 });
            }
            const productPrice = product.offerPrice || product.price;
            amount += productPrice * item.quantity;
        }
        await inngest.send({
            name: "order/create",
            data: {
                userId,
                items,
                address,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now(),
            }
        })
        return NextResponse.json({ success: true, message: "Order created successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}