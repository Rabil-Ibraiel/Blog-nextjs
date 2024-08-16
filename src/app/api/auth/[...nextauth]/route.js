import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import mongoose from "mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      authorize: async (credentials) => {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }
        const isPasswordTrue = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (isPasswordTrue) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },

    pages: {
      signIn: "/",
    },

    debug: true,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
