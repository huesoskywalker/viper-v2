'use client'
import { useCreateProfileForm } from '../../_hooks/profile/use-create-profile-form'
import { Button } from '@/components/ui/button'
import { useCreateProfileSteps } from '../../_hooks/profile/use-create-profile-steps'
import { useCreateProfileButtons } from '../../_hooks/profile/use-create-profile-buttons'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import useSubmitCreateProfile from '../../../_hooks/use-submit-create-profile'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import DialogForm from '@/app/_components/form/dialog-form'

const CreateAccountProfile = ({
   children,
   viperFollowings,
}: {
   children: React.ReactNode
   viperFollowings: number
}) => {
   const { step } = useCreateAccountStore()

   const { createProfileForm } = useCreateProfileForm()

   const { control, getFieldState, formState } = createProfileForm

   const { isSubmitting } = formState

   const { onSubmit } = useSubmitCreateProfile()

   const { renderStep } = useCreateProfileSteps(step, control)

   const { renderButton } = useCreateProfileButtons(step, getFieldState)

   return (
      <>
         <DialogForm formReturn={createProfileForm} handleSubmit={onSubmit}>
            <CreateAccountFormBody>{step < 5 ? renderStep : children}</CreateAccountFormBody>
            <DialogFormFooter>
               {step < 5 ? (
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

export default CreateAccountProfile
