import React, { useMemo } from 'react'
import AdmissionPersonalInfo from '../../_components/admission/admission-personal-info'
import AdmissionContentDiscovery from '../../_components/admission/admission-content-discovery'
import AdmissionInfoCheck from '../../_components/admission/admission-info-check'
import AdmissionVerificationToken from '../../_components/admission/admission-verification-token'
import AdmissionPassword from '../../_components/admission/admission-password'
import { AdmissionFormValues } from './use-admission-form'
import { Control } from 'react-hook-form'
import { FormDescription } from '@/components/ui/form'

export const useAdmissionSteps = (step: number, formControl: Control<AdmissionFormValues>) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <AdmissionPersonalInfo formControl={formControl} />
         case 2:
            return <AdmissionContentDiscovery formControl={formControl} />
         case 3:
            return <AdmissionInfoCheck formControl={formControl} />
         case 4:
            const email = formControl._formValues['email']
            return (
               <AdmissionVerificationToken formControl={formControl} label={'Verification token'}>
                  <FormDescription>Enter it below to verify {email}.</FormDescription>
               </AdmissionVerificationToken>
            )
         case 5:
            return <AdmissionPassword formControl={formControl} />

         default:
            return null
      }
   }, [step])

   return { renderStep }
}
