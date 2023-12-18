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
import { Collection, Db, ObjectId, WithId } from 'mongodb'
import bcrypt from 'bcrypt'

export class ViperRepository implements ViperRepositorySource {
   private viperCollection: Collection<Viper>

   constructor(database: Db) {
      this.viperCollection = database.collection<Viper>('users')
   }

   async login(username: string, password: string): Promise<WithId<ViperBasicProps> | null> {
      try {
         const viper = await this.viperCollection.findOne(
            {
               username,
            },
            {
               collation: { locale: 'en', strength: 2 },
               projection: {
                  _id: 1,
                  location: 1,
                  bio: 1,
                  email: 1,
                  username: 1,
                  password: 1,
                  name: 1,
                  image: 1,
                  backgroundImage: 1,
                  followers: 1,
                  followings: 1,
               },
            },
         )

         if (!viper || !viper.password)
            // throw new Error(`Invalid username or password. Please try again.`)
            // TODO: check this for the login form if error or null for the form validation
            return null

         const { password: viperPassword, ...restViper } = viper
         const isPasswordMatch = await bcrypt.compare(password, viperPassword)

         // TODO: check this for the login form
         // if (!isPasswordMatch) throw new Error(`Wrong password. Please try again.`)
         // return restViper
         return isPasswordMatch ? restViper : null
      } catch (error: unknown) {
         throw error
         // throw new Error(
         //    `Repository Error: Failed to login viper with username '${username}'. ${error}`,
         // )
      }
   }

   async populateNewViper(
      _id: _ID,
      name: string | undefined,
      email: string,
      image: string | undefined,
      emailVerified: Date | null,
      username: string | undefined,
   ): Promise<WithId<Viper> | null> {
      try {
         const newViper = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(_id),
            },
            {
               $set: {
                  location: '',
                  contactInfo: {
                     phone: null,
                     address: '',
                     website: '',
                  },
                  bio: '',
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
                  emailVerified: emailVerified,
                  email: email,
                  username: username,
                  password: undefined,
                  name: name,
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
                  followings: [],
                  contentDiscovery: true,
                  createdAt: new Date(),
               },
            },
         )
         if (!newViper) throw new Error(`No matching user`)

         return newViper
      } catch (error: unknown) {
         throw error
      }
   }

   async update(
      findQuery: { field: '_id' | 'email'; value: string },
      updateProps: UpdateViper,
   ): Promise<WithId<Viper> | null> {
      const findBy =
         findQuery.field === '_id'
            ? { [findQuery.field]: new ObjectId(findQuery.value) }
            : { [findQuery.field]: findQuery.value }

      if (!findBy) throw new Error(`Missing find query`)

      try {
         const updateProfile: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            findBy,
            {
               $set: updateProps,
            },
            // { returnDocument: 'after' },
         )

         if (!updateProfile) throw Error(`No matching user to update`)

         return updateProfile
      } catch (error: unknown) {
         throw error
      }
   }

   async getAll(): Promise<WithId<Viper>[]> {
      try {
         // TODO: use cursor with .next() and hasNext() for pagination
         const vipers: WithId<Viper>[] = await this.viperCollection.find({}).limit(20).toArray()
         return vipers
      } catch (error: unknown) {
         throw error
      }
   }

   async getAllBasicProps(): Promise<WithId<ViperBasicProps>[]> {
      try {
         // TODO: use cursor with .next() and hasNext() for pagination
         const vipers: WithId<Viper>[] = await this.viperCollection
            .find(
               {},
               {
                  projection: {
                     _id: 1,
                     location: 1,
                     bio: 1,
                     email: 1,
                     username: 1,
                     name: 1,
                     image: 1,
                     backgroundImage: 1,
                     followers: 1,
                     followings: 1,
                  },
               },
            )
            .limit(20)
            .toArray()

         return vipers as WithId<ViperBasicProps>[]
      } catch (error) {
         throw error
      }
   }

   async getById(viperId: string): Promise<WithId<Viper> | null> {
      try {
         const viper: WithId<Viper> | null = await this.viperCollection.findOne({
            _id: new ObjectId(viperId),
         })

         if (!viper) throw new Error(`No matching user`)

         return viper
      } catch (error: unknown) {
         // TODO: WinstonLogger in the repository and service or route?
         throw error
         // throw new Error(`Repository Error: Failed to retrieve Viper by Id, ${error}`)
      }
   }

   async getBasicProps(viperId: string): Promise<WithId<ViperBasicProps> | null> {
      try {
         const viperBasicProps: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               _id: new ObjectId(viperId),
            },
            {
               projection: {
                  _id: 1,
                  location: 1,
                  bio: 1,
                  email: 1,
                  username: 1,
                  name: 1,
                  image: 1,
                  backgroundImage: 1,
                  followers: 1,
                  followings: 1,
               },
            },
         )

         if (!viperBasicProps) throw new Error(`No matching user`)

         return viperBasicProps as WithId<ViperBasicProps>
      } catch (error: unknown) {
         throw error
      }
   }

   async findByUsername(username: string): Promise<WithId<ViperBasicProps>[]> {
      try {
         // TODO: if works, create the index in the repository at init time
         await this.viperCollection.createIndex(
            { username: 1 },
            { name: 'searchUsername', collation: { locale: 'en', strength: 2 }, unique: true },
         )

         const vipers: Viper[] = await this.viperCollection
            .find<Viper>(
               {
                  username: username,
               },
               {
                  projection: {
                     _id: 1,
                     name: 1,
                     image: 1,
                     backgroundImage: 1,
                     email: 1,
                     location: 1,
                     bio: 1,
                     followers: 1,
                     followings: 1,
                  },
               },
            )
            .collation({ locale: 'en', strength: 2 })
            .toArray()

         return vipers as WithId<ViperBasicProps>[]
      } catch (error: unknown) {
         throw error
      }
   }

   async isPropAvailable(findQuery: {
      field: 'email' | 'username'
      value: string
   }): Promise<boolean> {
      try {
         // TODO: if works, create the index in the repository at init time
         await this.viperCollection.createIndex(
            { email: 1 },
            { name: 'searchEmail', collation: { locale: 'en', strength: 2 }, unique: true },
         )
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

   async isFollowing(viperId: string, currentViperId: string): Promise<boolean> {
      try {
         const isFollowing: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               _id: new ObjectId(currentViperId),
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
      isFollowing: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<Pick<WithId<Viper>, '_id'> | null> {
      const operation: string = isFollowing ? '$pull' : '$push'
      try {
         const toggleFollower: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
            },
            {
               [operation]: {
                  followers: { _id: new ObjectId(currentViperId) },
               },
            },
            {
               projection: {
                  _id: 1,
                  // followers: 1,
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
      isFollowing: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<Pick<WithId<Viper>, '_id'> | null> {
      const operation: string = isFollowing ? '$pull' : '$push'
      try {
         const toggleFollowing: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(currentViperId),
            },
            {
               [operation]: {
                  followings: { _id: new ObjectId(viperId) },
               },
            },
            {
               projection: {
                  _id: 1,
                  // followings: 1,
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
                     _id: '$blogs.personal._id',
                     content: '$blogs.personal.content',
                     likes: '$blogs.personal.likes',
                     comments: '$blogs.personal.replies',
                     timestamp: '$blogs.personal.timestamp',
                  },
               },

               { $sort: { timestamp: 1 } },
            ])
            .toArray()

         return viperBlogs
      } catch (error: unknown) {
         throw error
      }
   }

   async createBlog(viperId: string, comment: string): Promise<WithId<Viper> | null> {
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
         )

         if (!newBlog) throw new Error(`No matching user`)

         return newBlog
      } catch (error: unknown) {
         throw error
      }
   }

   async isBlogLiked(blogId: string, viperId: string, currentViperId: string): Promise<boolean> {
      try {
         const isLiked: WithId<Viper> | null = await this.viperCollection.findOne({
            _id: new ObjectId(viperId),
            'blogs.personal': {
               $elemMatch: {
                  _id: new ObjectId(blogId),
                  'likes._id': new ObjectId(currentViperId),
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
      currentViperId: string,
   ): Promise<WithId<Viper> | null> {
      const operation: string = isLiked ? '$pull' : '$push'
      try {
         const toggleLike: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(viperId),
               'blogs.personal._id': new ObjectId(blogId),
            },
            {
               [operation]: {
                  'blogs.personal.$.likes': { _id: new ObjectId(currentViperId) },
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
      currentViperId: string,
   ): Promise<WithId<Viper> | null> {
      // TODO: if it is our own Blog we should not push it to our feed since it will be already there
      // if(viperId === currentViperId) return
      const operation: string = isLiked ? '$pull' : '$push'
      try {
         const toggleLikedBlog: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(currentViperId),
            },
            {
               [operation]: {
                  'blogs.likes': {
                     _id: new ObjectId(blogId),
                     viperId: new ObjectId(viperId),
                  },
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
      currentViperId: string,
      // change this to reply or content when the time comes
      comment: string,
   ): Promise<WithId<Viper> | null> {
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
                     viperId: new ObjectId(currentViperId),
                     content: comment,
                     likes: [],
                     timestamp: Date.now(),
                  },
               },
            },
         )

         if (!newReply) throw new Error(`No matching user or blog to add a reply`)

         return newReply
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
         // TODO: if the it is our own blog we should not push it to the feed
         // if(viperId === currentViperId) return
         const addFeedBlog: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(currentViperId),
            },
            {
               $push: {
                  'blogs.with_replies': {
                     _id: new ObjectId(blogId),
                     viperId: new ObjectId(viperId),
                  },
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
   ): Promise<WithId<Viper> | null> {
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
               // check if needed the last document
               // {
               //     returnDocument: "after"
               // }
            )

         if (!requestParticipation)
            throw new Error(`No matching user to request event participation`)

         return requestParticipation
      } catch (error: unknown) {
         throw error
      }
   }

   async addCreatedEvent(viperId: string, eventId: string): Promise<WithId<Viper> | null> {
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
         )

         if (!createdEvent) throw new Error(`No matching user to add the created event to feed`)

         return createdEvent
      } catch (error: unknown) {
         throw error
      }
   }

   async removeCreatedEvent(viperId: string, eventId: string): Promise<WithId<Viper> | null> {
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
