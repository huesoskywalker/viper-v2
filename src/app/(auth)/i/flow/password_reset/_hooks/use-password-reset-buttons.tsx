import { useMemo } from 'react'
import NextStepButton from '../../_components/next-step-button'
import { PasswordResetFieldState, PasswordResetGetValues } from './use-password-reset-form'
import { passwordResetFieldValidity } from '../_utils/password-reset-field-validity'
import { emailRegex } from '../../_utils/regex'
import FindAccountButton from '../_components/password-match-account-button'
import CancelPasswordResetButton from '../_components/cancel-password-reset-button'
import RequestVerificationTokenButton from '../../signup/_components/admission/request-verification-token-button'
import ValidFormSubmitButton from '@/app/_components/form/valid-form-submit-button'

const usePasswordResetButtons = (
   step: number,
   getFieldState: PasswordResetFieldState,
   getValues: PasswordResetGetValues,
) => {
   const { isFindByValid, isEmailValid, isUsernameValid, isConfirmPasswordValid, isMotiveValid } =
      passwordResetFieldValidity(getFieldState)

   const findByValue = getValues('findBy')

   const validStepMap = new Map<number, boolean>([
      [1, isFindByValid],
      [2, emailRegex.test(findByValue) ? isUsernameValid : isEmailValid],
      [5, isConfirmPasswordValid],
      [6, isMotiveValid],
   ])

   const disableButton = !validStepMap.get(step)

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
            return <NextStepButton variant={'default'} size={'lg'} disabled={disableButton} />
         case 2:
            return <FindAccountButton disabled={disableButton} />
         case 3:
            return (
               <div className="space-y-4">
                  <RequestVerificationTokenButton
                     variant={'default'}
                     size={'lg'}
                     label={'Next'}
                     email={getValues('email')}
                     username={getValues('username')}
                  />
                  <CancelPasswordResetButton />
               </div>
            )
         case 4:
            return null
         case 5:
            return (
               <NextStepButton
                  variant={'default'}
                  size={'lg'}
                  label={'Change password'}
                  disabled={disableButton}
               />
            )
         case 6:
            return <NextStepButton variant={'default'} size={'lg'} disabled={disableButton} />
         case 7:
            return (
               <ValidFormSubmitButton
                  label={'Continue to Viper'}
                  variant={'default'}
                  size={'lg'}
               />
            )
         default:
            return null
      }
   }, [step, disableButton])

   return { renderButton }
}

export default usePasswordResetButtons
