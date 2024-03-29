import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      access_token: string;
    } & DefaultSession["user"];
  }
}
