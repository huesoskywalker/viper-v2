import { useCreateProfileStore } from '@/app/(auth)/i/flow/signup/_stores/create-profile-store'
import { EditViperFormValues } from './use-edit-viper-form'
import { deleteViperImageEndpoint } from '../_utils/delete-viper-image-endpoint'
import { useUploadThing } from '@/utils/uploadthing'
import updateProfileEndpoint from '@/app/_utils/viper/update-profile-endpoint'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const useSubmitEditViper = () => {
   const { images, removeImages } = useCreateProfileStore()

   const { startUpload } = useUploadThing('profile')

   const { update } = useSession()

   const { push } = useRouter()

   const handleOnSubmit = async (formData: EditViperFormValues) => {
      if (images.profile) {
         try {
            const deleteImage = deleteViperImageEndpoint('image')

            const uploadImage = startUpload(images.profile)

            const [deletedImage, uploadedImage] = await Promise.all([deleteImage, uploadImage])

            if (deletedImage.error) {
               throw new Error(deletedImage.error)
            }

            if (uploadedImage) {
               const image = uploadedImage.map((image) => image.url)
               formData.image = image[0]
            }

            removeImages('profile')
         } catch (error) {
            throw new Error(
               error instanceof Error ? error.message : 'Something went wrong. Please try again',
            )
         }
      }

      if (images.background) {
         try {
            const deleteImage = deleteViperImageEndpoint('backgroundImage')

            const uploadImage = startUpload(images.background)

            const [deletedImage, uploadedImage] = await Promise.all([deleteImage, uploadImage])

            if (deletedImage.error) {
               throw new Error(deletedImage.error)
            }

            if (uploadedImage) {
               const backgroundImage = uploadedImage.map((image) => image.url)
               formData.backgroundImage = backgroundImage[0]
            }

            removeImages('background')
         } catch (error) {
            throw new Error(
               error instanceof Error ? error.message : 'Something went wrong. Please try again.',
            )
         }
      }
      try {
         const { data } = await updateProfileEndpoint(formData)

         await Promise.all([
            update({
               backgroundImage: data.backgroundImage,
               image: data.image,
               name: data.name,
               bio: data.bio,
               location: data.location,
               website: data.website,
            }),
            push(`/${data.username}`, { scroll: false }),
         ])
      } catch (error) {
         throw new Error(
            error instanceof Error ? error.message : 'Something went wrong. Please try again.',
         )
      }
   }
   return { handleOnSubmit }
}

export default useSubmitEditViper
