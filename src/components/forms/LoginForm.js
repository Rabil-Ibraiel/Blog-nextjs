"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import FormButton from "../buttons/FormButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    await signIn("credentials", {
      email,
      password,
    });
  }
  return (
    <div className="w-screen h-full flex items-center justify-center lg:px-24 md:px-12 px-6 ">
      <div className="h-full lg:mt-36 md:mt-24 mt-16 w-full lg:w-[40rem]">
        <form action={handleSignIn}>
          <h1 className="text-5xl lg:text-7xl tracking-wide leading-normal font-extrabold mb-8 text-center">
            Login to your Account
          </h1>
          <div className="mb-6 select-none">
            <p className="mb-3">Admin Account:</p>
            <div className="flex flex-col">
              <span className="font-normal">
                Email: <span className="font-extrabold select-text">rabil@gmail.com</span>
              </span>
              <span className="font-normal">
                Password: <span className="font-extrabold select-text">12341234</span>
              </span>
            </div>
          </div>

          <label className="capitalize mt-4" htmlFor="email">
            email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            name="email"
            id="email"
          />

          <label className="capitalize mt-4" htmlFor="password">
            password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name="password"
            id="password"
          />
          <FormButton className="mt-6">Login</FormButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
