import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/db/client";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth(async (req) => ({
  adapter: MongoDBAdapter(client),
  ...authConfig,
}));
