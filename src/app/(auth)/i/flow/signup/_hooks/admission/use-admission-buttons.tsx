import { useMemo } from 'react'
import NextStepButton from '../../_components/next-step-button'
import { isAdmissionFieldValid } from '../../_utils/is-admission-field-valid'
import { TokenVerificationForm } from '../../_components/admission/token-verification-form'
import { EmailSignUpSection } from '../../_components/admission/email-sign-up-section'
import { AdmissionFieldState, AdmissionFieldValue } from './use-admission-form'

export const useAdmissionButtons = (
   step: number,
   getFieldState: AdmissionFieldState,
   getValues: AdmissionFieldValue,
) => {
   const { isStepOneValid, isStepFourValid } = isAdmissionFieldValid(getFieldState)

   const validStepsMap = new Map<number, boolean>([
      [1, isStepOneValid],
      [2, isStepOneValid],
      [3, isStepOneValid],
      [4, isStepFourValid],
   ])

   const disableButton = !validStepsMap.get(step)

   const renderButtons = useMemo(() => {
      switch (step) {
         case 1:
         case 2:
            return <NextStepButton size={'lg'} disabled={disableButton} />
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
            return null
         default:
            return null
      }
   }, [step, disableButton])

   return { renderButtons }
}
