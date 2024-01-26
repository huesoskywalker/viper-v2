'use client'
import React, { useEffect } from 'react'
import { EditViperFormValues, useEditViperForm } from '../_hooks/use-edit-viper-form'
import DialogForm from '@/app/_components/form/dialog-form'
import EditViperFormHeader from './edit-viper-form-header'
import EditViperFormBody from './edit-viper-form-body'
import { PUBLIC_API_URL } from '@/config/env'
import { useCreateProfileStore } from '@/app/(auth)/i/flow/signup/_stores/create-profile-store'
import updateProfileEndpoint from '@/app/_utils/viper/update-profile-endpoint'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useUploadThing } from '@/utils/uploadthing'

const EditViperForm = () => {
   const { push } = useRouter()
   // const { update } = useSession()

   const { editViperForm } = useEditViperForm()

   //    const {  control } = editViperForm

   const { images, removeImages } = useCreateProfileStore()

   //    useEffect(() => {
   //       control._updateValid(true)
   //    }, [])

   const { startUpload } = useUploadThing('profile')

   const handleOnSubmit = async (formData: EditViperFormValues) => {
      try {
         if (images.profile) {
            const deleteImage = fetch(`${PUBLIC_API_URL}/api/viper/image`, {
               headers: {
                  'Content-Type': 'application/json',
               },
               method: 'DELETE',
            })

            const uploadImage = startUpload(images.profile)

            const [deletedImage, uploadedImage] = await Promise.all([deleteImage, uploadImage])

            const { data: deletedData, error: deletedError } = await deletedImage.json()

            if (!deletedImage.ok) {
               throw new Error(deletedError)
            }

            if (uploadedImage) {
               const image = uploadedImage.map((image) => image.url)
               formData.image = image[0]
            }
            removeImages('profile')
         }

         const { data } = await updateProfileEndpoint(formData)
         push('/home')
         //  await Promise.all([
         //     //
         //  ])
      } catch (error: unknown) {}
      // TODO: use viper update endpoint modify it and move it it corresponding folder
      console.log(`submitting edit profile`)
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
