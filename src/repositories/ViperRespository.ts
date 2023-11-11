import {
   Blog,
   CreatedEvent,
   Email,
   EventCollection,
   Follow,
   Like,
   UpdateViper,
   Viper,
   ViperBasicProps,
} from '@/types/viper'
import { ViperRepositorySource } from '@/types/viper-repository'
import { Collection, Db, ObjectId, WithId } from 'mongodb'

export class ViperRepository implements ViperRepositorySource {
   private viperCollection: Collection<Viper>

   constructor(database: Db) {
      this.viperCollection = database.collection<Viper>('users')
   }

   async getAll(): Promise<WithId<Viper>[]> {
      try {
         const vipers: WithId<Viper>[] = await this.viperCollection.find({}).toArray()
         return vipers
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to retrieve Vipers, ${error}`)
      }
   }

   async getById(viperId: string): Promise<WithId<Viper> | null> {
      try {
         const viper: WithId<Viper> | null = await this.viperCollection.findOne({
            _id: new ObjectId(viperId),
         })
         return viper
      } catch (error: unknown) {
         // Add winston logger??? what do you think?
         throw new Error(`Repository Error: Failed to retrieve Viper by Id, ${error}`)
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
                  name: 1,
                  image: 1,
                  backgroundImage: 1,
                  email: 1,
                  location: 1,
                  bio: 1,
                  followers: 1,
                  follows: 1,
               },
            },
         )
         return viperBasicProps as Partial<Viper> as ViperBasicProps
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to retrieve Viper basic Props, ${error}`)
      }
   }

   async findByUsername(username: string): Promise<ViperBasicProps[]> {
      try {
         await this.viperCollection.createIndexes([
            {
               name: 'someNewIndex',
               key: { name: 'text' },
            },
         ])

         const vipers: Viper[] = await this.viperCollection
            .find<Viper>(
               {
                  $text: {
                     $search: username,
                  },
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
                     follows: 1,
                  },
               },
            )
            .toArray()

         return vipers as Partial<Viper>[] as ViperBasicProps[]
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to find Viper by Username, ${error}`)
      }
   }

   async findByEmail(email: string) {
      try {
         const viper: WithId<Partial<Viper>> | null = await this.viperCollection.findOne(
            {
               email: email,
            },
            {
               projection: {
                  _id: 0,
                  email: 1,
               },
            },
         )
         return viper as { email: Email }
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to find Viper by Email, ${error}`)
      }
   }

   async update(viper: UpdateViper): Promise<WithId<Viper> | null> {
      try {
         const { _id, name, bio, image, backgroundImage, location } = viper
         const updateProfile: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
            {
               _id: new ObjectId(_id as string),
            },
            {
               $set: {
                  name: name,
                  bio: bio,
                  image: image,
                  backgroundImage: backgroundImage,
                  location: location,
               },
            },
         )
         return updateProfile
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to update Viper, ${error}`)
      }
   }

   // We don't have a getFollowers?
   async getFollowings(viperId: string): Promise<Follow[]> {
      try {
         const viperFollowings: Follow[] = await this.viperCollection
            .aggregate<Follow>([
               {
                  $match: { _id: new ObjectId(viperId) },
               },
               {
                  $unwind: '$follows',
               },
               {
                  $project: {
                     _id: '$follows._id',
                  },
               },
            ])
            .toArray()
         return viperFollowings
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to retrieve Viper follows, ${error}`)
      }
   }

   async isViperFollowing(viperId: string, currentViperId: string): Promise<boolean> {
      try {
         const isFollowed: WithId<Viper> | null = await this.viperCollection.findOne(
            {
               _id: new ObjectId(viperId),
               'followers._id': new ObjectId(currentViperId),
            },
            {
               projection: {
                  _id: 1,
               },
            },
         )
         return isFollowed ? true : false
      } catch (error: unknown) {
         throw new Error(
            `Repository Error: Failed to check if Viper is already followed, ${error}`,
         )
      }
   }

   async toggleFollower(
      isFollowed: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null> {
      const operation: string = isFollowed ? '$pull' : '$push'
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
         )

         return toggleFollower
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to ${operation} Viper follower, ${error}`)
      }
   }

   async toggleFollowing(
      isFollowed: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null> {
      const operation: string = isFollowed ? '$pull' : '$push'
      try {
         const toggleCurrentFollow: Promise<WithId<Viper> | null> =
            this.viperCollection.findOneAndUpdate(
               {
                  _id: new ObjectId(currentViperId),
               },
               {
                  [operation]: {
                     follows: { _id: new ObjectId(viperId) },
                  },
               },
            )
         return toggleCurrentFollow
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to ${operation} current Follow, ${error}`)
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
         throw new Error(`Repository Error: Failed to retrieve Blogs, ${error}`)
      }
   }

   async createBlog(viperId: string, comment: string): Promise<WithId<Viper> | null> {
      try {
         const blogContent: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
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
         return blogContent
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to create blog, ${error}`)
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
         return isLiked ? true : false
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to check if Blog is already liked, ${error}`)
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

         return toggleLike
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to ${operation} blog like , ${error}`)
      }
   }

   async toggleFeedBlogLike(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null> {
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
         return toggleLikedBlog
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to ${operation} liked blog, ${error}`)
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
         const reply: WithId<Viper> | null = await this.viperCollection.findOneAndUpdate(
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

         return reply
      } catch (error: unknown) {
         // we should manage to split the errors based on the request
         throw new Error(`Repository Error: Failed to add comment to blog, ${error}`)
      }
   }

   async addWithReplyBlogToFeed(
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null> {
      try {
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
         return addFeedBlog
      } catch (error: unknown) {
         throw new Error(`Repository Error:Failed to add commented blog into feed, ${error}`)
      }
   }

   async toggleLikedEvent(
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
         return toggleLike
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to ${operation} Liked Event, ${error}`)
      }
   }

   async getLikedEvents(viperId: string): Promise<Like[]> {
      try {
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
            .toArray()
         return likedEvents
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to retrieve liked Events, ${error}`)
      }
   }

   async getEventsCollection(viperId: string): Promise<EventCollection[]> {
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
            .toArray()

         return events
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to retrieve Event Collection, ${error}`)
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
         return isParticipationRequested ? true : false
      } catch (error: unknown) {
         throw new Error(
            `Repository Error: Failed to check if participation is requested, ${error}`,
         )
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
         return requestParticipation
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to request participation, ${error}`)
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
         return createdEvent
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to add created event, ${error}`)
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
         return deletedEvent
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to remove created event, ${error}`)
      }
   }

   async getCreatedEvents(viperId: string): Promise<CreatedEvent[]> {
      try {
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
            .toArray()
         return createdEvents
      } catch (error: unknown) {
         throw new Error(`Repository Error: Failed to retrieve Created Events, ${error}`)
      }
   }
}
