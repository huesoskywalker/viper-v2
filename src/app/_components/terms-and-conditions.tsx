import Link from 'next/link'
import React from 'react'

const TermsAndConditions = () => {
   const linkClass = 'text-viper-dodger-blue hover:underline hover:underline-offset-4 '
   return (
      <div className="mb-5 w-[300px]">
         <p className="text-start text-[12px] leading-[13px] text-muted-foreground ">
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
            .
         </p>
      </div>
   )
}

export default TermsAndConditions
