import { useMemo } from 'react'
import NextStepButton from '../_components/next-step-button'
import { checkFieldStateValidity } from '../_utils/check-field-state-validity'
import { UseFormGetFieldState, UseFormGetValues } from 'react-hook-form'
import { TokenVerificationForm } from '../_components/token-verification-form'
import { EmailSignUpSection } from '../_components/email-sign-up-section'

export const useSignUpButtons = (
   step: number,
   getFieldState: UseFormGetFieldState<{
      email: string
      name: string
      birthDate: {
         month: string
         day: string
         year: string
      }
      contentDiscovery: boolean
      token: string
      password: string
   }>,
   getValues: UseFormGetValues<{
      name: string
      email: string
      birthDate: {
         month: string
         day: string
         year: string
      }
      contentDiscovery: boolean
      token: string
      password: string
   }>,
   isValid: boolean,
) => {
   const { isStepOneValid, isStepFourValid } = checkFieldStateValidity(getFieldState)

   const disableButton = step <= 3 ? !isStepOneValid : step === 4 ? !isStepFourValid : !isValid

   const renderButtons = useMemo(() => {
      switch (step) {
         case 1:
         case 2:
         case 4:
            return <NextStepButton disabled={disableButton} />
         case 3:
            return <EmailSignUpSection email={getValues('email')} disabled={disableButton} />
         case 5:
            return (
               <TokenVerificationForm
                  token={getValues('token')}
                  email={getValues('email')}
                  disabled={disableButton}
               />
            )
         default:
            return null
      }
   }, [step, disableButton])

   return { renderButtons }
}
