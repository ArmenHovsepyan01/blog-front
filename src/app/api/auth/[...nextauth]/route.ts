import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "text" },
      },
      async authorize(credentials) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URI}/login`;
          const { data } = await axios.post(url, credentials);

          if (data.data.user.access_token) {
            return data.data.user;
          } else {
            return null;
          }
        } catch (error: any) {
          console.error(error.response.data.error.message);
          throw new Error(error.response.data.error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
  // use env variable in production
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
