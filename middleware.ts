import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Runs on every request. It reads the Supabase session cookies, refreshes
// the access token using the refresh token when the access token has
// expired, and writes the refreshed cookies back onto the response — this
// is what keeps an admin's session alive without them re-logging-in.
// It also protects /dashboard routes, redirecting unauthenticated users
// to /dashboard/login and authenticated users away from the login page.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname === "/admin/login";

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isPublicDashboardRoute =
    pathname === "/dashboard/login" || pathname === "/dashboard/forgot-password";

  // --- Admin route protection ---
  if (isAdminRoute && !isAdminLoginRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminLoginRoute && user) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    return NextResponse.redirect(adminUrl);
  }

  // --- Dashboard route protection ---
  if (isDashboardRoute && !isPublicDashboardRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/dashboard/login";
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};