import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'

export const useSendVerificationEmail = () => {
   const { toast } = useToast()

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
         return { success: false }
      } else {
         return { success: true }
      }
   }
   return { sendVerificationEmail }
}
