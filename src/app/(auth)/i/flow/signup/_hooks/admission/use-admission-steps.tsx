import React, { useMemo } from 'react'
import AdmissionPersonalInfo from '../../_components/admission/admission-personal-info'
import AdmissionContentDiscovery from '../../_components/admission/admission-content-discovery'
import AdmissionInfoCheck from '../../_components/admission/admission-info-check'
import AdmissionVerificationToken from '../../_components/admission/admission-verification-token'
import AdmissionPassword from '../../_components/admission/admission-password'
import { FormDescription } from '@/components/ui/form'

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
   }, [step])

   return { renderStep }
}
