import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const privateRoutes: string[] = ["/profile", "/order-history"];
  const publicRoutePrefixes: string[] = [];

  const isPrivateRoute =
    privateRoutes.includes(pathname) ||
    publicRoutePrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isPrivateRoute) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("rt")?.value;
  const adminRoutes = pathname.startsWith("/admin");

  if (!refreshToken) {
    if (adminRoutes) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("message", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }

    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("message", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
