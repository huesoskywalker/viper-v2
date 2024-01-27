import { manageEndpointSession } from '@/app/_utils/viper/manage-endpoint-session'
import { logError, logMongoError } from '@/config/winstonLogger'
import { viperService } from '@/services/servicesInitializer'
import { MongoError } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
   const { session, error, status } = await manageEndpointSession()

   if (!session) {
      return NextResponse.json({ error: error }, { status: status })
   }

   const searchParams = request.nextUrl.searchParams
   const search = searchParams.get('search')
   if (!search) {
      return NextResponse.json({ error: 'Username must be provided.' }, { status: 400 })
   }

   try {
      const data = await viperService.searchByUsernameOrName(search)

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      if (error instanceof MongoError) {
         logMongoError({ action: `Search username`, viperId: session.user._id }, error)
         return NextResponse.json(
            {
               error: `Internal server error: Unable to update the user. Please try again later.`,
            },
            { status: 500 },
         )
      } else {
         logError({ action: `Search username`, viperId: session.user._id }, error)
         return NextResponse.json(
            { error: `Failed to update the user. Please try again later.` },
            { status: 400 },
         )
      }
   }
}
