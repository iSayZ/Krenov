import { NextResponse } from 'next/server';

import { verifyAccess } from '../api/authApi';

import type { NextRequest } from 'next/server';

// Middleware pour la route de connexion
async function loginMiddleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  // Si l'utilisateur a un token, vérifiez sa validité
  if (token) {
    try {
      await verifyAccess(token);
      // Rediriger vers le tableau de bord si le token est valide
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch (error) {
      // Si le token n'est pas valide, on reste sur la page de connexion
      console.error('Token invalid', error);
    }
  }

  // Continue vers la page de connexion si tout est correct
  return NextResponse.next();
}

// Exportation de la configuration pour matcher
const config = {
  matcher: ['/admin/connexion'],
};

export { loginMiddleware, config };
