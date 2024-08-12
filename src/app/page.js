import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Logout from "@/components/buttons/Logout";
import Post from "@/models/Post";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  await mongoose.connect(process.env.MONGODB_URI);
  const posts = await Post.find({ approved: true });
  return (
    <main className="flex h-1 py-12 w-screen flex-col gap-4 md:gap-12 lg:gap-24 xl:px-36 lg:px-20 md:px-12 px-4 pt-12">
      {posts.map((item, index) => (
        <div
          key={item.title}
          className={`flex w-full lg:gap-12 gap-4 lg:min-h-[30rem] min-h-[40rem] ${
            index % 2 !== 0
              ? "lg:flex-row-reverse flex-col"
              : "lg:flex-row flex-col"
          } ${index === posts.length - 1 && "pb-6"}`}
        >
          <div className="lg:w-2/4 lg:h-full h-2/4 w-full relative overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:h-full lg:w-2/4 w-full h-fit">
            <Link href={"/post/" + item._id} className="flex flex-col h-full">
              <h2 className="font-extrabold lg:mb-12 text-5xl">{item.title}</h2>

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

              <div className="flex gap-1 md:gap-2 lg:gap-4 items-center mt-auto">
                {item.category.map(
                  (itemm, indexx) =>
                    itemm && (
                      <p
                        key={itemm}
                        className={`bg-primary w-fit text-lg font-extrabold px-1 md:px-2 lg:px-4 py-2 rounded-md text-background/80`}
                      >
                        {itemm}
                      </p>
                    )
                )}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
