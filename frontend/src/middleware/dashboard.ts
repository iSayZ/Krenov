import { NextResponse } from 'next/server';

import { verifyAccess, refreshTokens } from '../api/authApi';

import type { NextRequest } from 'next/server';
import { setTokensFromResponse } from '@/lib/cookieManager';

// Protected roads
const protectedRoutes = ['/admin/dashboard'];

async function dashboardMiddleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // If the user doesn't have a acessToken and refreshToken, he's redirected to the login page
  if (
    !accessToken && !refreshToken &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/admin/connexion', request.url));
  }

  // If the user has a accessToken, we check the token's validity
  if (accessToken) {
    try {
      await verifyAccess(accessToken);
      return NextResponse.next();
    } catch (error) {

      // If the accessToken is invalid and the user has a refreshToken, try to refresh a new tokens
      if (refreshToken) {
        try {
          const response = await refreshTokens(refreshToken);
          return setTokensFromResponse(response);
        } catch (error) {
          return NextResponse.redirect(new URL('/admin/connexion', request.url));
        }
      }

      return NextResponse.redirect(new URL('/admin/connexion', request.url));
    }
  } else if (refreshToken) {  // If the user has a refreshToken, try to refresh a new tokens
    try {
      const response = await refreshTokens(refreshToken);
      return setTokensFromResponse(response);
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
