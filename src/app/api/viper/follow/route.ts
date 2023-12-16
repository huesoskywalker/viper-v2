import { winstonLogger } from '@/config/winstonLogger'
import { auth } from '@/lib/auth'
import { viperService } from '@/services/servicesInitializer'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (request: NextRequest) => {
   // check passing the request in here what happens
   const session = await auth()
   if (!session)
      return NextResponse.json(
         { error: 'User session not found, Please log in or try again later' },
         { status: 401 },
      )
   const { isFollowing, viperId } = await request.json()

   try {
      const followerRes = viperService.toggleFollower(isFollowing, viperId, session.user.id)
      const followingRes = viperService.toggleFollowing(isFollowing, viperId, session.user.id)

      const [toggleFollower, toggleFollowing] = await Promise.all([followerRes, followingRes])

      return NextResponse.json({ data: { toggleFollower, toggleFollowing } }, { status: 200 })
   } catch (error: any) {
      // TODO:  return a personalized error
      // TODO: need to return the error.message in all the return NextResponse
      winstonLogger.error('Toggle follow', {
         error: error.message,
      })
      return NextResponse.json({ error: error.message }, { status: 400 })
   }
}
