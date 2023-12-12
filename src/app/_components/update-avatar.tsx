import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Camera } from 'lucide-react'
import { useCallback, useState } from 'react'
import { FileWithPath } from '@uploadthing/react'
import { resizeImage } from '../_utils/resize-image'
import { useUploadImagesStore } from '../(auth)/i/flow/signup/_stores/upload-images-store'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useDropzone } from '@uploadthing/react/hooks'
import { useUploadThing } from '@/utils/uploadthing'

const UpdateAvatar = ({ id }: { id: string }) => {
   const { setImages } = useUploadImagesStore()

   const [objectURL, setObjectURL] = useState<string | null>(null)

   const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
      const resizedFiles = await Promise.all(
         acceptedFiles.map((image) => resizeImage(image, { width: 200, height: 200 })),
      )

      setObjectURL(URL.createObjectURL(resizedFiles[0]))

      setImages(resizedFiles, 'profile')
   }, [])

   const { permittedFileInfo } = useUploadThing('profileAvatar')

   const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : []

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
   })

   return (
      <>
         <div
            {...getRootProps()}
            className={cn(
               ` relative z-0 flex h-36 w-36 items-center justify-center  overflow-hidden rounded-full border-2 border-white`,
            )}
         >
            <div
               className={cn(
                  isDragActive &&
                     `absolute inset-0 z-30 h-full w-full rounded-full border-4 border-dashed border-viper-blue`,
               )}
            />
            <Avatar className="h-full w-full">
               <AvatarImage
                  width={150}
                  height={150}
                  className="object-cover"
                  src={objectURL ?? '/default-user.png'}
                  alt="Profile preview"
               />
               <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <input {...getInputProps()} id={id} />
            <div className=" absolute z-10 flex cursor-pointer items-center justify-center rounded-full  bg-black/50 p-[1.35rem] duration-300 ease-in-out hover:bg-black/30">
               <Camera className="absolute z-20 text-gray-300" size={27} strokeWidth={1.5} />
            </div>
         </div>
      </>
   )
}

export default UpdateAvatar
