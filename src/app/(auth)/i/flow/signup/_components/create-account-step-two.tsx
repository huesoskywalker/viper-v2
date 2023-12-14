import React from 'react'
import {
   CreateProfileFormValues,
   useCreateProfileForm,
} from '../_hooks/profile/use-create-profile-form'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCreateAccountStore } from '../_stores/create-account-store'
import { useCreateProfileSteps } from '../_hooks/profile/use-create-profile-steps'
import { useCreateProfileButtons } from '../_hooks/profile/use-create-profile-buttons'

const CreateAccountStepTwo = () => {
   const { step } = useCreateAccountStore()
   const { createProfileForm } = useCreateProfileForm()

   const { getFieldState, setValue } = createProfileForm

   const onSubmit = (formData: CreateProfileFormValues) => {
      console.log(`---whats in step two formData`)
      console.log({ formData })
      // -----------------------------------
      // Need to clear the interests from the store in here
   }

   const { renderButtons } = useCreateProfileButtons(step, getFieldState, setValue)

   const { renderSteps } = useCreateProfileSteps(step, createProfileForm.control)

   return (
      <>
         <Form {...createProfileForm}>
            <form
               onSubmit={createProfileForm.handleSubmit(onSubmit)}
               className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
            >
               <div
                  className={cn(
                     `h-[470px] w-full space-y-4 overflow-y-auto scroll-smooth px-[88px]`,
                  )}
               >
                  {renderSteps}
               </div>
               {/* {step === 5 && ( */}
               {/* <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
                  <Button
                     type="submit"
                     variant={'default'}
                     size={'lg'}
                     // disabled={!isStepFiveValid}
                  >
                     Next
                  </Button>
               </DialogFooter> */}
               {/* )} */}
            </form>
         </Form>
         {/* {step !== 5 && ( */}
         <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
            {renderButtons}
         </DialogFooter>
         {/* )} */}
      </>
   )
}

export default CreateAccountStepTwo
