import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.email) {
        await connectToDatabase();
        const dbUser = await User.findOneAndUpdate(
          { email: user.email },
          {
            $set: {
              name: user.name,
              image: user.image,
              emailVerified:
                (user as { emailVerified?: Date | null }).emailVerified ??
                new Date(),
            },
          },
          { new: true, upsert: true }
        );

        token.id = dbUser?._id.toString() ?? user.id;
        token.email = dbUser?.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
