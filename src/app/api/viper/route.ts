import { CreateProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { logError, logMongoError } from '@/config/winstonLogger'
import { auth } from '@/lib/auth'
import { viperService } from '@/services/servicesInitializer'
import { MongoError } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
   const session = await auth()
   if (!session)
      return NextResponse.json(
         { error: 'User session not found, Please log in or try again later' },
         { status: 401 },
      )

   const { formData }: { formData: CreateProfileFormValues } = await request.json()

   try {
      const data = await viperService.update({ field: '_id', value: session.user.id }, formData)

      if (!data)
         return NextResponse.json({ error: 'User not found or does not exist' }, { status: 404 })

      return NextResponse.json({ data }, { status: 200 })
   } catch (error) {
      if (error instanceof MongoError) {
         logMongoError({ action: `Update User`, viperId: session.user.id }, error)
         return NextResponse.json(
            { error: `Internal server error: Unable to update the user. Please try again later.` },
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
}
