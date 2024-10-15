import { NextResponse } from 'next/server';

import { verifyAccess } from '../api/authApi';

import type { NextRequest } from 'next/server';

// Protected roads
const protectedRoutes = ['/admin/dashboard'];

async function dashboardMiddleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  // If the user doesn't have a token, he's redirected to the login page
  if (
    !token &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/admin/connexion', request.url));
  }

  // If the user has a token, we check the token's validity
  if (token) {
    try {
      await verifyAccess(token);
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/connexion', request.url));
    }
  }

  // Continue to the page if everything is correct
  return NextResponse.next();
}

// Export configuration for matcher
const config = {
  matcher: ['/admin/dashboard/:path*'],
};

export { dashboardMiddleware, config };
