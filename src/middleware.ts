import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("token")?.value;

  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/liked-blogs" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/my-blog" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/liked-blogs", "/my-blog"],
};
