import authConfig from '../../auth.config'
import NextAuth from 'next-auth'
export const { auth: middleware } = NextAuth(authConfig)
// this is a bit messy from the docs v5

// For advanced use cases, you can use auth as a wrapper for your Middleware:
// import { auth } from "./auth"

// export default auth((req) => {
//   // req.auth
// })

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }
