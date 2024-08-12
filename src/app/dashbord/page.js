import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import category from "@/libs/data";
import { deletePost, newPost } from "@/actions/postAction";
import FormButton from "@/components/buttons/FormButton";
import Post from "@/models/Post";
import Image from "next/image";

import { TiDelete } from "react-icons/ti";
import mongoose from "mongoose";
import Link from "next/link";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const posts = await Post.find({ user: session?.user?.name });

  return (
    <div className="w-screen flex flex-col gap-12 lg:flex-row h-[calc(100vh-5rem)] overflow-x-hidden pt-4">
      <div className="lg:w-1/2 w-full lg:h-full h-1/2 flex items-center flex-col overflow-y-auto lg:overflow-auto">
        <h2 className="w-full text-3xl font-bold text-center mb-5 pb-8">
          Mange your Posts
        </h2>

        <div className="flex flex-col gap-8 w-full">
          {posts.map((item) => (
            <div
              key={item._id}
              className="w-full px-4 lg:px-12 flex items-center justify-between"
            >
              <Link className="w-5/6" href={"/post/" + item._id}>
                <div className="flex items-center gap-4 w-full">
                  <div className="lg:w-1/6 w-1/4 aspect-square  relative rounded-md">
                    <Image src={item.image} alt={item.title} fill />
                    {item.approved ? (
                      <p className="absolute bottom-0 left-0 bg-primary text-background rounded-md p-1 w-full text-center font-bold text-xs">
                        Approved!
                      </p>
                    ) : (
                      <p className="absolute bottom-0 left-0 bg-accent text-background rounded-md p-1 w-full text-center font-bold text-xs">
                        Not Approved!
                      </p>
                    )}
                  </div>
                  <div className="lg:w-5/6 w-3/4">
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="font-light">
                      {item.body.length > 60
                        ? item.body.slice(0, 60) + "..."
                        : item.body}
                    </p>
                  </div>
                </div>
              </Link>

              <form className="w-1/6" action={deletePost}>
                <input
                  hidden
                  type="text"
                  className="hidden"
                  value={String(item._id)}
                  name="id"
                  readOnly
                />
                <button className="w-1/6">
                  <TiDelete className="text-5xl  text-accent cursor-pointer" />
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-1/2 w-full lg:h-full h-1/2 flex justify-center">
        <form action={newPost} className="w-full px-4 lg:px-12">
          <h2 className="w-full text-3xl font-bold text-center mb-4 pb-8">
            Add a Post
          </h2>
          <label htmlFor="title">Title</label>
          <input
            autoComplete="off"
            autoCorrect="off"
            id="title"
            type="text"
            name="title"
          />

          <label className="mt-2" htmlFor="image">
            Image (URL)
          </label>
          <input
            autoComplete="off"
            autoCorrect="off"
            id="image"
            type="text"
            name="image"
          />

          <label htmlFor="body" className="mt-4">
            Body
          </label>
          <textarea
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            id="body"
            name="body"
            className="max-w-full min-h-36 h-60 min-w-full p-2 whitespace-pre-line"
            rows={10}
          ></textarea>
          <div className="mt-6">
            <p className="mb-2 -ml-1">Category:</p>
            {category.map((item, index) => (
              <div key={item.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={item.value}
                  name={item.value}
                  value={item.value}
                  className="text-4xl scale-125 border-primary bg-primary border"
                />
                <label className="ml-2" htmlFor={item.value}>
                  {item.name}
                </label>
              </div>
            ))}
          </div>
          <FormButton className="mt-6 mb-6">Add new Post</FormButton>
        </form>
      </div>
    </div>
  );
};

export default page;
