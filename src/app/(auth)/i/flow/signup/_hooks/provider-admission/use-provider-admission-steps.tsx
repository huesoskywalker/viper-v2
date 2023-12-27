import React, { useMemo } from 'react'
import { Control } from 'react-hook-form'
import { ProviderAdmissionFormValues } from './use-provier-admission-form'
import ProviderAdmissionBirthDate from '../../_components/provider-admission/provider-admission-birth-date'
import AdmissionContentDiscovery from '../../_components/admission/admission-content-discovery'
import CreateProfileUsername from '../../_components/profile/create-profile-username'
import CreateProfileInterests from '../../_components/profile/create-profile-interests'

const useProviderAdmissionSteps = (
   step: number,
   formControl: Control<ProviderAdmissionFormValues>,
) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <ProviderAdmissionBirthDate formControl={formControl} />
         case 2:
            return <AdmissionContentDiscovery formControl={formControl} />
         case 3:
            return <CreateProfileUsername formControl={formControl} />
         case 4:
            return <CreateProfileInterests formControl={formControl} />
         default:
            return null
      }
   }, [step])

   return { renderStep }
}

export default useProviderAdmissionSteps
