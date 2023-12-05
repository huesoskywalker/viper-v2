import { useMemo } from 'react'
import NextStepButton from '../_components/next-step-button'
import { checkFieldStateValidity } from '../_utils/check-field-state-validity'
import { TokenVerificationForm } from '../_components/token-verification-form'
import { EmailSignUpSection } from '../_components/email-sign-up-section'
import UploadProfileImage from '../_components/profile-picture-upload'
import {
   CreateAccountFormFieldState,
   CreateAccountFormFieldValues,
} from './use-create-account-form'

export const useCreateAccountButtons = (
   step: number,
   getFieldState: CreateAccountFormFieldState,
   getValues: CreateAccountFormFieldValues,
   isValid: boolean,
) => {
   const { isStepOneValid, isStepFourValid, isStepFiveValid, isStepSixValid } =
      checkFieldStateValidity(getFieldState)

   const validStepsMap = new Map<number, boolean>([
      [1, isStepOneValid],
      [2, isStepOneValid],
      [3, isStepOneValid],
      [4, isStepFourValid],
      [5, isStepFiveValid],
      [6, isStepSixValid],
      [7, isValid],
   ])

   const disableButton = !validStepsMap.get(step)

   const renderButtons = useMemo(() => {
      switch (step) {
         case 1:
         case 2:
            return <NextStepButton disabled={disableButton} />
         case 3:
            return <EmailSignUpSection email={getValues('email')} disabled={disableButton} />
         case 4:
            return (
               <TokenVerificationForm
                  token={getValues('token')}
                  email={getValues('email')}
                  disabled={disableButton}
               />
            )
         case 5:
         case 6:
            return <NextStepButton disabled={disableButton} />
         case 7:
            return <UploadProfileImage />
         default:
            return null
      }
   }, [step, disableButton])

   return { renderButtons }
}
