import { useMemo } from 'react'
import NextStepButton from '../../_components/next-step-button'
import UploadAvatarImage from '../../_components/profile/upload-avatar-button'
import { CreateProfileFieldState, CreateProfileSetValue } from './use-create-profile-form'
import { isCreateProfileFieldValid } from '../../_utils/is-create-profile-field-valid'

export const useCreateProfileButtons = (
   step: number,
   getFieldState: CreateProfileFieldState,
   setValue: CreateProfileSetValue,
) => {
   const { isStepOneValid, isStepTwoValid } = isCreateProfileFieldValid(getFieldState)

   const validStepsMap = new Map<number, boolean>([
      [1, isStepOneValid],
      [2, isStepTwoValid],
   ])

   const disableButton = !validStepsMap.get(step)
   const isUsernameDirty = getFieldState('username').isDirty
   const usernameLabel = isUsernameDirty ? undefined : 'Skip for now'
   const usernameVariant = isUsernameDirty ? 'default' : 'outline'

   const renderButtons = useMemo(() => {
      switch (step) {
         case 1:
            return (
               <NextStepButton
                  disabled={disableButton}
                  variant={usernameVariant}
                  label={usernameLabel}
               />
            )
         case 2:
            return <UploadAvatarImage setValue={setValue} />
         default:
            return null
      }
   }, [step, disableButton, isUsernameDirty])

   return { renderButtons }
}
