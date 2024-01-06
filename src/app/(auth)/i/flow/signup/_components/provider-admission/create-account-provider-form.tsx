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
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import CreateAccountFormFooter from '../../../_components/create-account-form-footer'

const CreateAccountProviderForm = ({
   children,
   viperFollowings,
}: PropsWithChildren & { viperFollowings: number }) => {
   const { step } = useCreateAccountStore()

   const { providerAdmissionForm } = useProviderAdmissionForm()
   const { control, getFieldState, formState } = providerAdmissionForm
   const { isSubmitting } = formState

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
               <CreateAccountFormBody>{step < 6 ? renderStep : children}</CreateAccountFormBody>
               <CreateAccountFormFooter>
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
               </CreateAccountFormFooter>
            </form>
         </Form>
      </>
   )
}

export default CreateAccountProviderForm
