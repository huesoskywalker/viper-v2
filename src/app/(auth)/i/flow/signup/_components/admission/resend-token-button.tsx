'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useResendToken } from '../../_hooks/use-resend-token'
import { useTransition } from 'react'
import { useFormContext } from 'react-hook-form'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'

const ResendTokenButton = () => {
   const { getValues } = useFormContext<AdmissionFormValues>()

   const { handleResendEmail } = useResendToken()

   const [isPending, startTransition] = useTransition()

   const handleOnClick = () => {
      startTransition(async () => {
         const email = getValues('email')

         await handleResendEmail(email)
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
