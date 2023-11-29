import React from 'react'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormStepsControl } from '@/types/forms/steps'

const SignUpStepSix: React.FC<FormStepsControl> = ({ formControl }) => {
   const router = useRouter()
   const { data: session } = useSession()
   const signInEmail = () => {
      signIn('credentials', { username: '', password: '' })
   }
   return <Button onClick={signInEmail} variant={'default'} size={'lg'} />
}

export default SignUpStepSix
