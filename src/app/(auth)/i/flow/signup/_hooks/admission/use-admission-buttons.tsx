import { useMemo } from 'react'
import NextStepButton from '../../../_components/next-step-button'
import { TokenVerificationForm } from '../../_components/admission/token-verification-form'
import { EmailSignUpSection } from '../../_components/admission/email-sign-up-section'
import { AdmissionFieldState, AdmissionFieldValue } from './use-admission-form'
import { admissionFieldValidity } from '../../_utils/admission-field-validity'
import AdmissionSubmitButton from '../../_components/admission/admission-submit-button'

export const useAdmissionButtons = (step: number, getFieldState: AdmissionFieldState) => {
   const { isPersonalInfoValid } = admissionFieldValidity(getFieldState)

   const validStepMap = new Map<number, boolean>([
      [1, isPersonalInfoValid],
      [2, isPersonalInfoValid],
   ])

   const disableButton = !validStepMap.get(step)

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
         case 2:
            return <NextStepButton size={'lg'} disabled={disableButton} />
         case 3:
            return <EmailSignUpSection />
         case 4:
            return null
         case 5:
            return <AdmissionSubmitButton />
         default:
            return null
      }
   }, [step, disableButton])

   return { renderButton }
}
