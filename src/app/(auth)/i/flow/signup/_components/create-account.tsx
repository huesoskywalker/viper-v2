'use client'
import { useSession } from 'next-auth/react'
import CreateAccountStepOne from './create-account-step-one'
import CreateAccountStepTwo from './create-account-step-two'

export function CreateAccount({ step }: { step: number }) {
   const { data: session, status } = useSession()
   if (status === 'authenticated' && step === 0) {
      // need to handle this so we can redirect to home or previous path
      throw new Error('Oops! Something went wrong, try again later.')
   }

   return <>{!session ? <CreateAccountStepOne /> : <CreateAccountStepTwo />}</>
}
