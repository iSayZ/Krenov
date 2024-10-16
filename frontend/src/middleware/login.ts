import { NextResponse } from 'next/server';

import { verifyAccess } from '../api/authApi';

import type { NextRequest } from 'next/server';

// Middleware for connexion road
async function loginMiddleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

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

  // Stay on connexion page
  return NextResponse.next();
}

// Export configuration for matcher
const config = {
  matcher: ['/admin/connexion'],
};

export { loginMiddleware, config };
