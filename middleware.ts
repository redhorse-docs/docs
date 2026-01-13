import { NextResponse } from "next/server";

/**
 * Admin routes are now unrestricted so that production edits can be made
 * directly through the UI.
 */
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
