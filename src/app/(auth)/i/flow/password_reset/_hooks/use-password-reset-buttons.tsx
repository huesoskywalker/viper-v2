import { useMemo } from 'react'
import NextStepButton from '../../_components/next-step-button'
import { PasswordResetFieldState, PasswordResetGetValues } from './use-password-reset-form'
import { passwordResetFieldValidity } from '../_utils/password-reset-field-validity'
import { emailRegex } from '../../_utils/regex'
import FindAccountButton from '../_components/password-match-account-button'
import CancelPasswordResetButton from '../_components/cancel-password-reset-button'
import SendPasswordTokenButton from '../_components/send-password-token-button'

const usePasswordResetButtons = (
   step: number,
   getFieldState: PasswordResetFieldState,
   getValues: PasswordResetGetValues,
) => {
   const { isFindByValid, isEmailValid, isUsernameValid } =
      passwordResetFieldValidity(getFieldState)

   const findByValue = getValues('findBy')

   const validStepMap = new Map<number, boolean>([
      [1, isFindByValid],
      [2, emailRegex.test(findByValue) ? isUsernameValid : isEmailValid],
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
                  <SendPasswordTokenButton />
                  <CancelPasswordResetButton />
               </div>
            )
         default:
            return null
      }
   }, [step, disableButton])

   return { renderButton }
}

export default usePasswordResetButtons
