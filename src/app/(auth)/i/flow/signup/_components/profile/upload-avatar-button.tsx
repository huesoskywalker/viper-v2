import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useCreateProfileStore } from '../../_stores/create-profile-store'
import { CreateProfileSetValue } from '../../_hooks/profile/use-create-profile-form'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useUploadThing } from '@/utils/uploadthing'
import { cn } from '@/lib/utils'

const UploadAvatarButton = ({ setValue }: { setValue: CreateProfileSetValue }) => {
   const [uploadProgress, setUploadProgress] = useState<number>(0)

   const { images, removeImages } = useCreateProfileStore()

   const { nextStep } = useCreateAccountStore()

   const { isUploading, startUpload } = useUploadThing('profileAvatar', {
      onClientUploadComplete: (res) => {
         const uploadedImage = res.map((image) => image.url)

         setValue('image', uploadedImage[0])

         removeImages('profile')
      },
      onUploadError: (error) => {
         throw new Error(error.message)
      },
      onUploadProgress: (progress) => {
         setUploadProgress(progress)
      },
   })

   const handleUploadImage = async () => {
      if (images.profile) {
         await startUpload(images.profile)
      }
      nextStep()
   }

   const getButtonLabel = () => {
      if (isUploading) return 'Uploading...'
      if (!images.profile) return 'Skip for now'
      return 'Next'
   }

   return (
      <div>
         <Button
            className={cn('relative overflow-hidden')}
            variant={!images.profile ? 'outline' : 'default'}
            size={'lg'}
            onClick={handleUploadImage}
            disabled={isUploading}
         >
            {getButtonLabel()}
            <div
               className={cn(
                  'absolute left-0 top-0 -z-10 h-full w-0 bg-viper-dodger-blue transition-all duration-1000  ease-linear',
               )}
               style={{ width: `${uploadProgress}%` }}
            />
         </Button>
      </div>
   )
}

export default UploadAvatarButton
