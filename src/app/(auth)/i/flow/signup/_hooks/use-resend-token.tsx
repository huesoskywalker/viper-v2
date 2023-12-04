import { SignInResponse, signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

type ResendTokenHookReturn = {
   handleResendEmail: () => Promise<void>
}

export const useResendToken = (email: string): ResendTokenHookReturn => {
   const { toast } = useToast()

   const handleResendEmail = async () => {
      const sendEmail: SignInResponse | undefined = await signIn('email', {
         redirect: false,
         email: email,
      })

      if (!sendEmail || !sendEmail.ok) {
         const errorMessage = sendEmail ? sendEmail.error : 'Something  went wrong'

         toast({
            title: 'Something went wrong',
            description: errorMessage,
            action: (
               <ToastAction altText="Try Again" onClick={handleResendEmail}>
                  Try Again
               </ToastAction>
            ),
         })
      } else {
         toast({
            title: 'Email sent successfully!',
            description: 'Check you inbox for the confirmation email.',
         })
      }
   }

   return { handleResendEmail }
}
