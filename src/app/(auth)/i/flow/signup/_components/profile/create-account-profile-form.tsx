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

const CreateAccountProfileForm = ({
   children,
   viperFollowings,
}: {
   children: React.ReactNode
   viperFollowings: number
}) => {
   const { step } = useCreateAccountStore()

   const { createProfileForm } = useCreateProfileForm()

   const { control, getFieldState, setValue } = createProfileForm

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
               {step === 5 && (
                  <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-8 sm:px-16">
                     <Button
                        type="submit"
                        variant={'default'}
                        size={'lg'}
                        disabled={viperFollowings === 0}
                     >
                        Next
                     </Button>
                  </DialogFooter>
               )}
            </form>
         </Form>
         {step < 5 && (
            <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-8 sm:px-16">
               {renderButton}
            </DialogFooter>
         )}
      </>
   )
}

export default CreateAccountProfileForm
