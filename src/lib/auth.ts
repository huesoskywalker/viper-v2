import NextAuth from 'next-auth'
import { randomBytes, randomUUID } from 'crypto'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import { clientPromise } from '@/services/servicesInitializer'
import authConfig from '../../auth.config'

// We are not using the signIn and signOut because of ./node_modules/mongodb/lib/client-side-encryption/client_encryption.js
// This signIn works when passing a provider and on server components
// Probably to make a custom LogIn Form
export const { handlers, auth, signIn, signOut, update } = NextAuth({
   adapter: MongoDBAdapter(clientPromise as Promise<MongoClient>),
   session: {
      strategy: 'database',
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,

      generateSessionToken: () => {
         return randomUUID?.() ?? randomBytes(32).toString('hex')
      },
   },
   ...authConfig,
})
