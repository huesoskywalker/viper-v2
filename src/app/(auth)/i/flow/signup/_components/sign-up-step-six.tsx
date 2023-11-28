import React from 'react'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormStepsControl } from '@/types/forms/steps'

const SignUpStepSix: React.FC<FormStepsControl> = ({ formControl }) => {
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
