import React, { useMemo } from 'react'
import { Control } from 'react-hook-form'
import SignUpStep1 from '../_components/sign-up-step-1'
import SignUpStep2 from '../_components/sign-up-step-2'
import SignUpStep3 from '../_components/sign-up-step-3'

export const useSignUpSteps = (
   step: number,
   formControl: Control<
      {
         name: string
         email: string
         month: string
         day: string
         year: string
         content?: boolean
      },
      any
   >,
) => {
   const renderSteps = useMemo(() => {
      switch (step) {
         case 1:
            return <SignUpStep1 formControl={formControl} />
         case 2:
            return <SignUpStep2 formControl={formControl} />
         case 3:
            return <SignUpStep3 formControl={formControl} />
         default:
            return null
      }
   }, [step])

   return { renderSteps }
}
