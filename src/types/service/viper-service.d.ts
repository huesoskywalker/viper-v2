import { ViperSimple } from '../viper'

interface ViperCRUDService {
   login(identifier: string, plainPassword: string): Promise<WithId<ViperBasic> | null>
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
      findQuery: { field: '_id' | 'email'; value: string },
      updateProps: UpdateViper,
   ): Promise<WithId<ViperBasic> | null>
   getAll(): Promise<WithId<Omit<Viper, 'password'>>[]>
   getAllBasic(): Promise<WithId<ViperBasic>[]>
   getById(viperId: string): Promise<WithId<Omit<Viper, 'password'>>>
   getByIdBasic(viperId: string): Promise<WithId<ViperBasic>>
   getByUsername(username: string): Promise<WithId<ViperBasic> | null>
   matchEmailAndUsername(email: string, username: string): Promise<{ username: string } | null>
   searchByUsernameOrName(username: string): Promise<WithId<ViperSimple>[]>
   isPropAvailable(findQuery: { field: 'email' | 'username'; value: string }): Promise<boolean>
}

interface ViperFollowService {
   // ====================================================
   // should we add getFollowers? check if the function already
   // getFollowers(viperId: string): Promise<Follow[]>
   // =========================================
   getFollowings(viperId: string): Promise<Follow[]>
   isFollowing(viperId: string, sessionId: string): Promise<boolean>
   toggleFollow(
      isFollowing: boolean,
      viperId: string,
      sessionId: string,
   ): Promise<{
      follower: Pick<WithId<Viper>, '_id'>
      following: Pick<WithId<Viper>, '_id'>
   }>
   // ======IMPORTANT=====
   // We need to add a initChat type and function
   // initChat(viperId: string, sessionId: string): Promise
}
interface ViperEventService {
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

export type ViperServiceSource = ViperCRUDService & ViperFollowService & ViperEventService
// ViperBlogService &
