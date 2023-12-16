import { auth } from './auth'

export default auth((req) => {
   // req.auth
})

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
// in here we can handle more robust middleware with authMiddleware
// and also chain middleWares as needed
// Also uses the authorize callback
