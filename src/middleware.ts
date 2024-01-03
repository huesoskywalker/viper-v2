import { NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/auth'

export default function middleware(request: NextRequest) {
   const { cookies, nextUrl } = request
   const { pathname } = nextUrl

   // TODO: fix this to use auth , this cookie can be built in with fake value
   //Error: Module not found: Can't resolve 'mongodb-client-encryption' in '/home/hueso/code/viper/viper-v2/node_modules/mongodb/lib'
   // Check if the session token does match the sessionToken in the database?
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
