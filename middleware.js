// Vercel Edge Middleware — Password Protection
// Remove this file (and the env var) when you're ready to go public

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');

      // Checks against env vars — set these in Vercel Dashboard
      const validUser = process.env.AUTH_USER || 'admin';
      const validPass = process.env.AUTH_PASS || 'stellar2026';

      if (user === validUser && pass === validPass) {
        return; // Authorized — let them through
      }
    }
  }

  // Not authorized — show the browser login prompt
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Stellar Institute — Under Development"',
    },
  });
}
