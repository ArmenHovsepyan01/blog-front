import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname, searchParams } = req.nextUrl;

    if (pathname === "/change-password") {
      const code = new URLSearchParams(searchParams).get("code");
      if (!code) return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/my-blog") {
      return NextResponse.redirect(new URL("/my-blog/published", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token?.access_token,
    },
  },
);

export const config = {
  matcher: ["/liked-blogs", "/my-blog", "/reset-password", "/change-password"],
};
