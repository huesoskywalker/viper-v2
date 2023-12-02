import useUploadImages from '@/app/_hooks/use-upload-images'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'

const ProfilePictureUpload = () => {
   const { images, startUpload } = useUploadImages({ endpoint: 'imageUploader', type: 'profile' })
   const handleThis = async () => {
      //   await signIn('credentials', { username: 'agustinbigoni', password: 'heyho' })
      console.log({ images })
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

export default ProfilePictureUpload
