import { Db, MongoClient, MongoError } from 'mongodb'
import { ViperRepository } from './ViperRepository'
import { EventRepository } from './EventRepository'
import {
   InitializeRepositories,
   RepositoryInitializer,
} from '@/types/repository/repository-factory'
import { logError, logMongoError } from '@/config/winstonLogger'

export class RepositoryFactory implements RepositoryInitializer {
   private static instance: RepositoryFactory

   private constructor() {}

   static getInstance(): RepositoryFactory {
      try {
         if (!this.instance) {
            this.instance = new RepositoryFactory()
         }
         return this.instance
      } catch (error) {
         logError({ action: `Repository factory instance` }, error)
         throw new Error(
            `Failed to get the repository instance: ${
               error instanceof Error ? error.message : 'Unknown error'
            }`,
         )
      }
   }

   async initializeRepositories(
      clientPromise: Promise<MongoClient>,
   ): Promise<InitializeRepositories> {
      if (!clientPromise) {
         throw new Error(`ClientPromise is not initialized in Repository Factory`)
      }

      try {
         const client = await clientPromise
         const database = client.db('viperDb')

         const viperRepository = new ViperRepository(database)
         const eventRepository = new EventRepository(database)

         return { viperRepository, eventRepository }
      } catch (error: unknown) {
         if (error instanceof MongoError) {
            logMongoError({ action: `Initialize repositories`, database: 'viperDb' }, error)

            throw new Error(`Failed to initialize Repositories: ${error.message}`)
         } else {
            logError({ action: `Initialize repositories`, database: 'viperDb' }, error)

            throw new Error(
               `Failed to initialize Repositories: ${
                  error instanceof Error ? error.message : 'Unknown error'
               }`,
            )
         }
      }
   }
}
