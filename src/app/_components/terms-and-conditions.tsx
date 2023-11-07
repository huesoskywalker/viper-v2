import Link from 'next/link'
import React from 'react'

const TermsAndConditions = () => {
   return (
      <div>
         <p className="text-start text-xs text-muted-foreground ">
            By clicking continue, you agree to our{' '}
            <Link
               href="/terms"
               target="_blank"
               className="text-viper-blue hover:underline hover:underline-offset-4 "
            >
               Terms of Service
            </Link>{' '}
            and{' '}
            <Link
               href="/privacy"
               target="_blank"
               className="text-viper-blue hover:underline hover:underline-offset-4 "
            >
               Privacy Policy
            </Link>
            .
         </p>
      </div>
   )
}

export default TermsAndConditions
