'use client'
import {
   CreateProfileFormValues,
   useCreateProfileForm,
} from '../_hooks/profile/use-create-profile-form'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCreateProfileSteps } from '../_hooks/profile/use-create-profile-steps'
import { useCreateProfileButtons } from '../_hooks/profile/use-create-profile-buttons'
import { useCreateAccountStore } from '../_stores/create-account-store'

const CreateAccountStepTwo = ({
   children,
   viperFollowings,
}: {
   children: React.ReactNode
   viperFollowings: number
}) => {
   const { step } = useCreateAccountStore()

   const { createProfileForm } = useCreateProfileForm()

   const { getFieldState, setValue } = createProfileForm

   const onSubmit = (formData: CreateProfileFormValues) => {
      console.log(`---whats in step two formData`)
      console.log({ formData })
      // -----------------------------------
      // Need to clear the interests from the store in here
   }

   const { renderSteps } = useCreateProfileSteps(step, createProfileForm.control)

   const { renderButtons } = useCreateProfileButtons(step, getFieldState, setValue)

   return (
      <>
         <Form {...createProfileForm}>
            <form
               onSubmit={createProfileForm.handleSubmit(onSubmit)}
               className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
            >
               <div
                  className={cn(
                     `h-[470px] w-full space-y-2 overflow-y-auto scroll-smooth px-[88px]`,
                  )}
               >
                  {step < 4 ? renderSteps : children}
               </div>
               {step === 4 && (
                  <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
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
         {step < 4 && (
            <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
               {renderButtons}
            </DialogFooter>
         )}
      </>
   )
}

export default CreateAccountStepTwo
