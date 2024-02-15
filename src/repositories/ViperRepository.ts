import { ViperRepositorySource } from '@/types/repository/viper-repository'
import {
   CreatedEvent,
   EventCollection,
   Follow,
   Like,
   UpdateViper,
   Viper,
   ViperBasic,
   _ID,
} from '@/types/viper'
import { Collection, Db, ObjectId, WithId } from 'mongodb'
import { VIPER_BASIC_PROPS, VIPER_SIMPLE, VIPER_WITHOUT_PASSWORD } from '@/constants/projection'

const isDevEnvironment = process.env.NODE_ENV === 'development'
export class ViperRepository implements ViperRepositorySource {
   private viperCollection: Collection<Viper>

   constructor(database: Db) {
      this.viperCollection = database.collection<Viper>('users')
   }

   async login(identifier: {
      field: 'email' | 'username'
      value: string
   }): Promise<WithId<ViperBasic & { password: string }> | null> {
      const { field, value } = identifier

      try {
         if (isDevEnvironment) {
            const viper = await this.viperCollection.findOne(
               {
                  [field]: value,
               },
               {
                  projection: { ...VIPER_BASIC_PROPS, password: 1 },
               },
            )
            return viper as WithId<ViperBasic & { password: string }> | null
         } else {
            const searchIndex = field === 'email' ? 'getEmail' : 'getUsername'

            const viper = await this.viperCollection
               .aggregate([
                  {
                     $search: {
                        index: searchIndex,
                        text: {
                           query: value,
                           path: field,
                        },
                     },
                  },
                  {
                     $project: { ...VIPER_BASIC_PROPS, password: 1 },
                  },
               ])
               .toArray()

            return viper.length ? (viper[0] as WithId<ViperBasic & { password: string }>) : null
         }
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
         const newViper = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(_id),
            },
            {
               $set: {
                  name: name,
                  email: email,
                  emailVerified: emailVerified,
                  username: username,
                  verified: false,
                  website: '',
                  role: role,
                  bio: '',
                  location: '',
                  birthDate: {
                     day: '',
                     month: '',
                     year: '',
                  },
                  password: undefined,
                  image: image,
                  backgroundImage: '',
                  followers: [],
                  followersCount: 0,
                  followings: [],
                  followingsCount: 0,
                  contentDiscovery: true,
                  createdAt: new Date(),
               },
            },
            { projection: VIPER_BASIC_PROPS },
         )
         if (!newViper) {
            throw new Error(
               `Failed to populate user data: No matching user found with the provided _id.`,
            )
         }

         return newViper as WithId<ViperBasic>
      } catch (error: unknown) {
         throw error
      }
   }

   async update(
      findBy:
         | {
              _id: ObjectId
           }
         | {
              email: string
           },
      updateProps: UpdateViper,
   ): Promise<WithId<ViperBasic> | null> {
      try {
         const updateProfile: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            findBy,
            {
               $set: updateProps,
            },
            {
               projection: VIPER_BASIC_PROPS,
               returnDocument: 'after',
            },
         )

         return updateProfile
      } catch (error: unknown) {
         throw error
      }
   }

   async getAll(): Promise<WithId<Omit<Viper, 'password'>>[]> {
      try {
         // TODO: use cursor with .next() and hasNext() for pagination
         const vipers: WithId<Viper>[] = await this.viperCollection
            .find(
               {},
               {
                  projection: VIPER_WITHOUT_PASSWORD,
               },
            )
            .limit(20)
            .toArray()

         return vipers as WithId<Omit<Viper, 'password'>>[]
      } catch (error: unknown) {
         throw error
      }
   }

   async getAllBasic(): Promise<WithId<ViperBasic>[]> {
      try {
         // TODO: use cursor with .next() and hasNext() for pagination
         const vipers: WithId<Viper>[] = await this.viperCollection
            .find(
               {},
               {
                  projection: VIPER_BASIC_PROPS,
               },
            )
            .limit(20)
            .toArray()

         return vipers as WithId<ViperBasic>[]
      } catch (error) {
         throw error
      }
   }

   async getById(viperId: string): Promise<WithId<Omit<Viper, 'password'>>> {
      try {
         const viper: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               _id: new ObjectId(viperId),
            },
            { projection: VIPER_WITHOUT_PASSWORD },
         )

         if (!viper) throw new Error(`User not found or does not exist.`)

         return viper as WithId<Omit<Viper, 'password'>>
      } catch (error: unknown) {
         throw error
      }
   }

   async getByIdBasic(viperId: string): Promise<WithId<ViperBasic>> {
      try {
         const viperBasic: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               _id: new ObjectId(viperId),
            },
            {
               projection: VIPER_BASIC_PROPS,
            },
         )

         if (!viperBasic) throw new Error(`User not found or does not exist.`)

         return viperBasic as WithId<ViperBasic>
      } catch (error: unknown) {
         throw error
      }
   }

   async getByUsername(username: string): Promise<WithId<ViperBasic> | null> {
      try {
         if (isDevEnvironment) {
            const viper: WithId<Viper> | null = await this.viperCollection.findOne(
               {
                  username,
               },
               {
                  projection: VIPER_BASIC_PROPS,
               },
            )

            return viper
         } else {
            const viper = await this.viperCollection
               .aggregate([
                  {
                     $search: {
                        index: 'getUsername',
                        text: {
                           query: username,
                           path: 'username',
                        },
                     },
                  },
                  {
                     $project: VIPER_BASIC_PROPS,
                  },
               ])
               .toArray()

            return viper.length ? (viper[0] as WithId<ViperBasic>) : null
         }
      } catch (error: unknown) {
         throw error
      }
   }

   async getByEmail(email: string): Promise<WithId<ViperBasic> | null> {
      try {
         if (isDevEnvironment) {
            const viper: WithId<Viper> | null = await this.viperCollection.findOne(
               {
                  email,
               },
               {
                  projection: VIPER_BASIC_PROPS,
               },
            )

            return viper
         } else {
            const viper = await this.viperCollection
               .aggregate([
                  {
                     $search: {
                        index: 'getEmail',
                        text: {
                           query: email,
                           path: 'email',
                        },
                     },
                  },
                  {
                     $project: VIPER_BASIC_PROPS,
                  },
               ])
               .toArray()

            return viper.length ? (viper[0] as WithId<ViperBasic>) : null
         }
      } catch (error: unknown) {
         throw error
      }
   }

   async searchByUsernameOrName(username: string): Promise<WithId<ViperBasic>[]> {
      try {
         if (isDevEnvironment) {
            const vipers = await this.viperCollection
               .find<Viper>(
                  {
                     $text: {
                        $search: username,
                     },
                  },
                  {
                     projection: {
                        score: { $meta: 'textScore' },
                        ...VIPER_SIMPLE,
                     },
                  },
               )
               .sort({ score: { $meta: 'textScore' } })
               .limit(20)
               .toArray()

            return vipers
         } else {
            const vipers = await this.viperCollection
               .aggregate([
                  {
                     $search: {
                        index: 'searchUserAutocomplete',
                        compound: {
                           should: [
                              {
                                 autocomplete: {
                                    query: username,
                                    path: 'username',
                                    tokenOrder: 'sequential',
                                    fuzzy: {},
                                 },
                              },
                              {
                                 autocomplete: {
                                    query: username,
                                    path: 'name',
                                    tokenOrder: 'sequential',
                                    fuzzy: {},
                                 },
                              },
                           ],
                        },
                     },
                  },
                  {
                     $project: {
                        score: { $meta: 'searchScore' },
                        ...VIPER_SIMPLE,
                     },
                  },
               ])
               .sort({ score: -1 })
               .limit(10)
               .toArray()

            return vipers as WithId<ViperBasic>[]
         }
      } catch (error: unknown) {
         throw error
      }
   }

   async isPropAvailable(findQuery: {
      field: 'email' | 'username'
      value: string
   }): Promise<boolean> {
      try {
         if (isDevEnvironment) {
            const isAvailable: WithId<Viper> | null = await this.viperCollection.findOne(
               {
                  [findQuery.field]: findQuery.value,
               },
               {
                  collation: {
                     locale: 'en',
                     strength: 2,
                  },
                  projection: {
                     _id: 0,
                     [findQuery.field]: 1,
                  },
               },
            )

            return !!isAvailable
         } else {
            const searchIndex = findQuery.field === 'email' ? 'getEmail' : 'getUsername'

            const isAvailable = await this.viperCollection
               .aggregate([
                  {
                     $search: {
                        index: searchIndex,
                        text: {
                           query: findQuery.value,
                           path: findQuery.field,
                        },
                     },
                  },
                  {
                     $project: VIPER_BASIC_PROPS,
                  },
               ])
               .toArray()

            return !!isAvailable.length
         }
      } catch (error: unknown) {
         throw error
      }
   }

   // We don't have a getFollowers?
   async getFollowings(viperId: string): Promise<Follow[]> {
      try {
         // TODO: use cursor .nex() and .hasNext() for pagination
         const viperFollowings: Follow[] = await this.viperCollection
            .aggregate<Follow>([
               {
                  $match: { _id: new ObjectId(viperId) },
               },
               {
                  $unwind: '$followings',
               },
               {
                  $project: {
                     _id: '$followings._id',
                  },
               },
            ])
            .limit(30)
            .toArray()

         return viperFollowings
      } catch (error: unknown) {
         throw error
      }
   }

   async isFollowing(viperId: string, sessionId: string): Promise<boolean> {
      try {
         const isFollowing: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               _id: new ObjectId(sessionId),
               'followings._id': new ObjectId(viperId),
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         return !!isFollowing
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleFollower(
      operation: '$push' | '$pull',
      incCount: 1 | -1,
      viperId: string,
      sessionId: string,
   ): Promise<Pick<WithId<Viper>, '_id'>> {
      try {
         const toggleFollower: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
            },
            {
               [operation]: {
                  followers: { _id: new ObjectId(sessionId) },
               },
               $inc: { followersCount: incCount },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         if (!toggleFollower) {
            throw new Error(`No matching user to toggle follower`)
         }

         return toggleFollower as Pick<WithId<Viper>, '_id'>
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleFollowing(
      operation: '$push' | '$pull',
      incCount: 1 | -1,
      viperId: string,
      sessionId: string,
   ): Promise<Pick<WithId<Viper>, '_id'>> {
      try {
         const toggleFollowing: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(sessionId),
            },
            {
               [operation]: {
                  followings: { _id: new ObjectId(viperId) },
               },
               $inc: { followingsCount: incCount },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         if (!toggleFollowing) throw new Error(`No matching user to toggle following`)

         return toggleFollowing as Pick<WithId<Viper>, '_id'>
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleFeedEventLike(
      isLiked: boolean,
      eventId: string,
      viperId: string,
   ): Promise<WithId<Viper> | null> {
      // this func depends on a func from eventCollection
      const operation: string = isLiked ? '$pull' : '$push'
      try {
         const toggleLike: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
            },
            {
               [operation]: {
                  'myEvents.liked': {
                     _id: new ObjectId(eventId),
                  },
               },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         if (!toggleLike)
            throw new Error(
               `No matching user to ${operation === '$push' ? 'like' : 'dislike'} feed event`,
            )

         return toggleLike
      } catch (error: unknown) {
         throw error
      }
   }

   async getLikedEvents(viperId: string): Promise<Like[]> {
      try {
         // TODO: use cursor .next() .hasNext() for pagination
         const likedEvents: Like[] = await this.viperCollection
            .aggregate<Like>([
               {
                  $match: { _id: new ObjectId(viperId) },
               },
               {
                  $unwind: '$myEvents.liked',
               },
               {
                  $project: {
                     _id: '$myEvents.liked._id',
                  },
               },
            ])
            .limit(20)
            .toArray()

         return likedEvents
      } catch (error: unknown) {
         throw error
      }
   }

   async getEventsCollection(viperId: string): Promise<EventCollection[]> {
      // TODO: use cursor .next() .hasNext() for pagination
      try {
         const events: EventCollection[] = await this.viperCollection
            .aggregate<EventCollection>([
               {
                  $match: { _id: new ObjectId(viperId) },
               },
               {
                  $unwind: '$myEvents.collection',
               },
               {
                  $project: {
                     _id: '$myEvents.collection._id',
                     checkoutId: '$myEvents.collection.checkoutId',
                  },
               },
            ])
            .limit(20)
            .toArray()

         return events
      } catch (error: unknown) {
         throw error
      }
   }

   async isEventParticipationRequested(viperId: string, eventId: string): Promise<boolean> {
      try {
         const isParticipationRequested: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               _id: new ObjectId(viperId),
               'myEvents.collection._id': new ObjectId(eventId),
            },
         )
         return !!isParticipationRequested
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
         const requestParticipation: WithId<Viper> | null =
            await this.viperCollection.findOneAndUpdate(
               {
                  _id: new ObjectId(viperId),
               },
               {
                  $push: {
                     'myEvents.collection': {
                        _id: new ObjectId(eventId),
                        checkoutId: checkoutId,
                     },
                  },
               },
               {
                  projection: {
                     _id: 1,
                     // check if needed the last document
                     // returnDocument: 'after'
                  },
               },
            )

         // if (!requestParticipation)
         // throw new Error(`No matching user to request event participation`)

         return requestParticipation
      } catch (error: unknown) {
         throw error
      }
   }

   async addCreatedEvent(
      viperId: string,
      eventId: string,
   ): Promise<WithId<Pick<Viper, '_id'>> | null> {
      try {
         const createdEvent: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
            },
            {
               $push: {
                  'myEvents.created': {
                     _id: new ObjectId(eventId),
                  },
               },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         if (!createdEvent) throw new Error(`No matching user to add the created event to feed`)

         return createdEvent
      } catch (error: unknown) {
         throw error
      }
   }

   async removeCreatedEvent(
      viperId: string,
      eventId: string,
   ): Promise<WithId<Pick<Viper, '_id'>> | null> {
      try {
         const deletedEvent = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
            },
            {
               $pull: {
                  'myEvents.created': { _id: new ObjectId(eventId) },
               },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         if (!deletedEvent)
            throw new Error(`No matching user to remove the created event from feed`)

         return deletedEvent
      } catch (error: unknown) {
         throw error
      }
   }

   async getCreatedEvents(viperId: string): Promise<CreatedEvent[]> {
      try {
         // TODO: use cursor .next() .hasNext() for pagination
         const createdEvents: CreatedEvent[] = await this.viperCollection
            .aggregate<CreatedEvent>([
               {
                  $match: {
                     _id: new ObjectId(viperId),
                  },
               },
               {
                  $unwind: '$myEvents.created',
               },
               {
                  $project: {
                     _id: '$myEvents.created._id',
                  },
               },
            ])
            .limit(20)
            .toArray()

         return createdEvents
      } catch (error: unknown) {
         throw error
      }
   }
}
