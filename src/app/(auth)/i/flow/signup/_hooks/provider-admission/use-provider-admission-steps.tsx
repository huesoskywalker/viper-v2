import React, { useMemo } from 'react'
import { Control } from 'react-hook-form'
import { ProviderAdmissionFormValues } from './use-provider-admission-form'
import ProviderAdmissionBirthDate from '../../_components/provider-admission/provider-admission-birth-date'
import AdmissionContentDiscovery from '../../_components/admission/admission-content-discovery'
import CreateProfileUsername from '../../_components/profile/create-profile-username'
import CreateProfileInterests from '../../_components/profile/create-profile-interests'
import CreateProfileBio from '../../_components/profile/create-profile-bio'

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
            return <CreateProfileBio formControl={formControl} />
         case 4:
            return <CreateProfileUsername formControl={formControl} />
         case 5:
            return <CreateProfileInterests formControl={formControl} />
         default:
            return null
      }
   }, [step])

   return { renderStep }
}

export default useProviderAdmissionSteps
