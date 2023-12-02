import { auth } from '@/lib/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
   // Define as many FileRoutes as you like, each with a unique routeSlug
   // Set permissions and file types for this FileRoute
   imageUploader: f({ image: { maxFileSize: '2MB' } })
      .middleware(async ({ req }) => {
         console.log(`----middleware core.ts`)
         // This code runs on your server before upload

         //  I'd like to add the middleware
         //   const user = await authMiddleware(req)
         const session = await auth()
         // If you throw, the user will not be able to upload
         if (!session) throw new Error('Unauthorized')

         // Whatever is returned here is accessible in onUploadComplete as `metadata`
         return { userId: session.user.id }
         //  return { success: true }
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
