import { NextResponse } from 'next/server';

import { dashboardMiddleware } from './middleware/dashboard';
import { loginMiddleware } from './middleware/login';
import { login2FAMiddleware } from './middleware/login2FA';

import type { NextRequest } from 'next/server';

async function middleware(request: NextRequest) {
  // Calling middleware of dashboard road
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    return dashboardMiddleware(request);
  }

  // Calling middleware of login road
  if (request.nextUrl.pathname === ('/admin/connexion')) {
    return loginMiddleware(request);
  }

  // Calling middleware of login 2FA road
  if (request.nextUrl.pathname === ('/admin/connexion/verification-2fa')) {
    return login2FAMiddleware(request);
  }

  return NextResponse.next();
}

const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/connexion', '/admin/connexion/verification-2fa'],
};

export { middleware, config };
