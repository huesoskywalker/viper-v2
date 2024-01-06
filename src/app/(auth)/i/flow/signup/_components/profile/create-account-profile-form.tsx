'use client'
import { useCreateProfileForm } from '../../_hooks/profile/use-create-profile-form'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCreateProfileSteps } from '../../_hooks/profile/use-create-profile-steps'
import { useCreateProfileButtons } from '../../_hooks/profile/use-create-profile-buttons'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import useSubmitCreateProfile from '../../../_hooks/use-submit-create-profile'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import CreateAccountFormFooter from '../../../_components/create-account-form-footer'

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
               <CreateAccountFormFooter>
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
               </CreateAccountFormFooter>
            </form>
         </Form>
      </>
   )
}

export default CreateAccountProfileForm
