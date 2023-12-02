import React, { useMemo } from 'react'
import SignUpStepOne from '../_components/sign-up-step-one'
import SignUpStepTwo from '../_components/sign-up-step-two'
import SignUpStepThree from '../_components/sign-up-step-three'
import SignUpStepFour from '../_components/sign-up-step-four'
import { CreateAccountFormControl } from './use-create-account-form'
import SignUpStepFive from '../_components/sign-up-step-five'
import SignUpStepSix from '../_components/sign-up-step-six'

export const useCreateAccountSteps = (step: number, formControl: CreateAccountFormControl) => {
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
         case 5:
            return <SignUpStepFive formControl={formControl} />
         case 6:
            return <SignUpStepSix formControl={formControl} />
         default:
            return null
      }
   }, [step])

   return { renderSteps }
}
