import { useMemo } from 'react'
import { PasswordResetSetValue } from './use-password-reset-form'
import { emailRegex } from '../../_utils/regex'
import { FormDescription } from '@/components/ui/form'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'
import { useCreateAccountStore } from '../../signup/_stores/create-account-store'

const PasswordFindAccount = dynamic(() => import('../_components/password-find-account'), {
   loading: () => <LoadingSpinner className="h-full" />,
})
const PasswordConfirmEmail = dynamic(() => import('../_components/password-confirm-email'), {
   loading: () => <LoadingSpinner className="h-full" />,
})
const PasswordConfirmUsername = dynamic(() => import('../_components/password-confirm-username'), {
   loading: () => <LoadingSpinner className="h-full" />,
})
const PasswordSendVerificationToken = dynamic(
   () => import('../_components/password-send-verification-token'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const AdmissionVerificationToken = dynamic(
   () => import('../../signup/_components/admission/admission-verification-token'),
   { loading: () => <LoadingSpinner className="h-full" /> },
)
const NewPassword = dynamic(() => import('../_components/new-password'), {
   loading: () => <LoadingSpinner className="h-full" />,
})
const PasswordResetMotive = dynamic(() => import('../_components/password-reset-motive'), {
   loading: () => <LoadingSpinner className="h-full" />,
})
const PasswordResetSuccess = dynamic(() => import('../_components/password-reset-success'), {
   loading: () => <LoadingSpinner className="h-full" />,
})

const usePasswordResetSteps = (findBy: string, setValue: PasswordResetSetValue) => {
   const { step } = useCreateAccountStore()

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
