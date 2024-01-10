import { determineUpdateProfileSchema } from '@/app/_utils/determine-update-profile-schema'
import { logError, logMongoError } from '@/config/winstonLogger'
import { auth } from '@/lib/auth'
import { viperService } from '@/services/servicesInitializer'
import { MongoError } from 'mongodb'
import { NextResponse } from 'next/server'

export const PATCH = auth(async (request) => {
   const session = request.auth

   if (!session)
      return NextResponse.json(
         { error: 'User session not found, Please log in or try again later' },
         { status: 401 },
      )

   const { formData } = await request.json()

   const formSchema = determineUpdateProfileSchema(formData)

   try {
      const data = await viperService.update({ field: '_id', value: session.user.id }, formSchema)

      if (!data)
         return NextResponse.json({
            error: 'Invalid request: Unable to update user. Please check your input and try again.',
            status: 422,
         })

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      if (error instanceof MongoError) {
         logMongoError({ action: `Update User`, viperId: session.user.id }, error)
         return NextResponse.json(
            {
               error: `Internal server error: Unable to update the user. Please try again later.`,
            },
            { status: 500 },
         )
      } else {
         logError({ action: `Update User`, viperId: session.user.id }, error)
         return NextResponse.json(
            { error: `Failed to update the user. Please try again later.` },
            { status: 400 },
         )
      }
   }
})
