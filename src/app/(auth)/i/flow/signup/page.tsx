import { Suspense } from 'react'
import { SignUpForm } from './_components/sign-up-form'
import SignUpLoading from './loading'

export default function SignUpPage() {
   return (
      <>
         <Suspense fallback={<SignUpLoading />}>
            <SignUpForm />
         </Suspense>
      </>
   )
}
