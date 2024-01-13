import { PasswordResetFieldState } from '../_hooks/use-password-reset-form'

export const passwordResetFieldValidity = (getFieldState: PasswordResetFieldState) => {
   const findByFieldState = getFieldState('findBy')
   const emailFieldState = getFieldState('email')
   const usernameFieldState = getFieldState('username')
   const tokenFieldState = getFieldState('token')
   const confirmPasswordFieldState = getFieldState('confirmPassword')
   const motiveFieldState = getFieldState('resetPasswordMotive')

   const isFindByFieldValid = !findByFieldState.invalid
   const isEmailFieldValid = !emailFieldState.invalid
   const isUsernameFieldValid = !usernameFieldState.invalid
   const isTokenFieldValid = !tokenFieldState.invalid
   const isConfirmPasswordFieldValid = !confirmPasswordFieldState.invalid
   const isMotiveFieldValid = !motiveFieldState.invalid

   const hasFindByError = findByFieldState.error
   const hasEmailError = emailFieldState.error
   const hasUsernameError = usernameFieldState.error
   const hasTokenError = tokenFieldState.error
   const hasConfirmPasswordError = confirmPasswordFieldState.error
   const hasMotiveError = motiveFieldState.error

   const isFindByDirty = findByFieldState.isDirty
   const isEmailDirty = emailFieldState.isDirty
   const isUsernameDirty = usernameFieldState.isDirty
   const isTokenDirty = tokenFieldState.isDirty
   const isConfirmPasswordDirty = confirmPasswordFieldState.isDirty
   const isMotiveDirty = motiveFieldState.isDirty

   const isFindByValid = isFindByFieldValid && isFindByDirty && !hasFindByError
   const isEmailValid = isEmailFieldValid && isEmailDirty && !hasEmailError
   const isUsernameValid = isUsernameFieldValid && isUsernameDirty && !hasUsernameError
   const isTokenValid = isTokenFieldValid && isTokenDirty && !hasTokenError
   const isConfirmPasswordValid =
      isConfirmPasswordFieldValid && isConfirmPasswordDirty && !hasConfirmPasswordError
   const isMotiveValid = isMotiveFieldValid && isMotiveDirty && !hasMotiveError

   return {
      isFindByValid,
      isEmailValid,
      isUsernameValid,
      isTokenDirty,
      isTokenValid,
      isConfirmPasswordValid,
      isMotiveValid,
   }
}
