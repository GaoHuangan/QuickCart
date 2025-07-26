import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/config/db";
import Address from "@/models/Address";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        console.log("进入API")
        const { userId } = getAuth(request)
        if (!userId) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
        }
        console.log("获取用户IDSUCCESSFUL")
        await connectDB()
        console.log("连接数据库成功")
        console.log("获取地址")
        const address = await Address.find({ userId })
        console.log("获取地址成功")
        console.log("获取订单")
        const orders = await Order.find({ userId })
        console.log("获取订单成功")
        return NextResponse.json({ success: true, orders: orders || [], address }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}