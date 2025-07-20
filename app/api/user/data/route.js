import { auth } from "@clerk/nextjs/server";  // 确保在 server 端调用
import { connectDB } from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 调用 auth() 获取当前用户信息，确保只在服务器端调用
    const { userId } = auth();

    // 如果没有获取到 userId，则返回 401 Unauthorized 错误
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // 连接数据库
    await connectDB();

    // 查找用户
    const user = await User.findById(userId);

    // 如果没有找到用户，返回 404 错误
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // 返回用户数据
    return NextResponse.json({ success: true, user }, { status: 200 });

  } catch (error) {
    // 捕获并返回异常信息
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
