import React, { useMemo } from 'react'
import ProfileContentDiscovery from '../../_components/admission/admission-content-discovery'
import CreateProfileUsername from '../../_components/profile/create-profile-username'
import CreateProfileInterests from '../../_components/profile/create-profile-interests'
import CreateProfileBio from '../../_components/profile/create-profile-bio'
import ProviderProfileBirthDate from '../../_components/provider/provider-profile-birth-date'

const useProviderProfileSteps = (step: number) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <ProviderProfileBirthDate />
         case 2:
            return <ProfileContentDiscovery />
         case 3:
            return <CreateProfileBio />
         case 4:
            return <CreateProfileUsername />
         case 5:
            return <CreateProfileInterests />
         default:
            return null
      }
   }, [step])

   return { renderStep }
}

export default useProviderProfileSteps
