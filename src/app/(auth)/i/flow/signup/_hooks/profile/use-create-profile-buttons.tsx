import { useMemo } from 'react'
import NextStepButton from '../../_components/next-step-button'
import UploadAvatarImage from '../../_components/profile/upload-avatar-button'
import { CreateProfileFieldState } from './use-create-profile-form'
import { isCreateProfileFieldValid } from '../../_utils/is-create-profile-field-valid'

export const useCreateProfileButtons = (step: number, getFieldState: CreateProfileFieldState) => {
   const { isStepOneValid, isStepTwoValid } = isCreateProfileFieldValid(getFieldState)

   const validStepsMap = new Map<number, boolean>([
      [1, isStepOneValid],
      [2, isStepTwoValid],
      //   [3, isStepOneValid],
      //   [4, isStepFourValid],
   ])

   const disableButton = !validStepsMap.get(step)

   const renderButtons = useMemo(() => {
      switch (step) {
         case 1:
            return <NextStepButton disabled={disableButton} />
         case 2:
            return <UploadAvatarImage />
         case 3:
            return null
         default:
            return null
      }
   }, [step, disableButton])

   return { renderButtons }
}
