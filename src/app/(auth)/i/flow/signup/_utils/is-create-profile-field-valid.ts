import { CreateProfileFieldState } from '../_hooks/profile/use-create-profile-form'

export const isCreateProfileFieldValid = (getFieldState: CreateProfileFieldState) => {
   const usernameFieldState = getFieldState('username')
   const imageFieldState = getFieldState('image')

   const isUsernameFieldValid = !usernameFieldState.invalid
   const isImageFieldValid = !imageFieldState.invalid

   const hasUsernameError = usernameFieldState.error
   const hasImageError = imageFieldState.error

   const isImageDirty = imageFieldState.isDirty

   const isUsernameValid = isUsernameFieldValid && !hasUsernameError
   const isImageValid = isImageFieldValid && isImageDirty && !hasImageError

   const isStepOneValid = isUsernameValid

   const isStepTwoValid = isImageValid

   return { isStepOneValid, isStepTwoValid }
}
