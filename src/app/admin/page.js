import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Post from "@/models/Post";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  } else {
    if (!session.user.isAdmin) {
      return redirect("/");
    }
  }

  const posts = await Post.find({ approved: false });
  return (
    <div className="w-screen h-full flex items-center justify-center gap-20 flex-col mt-12 overflow-hidden">
      <div className="max-w-[50rem] w-full">
        <h1 className="text-3xl lg:text-6xl text-center mb-12">
          Posts to Approve:{" "}
          <span className="text-5xl lg:text-7xl font-extrabold">
            {posts.length}
          </span>
        </h1>
        <div className="h-full w-full px-4 flex flex-col gap-6">
          {posts.map((item) => (
            <Link
              key={item.title}
              href={"/approve/post/" + item._id}
              className="border-2 h-36 flex gap-6 w-full rounded-md border-primary p-2"
            >
              <div className="relative h-full w-1/2 lg:w-1/3">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="rounded overflow-hidden object-cover"
                  fill
                />
              </div>
              <h2 className="text-2xl lg:text-4xl font-medium w-1/2 lg:w-2/3">{item.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
