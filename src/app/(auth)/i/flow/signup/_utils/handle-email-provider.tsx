// import { signIn } from '@/lib/auth'
// probably use the react hook
import { signIn } from 'next-auth/react'

export const handleEmailProvider = async (email: string, nextStep: () => void) => {
   // await signIn('email', { redirect: false, email: email })
   nextStep()

   // console.log(result)

   // we need to handle the email with node mailer
}
