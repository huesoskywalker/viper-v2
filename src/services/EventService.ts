import { Comment, CreateEvent, EventProps, Reply, UpdateEvent } from '@/types/event'
import { EventRepositorySource } from '@/types/repository/event-repository'
import { DeleteResult, InsertOneResult, WithId } from 'mongodb'

export class EventService {
   private eventRepository: EventRepositorySource

   constructor(eventRepository: EventRepositorySource) {
      this.eventRepository = eventRepository
   }

   async getAll(): Promise<EventProps[]> {
      try {
         const events: EventProps[] = await this.eventRepository.getAll()
         return events
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to get events, ${error}`)
      }
   }

   async getById(eventId: string): Promise<EventProps | null> {
      try {
         const event: EventProps | null = await this.eventRepository.getById(eventId)
         return event
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to get event by _id, ${error}`)
      }
   }

   async getByCategory(category: string, sortBy?: 'likes' | 'date') {
      try {
         const sortParam: 'likes' | 'date' | 'creationDate' = sortBy ? sortBy : 'creationDate'
         const event: EventProps[] = await this.eventRepository.getByCategory(category, sortParam)
         return event
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to get events by category, ${error}`)
      }
   }

   async create(event: CreateEvent): Promise<InsertOneResult<EventProps>> {
      try {
         const newEventProps: InsertOneResult<EventProps> =
            await this.eventRepository.create(event)
         return newEventProps
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to create event, ${error}`)
      }
   }

   async update(event: UpdateEvent): Promise<WithId<EventProps> | null> {
      try {
         const updateEventProps: WithId<EventProps> | null =
            await this.eventRepository.update(event)
         return updateEventProps
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to update event, ${error}`)
      }
   }

   async delete(eventId: string, eventImage: string): Promise<DeleteResult> {
      try {
         const deleteEventProps: DeleteResult = await this.eventRepository.delete(
            eventId,
            eventImage,
         )
         return deleteEventProps
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to delete event, ${error}`)
      }
   }

   async isLiked(eventId: string, viperId: string): Promise<boolean> {
      try {
         const isLiked: boolean = await this.eventRepository.isLiked(eventId, viperId)
         return isLiked
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to check if event is liked, ${error}`)
      }
   }

   async toggleEventPropsLike(
      isLiked: boolean,
      eventId: string,
      viperId: string,
   ): Promise<WithId<EventProps> | null> {
      try {
         const toggleLike: WithId<EventProps> | null = await this.eventRepository.toggleEventLike(
            isLiked,
            eventId,
            viperId,
         )
         return toggleLike
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to toggle event like, ${error}`)
      }
   }

   async getComments(eventId: string): Promise<Comment[]> {
      try {
         const comments: Comment[] = await this.eventRepository.getComments(eventId)
         return comments
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to get event comment, ${error}`)
      }
   }

   async getCommentsById(eventId: string, commentId: string): Promise<Comment | null> {
      try {
         const comment: Comment | null = await this.eventRepository.getCommentById(
            eventId,
            commentId,
         )
         return comment
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to get comment by _id, ${error}`)
      }
   }

   async isCommentLiked(eventId: string, commentId: string, viperId: string): Promise<boolean> {
      try {
         const isLiked: boolean = await this.eventRepository.isCommentLiked(
            eventId,
            commentId,
            viperId,
         )
         return isLiked
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to check if comment is liked, ${error}`)
      }
   }

   async toggleLikeOnComment(
      isLiked: boolean,
      eventId: string,
      commentId: string,
      viperId: string,
   ): Promise<WithId<EventProps> | null> {
      try {
         // Should we transform the isLiked in here to the operation and pass the value?
         const toggleLike: WithId<EventProps> | null =
            await this.eventRepository.toggleLikeOnComment(isLiked, eventId, commentId, viperId)
         return toggleLike
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to toggle like on comment, ${error}`)
      }
   }

   async addComment(
      eventId: string,
      viperId: string,
      comment: string,
   ): Promise<WithId<EventProps> | null> {
      try {
         const newComment: WithId<EventProps> | null = await this.eventRepository.addComment(
            eventId,
            viperId,
            comment,
         )
         return newComment
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to add comment, ${error}`)
      }
   }

   async getCommentReplies(eventId: string, commentId: string): Promise<Reply[]> {
      try {
         const replies: Reply[] = await this.eventRepository.getCommentReplies(eventId, commentId)
         return replies
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to comment the reply, ${error}`)
      }
   }

   // we could change this name to isReplyLiked ?
   async isCommentReplyLiked(
      eventId: string,
      commentId: string,
      replyId: string,
      viperId: string,
   ): Promise<boolean> {
      try {
         const isLiked: boolean = await this.eventRepository.isCommentReplyLiked(
            eventId,
            commentId,
            replyId,
            viperId,
         )
         return isLiked
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to check if reply is liked, ${error}`)
      }
   }

   // should we change this to toggleLikeOnReply?
   async toggleLikeOnCommentReply(
      isLiked: boolean,
      eventId: string,
      commentId: string,
      replyId: string,
      viperId: string,
   ): Promise<WithId<EventProps> | null> {
      try {
         // we are projecting only the Id
         const toggleLike: WithId<EventProps> | null =
            await this.eventRepository.toggleLikeOnCommentReply(
               isLiked,
               eventId,
               commentId,
               replyId,
               viperId,
            )
         return toggleLike
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to toggle like on reply, ${error}`)
      }
   }

   // we could also change to addReply
   async addReplyToComment(
      eventId: string,
      commentId: string,
      viperId: string,
      comment: string,
   ): Promise<WithId<EventProps> | null> {
      try {
         const addReply: WithId<EventProps> | null = await this.eventRepository.addReplyToComment(
            eventId,
            commentId,
            viperId,
            comment,
         )
         return addReply
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to add reply to comment, ${error}`)
      }
   }

   async isViperParticipant(eventId: string, viperId: string): Promise<boolean> {
      try {
         const isParticipant: boolean = await this.eventRepository.isViperParticipant(
            eventId,
            viperId,
         )
         return isParticipant
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to check if Viper is Participating, ${error}`)
      }
   }

   async addParticipant(eventId: string, viperId: string): Promise<WithId<EventProps> | null> {
      try {
         const newParticipant: WithId<EventProps> | null =
            await this.eventRepository.addParticipant(eventId, viperId)
         return newParticipant
      } catch (error: unknown) {
         throw new Error(`Model Error: Failed to add Participant, ${error}`)
      }
   }
}
