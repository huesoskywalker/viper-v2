import { Button } from '@/components/ui/button'
import React from 'react'
import { requestVerificationEmail } from '../_actions/request-verification-email'
import { useFormState, useFormStatus } from 'react-dom'
import { useCreateAccountStore } from '../_stores/create-account-store'

const initialState = {
   success: false,
   message: null,
}
const EmailSignUpForm = ({ email, disabled }: { email: string; disabled: boolean }) => {
   const [state, formAction] = useFormState(requestVerificationEmail, initialState)
   const { pending } = useFormStatus()
   const { nextStep } = useCreateAccountStore()
   if (state.success) {
      nextStep()
   }

   const disableButton = disabled || pending
   return (
      <>
         <form action={formAction}>
            <input type="hidden" name="email" value={email} />
            <Button
               className="text-md m-0 h-11 rounded-3xl font-semibold"
               type={'submit'}
               variant={'sign-up'}
               disabled={disableButton}
            >
               Sign up
            </Button>
         </form>
      </>
   )
}

export default EmailSignUpForm
