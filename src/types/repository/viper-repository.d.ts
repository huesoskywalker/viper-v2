import { WithId } from 'mongodb'
import {
   Blog,
   CreatedEvent,
   Email,
   EventCollection,
   Follow,
   UpdateViper,
   Viper,
   ViperBasicProps,
   _ID,
} from '../viper'

interface ViperCRUDRepository {
   login(username: string, password: string): Promise<WithId<ViperBasicProps> | null>
   // we can make a pick interface for this props
   populateNewViper(
      _id: _ID,
      name: string | undefined,
      email: string,
      image: string | undefined,
      emailVerified: Date | null,
      username: string | undefined,
   ): Promise<WithId<Viper> | null>
   update(
      findQuery: { field: '_id' | 'email'; value: string },
      updateProps: UpdateViper,
   ): Promise<WithId<Viper> | null>
   getAll(): Promise<WithId<Viper>[]>
   getAllBasicProps(): Promise<WithId<ViperBasicProps>[]>
   getById(viperId: string): Promise<WithId<Viper> | null>
   getBasicProps(viperId: string): Promise<WithId<ViperBasicProps> | null>
   // This is one below is built for the search input
   findByUsername(username: string): Promise<WithId<ViperBasicProps>[]>
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
      isFollowing: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<Pick<WithId<Viper>, '_id'> | null>
   toggleFollowing(
      isFollowed: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<Pick<WithId<Viper>, '_id'> | null>
   // ======IMPORTANT=====
   // We need to add a initChat type and function
   // initChat(viperId: string, currentViperId: string): Promise
}
interface ViperBlogRepository {
   getBlogs(viperId: string): Promise<Blog[]>
   createBlog(viperId: string, comment: string): Promise<WithId<Viper> | null>
   isBlogLiked(blogId: string, viperId: string, currentViperId: string): Promise<boolean>
   toggleBlogLike(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null>
   toggleFeedBlogLike(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null>
   addBlogReply(
      blogId: string,
      viperId: string,
      currentViperId: string,
      comment: string,
   ): Promise<WithId<Viper> | null>
   addWithReplyBlogToFeed(
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null>
}

interface ViperEventRepository {
   toggleLikedEvent(
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
   ): Promise<WithId<Viper> | null>
   addCreatedEvent(viperId: string, eventId: string): Promise<WithId<Viper> | null>
   removeCreatedEvent(viperId: string, eventId: string): Promise<WithId<Viper> | null>
   // wonder if we should return an empty[] if it does not have any event
   getCreatedEvents(viperId: string): Promise<CreatedEvent[]>
}

export type ViperRepositorySource = ViperCRUDRepository &
   ViperFollowRepository &
   ViperBlogRepository &
   ViperEventRepository

export type PreloadViperServiceSource = {
   preloadGetById(viperId: string): Promise<void>
   preloadBasicProps(viperId: string): Promise<void>
}
