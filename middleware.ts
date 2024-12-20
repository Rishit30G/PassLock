import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = (await cookies()).get("appwrite-session");

  // Handle protected routes
  if (pathname.startsWith("/dashboard")) {
    if (!authToken) {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Prevent signed-in users from accessing /sign-in and /sign-up
  if (authToken && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/sign-in", "/sign-up"], // Match these routes
};