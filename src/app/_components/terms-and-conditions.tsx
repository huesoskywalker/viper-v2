import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { ComponentPropsWithoutRef } from 'react'

type TermsAndConditionsProps = ComponentPropsWithoutRef<'p'>

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
   children,
   className,
   ...props
}) => {
   const linkClass = 'text-viper-dodger-blue hover:underline hover:underline-offset-4 '
   return (
      <p className={cn('w-full text-muted-foreground', className)} {...props}>
         By signin up, you agree to the{' '}
         <Link href="/tos" target="_blank" className={linkClass}>
            Terms of Service
         </Link>{' '}
         and{' '}
         <Link href="/privacy" target="_blank" className={linkClass}>
            Privacy Policy
         </Link>
         , including{' '}
         <Link href={'/rules-and-policies/x-cookies'} target="_blank" className={linkClass}>
            Cookie Use
         </Link>
         . {children}
      </p>
   )
}

export default TermsAndConditions
