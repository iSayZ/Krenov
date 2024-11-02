import { NextResponse } from 'next/server';

import { setTokensFromResponse } from '@/lib/cookieManager';

import { verifyAccess, refreshTokens } from './fetchMiddleware';

import type { NextRequest } from 'next/server';

// Middleware for login road
async function loginMiddleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const userAgent = request.headers.get('user-agent') as string;

  // If the user has a accessToken, we check the token's validity
  if (accessToken) {
    try {
      await verifyAccess(accessToken);
      // If it's valid, redirect to dashboard
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch {
      // If the accessToken is invalid and the user has a refreshToken, try to refresh a new tokens
      if (refreshToken) {
        try {
          const response = await refreshTokens(refreshToken, userAgent);

          // Generate a response to set cookies
          const redirectResponse = NextResponse.redirect(
            new URL('/admin/dashboard', request.url)
          );

          // Update the cookies directly in the redirection response
          setTokensFromResponse(redirectResponse, response);

          return redirectResponse;
        } catch {
          return NextResponse.next();
        }
      }

      return NextResponse.next();
    }
  } else if (refreshToken) {
    // If the user has a refreshToken, try to refresh a new tokens
    try {
      const response = await refreshTokens(refreshToken, userAgent);

      // Generate a response to set cookies
      const redirectResponse = NextResponse.redirect(
        new URL('/admin/dashboard', request.url)
      );

      // Update the cookies directly in the redirection response
      setTokensFromResponse(redirectResponse, response);

      return redirectResponse;
    } catch {
      return NextResponse.next();
    }
  }

  // Stay on connexion page
  return NextResponse.next();
}

// Export configuration for matcher
const config = {
  matcher: ['/admin/connexion'],
};

export { loginMiddleware, config };
