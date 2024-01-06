'use client'
import { PropsWithChildren } from 'react'
import { Form } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useProviderProfileForm } from '../../_hooks/provider/use-provider-profile-form'
import useProviderProfileSteps from '../../_hooks/provider/use-provider-profile-steps'
import useProviderProfileButtons from '../../_hooks/provider/use-provider-profile-buttons'
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

   const { providerProfileForm } = useProviderProfileForm()
   const { control, getFieldState, formState } = providerProfileForm
   const { isSubmitting } = formState

   const { renderStep } = useProviderProfileSteps(step, control)

   const { renderButton } = useProviderProfileButtons(step, getFieldState)

   const { onSubmit } = useSubmitCreateProfile()

   return (
      <>
         <Form {...providerProfileForm}>
            <form
               onSubmit={providerProfileForm.handleSubmit(onSubmit)}
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
