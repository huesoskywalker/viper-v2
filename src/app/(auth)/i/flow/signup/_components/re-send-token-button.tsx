'use client'
import React, { useTransition } from 'react'
import { resendEmail } from '../_utils/re-send-email'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ReSendTokenButton = ({ children, email }: { children: string; email: string }) => {
   const [isPending, startTransition] = useTransition()
   const handleResendEmail = () => {
      startTransition(async () => {
         await resendEmail(email)
      })
   }

   return (
      <>
         <Button
            onClick={handleResendEmail}
            variant={'link'}
            size={'link'}
            className={cn(`text-xs`, isPending && 'animate-loading')}
            disabled={isPending}
         >
            {!isPending ? children : 'sending...'}
         </Button>
      </>
   )
}

export default ReSendTokenButton
