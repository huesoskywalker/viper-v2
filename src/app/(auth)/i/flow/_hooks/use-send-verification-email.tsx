import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useCreateAccountStore } from '../signup/_stores/create-account-store'

export const useSendVerificationEmail = () => {
   const { toast } = useToast()
   const { nextStep } = useCreateAccountStore()

   const sendVerificationEmail = async (email: string, username?: string) => {
      const sendEmail = await signIn('email', {
         email: email,
         username: username,
         redirect: false,
      })

      if (!sendEmail || !sendEmail.ok) {
         const errorMessage = sendEmail ? sendEmail.error : 'Something  went wrong'

         toast({
            title: 'Something went wrong',
            description: errorMessage,
            action: (
               <ToastAction
                  altText="Try Again"
                  onClick={() => sendVerificationEmail(email, username)}
               >
                  Try Again
               </ToastAction>
            ),
         })
      } else {
         nextStep()
      }
   }
   return { sendVerificationEmail }
}
