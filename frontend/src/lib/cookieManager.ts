import { NextResponse } from 'next/server';

// Function to parse and set cookies from the response header
export function setTokensFromResponse(response: Response) {
  const nextResponse = NextResponse.next();

  // Get the header set-cookie
  const setCookie = response.headers.get('set-cookie');

  if (setCookie) {
    const cookies = setCookie.split(',').map(cookie => cookie.trim());

    cookies.forEach(cookie => {
      const [fullName, ...rest] = cookie.split('=');
      const name = fullName.trim();
      const value = rest.join('=').split(';')[0];

      if (name === 'access_token') {
        nextResponse.cookies.set({
          name: 'access_token',
          value: value,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 3600
        });
      } else if (name === 'refresh_token') {
        nextResponse.cookies.set({
          name: 'refresh_token',
          value: value,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 604800
        });
      }
    });
  }

  return nextResponse;
}
