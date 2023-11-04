interface ViperCRUDRepository {
   getAll(): Promise<WithId<Viper>[]>
   getById(viperId: string): Promise<WithId<Viper> | null>
   getBasicProps(viperId: string): Promise<WithId<ViperBasicProps> | null>
   // This is one below is built for the search input
   findByUsername(username: string): Promise<ViperBasicProps[]>
   update(viper: UpdateViper): Promise<WithId<Viper> | null>
}

interface ViperFollowRepository {
   // ====================================================
   // should we add getFollowers? check if the function already
   // getFollowers(viperId: string): Promise<Follow[]>
   // =========================================
   getFollows(viperId: string): Promise<Follow[]>
   isViperFollowed(viperId: string, currentViperId: string): Promise<boolean>
   toggleFollower(
      isFollowed: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null>
   toggleFollow(
      isFollowed: boolean,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null>
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
   toggleFeedLikedBlog(
      isLiked: boolean,
      blogId: string,
      viperId: string,
      currentViperId: string,
   ): Promise<WithId<Viper> | null>
   addBlogComment(
      blogId: string,
      viperId: string,
      currentViperId: string,
      comment: string,
   ): Promise<WithId<Viper> | null>
   addFeedCommentedBlog(
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
   getEventsCollection(viperId: string): Promise<Collection[]>
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
