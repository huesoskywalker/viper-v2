import { useMemo } from 'react'
import { PasswordResetSetValue } from './use-password-reset-form'
import { emailRegex } from '../../_utils/regex'
import { FormDescription } from '@/components/ui/form'
import dynamic from 'next/dynamic'

const PasswordFindAccount = dynamic(() => import('../_components/password-find-account'))
const PasswordConfirmEmail = dynamic(() => import('../_components/password-confirm-email'))
const PasswordConfirmUsername = dynamic(() => import('../_components/password-confirm-username'))
const PasswordSendVerificationToken = dynamic(
   () => import('../_components/password-send-verification-token'),
)
const AdmissionVerificationToken = dynamic(
   () => import('../../signup/_components/admission/admission-verification-token'),
)
const NewPassword = dynamic(() => import('../_components/new-password'))
const PasswordResetMotive = dynamic(() => import('../_components/password-reset-motive'))
const PasswordResetSuccess = dynamic(() => import('../_components/password-reset-success'))

const usePasswordResetSteps = (step: number, findBy: string, setValue: PasswordResetSetValue) => {
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
   }, [step, findBy])

   return { renderStep }
}

export default usePasswordResetSteps
