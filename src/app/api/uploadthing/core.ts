import { winstonLogger } from '@/config/winstonLogger'
import { auth } from '@/lib/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
   profileAvatar: f({ image: { maxFileSize: '2MB', maxFileCount: 1 } })
      // .input(
      // this is to z.validate a schema and pass it to the middleware
      // )
      .middleware(async ({ req }) => {
         //  I'd like to add the middleware
         //   const user = await authMiddleware(req)
         const session = await auth()
         if (!session) throw new Error('Unauthorized')

         // Whatever is returned here is accessible in onUploadComplete as `metadata`
         return { userId: session.user.id }
      })
      .onUploadError(async ({ error, fileKey }) => {
         winstonLogger.error('Image upload error', {
            file: fileKey,
            name: error.name,
            code: error.code,
            message: error.message,
            cause: error.cause,
            stack: error.stack,
            data: error.data,
         })
         throw new Error(error.message)
      })
      .onUploadComplete(async ({ metadata, file }) => {
         console.log(`----onUploadComplete core.ts`)
         // This code RUNS ON YOUR SERVER after upload
         console.log('Upload complete for userId:', metadata.userId)

         console.log('file url', file.url)

         // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
         return { uploadedBy: metadata.userId }
      }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
