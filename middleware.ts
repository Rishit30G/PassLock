import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request: any) {
  const protectedRoutes = ["/dashboard"];

  const { pathname } = request.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    const authToken = (await cookies()).get("appwrite-session");

    // If the user is not authenticated, protect the /dashboard route
    if (!authToken && pathname === "/dashboard") {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
