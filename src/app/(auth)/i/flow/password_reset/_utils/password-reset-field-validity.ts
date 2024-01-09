import { PasswordResetFieldState } from '../_hooks/use-password-reset-form'

export const passwordResetFieldValidity = (getFieldState: PasswordResetFieldState) => {
   const findByFieldState = getFieldState('findBy')
   const emailFieldState = getFieldState('email')
   const usernameFieldState = getFieldState('username')

   const isFindByFieldValid = !findByFieldState.invalid
   const isEmailFieldValid = !emailFieldState.invalid
   const isUsernameFieldValid = !usernameFieldState.invalid

   const hasFindByError = findByFieldState.error
   const hasEmailError = emailFieldState.error
   const hasUsernameError = usernameFieldState.error

   const isFindByDirty = findByFieldState.isDirty
   const isEmailDirty = emailFieldState.isDirty
   const isUsernameDirty = usernameFieldState.isDirty

   const isFindByValid = isFindByFieldValid && isFindByDirty && !hasFindByError
   const isEmailValid = isEmailFieldValid && isEmailDirty && !hasEmailError
   const isUsernameValid = isUsernameFieldValid && isUsernameDirty && !hasUsernameError

   return { isFindByValid, isEmailValid, isUsernameValid }
}
