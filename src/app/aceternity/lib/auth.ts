import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Fake check (replace with real DB call)
        if (
          credentials?.email === "test@gmail.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Test User",
            email: "test@gmail.com",
          };
        }

        // ❗IMPORTANT: return null if login fails
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin", // ❗ ensure this line exists
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};
