import { Shopify, Viper } from '@/types/viper'
import type { NextAuthConfig } from 'next-auth'
import GitHub, { type GitHubProfile } from '@auth/core/providers/github'
import Auth0 from '@auth/core/providers/auth0'
import Google, { type GoogleProfile } from '@auth/core/providers/google'
import Email from '@auth/core/providers/email'
import { clientPromise } from '@/services/servicesInitializer'
import { ObjectId } from 'mongodb'
import { checkUsernameAvailability } from './utils/check-username-availability'
// import transporter from './nodemailerConfig'

declare module 'next-auth' {
   interface Session {
      user: {
         id: string
         name: string
         email: string
         image: string
         // shopify: Shopify
         location: string
      }
   }

   interface User extends Viper {}
}
// if (account?.provider === 'github') {
//          username: profile.login as string,
//          image: profile.avatar_url as string,
//          location: profile.location as string,
//          bio: profile.bio,
//       })
export default {
   debug: false,
   providers: [
      GitHub({
         profile: (profile: GitHubProfile) => {
            console.log(`----github profile`)
            console.log({ profile })
            console.log('profile.username???: ', profile.username)
            return {
               id: '1',
               location: profile.location ?? '',
               contactInfo: {
                  phone: null,
                  address: '',
                  website: '',
               },
               email: profile.email,
               bio: profile.bio ?? '',
               blogs: {
                  personal: [],
                  likes: [],
                  withReplies: [],
               },
               emailVerified: false,
               // check if this exists in the object it did at some point
               username: (profile.username as string) ?? '',
               name: profile.name,
               image: profile.avatar_url,
               backgroundImage: '',
               shopify: {
                  customerAccessToken: '',
                  customerId: '',
               },
               events: {
                  created: [],
                  collection: [],
                  likes: [],
               },
               followers: [],
               followings: [],
            }
         },
      }),
      Google({
         profile: async (profile: GoogleProfile) => {
            const username = await checkUsernameAvailability(profile.name.trim())
            return {
               id: '1',
               location: '',
               contactInfo: {
                  phone: null,
                  address: '',
                  website: '',
               },
               bio: '',
               blogs: {
                  personal: [],
                  likes: [],
                  withReplies: [],
               },
               email: profile.email,
               emailVerified: profile.email_verified,
               username: username,
               name: profile.name,
               image: profile.picture,
               backgroundImage: '',
               shopify: {
                  customerAccessToken: '',
                  customerId: '',
               },
               events: {
                  created: [],
                  collection: [],
                  likes: [],
               },
               followers: [],
               followings: [],
            }
         },
      }),
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
      // signIn: '/auth/signin',
   },
   callbacks: {
      async authorized({ request, auth }) {
         console.log(`----callback-authorized`)
         console.log({ request, auth })
         const pathname = request.nextUrl

         if (request.method === 'POST') {
            const { authToken } = (await request.json()) ?? {}
            console.log(`authorized`)
            console.log({ authToken })

            // this is not a built in function
            // const valid = validateAuthToken(authToken)
            // if (valid) {
            // }
         }
         return true
      },
      async redirect({ baseUrl, url }) {
         console.log(`---callback-redirect`)
         console.log({ url })
         // console.log(`========redirect`)
         // console.log(baseUrl)
         // console.log(url)
         return '/'
      },
      // ----------------------------------
      async signIn({ user, account, profile, email }) {
         console.log(`----callback-signIn`)
         console.log({ user })
         return true
      },
      async session({ session, token, user, trigger, newSession }) {
         console.log(`----callback-session`)
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
      session({ session }) {
         console.log(`-----events--session`)
         console.log({ session })
      },
      createUser(message) {
         console.log(`------events create-user`)
         console.log({ message })
         // message.user.
      },
      signIn({ profile, isNewUser }) {
         console.log(`------events signIn `)
         console.log({ profile, isNewUser })
      },
      signOut(message) {
         console.log(`-----events signOut`)
         console.log({ message })
      },
      updateUser({ user }) {
         console.log(`------events updateUser`)
         console.log({ user })
      },
      // let's check all this
   },
} satisfies NextAuthConfig
