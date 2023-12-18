import { ViperRepositorySource } from '@/types/repository/viper-repository'
import {
   Blog,
   CreatedEvent,
   EventCollection,
   Follow,
   Like,
   UpdateViper,
   Viper,
   ViperBasicProps,
   _ID,
} from '@/types/viper'
import { WithId } from 'mongodb'

export class ViperService implements ViperRepositorySource {
   private viperRepository: ViperRepositorySource

   constructor(viperRepository: ViperRepositorySource) {
      this.viperRepository = viperRepository
   }

   async login(username: string, password: string): Promise<WithId<ViperBasicProps> | null> {
      try {
         const viper = await this.viperRepository.login(username, password)

         return viper
      } catch (error: unknown) {
         throw error
      }
   }

   async populateNewViper(
      _id: _ID,
      name: string | undefined,
      email: string,
      image: string | undefined,
      emailVerified: Date | null,
      username: string | undefined,
   ): Promise<WithId<Viper>> {
      try {
         const newViper = await this.viperRepository.populateNewViper(
            _id,
            name,
            email,
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
   ): Promise<WithId<Viper> | null> {
      try {
         const updateProfile = await this.viperRepository.update(findQuery, updateProps)

         return updateProfile
      } catch (error: unknown) {
         throw error
      }
   }

   async getAll(): Promise<Viper[]> {
      try {
         const vipers = await this.viperRepository.getAll()

         return vipers
      } catch (error: unknown) {
         throw error
      }
   }

   async getAllBasicProps(): Promise<ViperBasicProps[]> {
      try {
         const vipers = await this.viperRepository.getAllBasicProps()

         return vipers
      } catch (error: unknown) {
         throw error
      }
   }

   async getById(viperId: string): Promise<WithId<Viper>> {
      try {
         const viper: WithId<Viper> | null = await this.viperRepository.getById(viperId)

         return viper
      } catch (error: unknown) {
         throw error
      }
   }

   async getBasicProps(viperId: string): Promise<WithId<ViperBasicProps>> {
      try {
         const viperBasicProps: WithId<ViperBasicProps> | null =
            await this.viperRepository.getBasicProps(viperId)

         return viperBasicProps
      } catch (error: unknown) {
         throw error
      }
   }

   async findByUsername(username: string): Promise<WithId<ViperBasicProps>[]> {
      try {
         const vipers: WithId<ViperBasicProps>[] =
            await this.viperRepository.findByUsername(username)

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

   async toggleFollower(
      isFollowing: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<Pick<WithId<Viper>, '_id'>> {
      try {
         const toggleFollower: Pick<WithId<Viper>, '_id'> | null =
            await this.viperRepository.toggleFollower(isFollowing, viperId, currentViperId)

         return toggleFollower
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleFollowing(
      isFollowing: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<Pick<WithId<Viper>, '_id'>> {
      try {
         const toggleFollowing: Pick<WithId<Viper>, '_id'> | null =
            await this.viperRepository.toggleFollowing(isFollowing, viperId, currentViperId)

         return toggleFollowing
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

   async createBlog(viperId: string, comment: string): Promise<WithId<Viper> | null> {
      try {
         const blogContent: WithId<Viper> | null = await this.viperRepository.createBlog(
            viperId,
            comment,
         )

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
   ): Promise<WithId<Viper> | null> {
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
   ): Promise<WithId<Viper> | null> {
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
   ): Promise<WithId<Viper> | null> {
      try {
         const addBlogComment: WithId<Viper> | null = await this.viperRepository.addBlogReply(
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
   ): Promise<WithId<Viper> | null> {
      try {
         const addFeedBlog: WithId<Viper> | null =
            await this.viperRepository.addWithReplyBlogToFeed(blogId, viperId, currentViperId)

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
   ): Promise<WithId<Viper> | null> {
      try {
         const requestParticipation: WithId<Viper> | null =
            await this.viperRepository.requestEventParticipation(viperId, eventId, checkoutId)

         return requestParticipation
      } catch (error: unknown) {
         throw error
      }
   }

   async addCreatedEvent(viperId: string, eventId: string): Promise<WithId<Viper> | null> {
      // We should combine this when we create the event within the eventRepository
      // probably we won't need this method in the ViperMethod
      // Adding both in the create method from the EventModel
      try {
         const createdEvent: WithId<Viper> | null = await this.viperRepository.addCreatedEvent(
            viperId,
            eventId,
         )

         return createdEvent
      } catch (error: unknown) {
         throw error
      }
   }

   async removeCreatedEvent(viperId: string, eventId: string): Promise<WithId<Viper> | null> {
      // We should combine this when we delete the event within the eventRepository
      // probably we won't need this method in the ViperMethod
      // Adding both in the create method from the EventModel
      try {
         const removedEvent: WithId<Viper> | null = await this.viperRepository.removeCreatedEvent(
            viperId,
            eventId,
         )

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
