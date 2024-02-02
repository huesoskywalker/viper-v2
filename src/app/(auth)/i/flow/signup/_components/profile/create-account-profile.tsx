'use client'
import {
   CreateProfileFormValues,
   useCreateProfileForm,
} from '../../_hooks/profile/use-create-profile-form'
import { useCreateProfileSteps } from '../../_hooks/profile/use-create-profile-steps'
import { useCreateProfileButtons } from '../../_hooks/profile/use-create-profile-buttons'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import DialogForm from '@/app/_components/form/dialog-form'
import { BaseSyntheticEvent } from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const SubmitButton = dynamic(() => import('@/app/_components/form/submit-button'), {
   ssr: false,
   loading: () => <Skeleton className={'h-11 w-full rounded-3xl'} />,
})

const CreateAccountProfile = ({
   children,
   viperFollowings,
}: {
   children: React.ReactNode
   viperFollowings: number
}) => {
   const { step } = useCreateAccountStore()

   const { createProfileForm } = useCreateProfileForm()

   const { getFieldState } = createProfileForm

   const { renderStep } = useCreateProfileSteps()

   const { renderButton } = useCreateProfileButtons(getFieldState)

   const handleOnSubmit = async (formData: CreateProfileFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault()

      const { images, removeImages } = (
         await import('../../_stores/create-profile-store')
      ).useCreateProfileStore()

      try {
         if (images.profile) {
            const { startUpload } = (await import('@/utils/uploadthing')).useUploadThing('profile')

            const uploadedImage = await startUpload(images.profile)

            if (!uploadedImage) throw new Error(`Something went wrong. Please try again.`)

            const image = uploadedImage.map((image) => image.url)

            formData.image = image[0]
            removeImages('profile')
         }

         const { onSubmit } = (
            await import('../../../_hooks/use-submit-create-profile')
         ).useSubmitCreateProfile()

         await onSubmit(formData)
      } catch (error) {
         throw new Error(
            error instanceof Error ? error.message : 'Something went wrong. Please try again.',
         )
      }
   }

   return (
      <>
         <DialogForm formReturn={createProfileForm} handleSubmit={handleOnSubmit}>
            <CreateAccountFormBody>{step < 5 ? renderStep : children}</CreateAccountFormBody>
            <DialogFormFooter>
               {step < 5 ? (
                  renderButton
               ) : (
                  <SubmitButton
                     label="Next"
                     variant={'default'}
                     size={'lg'}
                     disabled={viperFollowings === 0}
                  />
               )}
            </DialogFormFooter>
         </DialogForm>
      </>
   )
}

export default CreateAccountProfile
