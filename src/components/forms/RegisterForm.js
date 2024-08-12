"use client";

import { createUser } from "@/actions/userAction";
import { redirect } from "next/navigation";
import { useState } from "react";
import FormButton from "../buttons/FormButton";

const RegisterForm = () => {
  const [error, setError] = useState("");

  async function handleCreateUser(formData) {
    const user = await createUser(formData);
    if (user.error) {
      setError(user.error);
    } else {
      setError("");
      return redirect("/login");
    }
  }
  return (
    <div className="w-screen h-fit flex items-center justify-center overflow-y-auto overflow-x-hidden lg:px-24 md:px-12 px-6 ">
      <div className="h-full lg:mt-36 md:mt-16 mt-8 w-full lg:w-[40rem]">
        <form action={handleCreateUser}>
          <h1 className="text-5xl lg:text-7xl tracking-wide leading-normal font-extrabold mb-8 text-center">
            Register a new Account
          </h1>

          <label className="capitalize mt-4" htmlFor="username">
            username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            minLength={3}
          />

          <label className="capitalize mt-4" htmlFor="email">
            email
          </label>
          <input id="email" type="email" name="email" required min={6} />

          <label className="capitalize mt-4" htmlFor="password">
            password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={8}
            maxLength={20}
          />

          <label className="capitalize mt-4" htmlFor="re-password">
            re-password
          </label>
          <input
            id="re-password"
            type="password"
            name="re-password"
            required
            minLength={8}
            maxLength={20}
          />
          <FormButton className="mt-6">Register</FormButton>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
