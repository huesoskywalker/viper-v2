'use client'
import React, { useEffect } from 'react'
import { EditViperFormValues, useEditViperForm } from '../_hooks/use-edit-viper-form'
import DialogForm from '@/app/_components/form/dialog-form'
import EditViperFormHeader from './edit-viper-form-header'
import EditViperFormBody from './edit-viper-form-body'
import { useCreateProfileStore } from '@/app/(auth)/i/flow/signup/_stores/create-profile-store'
import updateProfileEndpoint from '@/app/_utils/viper/update-profile-endpoint'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/utils/uploadthing'
import { deleteViperImageEndpoint } from '../_utils/delete-viper-image-endpoint'

const EditViperForm = () => {
   const { push } = useRouter()
   const { update } = useSession()

   const { editViperForm } = useEditViperForm()

   const { control } = editViperForm
   const { _updateValid } = control

   const { images, removeImages } = useCreateProfileStore()

   useEffect(() => {
      _updateValid(true)
   }, [_updateValid])

   const { startUpload } = useUploadThing('profile')

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
            push(`/${data.username}`),
         ])
      } catch (error) {
         throw new Error(
            error instanceof Error ? error.message : 'Something went wrong. Please try again.',
         )
      }
   }

   return (
      <DialogForm formReturn={editViperForm} handleSubmit={handleOnSubmit}>
         <EditViperFormHeader />
         <div className="relative flex h-full w-full flex-col items-center justify-start overflow-y-scroll">
            <EditViperFormBody />
         </div>
      </DialogForm>
   )
}

export default EditViperForm
