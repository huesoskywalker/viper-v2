import useUploadImages from '@/app/_hooks/use-upload-images'
import { Button } from '@/components/ui/button'
import React from 'react'

const UploadAvatarButton = () => {
   const { images, startUpload } = useUploadImages({ endpoint: 'profileAvatar', type: 'profile' })

   const handleThis = async () => {
      if (images.profile) {
         await startUpload(images.profile)
      }
   }
   return (
      <div>
         <Button
            variant={!images.profile ? 'outline' : 'default'}
            size={'lg'}
            onClick={handleThis}
         >
            {' '}
            {!images.profile ? 'Skip now' : 'Next'}
         </Button>
      </div>
   )
}

export default UploadAvatarButton
