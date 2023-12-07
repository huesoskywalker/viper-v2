import React, { useMemo } from 'react'
import AdmissionPersonalInfo from '../../_components/admission/admission-personal-info'
import AdmissionContentDiscovery from '../../_components/admission/admission-content-discovery'
import AdmissionInfoCheck from '../../_components/admission/admission-info-check'
import AdmissionVerificationToken from '../../_components/admission/admission-verification-token'
import { AdmissionFormControl } from './use-admission-form'
import AdmissionPassword from '../../_components/admission/admission-password'

export const useAdmissionSteps = (step: number, formControl: AdmissionFormControl) => {
   const renderSteps = useMemo(() => {
      switch (step) {
         case 1:
            return <AdmissionPersonalInfo formControl={formControl} />
         case 2:
            return <AdmissionContentDiscovery formControl={formControl} />
         case 3:
            return <AdmissionInfoCheck formControl={formControl} />
         case 4:
            return <AdmissionVerificationToken formControl={formControl} />
         case 5:
            return <AdmissionPassword formControl={formControl} />

         default:
            return null
      }
   }, [step])

   return { renderSteps }
}
