import { NextResponse } from 'next/server';

import { verifyAccess } from './fetchMiddleware';

import type { NextRequest } from 'next/server';

// Middleware for 2FA login road
async function login2FAMiddleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const temporaryToken = request.cookies.get('temporary_token')?.value;

  // If the user has an acessToken, check it's validity
  if (accessToken) {
    try {
      await verifyAccess(accessToken);
      // If it's valid, redirect to dashboard
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch (error) {
      console.error('Token invalid', error);
    }
  }

  if (!temporaryToken) {
    return NextResponse.redirect(new URL('/admin/connexion', request.url));
  }

  // Stay on connexion page
  return NextResponse.next();
}

// Export configuration for matcher
const config = {
  matcher: ['/admin/connexion/verification-2fa'],
};

export { login2FAMiddleware, config };
