import { manageEndpointSession } from '@/app/_utils/viper/manage-endpoint-session'
import { logError, logMongoError } from '@/config/winstonLogger'
import { viperService } from '@/services/servicesInitializer'
import { MongoError } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
   const { session, error, status } = await manageEndpointSession()

   if (!session) {
      return NextResponse.json({ error: error }, { status: status })
   }

   const { isFollowing, viperId } = await request.json()

   try {
      await viperService.toggleFollow(isFollowing, viperId, session.user._id)

      return NextResponse.json({ status: 204 })
   } catch (error: unknown) {
      if (error instanceof MongoError) {
         logMongoError(
            {
               action: `${isFollowing === true ? 'dislike' : 'like'} follow`,
               viperId: viperId,
               currentViperId: session.user._id,
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
               currentViperId: session.user._id,
            },
            error,
         )

         return NextResponse.json(
            {
               error: `Failed to toggle follow. Please try again later.`,
            },
            { status: 400 },
         )
      }
   }
}
