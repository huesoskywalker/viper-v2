import { EventRepository } from '@/repositories/EventRepository'
import { ViperRepository } from '@/repositories/ViperRepository'
import { MongoClient } from 'mongodb'

export type RepositoryInitializer = {
   initializeRepositories(clientPromise: Promise<MongoClient>): Promise<InitializeRepositories>
}

export type InitializeRepositories = {
   viperRepository: ViperRepository
   eventRepository: EventRepository
}
