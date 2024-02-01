import TermsAndConditions from '@/app/_components/terms-and-conditions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import RequestVerificationTokenButton from './request-verification-token-button'

const EmailSignUpSection = () => {
   const { redirectStep } = useCreateAccountStore()

   return (
      <>
         <TermsAndConditions className="mb-2 text-[14px] leading-4">
            Twitter may use your contact information, including your email address and phone number
            for purposes outlined in our Privacy Policy, like keeping your account secure and
            personalizing our services, including ads.
            <Link
               href="/privacy"
               target="_blank"
               className="text-viper-dodger-blue hover:underline hover:underline-offset-4 "
            >
               Learn more
            </Link>{' '}
            . Others will be able to find you by email or phone number, when provided, unless you
            choose otherwise{' '}
            <Button
               variant={'link'}
               size={'fit'}
               className="text-[14px] font-normal leading-4"
               // TODO: we need to manage this step and backwards on step X
               onClick={() => redirectStep(11)}
            >
               {' '}
               here
            </Button>
            .
         </TermsAndConditions>
         <RequestVerificationTokenButton variant={'sky'} size={'lg'} label={'Sign up'} />
      </>
   )
}

export default EmailSignUpSection
