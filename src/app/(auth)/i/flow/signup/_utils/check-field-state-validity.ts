import { CreateAccountFormFieldState } from '../_hooks/use-create-account-form'

export const checkFieldStateValidity = (getFieldState: CreateAccountFormFieldState) => {
   const nameFieldState = getFieldState('name')
   const emailFieldState = getFieldState('email')
   const monthFieldState = getFieldState('birthDate.month')
   const dayFieldState = getFieldState('birthDate.day')
   const yearFieldState = getFieldState('birthDate.year')
   const tokenFieldState = getFieldState('token')
   const passwordFieldState = getFieldState('password')
   const usernameFieldState = getFieldState('username')

   const isNameFieldValid = !nameFieldState.invalid
   const isEmailFieldValid = !emailFieldState.invalid
   const isMonthFieldValid = !monthFieldState.invalid
   const isDayFieldValid = !dayFieldState.invalid
   const isYearFieldValid = !yearFieldState.invalid
   const isTokenFieldValid = !tokenFieldState.invalid
   const isPasswordFieldValid = !passwordFieldState.invalid
   const isUsernameFieldValid = !usernameFieldState.invalid

   const hasNameError = nameFieldState.error
   const hasEmailError = emailFieldState.error
   const hasMonthError = monthFieldState.error
   const hasDayError = dayFieldState.error
   const hasYearError = yearFieldState.error
   const hasTokenError = tokenFieldState.error
   const hasPasswordError = passwordFieldState.error
   const hasUsernameError = usernameFieldState.error

   const isNameDirty = nameFieldState.isDirty
   const isEmailDirty = emailFieldState.isDirty
   const isMonthDirty = monthFieldState.isDirty
   const isDayDirty = dayFieldState.isDirty
   const isYearDirty = yearFieldState.isDirty
   const isTokenDirty = tokenFieldState.isDirty
   const isPasswordDirty = passwordFieldState.isDirty

   const isNameValid = isNameFieldValid && isNameDirty && !hasNameError
   const isEmailValid = isEmailFieldValid && isEmailDirty && !hasEmailError
   const isMonthValid = isMonthFieldValid && isMonthDirty && !hasMonthError
   const isDayValid = isDayFieldValid && isDayDirty && !hasDayError
   const isYearValid = isYearFieldValid && isYearDirty && !hasYearError
   const isBirthDateValid = isMonthValid && isDayValid && isYearValid
   const isTokenValid = isTokenFieldValid && isTokenDirty && !hasTokenError
   const isPasswordValid = isPasswordFieldValid && isPasswordDirty && !hasPasswordError
   const isUsernameValid = isUsernameFieldValid && !hasUsernameError

   const isStepOneValid = isNameValid && isEmailValid && isBirthDateValid

   const isStepFourValid = isTokenValid

   const isStepFiveValid = isPasswordValid

   const isStepSixValid = isUsernameValid

   return { isStepOneValid, isStepFourValid, isStepFiveValid, isStepSixValid }
}
