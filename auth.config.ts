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
import { signUpEmailHTML } from './utils/email/signup-email-html'
import { remainingExpirationTime } from './utils/remaining-expiration-time'
import { NextResponse } from 'next/server'
import { mongoAdapter } from '@/lib/auth'
import { cookies } from 'next/headers'
import { randomBytes, randomUUID } from 'crypto'
import { buildRandomUsername } from './utils/build-random-username'
import { MongoError } from 'mongodb'
import { logError, logMongoError } from '@/config/winstonLogger'
import { passwordResetHtml } from './utils/email/password-reset-html'

declare module 'next-auth' {
   interface Session {
      user: {
         id: string
         name: string
         email: string
         username: string
         verified: boolean
         role: 'admin' | 'viper' | 'newViper' | 'needUpdate'
         bio: string
         location: string
         image: string
         followers: number
         followings: number
      }
   }
   // Need to check this, if this user is just for the session or the database
   interface User extends Viper {}
}
export default {
   debug: false,
   providers: [
      GitHub({}),
      Google({
         // allowDangerousEmailAccountLinking: true,
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
            identifier,
            url,
            token,
            expires,
            provider: { server, from },
            request,
            theme,
         }) {
            const req = await request.json()
            const { username, callbackUrl }: { username: string; callbackUrl: string } = req

            const transport = nodemailer.createTransport(server)

            const remainingHours = remainingExpirationTime(expires)

            const isCallbackUrlResetPassword = callbackUrl.endsWith('/i/flow/password_reset')

            const emailSubject = isCallbackUrlResetPassword
               ? 'Password reset request'
               : `${token} is your Viper verification code`

            const emailHtml = isCallbackUrlResetPassword
               ? passwordResetHtml({ username, token, remainingHours })
               : signUpEmailHTML({ token, remainingHours, theme })

            const mailOptions = {
               from: from,
               to: identifier,
               subject: emailSubject,
               html: emailHtml,
            }

            await transport.sendMail(mailOptions)
         },
      }),
      Credential({
         authorize: async (credentials, request) => {
            const { identifier, password } = credentials
            if (typeof identifier === 'string' && typeof password === 'string') {
               try {
                  const user = await viperService.login(identifier, password)

                  return user as User
               } catch (error) {
                  throw error
               }
            } else {
               return null
            }
         },
      }),
   ],
   pages: {
      // newUser: '/i/flow/single_sign_on',
      // verifyRequest: '/verify',
      signOut: '/i/flow/signout',
      signIn: '/i/flow/login',
      // error: '/i/flow/error',
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
         if (trigger) {
            const { username, image, role, followings } = newSession
            if (username && image && role && followings) {
               session.user.username = username
               session.user.image = image
               session.user.role = role
               session.user.followings = followings
            }
         } else {
            session.user.id = user.id
            session.user.username = user.username
            session.user.verified = user.verified
            session.user.role = user.role
            session.user.bio = user.bio
            session.user.followers = user.followers.length
            session.user.followings = user.followings.length
         }

         return session
      },
   },
   events: {
      // states of events are global
      session: ({ session, token }) => {},
      signIn: async ({ profile, user, account, isNewUser }) => {
         // if (isNewUser) {
         //    if (profile?.email_verified) {
         //       try {
         //          const emailVerified = new Date()
         //          await viperService.update(
         //             { field: '_id', value: String(user._id) },
         //             emailVerified,
         //          )
         //       } catch (error) {
         //          throw new Error(`Failed to update the user email verification`)
         //       }
         //    }
         // }
      },

      signOut: async (message) => {
         if ('session' in message) {
            if (mongoAdapter.deleteSession && message.session) {
               await mongoAdapter.deleteSession(message.session.sessionToken)
            }
         }
      },
      linkAccount: async ({ account, profile, user }) => {},
      createUser: async ({ user }) => {
         try {
            const role = user.name ? 'newViper' : 'needUpdate'
            let username: string | null | undefined = user.name
            if (username) {
               const randomUsername = await buildRandomUsername(username)
               username = randomUsername
            }
            await viperService.populateNewViper(
               user.id as _ID,
               user.name ?? undefined,
               user.email as string,
               role,
               user.image ?? '/default-user.png',
               user.emailVerified,
               username ?? undefined,
            )
         } catch (error) {
            if (error instanceof MongoError) {
               logMongoError({ action: 'Populate new user', viperId: user.id }, error)
               throw new Error(`Internal server error: Failed to create the user`)
            } else {
               logError({ action: 'Populate new user', viperId: user.id }, error)
               throw new Error(`Oops something wen't wrong. Please try again later.`)
            }
         }
      },
      updateUser: async ({ user }) => {
         // gotta check when this update trigger run
      },
   },
} satisfies NextAuthConfig
