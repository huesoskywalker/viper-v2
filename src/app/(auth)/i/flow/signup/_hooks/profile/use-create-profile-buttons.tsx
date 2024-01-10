import { useMemo } from 'react'
import NextStepButton from '../../../_components/next-step-button'
import UploadAvatarImage from '../../_components/profile/upload-avatar-button'
import { CreateProfileFieldState, CreateProfileSetValue } from './use-create-profile-form'
import ProfileInterestsButton from '../../_components/profile/profile-interests-button'
import { createProfileFieldValidity } from '../../_utils/create-profile-field-validity'

export const useCreateProfileButtons = (step: number, getFieldState: CreateProfileFieldState) => {
   const { isBioValid, isBioDirty, isUsernameValid, isUsernameDirty, isImageValid } =
      createProfileFieldValidity(getFieldState)

   const validStepMap = new Map<number, boolean>([
      [1, isBioValid],
      [2, isUsernameValid],
      [3, isImageValid],
   ])

   const disableButton = !validStepMap.get(step)

   const bioVariant = isBioDirty ? 'default' : 'outline'
   const bioLabel = isBioDirty ? undefined : 'Skip for now'

   const usernameVariant = isUsernameDirty ? 'default' : 'outline'
   const usernameLabel = isUsernameDirty ? undefined : 'Skip for now'

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
            return (
               <NextStepButton
                  variant={bioVariant}
                  size={'lg'}
                  label={bioLabel}
                  disabled={disableButton}
               />
            )
         case 2:
            return (
               <NextStepButton
                  variant={usernameVariant}
                  size={'lg'}
                  label={usernameLabel}
                  disabled={disableButton}
               />
            )
         case 3:
            return <UploadAvatarImage />
         case 4:
            return <ProfileInterestsButton />
         case 5:
            return null
         default:
            return null
      }
   }, [step, disableButton, isUsernameDirty, isBioDirty])

   return { renderButton }
}
