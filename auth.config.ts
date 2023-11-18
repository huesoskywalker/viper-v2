import { _ID } from '@/types/viper'
import type { NextAuthConfig } from 'next-auth'
import GitHub, { type GitHubProfile } from '@auth/core/providers/github'
import Auth0 from '@auth/core/providers/auth0'
import Google, { type GoogleProfile } from '@auth/core/providers/google'
import Email from '@auth/core/providers/email'
import { viperService } from '@/services/servicesInitializer'
// import transporter from './nodemailerConfig'

declare module 'next-auth' {
   interface Session {
      user: {
         id: string
         name: string
         email: string
         image: string
         location: string
      }
   }
   interface User {}
}

export default {
   debug: false,
   providers: [
      GitHub,
      Google,
      Auth0,
      Email({
         server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
               user: process.env.EMAIL_SERVER_USER,
               pass: process.env.EMAIL_SERVER_PASSWORD,
            },
         },
         from: process.env.EMAIL_FROM,
      }),
   ],
   pages: {
      newUser: '/new',
   },
   callbacks: {
      async authorized({ request, auth }) {
         console.log(`----callback-authorized`)
         console.log({ request, auth })
         const pathname = request.nextUrl

         if (request.method === 'POST') {
            const { authToken } = (await request.json()) ?? {}
            console.log(`isAuthorized`)
            console.log({ authToken })

            // this is not a built in function
            // const valid = validateAuthToken(authToken)
            // if (valid) {
            // }
         }
         return true
      },
      async redirect({ baseUrl, url }) {
         return '/'
      },
      async signIn({ user, account, profile, email }) {
         return true
      },
      async session({ session, token, user, trigger, newSession }) {
         console.log(`auth.config`)
         console.log({ user })
         session.user.id = user.id
         session.user.image = user.image ?? ''
         // session.user.location = user.location
         if (trigger && newSession?.shopify) {
            // session.user.shopify = newSession.shopify
         } else if (trigger && newSession?.image && newSession?.location && newSession?.image) {
            session.user.name = newSession.name
            session.user.location = newSession.location
            session.user.image = newSession.image
         }
         return session
      },
   },
   events: {
      // states of events are global
      session({ session }) {},
      signIn({ profile, isNewUser }) {},
      signOut(message) {},
      async createUser({ user }) {
         try {
            await viperService.create(
               user.id as _ID,
               user.name as string,
               user.email as string,
               user.image as string,
            )
         } catch (error) {
            throw new Error(`Auth Error, failed to create the user, ${error}`)
         }
      },
      updateUser({ user }) {
         // gotta check when this update trigger run
      },
   },
} satisfies NextAuthConfig
