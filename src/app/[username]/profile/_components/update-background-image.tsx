import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { FileWithPath } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useDropzone } from '@uploadthing/react/hooks'
import { useUploadThing } from '@/utils/uploadthing'
import { useCreateProfileStore } from '@/app/(auth)/i/flow/signup/_stores/create-profile-store'
import { resizeImage } from '@/app/_utils/resize-image'
import ViperBackgroundImage from '../../_components/viper-background-image'
import CameraEditIcon from '@/app/_components/form/camera-edit-icon'
import DragAndDropBorder from '@/app/_components/form/drag-and-drop-border'

const UpdateBackgroundImage = ({ imageSrc }: { imageSrc: string }) => {
   const { setImages } = useCreateProfileStore()

   const [objectURL, setObjectURL] = useState<string>(imageSrc)

   const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
      const resizedFiles = await Promise.all(
         // TODO: resize this for the dimensions of the background
         acceptedFiles.map((image) => resizeImage(image, { width: 700, height: 230 }, false)),
      )

      setObjectURL(URL.createObjectURL(resizedFiles[0]))

      setImages(resizedFiles, 'background')
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
            className={cn(`relative z-0 flex items-center justify-center overflow-hidden`)}
         >
            <DragAndDropBorder isDragActive={isDragActive} />
            <ViperBackgroundImage backgroundImage={objectURL} />
            <input {...getInputProps()} />
            <CameraEditIcon />
         </div>
      </>
   )
}

export default UpdateBackgroundImage
