import { mongoAdapter } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { isValidApiKey } from '../../signup/_utils/is-valid-api-key'
import { viperService } from '@/services/servicesInitializer'
import { MongoError } from 'mongodb'
import { logError, logMongoError } from '@/config/winstonLogger'

export async function GET(request: NextRequest) {
   const headers = request.headers
   const apiKey = headers.get('Api-Key')

   if (!isValidApiKey(apiKey)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

   const params = request.nextUrl.searchParams
   const email = params.get('email')
   const username = params.get('username')

   if (!email || !username)
      return NextResponse.json({ error: 'Field and value must be provided ' }, { status: 400 })

   try {
      const data = await viperService.matchEmailAndUsername(email, username)

      if (!data) return NextResponse.json({ error: 'Invalid. Please try again.' }, { status: 400 })

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      if (error instanceof MongoError) {
         logMongoError(
            {
               action: `Match email and username`,
               email: email,
               username: username,
            },
            error,
         )

         return NextResponse.json(
            {
               error: `Internal server error: Unable to match email and username. Please try again later.`,
            },
            { status: 500 },
         )
      } else {
         logError(
            {
               action: `Match email and username`,
               email: email,
               username: username,
            },
            error,
         )

         return NextResponse.json(
            {
               error: `Failed to match email and username`,
            },
            { status: 400 },
         )
      }
   }
}
