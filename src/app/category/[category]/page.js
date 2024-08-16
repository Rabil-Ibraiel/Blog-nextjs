import Post from "@/models/Post";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  await mongoose.connect(process.env.MONGODB_URI);
  const posts = (await Post.find({
    category: { $in: [params.category] },
    approved: true,
  }))?.reverse();
  return (
    <div className="h-[calc(100vh-5rem)] w-screen relative mb-12">
      <div className="flex h-full w-full flex-col gap-4 md:gap-12 lg:gap-24 xl:px-36 lg:px-20 md:px-12 px-4 pt-12">
        <h1 className="text-5xl lg:text-7xl text-accent font-extrabold capitalize text-center mb-12">
          {params.category}
        </h1>
        {posts.map((item, index) => (
          <div
            key={item.title}
            className={`flex w-full lg:gap-12 gap-4 lg:min-h-[30rem] min-h-[40rem] ${
              index % 2 !== 0
                ? "lg:flex-row-reverse flex-col"
                : "lg:flex-row flex-col"
            }`}
          >
            <div className="lg:w-2/4 lg:h-full h-2/4 w-full relative overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:h-full lg:w-2/4 w-full h-fit flex flex-col justify-between">
              <h2 className="font-extrabold lg:mb-8 text-5xl">{item.title}</h2>

              <p className="hidden lg:block w-fit overflow-hidden">
                {item.body.length > 1000
                  ? item.body.slice(0, 1000) + "..."
                  : item.body}
              </p>

              <p className="block lg:hidden my-4">
                {item.body.length > 250
                  ? item.body.slice(0, 250) + "..."
                  : item.body}
              </p>

              <Link
                className="mt-auto bg-primary text-background font-semibold w-fit py-2 px-12 rounded-md"
                href={"/post/" + item._id}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
