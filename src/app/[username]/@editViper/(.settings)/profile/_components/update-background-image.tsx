'use client'
import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { FileWithPath } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useDropzone } from '@uploadthing/react/hooks'
import { useUploadThing } from '@/utils/uploadthing'
import { useCreateProfileStore } from '@/app/(auth)/i/flow/signup/_stores/create-profile-store'
import { resizeImage } from '@/app/_utils/resize-image'
import CameraEditIcon from '@/app/_components/form/camera-edit-icon'
import ViperBackgroundImage from '@/app/[username]/_components/viper-background-image'
import dynamic from 'next/dynamic'

const DragAndDropBorder = dynamic(() => import('@/app/_components/form/drag-and-drop-border'))

const UpdateBackgroundImage = ({ id, imageSrc }: { id: string; imageSrc: string }) => {
   const { setImages } = useCreateProfileStore()

   const [objectURL, setObjectURL] = useState<string>(imageSrc)

   const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
      const resizedFiles = await Promise.all(
         acceptedFiles.map((image) => resizeImage(image, { width: 800, height: 200 }, false)),
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
            id={id}
            className={cn(`relative z-0 flex items-center justify-center overflow-hidden`)}
         >
            {isDragActive && <DragAndDropBorder />}
            <ViperBackgroundImage backgroundImage={objectURL} />
            <input {...getInputProps()} />
            <CameraEditIcon />
         </div>
      </>
   )
}

export default UpdateBackgroundImage
