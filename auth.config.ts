import { Shopify, Viper } from '@/types/viper'
import type { NextAuthConfig } from 'next-auth'
import GitHub from '@auth/core/providers/github'
import Auth0 from '@auth/core/providers/auth0'
import Google from '@auth/core/providers/google'
import { clientPromise } from '@/services/servicesInitializer'
import { ObjectId } from 'mongodb'

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

type NewViper = {
   name: string
   username: string
   email: string
   image: string
   location: string
   bio: string
}
const populateNewUser = async (newViper: Partial<NewViper>) => {
   const { name, username, email, image, location, bio } = newViper

   // const newViper = await viperService.create
   const client = await clientPromise
   const viperCol = client.db('viperDb').collection<Viper>('users')

   let unTakenUsername: string = ''
   if (typeof username === 'string') {
      const isUsernameTaken = await viperCol.findOne<Viper>({ username: username })
      if (isUsernameTaken) {
         const randomNumber = Math.floor(Math.random() * 100000)
         unTakenUsername = `${username}${randomNumber}`
      } else {
         unTakenUsername = username
      }
   }

   const viper = await viperCol.insertOne({
      _id: new ObjectId(),
      location: location ?? '',
      contactInfo: {
         phone: null,
         address: '',
         website: '',
      },
      // we might want to create a basic image or place a gradient, that's cool having that conditional
      // might not make the code look great, handling a basic Image might be a better approach
      backgroundImage: image ?? '',
      bio: bio ?? '',
      blogs: {
         personal: [],
         likes: [],
         withReplies: [],
      },
      email: email ?? '',
      emailVerified: null,
      username: unTakenUsername,
      name: name ?? '',
      image: image ?? '',
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
   })
}

export default {
   debug: false,
   providers: [GitHub, Google, Auth0],
   pages: {
      signIn: '/auth/signin',
   },
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
      // async redirect({ baseUrl, url }) {
      //    console.log(`========redirect`)
      //    console.log(baseUrl)
      //    console.log(url)
      //    return '/'
      // },
      async signIn({ user, account, profile, email }) {
         // if (!user && profile) {
         //    const newViper: Partial<NewViper> = {}
         //    Object.assign(newViper, {
         //       name: profile.name,
         //       email: profile.email,
         //    })
         //    if (account?.provider === 'github') {
         //       Object.assign(newViper, {
         //          username: profile.login as string,
         //          image: profile.avatar_url as string,
         //          location: profile.location as string,
         //          bio: profile.bio,
         //       })
         //    } else if (account?.provider === 'google') {
         //       Object.assign(newViper, {
         //          username: profile.name?.trim().toLowerCase().replace(/\\s+/g, ''),
         //          image: profile.picture as string,
         //       })
         //    }
         //    await populateNewUser({ ...newViper })
         // }
         return true
      },
      async session({ session, token, user, trigger, newSession }) {
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
