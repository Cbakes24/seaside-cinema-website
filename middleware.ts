import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const blockedPaths = [
    '/wp-admin',
    '/wp-login.php',
    '/wordpress',
    '/xmlrpc.php',
    '/wp-content',
    '/wp-includes',
    '/wp-json',
    '/.env',
    '/.git'
  ];

  const pathname = request.nextUrl.pathname;

  if (blockedPaths.some(path => pathname.startsWith(path))) {
    console.log(`🔒 Blocked bot request to: ${pathname}`);
    return new NextResponse('Blocked by middleware', { status: 403 });
  }

  return NextResponse.next();
}


export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico).*)'],
  };
