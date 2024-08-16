"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Post from "@/models/Post";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function newPost(formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const body = formData.get("body");

  const technology = formData.get("technology");
  const business = formData.get("business");
  const sport = formData.get("sport");
  const nature = formData.get("nature");
  const health = formData.get("health");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    const category = [technology, business, sport, nature, health];
    const newPost = await Post.create({
      title,
      image,
      body,
      user: session?.user?.name,
      category: category,
    });
    return revalidatePath("/dashbord");
  } catch (err) {
    console.log(err);
  }
}

export async function deletePost(formData) {
  const id = formData.get("id");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const post = await Post.findByIdAndDelete(id);
    return revalidatePath("/dashbord");
  } catch (err) {
    console.log(err);
  }
}

export async function approvePost(formData) {
  const id = formData.get("id");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const post = await Post.findByIdAndUpdate(id, {
      approved: true,
    });

    return revalidatePath("/approve/post/" + id);
  } catch (err) {
    console.log(err);
  }
}
