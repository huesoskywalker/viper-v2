import React, { useMemo } from 'react'
import CreateProfileUsername from '../../_components/profile/create-profile-username'
import CreateProfileAvatar from '../../_components/profile/create-profile-avatar'
import CreateProfileInterests from '../../_components/profile/create-profile-interests'
import { CreateProfileFormValues } from './use-create-profile-form'
import { Control } from 'react-hook-form'

export const useCreateProfileSteps = (
   step: number,
   formControl: Control<CreateProfileFormValues>,
) => {
   const renderSteps = useMemo(() => {
      switch (step) {
         case 1:
            return <CreateProfileUsername formControl={formControl} />
         case 2:
            return <CreateProfileAvatar formControl={formControl} />
         case 3:
            return <CreateProfileInterests formControl={formControl} />
         case 4:
            return null
         default:
            return null
      }
   }, [step])

   return { renderSteps }
}
