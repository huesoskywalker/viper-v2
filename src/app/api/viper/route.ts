import { determineUpdateProfileSchema } from '@/app/_utils/determine-update-profile-schema'
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

   const { formData } = await request.json()

   const formSchema = determineUpdateProfileSchema(formData)

   try {
      const data = await viperService.update({ field: '_id', value: session.user._id }, formSchema)

      if (!data)
         return NextResponse.json({
            error: 'Invalid request: Unable to update user. Please check your input and try again.',
            status: 422,
         })

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      if (error instanceof MongoError) {
         logMongoError({ action: `Update User`, viperId: session.user._id }, error)
         return NextResponse.json(
            {
               error: `Internal server error: Unable to update the user. Please try again later.`,
            },
            { status: 500 },
         )
      } else {
         logError({ action: `Update User`, viperId: session.user._id }, error)
         return NextResponse.json(
            { error: `Failed to update the user. Please try again later.` },
            { status: 400 },
         )
      }
   }
}
