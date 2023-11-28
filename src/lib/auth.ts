import NextAuth from 'next-auth'
import { randomBytes, randomUUID } from 'crypto'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import { clientPromise } from '@/services/servicesInitializer'
import authConfig from '../../auth.config'
import { cookies } from 'next/headers'
import { encode, decode } from '@auth/core/jwt'

// we have the link accounts in the events
// check both linkAccounts methods how they behave
export const mongoAdapter = MongoDBAdapter(clientPromise as Promise<MongoClient>, {
   databaseName: 'viperDb',
})

export const { handlers, auth, signIn, signOut, update } = NextAuth({
   adapter: mongoAdapter,
   session: {
      strategy: 'database',
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
      generateSessionToken: () => {
         return randomUUID?.() ?? randomBytes(32).toString('hex')
      },
   },
   jwt: {
      maxAge: 30 * 24 * 60 * 60,
      encode: async ({ token, secret, maxAge }) => {
         const cookie = cookies().get('next-auth.session-token')
         return cookie ? cookie.value : await encode({ token, secret, maxAge })
      },
      decode: async ({ token, secret }) => {
         return decode({ token, secret })
      },
   },
   ...authConfig,
})
