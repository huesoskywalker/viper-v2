'use client'
import { PropsWithChildren } from 'react'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useProviderAdmissionForm } from '../../_hooks/provider-admission/use-provider-admission-form'
import useProviderAdmissionSteps from '../../_hooks/provider-admission/use-provider-admission-steps'
import useProviderAdmissionButtons from '../../_hooks/provider-admission/use-provider-admission-buttons'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import useSubmitCreateProfile from '../../../_hooks/use-submit-create-profile'

const CreateAccountProviderForm = ({
   children,
   viperFollowings,
}: PropsWithChildren & { viperFollowings: number }) => {
   const { step } = useCreateAccountStore()

   const { providerAdmissionForm } = useProviderAdmissionForm()
   const { control, getFieldState } = providerAdmissionForm

   const { renderStep } = useProviderAdmissionSteps(step, control)

   const { renderButton } = useProviderAdmissionButtons(step, getFieldState)

   const { onSubmit } = useSubmitCreateProfile()

   return (
      <>
         <Form {...providerAdmissionForm}>
            <form
               onSubmit={providerAdmissionForm.handleSubmit(onSubmit)}
               className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
            >
               <div
                  className={cn(
                     ` h-[470px] w-full space-y-4 overflow-y-auto scroll-smooth px-[80px]`,
                  )}
               >
                  {step < 6 ? renderStep : children}
               </div>

               {step === 6 && (
                  <>
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
                  </>
               )}
            </form>
         </Form>
         {step < 6 && (
            <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
               {renderButton}
            </DialogFooter>
         )}{' '}
      </>
   )
}

export default CreateAccountProviderForm
