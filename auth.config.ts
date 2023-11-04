import { Shopify } from '@/types/viper'
import type { NextAuthConfig } from 'next-auth'
import GitHub from '@auth/core/providers/github'
import Auth0 from '@auth/core/providers/auth0'
import Google from '@auth/core/providers/google'
import Twitter from '@auth/core/providers/twitter'

declare module 'next-auth' {
   interface Session {
      user: {
         email: string
      } & User
   }

   interface User {
      shopify: Shopify
      location: string
   }
}

export default {
   debug: false,
   providers: [GitHub, Google, Twitter],
   callbacks: {
      // async authorized({ request, auth }) {
      //    const pathname = request.nextUrl

      //    if (request.method === 'POST') {
      //       const { authToken } = (await request.json()) ?? {}

      //       // this is not a built in function
      //       // const valid = validateAuthToken(authToken)
      //       // if (valid) {
      //       // }
      //    }
      // },
      async session({ session, user, trigger, newSession }) {
         if (trigger && newSession?.shopify) {
            session.user.shopify = newSession.shopify
         } else if (trigger && newSession?.image && newSession?.location && newSession?.image) {
            session.user.name = newSession.name
            session.user.location = newSession.location
            session.user.image = newSession.image
         }
         return session
      },
   },
} satisfies NextAuthConfig
