import { Comment, CreateEvent, EventProps, UpdateEvent } from './event'
import { WithId, InsertOneResult, DeleteResult } from 'mongodb'
interface EventCRUDRepository {
   getAll(): Promise<EventProps[]>
   getById(eventId: string): Promise<EventProps | null>
   getByCategory(
      category: string,
      sortParam: 'likes' | 'date' | 'creationDate',
   ): Promise<EventProps[]>
   create(event: CreateEvent): Promise<InsertOneResult<EventProps>>
   update(event: UpdateEvent): Promise<WithId<EventProps> | null>
   delete(eventId: string, eventImage: string): Promise<DeleteResult>
}

interface EventInteractionRepository {
   isLiked(eventId: string, viperId: string): Promise<boolean>
   toggleEventLike(
      isLiked: boolean,
      eventId: string,
      viperId: string,
   ): Promise<WithId<EventProps> | null>
   getComments(eventId: string): Promise<Comment[]>
   // we should fix this and instead of using aggregate to return an array we should match the commentId
   // ALSO the return value
   getCommentById(eventId: string, commentId: string): Promise<Comment | null>
   // Wonder if we need this, we use it to set the operation = "$push" | "$pull" is there a better approach?
   isCommentLiked(eventId: string, commentId: string, viperId: string): Promise<boolean>
   toggleLikeOnComment(
      isLiked: boolean,
      eventId: string,
      commentId: string,
      viperId: string,
   ): Promise<WithId<EventProps> | null>
   addComment(
      eventId: string,
      viperId: string,
      comment: string,
   ): Promise<WithId<EventProps> | null>
   getCommentReplies(eventId: string, commentId: string): Promise<Reply[]>
   // same in here that the previous function isCommentLiked
   isCommentReplyLiked(
      eventId: string,
      commentId: string,
      replyId: string,
      viperId: string,
   ): Promise<boolean>
   toggleLikeOnCommentReply(
      isLiked: boolean,
      eventId: string,
      commentId: string,
      replyId: string,
      viperId: string,
   ): Promise<WithId<EventProps> | null>
   addReplyToComment(
      eventId: string,
      commentId: string,
      viperId: string,
      comment: string,
   ): Promise<WithId<EventProps> | null>
}

interface EventParticipantRepository {
   isViperParticipant(eventId: string, viperId: string): Promise<boolean>
   // this from below is the claimCard function
   addParticipant(eventId: string, viperId: string): Promise<WithId<EventProps> | null>
}

export type EventRepositorySource = EventCRUDRepository &
   EventInteractionRepository &
   EventParticipantRepository
