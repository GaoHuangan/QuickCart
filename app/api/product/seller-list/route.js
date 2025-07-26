import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { connectDB } from "@/config/db";
import Product from "@/models/Product";


// 简单内存缓存
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 清理过期缓存
const cleanExpiredCache = () => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
            cache.delete(key);
        }
    }
};

export async function GET(req) {
    try {
        // 1. 用户认证
        const { userId } = getAuth(req);
        //console.log('userId:', userId);
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        // 2. Seller权限验证
        const isSeller = await authSeller(userId);
        //console.log('isSeller:', isSeller);
        if (!isSeller) {
            return NextResponse.json({ success: false, message: "You are not a seller" }, { status: 403 });
        }

        // 3. 检查缓存
        const cacheKey = `seller-products-${userId}`;
        cleanExpiredCache();

        // 4. 缓存命中
        if (cache.has(cacheKey)) {
            const cachedData = cache.get(cacheKey);
            if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
                return NextResponse.json({
                    success: true,
                    products: cachedData.products,
                    cached: true,
                    timestamp: cachedData.timestamp
                });
            }
        }

        // 5. 数据库查询
        await connectDB();

        // 5. 查询产品 - 只查询该seller的产品
        const products = await Product.find({ userId })
            .select('name description price offerPrice image category date')
            .sort({ date: -1 }) // 按日期倒序
            .lean(); // 提升查询性能

        // const products = await Product.find({});

        // 6. 缓存结果
        cache.set(cacheKey, {
            products,
            timestamp: Date.now()
        });

        //console.log(`Found ${products.length} products for seller ${userId}`);

        // 7. 返回结果
        return NextResponse.json({
            success: true,
            products,
            count: products.length,
            cached: false
        });

    } catch (error) {
        console.error("GET /api/product/seller-list error:", {
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