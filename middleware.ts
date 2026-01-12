import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_USER = process.env.BASIC_AUTH_USER;
const ADMIN_PASS = process.env.BASIC_AUTH_PASS;

const unauthorizedResponse = () =>
  new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="RedHorse Admin", charset="UTF-8"',
    },
  });

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!ADMIN_USER || !ADMIN_PASS) {
    return new NextResponse(
      "Admin auth is not configured. Set BASIC_AUTH_USER and BASIC_AUTH_PASS.",
      { status: 500 },
    );
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const credentials = atob(authorization.split(" ")[1] ?? "");
  const [user, pass] = credentials.split(":");

  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
