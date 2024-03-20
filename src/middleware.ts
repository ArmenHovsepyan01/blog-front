import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("token")?.value;

  const id = request.cookies.get("id")?.value;

  const { pathname, searchParams } = request.nextUrl;

  if (
    (pathname === "/my-blog" ||
      pathname === "/reset-password" ||
      pathname === "/change-password" ||
      pathname === "/liked-blogs") &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/change-password") {
    const code = new URLSearchParams(searchParams).get("code");
    if (!code) return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === `/user/${id}`) {
    return NextResponse.redirect(new URL("/my-blog", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/liked-blogs",
    "/my-blog",
    "/reset-password",
    "/change-password",
    "/user/:path*",
  ],
};
