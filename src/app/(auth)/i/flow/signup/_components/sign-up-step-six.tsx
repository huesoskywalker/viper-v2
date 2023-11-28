import React from 'react'
import { CreateAccountFormControl } from '../_hooks/use-create-account-form'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignUpStepSix = ({ formControl }: { formControl: CreateAccountFormControl }) => {
   const router = useRouter()
   const { data: session } = useSession()
   console.log({ session })
   const signInEmail = () => {
      signIn('credentials', { username: '', password: '' })
   }
   return (
      <div>
         <Button onClick={signInEmail} />
      </div>
   )
}

export default SignUpStepSix
