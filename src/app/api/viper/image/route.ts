import { manageEndpointSession } from '@/app/_utils/viper/manage-endpoint-session'
import { logError } from '@/config/winstonLogger'
import { NextRequest, NextResponse } from 'next/server'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function DELETE(request: NextRequest) {
   const { session, error, status } = await manageEndpointSession()

   if (!session) {
      return NextResponse.json({ error: error }, { status: status })
   }

   const params = request.nextUrl.searchParams
   const field = params.get('field')
   if (!field || (field !== 'image' && field !== 'backgroundImage')) {
      return NextResponse.json({ error: 'Image Field must be provided' }, { status: 400 })
   }

   try {
      const image = session.user[field]

      if (!image) {
         return NextResponse.json({ data: 'There is no image to delete' }, { status: 200 })
      }

      if (image.startsWith('/default-user.png')) {
         return NextResponse.json({ data: 'Default user image' }, { status: 200 })
      }

      const imageUrl = new URL(image)

      if (imageUrl.hostname !== 'utfs.io') {
         return NextResponse.json({ data: 'Image is from another provider' }, { status: 200 })
      }
      const fileKey = imageUrl.pathname.substring('/f/'.length)

      const deletedFiles = await utapi.deleteFiles([fileKey])

      return NextResponse.json({ data: deletedFiles }, { status: 200 })
   } catch (error: unknown) {
      logError(
         {
            action: `Delete image on UT`,
            _id: session.user._id,
         },
         error,
      )
      return NextResponse.json(
         { error: 'Something went wrong. Please try again.' },
         { status: 401 },
      )
   }
}
