'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTransition } from 'react'
import { useFormContext } from 'react-hook-form'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'
import { useSendVerificationEmail } from '../../../_hooks/use-send-verification-email'
import { useToast } from '@/components/ui/use-toast'

const ResendTokenButton = () => {
   const { toast } = useToast()

   const { getValues } = useFormContext<AdmissionFormValues>()

   const { sendVerificationEmail } = useSendVerificationEmail()

   const [isPending, startTransition] = useTransition()

   const handleOnClick = () => {
      startTransition(async () => {
         const email = getValues('email')

         const sendEmail = await sendVerificationEmail(email)

         if (sendEmail.success) {
            toast({
               title: 'Email sent successfully!',
               description: 'Check you inbox for the confirmation email.',
            })
         }
      })
   }
   return (
      <>
         <Button
            onClick={handleOnClick}
            variant={'link'}
            size={'fit'}
            className={cn(`text-xs`)}
            disabled={isPending}
         >
            {!isPending ? "Didn't receive email?" : 'Sending...'}
         </Button>
      </>
   )
}

export default ResendTokenButton
