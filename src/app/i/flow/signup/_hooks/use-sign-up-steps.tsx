import React, { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import SignUpStep1 from '../_components/sign-up-step-1'
import SignUpStep2 from '../_components/sign-up-step-2'
import SignUpStep3 from '../_components/sign-up-step-3'

export const useSignUpSteps = (
   step: number,
   signUpForm: UseFormReturn<
      {
         name: string
         email: string
         month: string
         day: string
         year: string
      },
      any,
      undefined
   >,
) => {
   const { control } = signUpForm
   const renderSteps = useMemo(() => {
      switch (step) {
         case 1:
            return <SignUpStep1 formControl={control} />
         case 2:
            return <SignUpStep2 />
         case 3:
            return <SignUpStep3 formControl={control} />
         default:
            return null
      }
   }, [step])

   return { renderSteps }
}
