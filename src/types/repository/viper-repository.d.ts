import { ObjectId, WithId } from 'mongodb'
import {
   Blog,
   CreatedEvent,
   Email,
   EventCollection,
   Follow,
   UpdateViper,
   Viper,
   ViperBasic,
   _ID,
} from '../viper'

interface ViperCRUDRepository {
   initSearchIndexes(): Promise<void>
   login(identifier: {
      field: 'email' | 'username'
      value: string
   }): Promise<WithId<ViperBasic & { password: string }> | null>
   // we can make a pick interface for this props
   populateNewViper(
      _id: _ID,
      name: string | undefined,
      email: string,
      role: 'admin' | 'viper' | 'newViper' | 'needUpdate',
      image: string | undefined,
      emailVerified: Date | null,
      username: string | undefined,
   ): Promise<WithId<ViperBasic>>
   update(
      findBy: { _id: ObjectId } | { email: string },
      updateProps: UpdateViper,
   ): Promise<WithId<ViperBasic> | null>
   getAll(): Promise<WithId<Omit<Viper, 'password'>>[]>
   getAllBasic(): Promise<WithId<ViperBasic>[]>
   getById(viperId: string): Promise<WithId<Omit<Viper, 'password'>>>
   getByIdBasic(viperId: string): Promise<WithId<ViperBasic>>
   getByUsername(username: string): Promise<WithId<ViperBasic>>
   getByEmail(email: string): Promise<WithId<ViperBasic> | null>
   searchByUsername(username: string): Promise<WithId<ViperBasic>[]>
   isPropAvailable(findQuery: { field: 'email' | 'username'; value: string }): Promise<boolean>
}

interface ViperFollowRepository {
   // ====================================================
   // should we add getFollowers? check if the function already
   // getFollowers(viperId: string): Promise<Follow[]>
   // =========================================
   getFollowings(viperId: string): Promise<Follow[]>
   isFollowing(viperId: string, currentViperId: string): Promise<boolean>
   toggleFollower(
      operation: '$push' | '$pull',
      incCount: 1 | -1,
      viperId: string,
      currentViperId: string,
   ): Promise<Pick<WithId<Viper>, '_id'>>
   toggleFollowing(
      operation: '$push' | '$pull',
      incCount: 1 | -1,
      viperId: string,
      currentViperId: string,
   ): Promise<Pick<WithId<Viper>, '_id'>>
   // ======IMPORTANT=====
   // We need to add a initChat type and function
   // initChat(viperId: string, currentViperId: string): Promise
}
interface ViperBlogRepository {
   getBlogs(viperId: string): Promise<Blog[]>
   createBlog(viperId: string, comment: string): Promise<WithId<Pick<Viper, '_id'>> | null>
   isBlogLiked(blogId: string, viperId: string, currentViperId: string): Promise<boolean>
   toggleBlogLike(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>>
   toggleFeedBlogLike(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>>
   addBlogReply(
      blogId: string,
      viperId: string,
      currentViperId: string,
      comment: string,
   ): Promise<WithId<Pick<Viper, '_id'>>>
   addWithReplyBlogToFeed(
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>>
}

interface ViperEventRepository {
   toggleFeedEventLike(
      isLiked: boolean,
      eventId: string,
      viperId: string,
   ): Promise<WithId<Viper> | null>
   getLikedEvents(viperId: string): Promise<Likes[]>
   getEventsCollection(viperId: string): Promise<EventCollection[]>
   isEventParticipationRequested(viperId: string, eventId: string): Promise<boolean>
   requestEventParticipation(
      viperId: string,
      eventId: string,
      checkoutId: string,
   ): Promise<WithId<Pick<Viper, '_id'>> | null>
   addCreatedEvent(viperId: string, eventId: string): Promise<WithId<Pick<Viper, '_id'>> | null>
   removeCreatedEvent(viperId: string, eventId: string): Promise<WithId<Pick<Viper, '_id'>> | null>
   // wonder if we should return an empty[] if it does not have any event
   getCreatedEvents(viperId: string): Promise<CreatedEvent[]>
}

export type ViperRepositorySource = ViperCRUDRepository &
   ViperFollowRepository &
   ViperBlogRepository &
   ViperEventRepository

export type PreloadViperServiceSource = {
   preloadGetById(viperId: string): Promise<void>
   preloadBasic(viperId: string): Promise<void>
}
