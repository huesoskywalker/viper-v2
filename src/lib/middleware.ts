import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'

export default auth((req) => {
   // req.auth
   console.log(req)
})
export function middleware(request: NextRequest) {
   console.log(`wtf`)
   return NextResponse.redirect(new URL('/home', request.url))
}

// export const config = {
//    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }
export const config = {
   matcher: '/home',
}
// in here we can handle more robust middleware with authMiddleware
// and also chain middleWares as needed
// Also uses the authorize callback
