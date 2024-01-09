import { useMemo } from 'react'
import NextStepButton from '../../_components/next-step-button'
import { PasswordResetFieldState } from './use-password-reset-form'
import { passwordResetFieldValidity } from '../_utils/password-reset-field-validity'
import { emailRegex } from '../../_utils/regex'

const usePasswordResetButtons = (
   step: number,
   getFieldState: PasswordResetFieldState,
   getValues: any,
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
            return <NextStepButton variant={'default'} size={'lg'} disabled={disableButton} />
         default:
            return null
      }
   }, [disableButton])

   return { renderButton }
}

export default usePasswordResetButtons
