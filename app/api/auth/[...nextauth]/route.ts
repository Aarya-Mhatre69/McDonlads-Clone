import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password.");
        }

        try {
          const { db } = await connectToDatabase();
          const user = await db
            .collection("users")
            .findOne({ email: credentials.email.toLowerCase().trim() });

          if (!user) {
            throw new Error("No account found with this email.");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Incorrect password.");
          }

          return {
            id:    user._id.toString(),
            name:  user.name,
            email: user.email,
          };
        } catch (err: any) {
          throw new Error(err.message || "Authentication failed.");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge:   30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id   = token.id;
        session.user.name          = token.name as string;
      }
      return session;
    },
  },

  pages: {
    signIn:   "/login",
    error:    "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };