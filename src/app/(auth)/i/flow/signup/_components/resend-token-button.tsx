'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useResendToken } from '../_hooks/use-resend-token'

const ResendTokenButton = ({ children, email }: { children: string; email: string }) => {
   const { handleResendEmail, isPending } = useResendToken(email)

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

export default ResendTokenButton
