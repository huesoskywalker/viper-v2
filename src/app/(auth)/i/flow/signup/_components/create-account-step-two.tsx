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
import { BASE_URL } from '@/config/env'
import { useCreateProfileStore } from '../_stores/create-profile-store'
import { useSession } from 'next-auth/react'
import { WithId } from 'mongodb'
import { ViperBasicProps } from '@/types/viper'

const CreateAccountStepTwo = ({
   children,
   viperFollowings,
}: {
   children: React.ReactNode
   viperFollowings: number
}) => {
   const { update } = useSession()
   const { step, redirectStep } = useCreateAccountStore()
   const { clearInterests } = useCreateProfileStore()

   const { createProfileForm } = useCreateProfileForm()

   const { getFieldState, setValue } = createProfileForm

   const onSubmit = async (formData: CreateProfileFormValues) => {
      try {
         const updateViper = await fetch(`${BASE_URL}/api/viper`, {
            headers: {
               'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body: JSON.stringify({ formData }),
         })

         if (!updateViper.ok) {
            const { error } = await updateViper.json()
            throw new Error(error)
         }

         const { data }: { data: WithId<ViperBasicProps> } = await updateViper.json()

         update({ username: data.username, image: data.image })
      } catch (error) {
         throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
      }

      clearInterests()
      redirectStep(0)
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
                     `h-[470px] w-full space-y-2 overflow-y-auto scroll-smooth px-[80px]`,
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
