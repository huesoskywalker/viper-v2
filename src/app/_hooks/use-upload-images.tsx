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
   endpoint: 'imageUploader'
   type: 'profile' | 'background' | 'event'
}) => {
   const { images, setImages } = useUploadImagesStore()

   const [createObjectURL, setCreateObjectURL] = useState<string | null>(null)

   const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
      setImages(acceptedFiles, type)
      setCreateObjectURL(URL.createObjectURL(acceptedFiles[0]))
   }, [])

   const { startUpload, permittedFileInfo } = useUploadThing(endpoint, {
      onClientUploadComplete: () => {
         console.log(`----use upload images, onClientUploadComplete`)
         alert('uploaded successfully!')
      },
      onUploadError: () => {
         console.log(`----use upload images, onError`)
         alert('error occurred while uploading')
      },
      onUploadBegin: () => {
         console.log(`----use upload images, onBegin`)
         alert('upload has begun')
      },
      onUploadProgress: () => {},
   })
   // const { permittedFileInfo } = useUploadThing(endpoint)

   const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : []

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
   })

   return { images, createObjectURL, getRootProps, getInputProps, isDragActive, startUpload }
}

export default useUploadImages
