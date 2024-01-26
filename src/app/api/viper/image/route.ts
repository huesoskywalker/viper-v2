import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { UploadFileResponse } from 'uploadthing/client'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function DELETE(request: NextRequest) {
   const session = await auth()
   if (!session) return
   try {
      const image = session.user.image

      if (image.startsWith('/default-user.png')) {
         return NextResponse.json({ data: 'Default user image' }, { status: 200 })
      }

      const imageUrl = new URL(image)
      if (imageUrl.hostname !== 'utfs.io') {
         return NextResponse.json({ data: 'Image is from another provider' }, { status: 200 })
      }

      const deletedFiles = await utapi.deleteFiles([image])

      return NextResponse.json({ data: deletedFiles }, { status: 200 })
   } catch (error: unknown) {
      return NextResponse.json(
         { error: "Something wen't wrong. Please try again." },
         { status: 401 },
      )
   }
}
