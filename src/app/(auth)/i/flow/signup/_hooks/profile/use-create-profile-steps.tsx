import React, { useMemo } from 'react'
import CreateProfileUsername from '../../_components/profile/create-profile-username'
import CreateProfileAvatar from '../../_components/profile/create-profile-avatar'
import CreateProfileInterests from '../../_components/profile/create-profile-interests'
import CreateProfileBio from '../../_components/profile/create-profile-bio'

export const useCreateProfileSteps = (step: number) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <CreateProfileBio />
         case 2:
            return <CreateProfileUsername />
         case 3:
            return <CreateProfileAvatar />
         case 4:
            return <CreateProfileInterests />
         case 5:
            return null
         default:
            return null
      }
   }, [step])

   return { renderStep }
}
