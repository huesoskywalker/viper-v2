import React, { useMemo } from 'react'
import { PasswordResetSetValue } from './use-password-reset-form'
import PasswordFindAccount from '../_components/password-find-account'
import PasswordConfirmUsername from '../_components/password-confirm-username'
import PasswordConfirmEmail from '../_components/password-confirm-email'
import { emailRegex } from '../../_utils/regex'
import PasswordSendVerificationToken from '../_components/password-send-verification-token'
import AdmissionVerificationToken from '../../signup/_components/admission/admission-verification-token'
import { FormDescription } from '@/components/ui/form'
import NewPassword from '../_components/new-password'
import PasswordResetMotive from '../_components/password-reset-motive'
import PasswordResetSuccess from '../_components/password-reset-success'

const usePasswordRestSteps = (step: number, findBy: string, setValue: PasswordResetSetValue) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <PasswordFindAccount />
         case 2:
            const isEmailValue = emailRegex.test(findBy)
            const formField = isEmailValue ? 'email' : 'username'

            setValue(formField, findBy)

            return isEmailValue ? <PasswordConfirmUsername /> : <PasswordConfirmEmail />
         case 3:
            return <PasswordSendVerificationToken />
         case 4:
            return (
               <AdmissionVerificationToken label={'Enter your code'}>
                  <FormDescription>
                     Check your email to get your confirmation code. If you need to request a new
                     code, go back and reselect a confirmation.
                  </FormDescription>
               </AdmissionVerificationToken>
            )
         case 5:
            return <NewPassword />
         case 6:
            return <PasswordResetMotive />
         case 7:
            return <PasswordResetSuccess />
         default:
            return null
      }
   }, [step])

   return { renderStep }
}

export default usePasswordRestSteps
