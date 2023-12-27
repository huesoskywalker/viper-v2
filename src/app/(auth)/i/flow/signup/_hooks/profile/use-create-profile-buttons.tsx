import { useMemo } from 'react'
import NextStepButton from '../../_components/next-step-button'
import UploadAvatarImage from '../../_components/profile/upload-avatar-button'
import { CreateProfileFieldState, CreateProfileSetValue } from './use-create-profile-form'
import ProfileInterestsButton from '../../_components/profile/profile-interests-button'
import { createProfileFieldValidity } from '../../_utils/create-profile-field-validity'

export const useCreateProfileButtons = (
   step: number,
   getFieldState: CreateProfileFieldState,
   setValue: CreateProfileSetValue,
) => {
   const { isUsernameValid, isImageValid } = createProfileFieldValidity(getFieldState)

   const validStepMap = new Map<number, boolean>([
      [1, isUsernameValid],
      [2, isImageValid],
   ])

   const disableButton = !validStepMap.get(step)
   const isUsernameDirty = getFieldState('username').isDirty
   const usernameLabel = isUsernameDirty ? undefined : 'Skip for now'
   const usernameVariant = isUsernameDirty ? 'default' : 'outline'

   const renderButton = useMemo(() => {
      switch (step) {
         case 1:
            return (
               <NextStepButton
                  variant={usernameVariant}
                  size={'lg'}
                  label={usernameLabel}
                  disabled={disableButton}
               />
            )
         case 2:
            return <UploadAvatarImage setValue={setValue} />
         case 3:
            return <ProfileInterestsButton />
         case 4:
            return null
         default:
            return null
      }
   }, [step, disableButton, isUsernameDirty])

   return { renderButton }
}
