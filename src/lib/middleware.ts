import NextAuth from 'next-auth'
import authConfig from '../../auth.config'

export const authMiddleware = NextAuth(authConfig).auth

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
// in here we can handle more robust middleware with authMiddleware
// and also chain middleWares as needed
// Also uses the authorize callback
