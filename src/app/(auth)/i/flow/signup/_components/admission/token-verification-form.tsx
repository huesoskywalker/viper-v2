import React, { useEffect } from 'react'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { validateVerificationToken } from '../../_actions/validate-verification-token'
import { useFormState } from 'react-dom'
import TokenVerificationButton from './token-verification-button'

const initialState = {
   success: false,
   message: null,
}

export const TokenVerificationForm = ({
   token,
   email,
   disabled,
}: {
   token: string
   email: string
   disabled: boolean
}) => {
   const [state, formAction] = useFormState(validateVerificationToken, initialState)

   const { redirectStep } = useCreateAccountStore()

   useEffect(() => {
      if (state.success) {
         void redirectStep(5)
      }
   }, [state.success])

   return (
      <>
         <form action={formAction}>
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="email" value={email} />
            <TokenVerificationButton
               label="Next"
               variant={'default'}
               size={'lg'}
               disabled={disabled}
            />
         </form>
      </>
   )
}
