import { PasswordResetFieldState } from '../_hooks/use-password-reset-form'

export const passwordResetFieldValidity = (getFieldState: PasswordResetFieldState) => {
   const findByFieldState = getFieldState('findBy')
   const emailFieldState = getFieldState('email')
   const usernameFieldState = getFieldState('username')
   const tokenFieldState = getFieldState('token')
   const confirmPasswordFieldState = getFieldState('confirmPassword')
   const motiveFieldState = getFieldState('passwordResetMotive')

   const isEmailFieldValid = !emailFieldState.invalid
   const isTokenFieldValid = !tokenFieldState.invalid
   const isConfirmPasswordFieldValid = !confirmPasswordFieldState.invalid
   const isMotiveFieldValid = !motiveFieldState.invalid

   const hasEmailError = emailFieldState.error
   const hasTokenError = tokenFieldState.error
   const hasConfirmPasswordError = confirmPasswordFieldState.error
   const hasMotiveError = motiveFieldState.error

   const isFindByDirty = findByFieldState.isDirty
   const isEmailDirty = emailFieldState.isDirty
   const isUsernameDirty = usernameFieldState.isDirty
   const isTokenDirty = tokenFieldState.isDirty
   const isConfirmPasswordDirty = confirmPasswordFieldState.isDirty
   const isMotiveDirty = motiveFieldState.isDirty

   const isEmailValid = isEmailFieldValid && isEmailDirty && !hasEmailError
   const isTokenValid = isTokenFieldValid && isTokenDirty && !hasTokenError
   const isConfirmPasswordValid =
      isConfirmPasswordFieldValid && isConfirmPasswordDirty && !hasConfirmPasswordError
   const isMotiveValid = isMotiveFieldValid && isMotiveDirty && !hasMotiveError

   return {
      isFindByDirty,
      isEmailValid,
      isUsernameDirty,
      isTokenDirty,
      isTokenValid,
      isConfirmPasswordValid,
      isMotiveValid,
   }
}
