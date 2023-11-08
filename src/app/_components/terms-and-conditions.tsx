import Link from 'next/link'
import React from 'react'

const TermsAndConditions = () => {
   return (
      <div>
         <p className="text-start text-[12px] leading-[13px] text-muted-foreground ">
            By signin up, you agree to the{' '}
            <Link
               href="/terms"
               target="_blank"
               className="text-viper-dodgerblue hover:underline hover:underline-offset-4 "
            >
               Terms of Service
            </Link>{' '}
            and{' '}
            <Link
               href="/privacy"
               target="_blank"
               className="text-viper-dodgerblue hover:underline hover:underline-offset-4 "
            >
               Privacy Policy
            </Link>
            .
         </p>
      </div>
   )
}

export default TermsAndConditions
