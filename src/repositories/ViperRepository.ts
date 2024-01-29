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
import { Collection, Db, ObjectId, WithId } from 'mongodb'
import { VIPER_BASIC_PROPS, VIPER_SIMPLE, VIPER_WITHOUT_PASSWORD } from '@/constants/projection'
import { logError } from '@/config/winstonLogger'

export class ViperRepository implements ViperRepositorySource {
   private viperCollection: Collection<Viper>

   constructor(database: Db) {
      this.viperCollection = database.collection<Viper>('users')
   }

   async initSearchIndexes(): Promise<void> {
      try {
         const existingIndexes = await this.viperCollection.indexes()

         const createdIndexNames = existingIndexes.map((index) => index.name)
         const indexNames = ['_id_', 'getUsername', 'getEmail', 'search']

         const allIndexCreated = indexNames.every((indexName) =>
            createdIndexNames.includes(indexName),
         )

         if (allIndexCreated) {
            return
         }

         const usernameIndex = this.viperCollection.createIndex(
            { username: 1 },
            { name: 'getUsername', collation: { locale: 'en', strength: 2 }, unique: true },
         )
         const emailIndex = this.viperCollection.createIndex(
            { email: 1 },
            { name: 'getEmail', collation: { locale: 'en', strength: 2 }, unique: true },
         )
         const searchIndex = this.viperCollection.createIndex(
            { username: 'text', name: 'text' },
            { name: 'search' },
         )

         await Promise.all([usernameIndex, emailIndex, searchIndex])
      } catch (error) {
         logError({ s: 'something' }, error)
         throw error
      }
   }

   async login(identifier: {
      field: 'email' | 'username'
      value: string
   }): Promise<WithId<ViperBasic & { password: string }> | null> {
      const { field, value } = identifier
      try {
         const viper = await this.viperCollection.findOne(
            {
               [field]: value,
            },
            {
               collation: { locale: 'en', strength: 2 },
               projection: { ...VIPER_BASIC_PROPS, password: 1 },
            },
         )

         return viper as WithId<ViperBasic & { password: string }> | null
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
                  contactInfo: {
                     phone: null,
                     address: '',
                  },
                  birthDate: {
                     day: '',
                     month: '',
                     year: '',
                  },
                  blogs: {
                     personal: [],
                     likes: [],
                     withReplies: [],
                  },
                  password: undefined,
                  image: image,
                  backgroundImage: '',
                  shopify: {
                     customerAccessToken: '',
                     customerId: '',
                  },
                  events: {
                     created: [],
                     collection: [],
                     likes: [],
                  },
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
         const viper: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               username,
            },
            {
               collation: { locale: 'en', strength: 2 },
               projection: VIPER_BASIC_PROPS,
            },
         )

         // if (!viper) throw new Error(`User not found or does not exist.`)

         return viper
      } catch (error: unknown) {
         throw error
      }
   }

   async getByEmail(email: string): Promise<WithId<ViperBasic> | null> {
      try {
         const viper: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               email,
            },
            {
               collation: { locale: 'en', strength: 2 },
               projection: VIPER_BASIC_PROPS,
            },
         )

         return viper
      } catch (error: unknown) {
         throw error
      }
   }

   // TODO: change to aggregate when we use mongo Atlas, so we can perform fuzzy find and recommendations
   //  https://www.youtube.com/watch?v=Z05rVI5mhzE
   async searchByUsernameOrName(username: string): Promise<WithId<ViperBasic>[]> {
      try {
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

         // This is only available on MongoAtlas, fuzzy search
         // .aggregate([
         //    {
         //       $search: {
         //          index: 'search',
         //          // compound: {
         //          // must: [
         //          //    {
         //          //       text: {
         //          //          query: username,
         //          //          path: ['username', 'email'],
         //          //          fuzzy: {},
         //          //       },
         //          //    },
         //          // ],
         //          // },
         //          text: {
         //             query: username,
         //             path: ['username', 'email'],
         //             fuzzy: {},
         //          },
         //       },
         //    },
         // ])
         // .toArray()

         return vipers as WithId<ViperBasic>[]
      } catch (error: unknown) {
         throw error
      }
   }

   async isPropAvailable(findQuery: {
      field: 'email' | 'username'
      value: string
   }): Promise<boolean> {
      try {
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

   async getBlogs(viperId: string): Promise<Blog[]> {
      try {
         // TODO: use cursor .next() hasNext() for pagination
         // change this to find?
         const viperBlogs: Blog[] = await this.viperCollection
            .aggregate<Blog>([
               {
                  $match: {
                     _id: new ObjectId(viperId),
                  },
               },
               {
                  $unwind: '$blogs',
               },
               { $unwind: '$blogs.personal' },
               {
                  $project: {
                     _id: 0,
                     'blogs.personal': 1,
                  },
                  // $project: {
                  //    _id: '$blogs.personal._id',
                  //    content: '$blogs.personal.content',
                  //    likes: '$blogs.personal.likes',
                  //    comments: '$blogs.personal.replies',
                  //    timestamp: '$blogs.personal.timestamp',
                  // },
               },

               { $sort: { timestamp: 1 } },
            ])
            .limit(15)
            .toArray()

         return viperBlogs
      } catch (error: unknown) {
         throw error
      }
   }

   async createBlog(viperId: string, comment: string): Promise<WithId<Pick<Viper, '_id'>> | null> {
      try {
         const newBlog: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
            },
            {
               $push: {
                  'blogs.personal': {
                     _id: new ObjectId(),
                     content: comment,
                     likes: [],
                     replies: [],
                     // rePosts: [],
                     timestamp: Date.now(),
                  },
               },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         // TODO: refactor the database, different collection for different issues
         // then refactor this stuff, the return of the func is viper | null and we are telling here not to be null
         // if (!newBlog) throw new Error(`User not found or does not exist.`)

         return newBlog
      } catch (error: unknown) {
         throw error
      }
   }

   async isBlogLiked(blogId: string, viperId: string, sessionId: string): Promise<boolean> {
      try {
         const isLiked: WithId<Viper> | null = await this.viperCollection.findOne({
            _id: new ObjectId(viperId),
            'blogs.personal': {
               $elemMatch: {
                  _id: new ObjectId(blogId),
                  'likes._id': new ObjectId(sessionId),
               },
            },

            projection: {
               _id: 'likes._id',
            },
         })
         return !!isLiked
      } catch (error: unknown) {
         throw error
      }
   }

   async toggleBlogLike(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      sessionId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>> {
      const operation: string = isLiked ? '$pull' : '$push'
      try {
         const toggleLike: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
               'blogs.personal._id': new ObjectId(blogId),
            },
            {
               [operation]: {
                  'blogs.personal.$.likes': { _id: new ObjectId(sessionId) },
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
               `No matching user or blog to  ${operation === '$push' ? 'like' : 'dislike'}`,
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
      sessionId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>> {
      // TODO: if it is our own Blog we should not push it to our feed since it will be already there
      // if(viperId === sessionId) return
      const operation: string = isLiked ? '$pull' : '$push'
      try {
         const toggleLikedBlog: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(sessionId),
            },
            {
               [operation]: {
                  'blogs.likes': {
                     _id: new ObjectId(blogId),
                     viperId: new ObjectId(viperId),
                  },
               },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         if (!toggleLikedBlog)
            throw new Error(
               `No matching user to ${operation === '$push' ? 'like' : 'dislike'} feed blog`,
            )

         return toggleLikedBlog
      } catch (error: unknown) {
         throw error
      }
   }

   async addBlogReply(
      blogId: string,
      viperId: string,
      sessionId: string,
      // change this to reply or content when the time comes
      comment: string,
   ): Promise<WithId<Pick<Viper, '_id'>>> {
      try {
         const newReply: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
               'blogs._id': new ObjectId(blogId),
            },
            {
               $push: {
                  'blogs.$.replies': {
                     _id: new ObjectId(),
                     viperId: new ObjectId(sessionId),
                     content: comment,
                     likes: [],
                     timestamp: Date.now(),
                  },
               },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         // same here, maybe return null and status: 404 ?
         if (!newReply) throw new Error(`No matching user or blog to add a reply`)

         return newReply
      } catch (error: unknown) {
         throw error
      }
   }

   async addWithReplyBlogToFeed(
      blogId: string,
      viperId: string,
      sessionId: string,
   ): Promise<WithId<Pick<Viper, '_id'>>> {
      try {
         // TODO: if the it is our own blog we should not push it to the feed
         // if(viperId === sessionId) return
         const addFeedBlog: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(sessionId),
            },
            {
               $push: {
                  'blogs.with_replies': {
                     _id: new ObjectId(blogId),
                     viperId: new ObjectId(viperId),
                  },
               },
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )

         if (!addFeedBlog) throw new Error(`No matching user to add blog to feed`)

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
