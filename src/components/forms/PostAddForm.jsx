"use client";

import { newPost } from "@/actions/postAction";
import category from "@/libs/data";
import FormButton from "@/components/buttons/FormButton";
import { useRef, useState } from "react";

const PostAddForm = () => {
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  async function handleNewPost(formData) {
    try {
      setLoading(true);
      await newPost(formData);
      ref.current?.reset();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <form ref={ref} action={handleNewPost} className="w-full px-4 lg:px-12">
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
      <FormButton disabled={loading} className="mt-6 mb-6">
        {loading ? "Adding..." : "Add new Post"}
      </FormButton>
    </form>
  );
};

export default PostAddForm;
