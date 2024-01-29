export type PreloadViperServiceSource = {
   getByUsername(username: string): void
   getById(viperId: string): void
   isFollowing(viperId: string, sessionId: string): void
}
