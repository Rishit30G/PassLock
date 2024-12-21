import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const authToken = (await cookies()).get("appwrite-session");

  if (pathname.startsWith("/dashboard")) {
    if (!authToken) {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (authToken && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (pathname.startsWith("/reset-password")) {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    const referrer = request.headers.get("referer") || "";

    if ((!userId || !secret) && !referrer.includes("/forgot-password")) {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/sign-in", "/sign-up", "/reset-password"], 
};