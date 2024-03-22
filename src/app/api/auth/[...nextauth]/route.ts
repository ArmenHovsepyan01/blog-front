import NextAuth from "next-auth";
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
          throw new Error(error.message);
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
  secret: "303cc9cd309c2d47477c",
});

export { handler as GET, handler as POST };
