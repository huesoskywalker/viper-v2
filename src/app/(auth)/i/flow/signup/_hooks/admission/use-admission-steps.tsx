import { useMemo } from 'react'
import { FormDescription } from '@/components/ui/form'
import dynamic from 'next/dynamic'

const AdmissionPersonalInfo = dynamic(
   () => import('../../_components/admission/admission-personal-info'),
)
const AdmissionContentDiscovery = dynamic(
   () => import('../../_components/admission/admission-content-discovery'),
)
const AdmissionInfoCheck = dynamic(
   () => import('../../_components/admission/admission-info-check'),
)
const AdmissionVerificationToken = dynamic(
   () => import('../../_components/admission/admission-verification-token'),
)
const AdmissionPassword = dynamic(() => import('../../_components/admission/admission-password'))

export const useAdmissionSteps = (step: number, email: string) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <AdmissionPersonalInfo />
         case 2:
            return <AdmissionContentDiscovery />
         case 3:
            return <AdmissionInfoCheck />
         case 4:
            return (
               <AdmissionVerificationToken label={'Verification token'}>
                  <FormDescription>Enter it below to verify {email}.</FormDescription>
               </AdmissionVerificationToken>
            )
         case 5:
            return <AdmissionPassword />

         default:
            return null
      }
   }, [step, email])

   return { renderStep }
}
