import { _ID, Viper } from '@/types/viper'
import type { NextAuthConfig, User } from 'next-auth'
import GitHub from '@auth/core/providers/github'
import Credential from '@auth/core/providers/credentials'
import Auth0 from '@auth/core/providers/auth0'
import Google from '@auth/core/providers/google'
import Email from '@auth/core/providers/email'
import { viperService } from '@/services/servicesInitializer'
import resendConfig from './resend.config'
import nodemailer from 'nodemailer'
import { signUpEmailHTML } from './utils/signup-email-html'
import { remainingExpirationTime } from './utils/remaining-expiration-time'
import { NextResponse } from 'next/server'
import { mongoAdapter } from '@/lib/auth'
import { cookies } from 'next/headers'
import { randomBytes, randomUUID } from 'crypto'
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
   // Need to check this, if this user is just for the session or the database
   interface User extends Viper {}
}
export default {
   debug: false,
   providers: [
      GitHub({
         allowDangerousEmailAccountLinking: true,
      }),
      Google({
         allowDangerousEmailAccountLinking: true,
      }),
      Auth0,
      Email({
         server: resendConfig,
         from: process.env.RESEND_FROM,
         maxAge: 60 * 60 * 2,
         generateVerificationToken: async () => {
            const max = 1000000
            const number = Math.floor(Math.random() * max)
            const token = number.toString().padStart(6, '0')
            return token
         },
         async sendVerificationRequest({
            identifier: email,
            url,
            token,
            expires,
            provider: { server, from },
            request,
            theme,
         }) {
            const transport = nodemailer.createTransport(server)

            const remainingHours = remainingExpirationTime(expires)

            const mailOptions = {
               from: from,
               to: email,
               subject: `${token} is your Viper verification code`,
               html: signUpEmailHTML({ token, remainingHours, theme }),
            }

            await transport.sendMail(mailOptions)
         },
      }),
      Credential({
         authorize: async (credentials, request) => {
            const { username, password } = credentials
            console.log({ username, password })

            const user = await viperService.findByEmail('agustinbigoni@gmail.com')
            return user as User
         },
      }),
   ],
   pages: {
      // newUser: '/new',
      // verifyRequest: '/verify',
      // signOut: '/i/flow/signout',
      signIn: '/i/flow/login',
   },
   callbacks: {
      signIn: async ({ user, account, profile, email, credentials }) => {
         if (credentials) {
            const generateSessionToken = () => {
               return randomUUID?.() ?? randomBytes(32).toString('hex')
            }

            const fromDate = (time: number, date = Date.now()) => {
               return new Date(date + time * 1000)
            }
            const sessionToken = generateSessionToken()
            const sessionExpiry = fromDate(60 * 60 * 24 * 7)
            if (mongoAdapter.createSession)
               await mongoAdapter.createSession({
                  sessionToken: sessionToken,
                  userId: String(user._id),
                  expires: sessionExpiry,
               })

            cookies().set('next-auth.session-token', sessionToken, {
               expires: sessionExpiry,
            })
         }
         return true
      },
      jwt: async ({ token, user, session }) => {
         token.id = String(user._id)

         return token
      },

      authorized: async ({ request, auth }) => {
         if (!auth) return NextResponse.json({ error: 'Unauthorized' })
         return true
      },
      // redirect: async ({ baseUrl, url }) => {
      // return baseUrl
      // },
      session: async ({ session, token, user, trigger, newSession }) => {
         session.user.id = user.id
         // session.user.image = user.image ?? ''
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
      session: ({ session, token }) => {},
      signIn: ({ profile, user, account, isNewUser }) => {},
      signOut: (message) => {},
      linkAccount: ({ account, profile, user }) => {},
      createUser: async ({ user }) => {
         try {
            await viperService.populateNewViper(
               user.id as _ID,
               user.name ?? undefined,
               user.email as string,
               user.image ?? undefined,
               user.emailVerified,
            )
         } catch (error) {
            throw new Error(`Auth Error, failed to create the user, ${error}`)
         }
      },
      updateUser: async ({ user }) => {
         // gotta check when this update trigger run
      },
   },
} satisfies NextAuthConfig
