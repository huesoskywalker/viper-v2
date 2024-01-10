import { logError, logMongoError } from '@/config/winstonLogger'
import { ViperRepositorySource } from '@/types/repository/viper-repository'
import {
   Blog,
   CreatedEvent,
   EventCollection,
   Follow,
   Like,
   UpdateViper,
   Viper,
   ViperBasic,
   _ID,
} from '@/types/viper'
import { MongoError, ObjectId, WithId } from 'mongodb'
import bcrypt from 'bcrypt'
import { ViperServiceSource } from '@/types/service/viper-service'
import { emailRegex } from '@/app/(auth)/i/flow/_utils/regex'

export class ViperService implements ViperServiceSource {
   private viperRepository: ViperRepositorySource

   constructor(viperRepository: ViperRepositorySource) {
      this.viperRepository = viperRepository
   }

   async initSearchIndexes(): Promise<void> {
      try {
         await this.viperRepository.initSearchIndexes()
      } catch (error) {
         if (error instanceof MongoError) {
            logMongoError(
               { action: 'Initialize search Indexes', indexes: ['searchUsername', 'searchEmail'] },
               error,
            )

            throw new Error(`Unable to initialize search indexes: ${error.message}`)
         } else {
            logError(
               { action: 'Init search Indexes', indexes: ['searchUsername', 'searchEmail'] },
               error,
            )
            throw new Error(
               `Failed to initialize search indexes: ${
                  error instanceof Error ? error.message : 'Unknown error'
               }`,
            )
         }
      }
   }

   async login(identifier: string, plainPassword: string): Promise<WithId<ViperBasic> | null> {
      const field = emailRegex.test(identifier) ? 'email' : 'username'

      try {
         const viper = await this.viperRepository.login({ field: field, value: identifier })

         if (!viper) throw new Error(`User not found or does not exist.`)

         if (!viper.password)
            throw new Error(`Unable to log in: The user does not have a password set up`)

         const { password, ...restViper } = viper
         const isPasswordMatch = await bcrypt.compare(plainPassword, password)

         return isPasswordMatch ? restViper : null
      } catch (error: unknown) {
         throw error
      }
   }

   async populateNewViper(
      _id: _ID,
      name: string | undefined,
      email: string,
      role: 'admin' | 'viper' | 'newViper' | 'needUpdate',
      image: string | undefined,
      emailVerified: Date | null,
      username: string | undefined,
   ): Promise<WithId<ViperBasic>> {
      try {
         const newViper = await this.viperRepository.populateNewViper(
            _id,
            name,
            email,
            role,
            image,
            emailVerified,
            username,
         )

         return newViper
      } catch (error: unknown) {
         throw error
      }
   }

   async update(
      findQuery: { field: '_id' | 'email'; value: string },
      updateProps: UpdateViper,
   ): Promise<WithId<ViperBasic> | null> {
      try {
         const findBy =
            findQuery.field === '_id'
               ? { [findQuery.field]: new ObjectId(findQuery.value) }
               : { [findQuery.field]: findQuery.value }

         if (!findBy) throw new Error(`Missing find query`)

         const updateProfile = await this.viperRepository.update(findBy, updateProps)

         return updateProfile
      } catch (error: unknown) {
         throw error
      }
   }

   async getAll(): Promise<Omit<Viper, 'password'>[]> {
      try {
         const vipers = await this.viperRepository.getAll()

         return vipers
      } catch (error: unknown) {
         throw error
      }
   }

   async getAllBasic(): Promise<ViperBasic[]> {
      try {
         const vipers = await this.viperRepository.getAllBasic()

         return vipers
      } catch (error: unknown) {
         throw error
      }
   }

   async getById(viperId: string): Promise<WithId<Omit<Viper, 'password'>>> {
      try {
         const viper = await this.viperRepository.getById(viperId)

         return viper
      } catch (error: unknown) {
         throw error
      }
   }

   async getByIdBasic(viperId: string): Promise<WithId<ViperBasic>> {
      try {
         const viperBasic = await this.viperRepository.getByIdBasic(viperId)

         return viperBasic
      } catch (error: unknown) {
         throw error
      }
   }

   async matchEmailAndUsername(email: string, username: string): Promise<boolean> {
      try {
         const viperBasic = await this.viperRepository.getByEmail(email)

         if (!viperBasic) {
            return false
         }

         if (viperBasic.username.toLowerCase() !== username.toLowerCase()) {
            return false
         }

         return true
      } catch (error: unknown) {
         throw error
      }
   }

   async searchByUsername(username: string): Promise<WithId<ViperBasic>[]> {
      try {
         const vipers: WithId<ViperBasic>[] = await this.viperRepository.searchByUsername(username)

         return vipers
      } catch (error: unknown) {
         throw error
      }
   }

   async isPropAvailable(findQuery: {
      field: 'email' | 'username'
      value: string
   }): Promise<boolean> {
      try {
         const isAvailable: boolean = await this.viperRepository.isPropAvailable(findQuery)

         return isAvailable
      } catch (error: unknown) {
         throw error
      }
   }

   // We don't have a getFollowers?
   async getFollowings(viperId: string): Promise<Follow[]> {
      try {
         const viperFollowings: Follow[] = await this.viperRepository.getFollowings(viperId)

         return viperFollowings
      } catch (error: unknown) {
         throw error
      }
   }

   async isFollowing(viperId: string, currentViperId: string): Promise<boolean> {
      try {
         const isFollowing: boolean = await this.viperRepository.isFollowing(
            viperId,
            currentViperId,
         )

         return isFollowing
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleFollow(
      isFollowing: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<{
      follower: Pick<WithId<Viper>, '_id'>
      following: Pick<WithId<Viper>, '_id'>
   }> {
      try {
         const operation = isFollowing ? '$pull' : '$push'

         const toggleFollower = this.viperRepository.toggleFollower(
            operation,
            viperId,
            currentViperId,
         )
         const toggleFollowing = this.viperRepository.toggleFollowing(
            operation,
            viperId,
            currentViperId,
         )

         const [follower, following] = await Promise.all([toggleFollower, toggleFollowing])

         return { follower, following }
      } catch (error: unknown) {
         throw error
      }
   }

   async getBlogs(viperId: string): Promise<Blog[]> {
      try {
         const viperBlogs: Blog[] = await this.viperRepository.getBlogs(viperId)

         return viperBlogs
      } catch (error: unknown) {
         throw error
      }
   }

   async createBlog(viperId: string, comment: string): Promise<WithId<Pick<Viper, '_id'>> | null> {
      try {
         const blogContent = await this.viperRepository.createBlog(viperId, comment)

         return blogContent
      } catch (error: unknown) {
         throw error
      }
   }

   async isBlogLiked(blogId: string, viperId: string, currentViperId: string): Promise<boolean> {
      try {
         const isLiked: boolean = await this.viperRepository.isBlogLiked(
            blogId,
            viperId,
            currentViperId,
         )

         return isLiked
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleBlogLike(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>> {
      try {
         const toggleLike = await this.viperRepository.toggleBlogLike(
            isLiked,
            blogId,
            viperId,
            currentViperId,
         )

         return toggleLike
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleFeedBlogLike(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>> {
      try {
         const toggleLikedBlog = await this.viperRepository.toggleFeedBlogLike(
            isLiked,
            blogId,
            viperId,
            currentViperId,
         )

         return toggleLikedBlog
      } catch (error: unknown) {
         throw error
      }
   }

   async addBlogReply(
      blogId: string,
      viperId: string,
      currentViperId: string,
      // change this to content or reply as well
      comment: string,
   ): Promise<WithId<Pick<Viper, '_id'>>> {
      try {
         const addBlogComment = await this.viperRepository.addBlogReply(
            blogId,
            viperId,
            currentViperId,
            comment,
         )

         return addBlogComment
      } catch (error: unknown) {
         throw error
      }
   }

   async addWithReplyBlogToFeed(
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>> {
      try {
         const addFeedBlog = await this.viperRepository.addWithReplyBlogToFeed(
            blogId,
            viperId,
            currentViperId,
         )

         return addFeedBlog
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleFeedEventLike(
      isLiked: boolean,
      eventId: string,
      viperId: string,
   ): Promise<WithId<Viper> | null> {
      // CHECK if it useful this way and pass the return value from EventModel.isLiked()
      // or if we should use the EventRepository in here
      try {
         const toggleLike: WithId<Viper> | null = await this.viperRepository.toggleFeedEventLike(
            isLiked,
            eventId,
            viperId,
         )

         return toggleLike
      } catch (error: unknown) {
         throw error
      }
   }

   async getLikedEvents(viperId: string): Promise<Like[]> {
      try {
         const likedEvents: Like[] = await this.viperRepository.getLikedEvents(viperId)

         return likedEvents
      } catch (error: unknown) {
         throw error
      }
   }

   async getEventsCollection(viperId: string): Promise<EventCollection[]> {
      try {
         const events: EventCollection[] = await this.viperRepository.getEventsCollection(viperId)

         return events
      } catch (error: unknown) {
         throw error
      }
   }

   async isEventParticipationRequested(viperId: string, eventId: string): Promise<boolean> {
      try {
         const isParticipationRequested: boolean =
            await this.viperRepository.isEventParticipationRequested(viperId, eventId)

         return isParticipationRequested
      } catch (error: unknown) {
         throw error
      }
   }

   async requestEventParticipation(
      viperId: string,
      eventId: string,
      checkoutId: string,
   ): Promise<WithId<Pick<Viper, '_id'>> | null> {
      try {
         const requestParticipation = await this.viperRepository.requestEventParticipation(
            viperId,
            eventId,
            checkoutId,
         )

         return requestParticipation
      } catch (error: unknown) {
         throw error
      }
   }

   async addCreatedEvent(
      viperId: string,
      eventId: string,
   ): Promise<WithId<Pick<Viper, '_id'>> | null> {
      // We should combine this when we create the event within the eventRepository
      // probably we won't need this method in the ViperMethod
      // Adding both in the create method from the EventModel
      try {
         const createdEvent = await this.viperRepository.addCreatedEvent(viperId, eventId)

         return createdEvent
      } catch (error: unknown) {
         throw error
      }
   }

   async removeCreatedEvent(
      viperId: string,
      eventId: string,
   ): Promise<WithId<Pick<Viper, '_id'>> | null> {
      // We should combine this when we delete the event within the eventRepository
      // probably we won't need this method in the ViperMethod
      // Adding both in the create method from the EventModel
      try {
         const removedEvent = await this.viperRepository.removeCreatedEvent(viperId, eventId)

         return removedEvent
      } catch (error: unknown) {
         throw error
      }
   }

   async getCreatedEvents(viperId: string): Promise<CreatedEvent[]> {
      try {
         const createdEvents: CreatedEvent[] = await this.viperRepository.getCreatedEvents(viperId)

         return createdEvents
      } catch (error: unknown) {
         throw error
      }
   }
}
