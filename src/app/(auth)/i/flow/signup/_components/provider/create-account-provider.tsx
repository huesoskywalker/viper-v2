'use client'
import { BaseSyntheticEvent, PropsWithChildren } from 'react'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import {
   ProviderProfileFormValues,
   useProviderProfileForm,
} from '../../_hooks/provider/use-provider-profile-form'
import useProviderProfileSteps from '../../_hooks/provider/use-provider-profile-steps'
import useProviderProfileButtons from '../../_hooks/provider/use-provider-profile-buttons'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import DialogForm from '@/app/_components/form/dialog-form'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const SubmitButton = dynamic(() => import('@/app/_components/form/submit-button'), {
   ssr: false,
   loading: () => <Skeleton className={'h-11 w-full rounded-3xl'} />,
})

const CreateAccountProvider = ({
   children,
   viperFollowings,
}: PropsWithChildren & { viperFollowings: number }) => {
   const { step } = useCreateAccountStore()

   const { providerProfileForm } = useProviderProfileForm()
   const { getFieldState } = providerProfileForm

   const { renderStep } = useProviderProfileSteps()

   const { renderButton } = useProviderProfileButtons(getFieldState)

   const handleOnSubmit = async (formData: ProviderProfileFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault()
      try {
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
         <DialogForm formReturn={providerProfileForm} handleSubmit={handleOnSubmit}>
            <CreateAccountFormBody>{step < 6 ? renderStep : children}</CreateAccountFormBody>
            <DialogFormFooter>
               {step < 6 ? (
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

export default CreateAccountProvider
