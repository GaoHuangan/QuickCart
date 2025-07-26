import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Product from "@/models/Product";


export async function GET(req) {
    try {


        // 5. 数据库查询
        await connectDB();
        // console.log('connected to db');

        // 5. 查询产品 - 查询所有产品
        const products = await Product.find({})

        // 7. 返回结果
        return NextResponse.json({
            success: true,
            products,
            count: products.length,
            cached: false
        });

    } catch (error) {
        console.error("GET /api/product/list error:", {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        // 区分不同类型的错误
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { success: false, message: "Data validation error", code: "VALIDATION_ERROR" },
                { status: 400 }
            );
        }

        if (error.name === 'MongoError' || error.name === 'MongooseError') {
            return NextResponse.json(
                { success: false, message: "Database error", code: "DATABASE_ERROR" },
                { status: 500 }
            );
        }

        // 通用服务器错误
        return NextResponse.json(
            { success: false, message: "Internal server error", code: "INTERNAL_ERROR" },
            { status: 500 }
        );
    }
}