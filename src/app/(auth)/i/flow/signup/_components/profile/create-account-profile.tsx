'use client'
import { useCreateProfileForm } from '../../_hooks/profile/use-create-profile-form'
import { useCreateProfileSteps } from '../../_hooks/profile/use-create-profile-steps'
import { useCreateProfileButtons } from '../../_hooks/profile/use-create-profile-buttons'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import useSubmitCreateProfile from '../../../_hooks/use-submit-create-profile'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import DialogForm from '@/app/_components/form/dialog-form'
import SubmitButton from '@/app/_components/form/submit-button'

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

   const { onSubmit } = useSubmitCreateProfile()

   const { renderStep } = useCreateProfileSteps(step)

   const { renderButton } = useCreateProfileButtons(step, getFieldState)

   return (
      <>
         <DialogForm formReturn={createProfileForm} handleSubmit={onSubmit}>
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
