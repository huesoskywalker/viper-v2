import React from 'react'
import { requestVerificationEmail } from '../../_actions/request-verification-email'
import { useFormState } from 'react-dom'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useRouter } from 'next/navigation'
import SubmitVerificationButton from './token-verification-button'

interface SignUpForm {
   readonly email: string
   disabled: boolean
}
const initialState = {
   success: false,
   message: null,
}
const EmailSignUpForm: React.FC<SignUpForm> = ({ email, disabled }) => {
   const [state, formAction] = useFormState(requestVerificationEmail, initialState)
   const router = useRouter()

   const { redirectStep } = useCreateAccountStore()

   if (state.success) {
      redirectStep(4)
      router.push(`?email=${email}`)
   }

   return (
      <>
         <form action={formAction}>
            <input type="hidden" name="email" value={email} />
            <SubmitVerificationButton
               label="Sign up"
               variant={'sky'}
               size={'lg'}
               disabled={disabled}
            />
         </form>
      </>
   )
}

export default EmailSignUpForm
