import Google from "next-auth/providers/google";
import type { NextAuthConfig, Session } from "next-auth";

export default {
  //   debug: process.env.NODE_ENV !== "production",
  providers: [Google],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    session: async ({ session, user }) => {
      // const profile = await getProfile(user.id);

      return {
        // activated: !!profile,
        // profile,
        ...session,
      };
    },
  },
} satisfies NextAuthConfig;
