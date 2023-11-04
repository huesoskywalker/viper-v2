import { Db, MongoClient } from 'mongodb'
import { ViperRepository } from './ViperRespository'
import { InitializeRepositories, RepositoryInitializer } from '@/types/repository-factory'
import { EventRepository } from './EventRepository'

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
         // Add winston logger
         throw new Error(`Failed to get the repository instance, ${error}`)
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
         throw new Error(`Failed to initialize the Repositories, ${error}`)
      }
   }
}
