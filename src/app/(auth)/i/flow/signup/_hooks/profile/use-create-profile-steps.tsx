import React, { useMemo } from 'react'
import CreateProfileUsername from '../../_components/profile/create-profile-username'
import CreateProfileAvatar from '../../_components/profile/create-profile-avatar'
import CreateProfileInterests from '../../_components/profile/create-profile-interests'
import { CreateProfileFormValues } from './use-create-profile-form'
import { Control } from 'react-hook-form'
import CreateProfileBio from '../../_components/profile/create-profile-bio'

export const useCreateProfileSteps = (
   step: number,
   formControl: Control<CreateProfileFormValues>,
) => {
   const renderStep = useMemo(() => {
      switch (step) {
         case 1:
            return <CreateProfileBio formControl={formControl} />
         case 2:
            return <CreateProfileUsername formControl={formControl} />
         case 3:
            return <CreateProfileAvatar formControl={formControl} />
         case 4:
            return <CreateProfileInterests formControl={formControl} />
         case 5:
            return null
         default:
            return null
      }
   }, [step])

   return { renderStep }
}
