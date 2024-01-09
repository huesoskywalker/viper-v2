import React, { useMemo } from 'react'
import { Control } from 'react-hook-form'
import { PasswordResetFormValues } from './use-password-reset-form'
import PasswordFindAccount from '../_components/password-find-account'
import PasswordConfirmUsername from '../_components/password-confirm-username'
import PasswordConfirmEmail from '../_components/password-confirm-email'
import { emailRegex } from '../../_utils/regex'

const usePasswordRestSteps = (step: number, formControl: Control<PasswordResetFormValues>) => {
   const findByValue = formControl._fields['findBy']?._f.value

   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <PasswordFindAccount formControl={formControl} />
         case 2:
            const isEmailValue = emailRegex.test(findByValue)
            const formField = isEmailValue ? 'email' : 'username'
            formControl._formValues[formField] = findByValue

            return isEmailValue ? (
               <PasswordConfirmUsername formControl={formControl} />
            ) : (
               <PasswordConfirmEmail formControl={formControl} />
            )
         default:
            return null
      }
   }, [step])

   return { renderStep }
}

export default usePasswordRestSteps
