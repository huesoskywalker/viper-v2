import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
// import NextAuth, { NextAuthConfig } from 'next-auth'
// import GithubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'
// import Auth0Provider from 'next-auth/providers/auth0'
// import { randomBytes, randomUUID } from 'crypto'
// import { MongoDBAdapter } from '@auth/mongodb-adapter'
// import { MongoClient } from 'mongodb'
// import { clientPromise } from '@/services/servicesInitializer'

// const config = {
//    providers: [Auth0Provider, GithubProvider, GoogleProvider],
//    adapter: MongoDBAdapter(clientPromise as Promise<MongoClient>),
//    session: {
//       strategy: 'database',
//       maxAge: 30 * 24 * 60 * 60,
//       updateAge: 24 * 60 * 60,

//       generateSessionToken: () => {
//          return randomUUID?.() ?? randomBytes(32).toString('hex')
//       },
//    },
//    secret: process.env.AUTH_SECRET,

//    callbacks: {
//       // authorized({ request, auth }) {
//       //    const pathname = request.nextUrl
//       //    return pathname ===
//       // },
//       session({ session, token, user, trigger, newSession }) {
//          // LET's check why we need biography and address into this
//          session.user._id = user.id
//          session.user.name = user.name
//          session.user.email = user.email
//          session.user.image = user.image
//          session.user.location = user.address.country

//          // session.user.biography = user.biography
//          // session.user.location = user.location
//          // session.user.address = user.address
//          // session.user.shopify = user.shopify

//          if (trigger === 'update' && newSession?.shopify) {
//             session.user.shopify = newSession.shopify
//          } else if (
//             trigger === 'update' &&
//             newSession?.image &&
//             // newSession?.location &&
//             newSession?.image
//          ) {
//             session.user.name = newSession.name
//             // session.user.location = newSession.location
//             session.user.image = newSession.image
//          }

//          return session
//       },
//    },
// } satisfies NextAuthConfig

// export const { handlers, auth, signIn, signOut, update } = NextAuth(config)
