import { Button } from '@/components/ui/button'
import React from 'react'
import { useCreateAccountStore } from '../_stores/create-account-store'
import { validateVerificationToken } from '../_actions/validate-verification-token'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
   success: false,
   message: null,
}

export const TokenVerificationButton = ({
   token,
   email,
   disabled,
}: {
   token: string
   email: string
   disabled: boolean
}) => {
   const [state, formAction] = useFormState(validateVerificationToken, initialState)

   const { pending } = useFormStatus()

   const { nextStep } = useCreateAccountStore()

   if (state.success) {
      nextStep()
   }
   const disableButton = disabled || pending
   return (
      <>
         <form action={formAction}>
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="email" value={email} />
            <Button
               className="text-md h-11 rounded-3xl font-semibold"
               type={'submit'}
               variant={'default'}
               disabled={disableButton}
            >
               Next
            </Button>
         </form>
      </>
   )
}
