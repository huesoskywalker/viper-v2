import { MongoClient, MongoClientOptions, MongoError, ServerApiVersion } from 'mongodb'
import { MongoDBConnectionSource } from '@/types/mongodb'
import { winstonLogger } from './winstonLogger'

const NODE_ENV = process.env.NODE_ENV
const isDevEnvironment = NODE_ENV === 'development'

const MONGODB_PROD_URI = process.env.MONGODB_PROD_URI
const MONGODB_DEV_URI = process.env.MONGODB_DEV_URI
if (!MONGODB_PROD_URI || !MONGODB_DEV_URI)
   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')

const MONGODB_URI: string = isDevEnvironment ? MONGODB_DEV_URI : MONGODB_PROD_URI

const options: MongoClientOptions = {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: true,
   },
}

export class MongoDBConnection implements MongoDBConnectionSource {
   private static instance: MongoDBConnection
   private client: MongoClient
   private clientPromise: Promise<MongoClient>

   private constructor() {
      this.client = new MongoClient(MONGODB_URI, options)
      this.clientPromise = this.client.connect()
   }

   static getInstance(): MongoDBConnection {
      try {
         if (!this.instance) {
            this.instance = new MongoDBConnection()
         }
         return this.instance
      } catch (error: unknown) {
         if (error instanceof MongoError) {
            winstonLogger.error(
               `Database initialization failed code: ${error.code}, error ${error.name}: ${error.message}, cause: ${error.cause}`,
            )
         }
         throw new Error(`Database Initialization failed ${error}`)
      }
   }

   getClientPromise(): Promise<MongoClient> {
      return this.clientPromise
   }
}
