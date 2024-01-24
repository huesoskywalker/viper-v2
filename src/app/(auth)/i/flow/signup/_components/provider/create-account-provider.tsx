'use client'
import { PropsWithChildren } from 'react'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useProviderProfileForm } from '../../_hooks/provider/use-provider-profile-form'
import useProviderProfileSteps from '../../_hooks/provider/use-provider-profile-steps'
import useProviderProfileButtons from '../../_hooks/provider/use-provider-profile-buttons'
import useSubmitCreateProfile from '../../../_hooks/use-submit-create-profile'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import DialogForm from '@/app/_components/form/dialog-form'
import SubmitButton from '@/app/_components/form/submit-button'

const CreateAccountProvider = ({
   children,
   viperFollowings,
}: PropsWithChildren & { viperFollowings: number }) => {
   const { step } = useCreateAccountStore()

   const { providerProfileForm } = useProviderProfileForm()
   const { getFieldState } = providerProfileForm

   const { renderStep } = useProviderProfileSteps(step)

   const { renderButton } = useProviderProfileButtons(step, getFieldState)

   const { onSubmit } = useSubmitCreateProfile()

   return (
      <>
         <DialogForm formReturn={providerProfileForm} handleSubmit={onSubmit}>
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
