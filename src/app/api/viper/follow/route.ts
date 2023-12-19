import { logError, logMongoError, winstonLogger } from '@/config/winstonLogger'
import { auth } from '@/lib/auth'
import { viperService } from '@/services/servicesInitializer'
import { MongoError } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (request: NextRequest) => {
   const session = await auth()
   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
   const { isFollowing, viperId } = await request.json()

   try {
      const followerRes = viperService.toggleFollower(isFollowing, viperId, session.user.id)
      const followingRes = viperService.toggleFollowing(isFollowing, viperId, session.user.id)

      const [toggleFollower, toggleFollowing] = await Promise.all([followerRes, followingRes])

      return NextResponse.json({ data: { toggleFollower, toggleFollowing } }, { status: 200 })
   } catch (error: unknown) {
      if (error instanceof MongoError) {
         logMongoError(
            {
               action: `${isFollowing === true ? 'dislike' : 'like'} follower/following`,
               viperId: viperId,
               currentViperId: session.user.id,
            },
            error,
         )

         return NextResponse.json(
            { error: `Internal server error: Unable to toggle follow. Please try again later.` },
            { status: 500 },
         )
      } else {
         logError(
            {
               action: `${isFollowing === true ? 'dislike' : 'like'} follower/following`,
               viperId: viperId,
               currentViperId: session.user.id,
            },
            error,
         )

         return NextResponse.json(
            {
               error: `Failed to toggle follower. Please try again later.`,
            },
            { status: 400 },
         )
      }
   }
}
