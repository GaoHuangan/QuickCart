import { connectDB } from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    // Get user ID from Clerk authentication
    const { userId } = getAuth(request);

    // Check if the user is a verified seller
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" });
    }

    // Parse form data from the request
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    // Retrieve all uploaded image files
    const files = formData.getAll("image");
    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Upload all files to Cloudinary and collect their URLs
    // const result = await Promise.all(
    //   files.map(async (file) => {
    //     const arrayBuffer = await file.arrayBuffer();
    //     const buffer = Buffer.from(arrayBuffer);

    //     return new Promise((resolve, reject) => {
    //       const stream = cloudinary.uploader.upload_stream(
    //         { resource_type: "auto" }, // Automatically detect file type
    //         (error, result) => {
    //           if (error) {
    //             reject(error);
    //           } else {
    //             resolve(result);
    //           }
    //         }
    //       );
    //       stream.end(buffer);
    //     });
    //   })
    // );
    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
    
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              timeout: 60000,
              folder: "products",
              transformation: [{ width: 800, height: 800, crop: "limit" }],
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    // Extract secure image URLs from upload results
    const image = result.map((res) => res.secure_url);

    // Connect to the database and create a new product document
    await connectDB();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      date: Date.now(), // Record the upload time
    });

    // Return a success response with the newly created product
    return NextResponse.json({
      success: true,
      message: "Upload successful",
      newProduct,
    });
  } catch (error) {
    // Handle and return any errors that occur
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
