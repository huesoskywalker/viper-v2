import { CreateProfileFieldState } from '../_hooks/profile/use-create-profile-form'

export const createProfileFieldValidity = (getFieldState: CreateProfileFieldState) => {
   const bioFieldState = getFieldState('bio')
   const usernameFieldState = getFieldState('username')
   const imageFieldState = getFieldState('image')

   const isBioFieldValid = !bioFieldState.invalid
   const isUsernameFieldValid = !usernameFieldState.invalid
   const isImageFieldValid = !imageFieldState.invalid

   const hasBioError = bioFieldState.error
   const hasUsernameError = usernameFieldState.error
   const hasImageError = imageFieldState.error

   const isBioDirty = bioFieldState.isDirty
   const isImageDirty = imageFieldState.isDirty
   const isUsernameDirty = usernameFieldState.isDirty

   const isBioValid = isBioFieldValid && !hasBioError
   const isUsernameValid = isUsernameFieldValid && !hasUsernameError
   const isImageValid = isImageFieldValid && isImageDirty && !hasImageError

   return { isBioValid, isBioDirty, isUsernameValid, isUsernameDirty, isImageValid }
}
