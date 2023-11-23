import NextAuth from 'next-auth'
import { randomBytes, randomUUID } from 'crypto'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import { clientPromise } from '@/services/servicesInitializer'
import authConfig from '../../auth.config'

const mongoAdapter = MongoDBAdapter(clientPromise as Promise<MongoClient>, {
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
   ...authConfig,
})
