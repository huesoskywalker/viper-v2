import React, { useMemo } from 'react'
import { Control } from 'react-hook-form'
import { PasswordResetFormValues, PasswordResetSetValue } from './use-password-reset-form'
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

const usePasswordRestSteps = (step: number, formControl: Control<PasswordResetFormValues>) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <PasswordFindAccount formControl={formControl} />
         case 2:
            const findByValue = formControl._fields['findBy']?._f.value

            const isEmailValue = emailRegex.test(findByValue)
            const formField = isEmailValue ? 'email' : 'username'

            formControl._formValues[formField] = findByValue

            return isEmailValue ? (
               <PasswordConfirmUsername formControl={formControl} />
            ) : (
               <PasswordConfirmEmail formControl={formControl} />
            )
         case 3:
            return <PasswordSendVerificationToken formControl={formControl} />
         case 4:
            return (
               <AdmissionVerificationToken formControl={formControl} label={'Enter your code'}>
                  <FormDescription>
                     Check your email to get your confirmation code. If you need to request a new
                     code, go back and reselect a confirmation.
                  </FormDescription>
               </AdmissionVerificationToken>
            )
         case 5:
            return <NewPassword formControl={formControl} />
         case 6:
            return <PasswordResetMotive formControl={formControl} />
         case 7:
            formControl._updateValid(true)
            return <PasswordResetSuccess />
         default:
            return null
      }
   }, [step])

   return { renderStep }
}

export default usePasswordRestSteps
