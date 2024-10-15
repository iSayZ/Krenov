import { NextResponse } from 'next/server';

import { dashboardMiddleware } from './middleware/dashboard';
import { loginMiddleware } from './middleware/login';

import type { NextRequest } from 'next/server';

async function middleware(request: NextRequest) {
  // Calling middleware of dashboard road
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    return dashboardMiddleware(request);
  }

  // Calling middleware of login road
  if (request.nextUrl.pathname.startsWith('/admin/connexion')) {
    return loginMiddleware(request);
  }

  return NextResponse.next();
}

const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/connexion'],
};

export { middleware, config };
