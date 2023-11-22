import React, { useMemo } from 'react'
import SignUpStepOne from '../_components/sign-up-step-one'
import SignUpStepTwo from '../_components/sign-up-step-two'
import SignUpStepThree from '../_components/sign-up-step-three'
import SignUpStepFour from '../_components/sign-up-step-four'
import { SignUpFomControl } from './use-sign-up-form'

export const useSignUpSteps = (step: number, formControl: SignUpFomControl) => {
   const renderSteps = useMemo(() => {
      switch (step) {
         case 1:
            return <SignUpStepOne formControl={formControl} />
         case 2:
            return <SignUpStepTwo formControl={formControl} />
         case 3:
            return <SignUpStepThree formControl={formControl} />
         case 4:
            return <SignUpStepFour formControl={formControl} />
         default:
            return null
      }
   }, [step])

   return { renderSteps }
}
