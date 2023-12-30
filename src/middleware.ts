import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
   const { cookies, nextUrl } = request
   const { pathname } = nextUrl

   const authCookie = cookies.get('next-auth.session-token')

   if (!authCookie && pathname !== '/') return NextResponse.redirect(nextUrl.origin)
}

export const config = {
   matcher: ['/((?!api|_next/static|.*\\..*|_next/image|favicon.ico|i/flow/).*)'],
}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     {
//       source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
//       missing: [
//         { type: 'header', key: 'next-router-prefetch' },
//         { type: 'header', key: 'purpose', value: 'prefetch' },
//       ],
//     },
//   ],
// }
