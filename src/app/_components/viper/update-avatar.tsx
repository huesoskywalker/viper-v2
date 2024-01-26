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

const UpdateAvatar = ({ id, imageSrc }: { id: string; imageSrc: string }) => {
   const { setImages } = useCreateProfileStore()

   const [objectURL, setObjectURL] = useState<string>(imageSrc)

   const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
      const resizedFiles = await Promise.all(
         acceptedFiles.map((image) => resizeImage(image, { width: 200, height: 200 }, true)),
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
            id={id}
            {...getRootProps()}
            className={cn(
               ` relative z-0 flex items-center justify-center overflow-hidden  rounded-full object-contain`,
            )}
         >
            <DragAndDropBorder isDragActive={isDragActive} className="rounded-full" />
            <ViperImage image={objectURL} />
            <input {...getInputProps()} />
            <CameraEditIcon />
         </div>
      </>
   )
}

export default UpdateAvatar
