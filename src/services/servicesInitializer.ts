import { MongoDBConnection } from '@/config/MongoDBConnection'
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
import { EventService } from '@/services/EventService'
import { ViperService } from '@/services/ViperService'
import { PreloadViperService } from './PreloadViperService'

const mongoInstance = MongoDBConnection.getInstance()
const clientPromise = mongoInstance.getClientPromise()

const factoryInstance = RepositoryFactory.getInstance()

const { eventRepository, viperRepository } =
   await factoryInstance.initializeRepositories(clientPromise)

const eventService = new EventService(eventRepository)

const viperService = new ViperService(viperRepository)

const preloadViperService = new PreloadViperService(viperService)

export { clientPromise, eventService, viperService, preloadViperService }
