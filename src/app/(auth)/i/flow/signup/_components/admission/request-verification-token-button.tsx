'use client'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { useSendVerificationEmail } from '../../../_hooks/use-send-verification-email'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const RequestVerificationTokenButton = () => {
   const { getValues } = useFormContext<AdmissionFormValues>()

   const { sendVerificationEmail } = useSendVerificationEmail()

   const [isPending, startTransition] = useTransition()

   const { push } = useRouter()

   return (
      <>
         <Button
            className="text-md font-semibold"
            type={'button'}
            variant={'sky'}
            size={'lg'}
            onClick={() => {
               startTransition(async () => {
                  const email = getValues('email')
                  await sendVerificationEmail(email)
                  push(`?email=${email}`)
               })
            }}
            disabled={isPending}
         >
            Sign up
         </Button>
      </>
   )
}

export default RequestVerificationTokenButton
