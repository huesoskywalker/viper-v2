import { _ID } from '@/types/viper'
import type { NextAuthConfig } from 'next-auth'
import GitHub, { type GitHubProfile } from '@auth/core/providers/github'
import Auth0 from '@auth/core/providers/auth0'
import Google, { type GoogleProfile } from '@auth/core/providers/google'
import Email from '@auth/core/providers/email'
import { viperService } from '@/services/servicesInitializer'
import { type EmailConfig } from 'next-auth/providers'
import resendConfig from './resend.config'

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
   interface User {
      emailVerified: boolean | Date
   }
}

export default {
   debug: false,
   providers: [
      GitHub,
      Google,
      Auth0,
      Email({
         server: resendConfig,
         from: process.env.RESEND_FROM,
         // -----------------------
         //  how con we get the max age to tell in the email?
         maxAge: 60 * 60 * 2,
         generateVerificationToken: async () => {
            const max = 1000000
            const number = Math.floor(Math.random() * max)
            const token = number.toString().padStart(6, '0')
            return token
         },
         // sendVerificationRequest: async ({ token }) => {
         // },
         //    async sendVerificationRequest({
         //       identifier: email,
         //       url,
         //       token,
         //       expires,
         //       provider,
         //       request,
         //       theme,
         //    }) {
         //       console.log(`-----sendVerificationRequest`)
         //       console.log({ token, expires, provider })

         //       const { host } = new URL(url)

         //       console.log(`---url`)
         //       console.log({ url })

         //       let mailOptions = {
         //          from: 'huesoskywalker@gmail.com',
         //          to: email,
         //          subject: 'Nodemailer Project',
         //          text: text({ url, host }),
         //          html: html({ url, host, email, token }),
         //       }

         //       transporter.sendMail(mailOptions, function (err: any, data: any) {
         //          if (err) {
         //             console.log('Error ' + err)
         //          } else {
         //             console.log('Email sent successfully')
         //          }
         //       })
         //       // http://localhost:3000/api/auth/verify-request?provider=email&type=email
         //    },
      }),
   ],
   pages: {
      newUser: '/new',
      verifyRequest: '/verify',
   },
   callbacks: {
      authorized: async ({ request, auth }) => {
         const pathname = request.nextUrl

         if (request.method === 'POST') {
            const { authToken } = (await request.json()) ?? {}

            // this is not a built in function
            // const valid = validateAuthToken(authToken)
            // if (valid) {
            // }
         }
         return true
      },
      redirect: async ({ baseUrl, url }) => {
         return '/'
      },
      signIn: async ({ user, account, profile, email, credentials }) => {
         return true
      },
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
      signIn: ({ profile, isNewUser }) => {
         // let's check somewhere in here if we can grab the email_verified and replace it by the emailVerified
      },
      signOut: (message) => {},
      createUser: async ({ user }) => {
         try {
            // Change  create for populate?
            // add password as optional
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
