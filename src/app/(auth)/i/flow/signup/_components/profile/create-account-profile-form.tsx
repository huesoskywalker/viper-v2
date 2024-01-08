'use client'
import { useCreateProfileForm } from '../../_hooks/profile/use-create-profile-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useCreateProfileSteps } from '../../_hooks/profile/use-create-profile-steps'
import { useCreateProfileButtons } from '../../_hooks/profile/use-create-profile-buttons'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import useSubmitCreateProfile from '../../../_hooks/use-submit-create-profile'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'

const CreateAccountProfileForm = ({
   children,
   viperFollowings,
}: {
   children: React.ReactNode
   viperFollowings: number
}) => {
   const { step } = useCreateAccountStore()

   const { createProfileForm } = useCreateProfileForm()

   const { control, getFieldState, setValue, formState } = createProfileForm

   const { isSubmitting } = formState

   const { onSubmit } = useSubmitCreateProfile()

   const { renderStep } = useCreateProfileSteps(step, control)

   const { renderButton } = useCreateProfileButtons(step, getFieldState, setValue)

   return (
      <>
         <Form {...createProfileForm}>
            <form
               onSubmit={createProfileForm.handleSubmit(onSubmit)}
               className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
            >
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
            </form>
         </Form>
      </>
   )
}

export default CreateAccountProfileForm
