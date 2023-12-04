'use client'
import { useUploadThing } from '@/utils/uploadthing'
import { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { useCallback, useState } from 'react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { useUploadImagesStore } from '../(auth)/i/flow/signup/_stores/upload-images-store'

const useUploadImages = ({
   endpoint,
   type,
}: {
   endpoint: 'profileAvatar'
   type: 'profile' | 'background' | 'event'
}) => {
   const { images, setImages } = useUploadImagesStore()

   const [objectURL, setObjectURL] = useState<string | null>(null)

   const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
      console.log(acceptedFiles[0].size)
      setImages(acceptedFiles, type)
      setObjectURL(URL.createObjectURL(acceptedFiles[0]))
   }, [])

   const { isUploading, startUpload, permittedFileInfo } = useUploadThing(endpoint, {
      onClientUploadComplete: (res) => {
         res.forEach((file) => {
            console.log(`-onClientUploadComplete`)
            console.log({ file })
         })
      },
      onUploadError: (error) => {
         throw new Error(error.message)
      },
      onUploadBegin: (fileName) => {
         console.log(`onUploadBegin ${fileName}`)
         console.log(`----use upload images, onBegin`)
      },
      onUploadProgress: (progress) => {
         console.log(`progress ${progress}`)
      },
      onBeforeUploadBegin: (images) => {
         console.log(`---on beforeUploadBegin ${images}`)
         return images
      },
   })

   const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : []

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
   })

   return {
      images,
      objectURL,
      getRootProps,
      getInputProps,
      isDragActive,
      isUploading,
      startUpload,
   }
}

export default useUploadImages
