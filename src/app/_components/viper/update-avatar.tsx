import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { FileWithPath } from '@uploadthing/react'
import { resizeImage } from '../../_utils/resize-image'
import { useCreateProfileStore } from '../../(auth)/i/flow/signup/_stores/create-profile-store'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useDropzone } from '@uploadthing/react/hooks'
import { useUploadThing } from '@/utils/uploadthing'
import ViperImage from '@/app/[username]/_components/viper-image'
import CameraEditIcon from '../form/camera-edit-icon'
import DragAndDropBorder from '../form/drag-and-drop-border'

const UpdateAvatar = ({ imageSrc }: { imageSrc: string }) => {
   const { setImages } = useCreateProfileStore()

   const [objectURL, setObjectURL] = useState<string>(imageSrc)

   const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
      const resizedFiles = await Promise.all(
         acceptedFiles.map((image) => resizeImage(image, { width: 200, height: 200 })),
      )

      setObjectURL(URL.createObjectURL(resizedFiles[0]))

      setImages(resizedFiles, 'profile')
   }, [])

   const { permittedFileInfo } = useUploadThing('profile')

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
            <DragAndDropBorder isDragActive={isDragActive} />
            <ViperImage image={objectURL} />
            <input {...getInputProps()} />
            <CameraEditIcon />
         </div>
      </>
   )
}

export default UpdateAvatar
