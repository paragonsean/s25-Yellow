import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/sign-in(.*)", // Matches /sign-in and all subpaths
  "/sign-up(.*)",
  "/forgot-password(.*)",
  "/reset-password(.*)",
  "/quiz(.*)",
  "/chat",
  '/',
]);

export default clerkMiddleware((auth, req) => {
  if (publicRoutes(req)) {
    return NextResponse.next();
  }

  const { userId } = auth();
  if (!userId) {
    const url = new URL("/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

