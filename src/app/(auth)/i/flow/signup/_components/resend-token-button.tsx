'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useResendToken } from '../_hooks/use-resend-token'
import { useTransition } from 'react'

const ResendTokenButton = ({ children, email }: { children: string; email: string }) => {
   const { handleResendEmail } = useResendToken(email)

   const [isPending, startTransition] = useTransition()
   return (
      <>
         <Button
            onClick={() => {
               startTransition(async () => {
                  await handleResendEmail()
               })
            }}
            variant={'link'}
            size={'link'}
            className={cn(`text-xs`)}
            disabled={isPending}
         >
            {!isPending ? children : 'Sending...'}
         </Button>
      </>
   )
}

export default ResendTokenButton
