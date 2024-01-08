'use client'
import { PropsWithChildren } from 'react'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useProviderProfileForm } from '../../_hooks/provider/use-provider-profile-form'
import useProviderProfileSteps from '../../_hooks/provider/use-provider-profile-steps'
import useProviderProfileButtons from '../../_hooks/provider/use-provider-profile-buttons'
import { Button } from '@/components/ui/button'
import useSubmitCreateProfile from '../../../_hooks/use-submit-create-profile'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import DialogForm from '@/app/_components/form/dialog-form'

const CreateAccountProvider = ({
   children,
   viperFollowings,
}: PropsWithChildren & { viperFollowings: number }) => {
   const { step } = useCreateAccountStore()

   const { providerProfileForm } = useProviderProfileForm()
   const { control, getFieldState, formState } = providerProfileForm
   const { isSubmitting } = formState

   const { renderStep } = useProviderProfileSteps(step, control)

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
                  <Button
                     type="submit"
                     variant={'default'}
                     size={'lg'}
                     disabled={viperFollowings === 0 || isSubmitting}
                  >
                     Next
                  </Button>
               )}
            </DialogFormFooter>
         </DialogForm>
      </>
   )
}

export default CreateAccountProvider
