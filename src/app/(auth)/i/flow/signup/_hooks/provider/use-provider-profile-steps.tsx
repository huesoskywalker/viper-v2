import React, { useMemo } from 'react'
import { Control } from 'react-hook-form'
import { ProviderProfileFormValues } from './use-provider-profile-form'
import ProfileContentDiscovery from '../../_components/admission/admission-content-discovery'
import CreateProfileUsername from '../../_components/profile/create-profile-username'
import CreateProfileInterests from '../../_components/profile/create-profile-interests'
import CreateProfileBio from '../../_components/profile/create-profile-bio'
import ProviderProfileBirthDate from '../../_components/provider/provider-profile-birth-date'

const useProviderProfileSteps = (
   step: number,
   formControl: Control<ProviderProfileFormValues>,
) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <ProviderProfileBirthDate formControl={formControl} />
         case 2:
            return <ProfileContentDiscovery formControl={formControl} />
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

export default useProviderProfileSteps
