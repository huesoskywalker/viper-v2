import { AdmissionFieldState } from '../_hooks/admission/use-admission-form'

export const isAdmissionFieldValid = (getFieldState: AdmissionFieldState) => {
   const nameFieldState = getFieldState('name')
   const emailFieldState = getFieldState('email')
   const monthFieldState = getFieldState('birthDate.month')
   const dayFieldState = getFieldState('birthDate.day')
   const yearFieldState = getFieldState('birthDate.year')
   const tokenFieldState = getFieldState('token')

   const isNameFieldValid = !nameFieldState.invalid
   const isEmailFieldValid = !emailFieldState.invalid
   const isMonthFieldValid = !monthFieldState.invalid
   const isDayFieldValid = !dayFieldState.invalid
   const isYearFieldValid = !yearFieldState.invalid
   const isTokenFieldValid = !tokenFieldState.invalid

   const hasNameError = nameFieldState.error
   const hasEmailError = emailFieldState.error
   const hasMonthError = monthFieldState.error
   const hasDayError = dayFieldState.error
   const hasYearError = yearFieldState.error
   const hasTokenError = tokenFieldState.error

   const isNameDirty = nameFieldState.isDirty
   const isEmailDirty = emailFieldState.isDirty
   const isMonthDirty = monthFieldState.isDirty
   const isDayDirty = dayFieldState.isDirty
   const isYearDirty = yearFieldState.isDirty
   const isTokenDirty = tokenFieldState.isDirty

   const isNameValid = isNameFieldValid && isNameDirty && !hasNameError
   const isEmailValid = isEmailFieldValid && isEmailDirty && !hasEmailError
   const isMonthValid = isMonthFieldValid && isMonthDirty && !hasMonthError
   const isDayValid = isDayFieldValid && isDayDirty && !hasDayError
   const isYearValid = isYearFieldValid && isYearDirty && !hasYearError
   const isBirthDateValid = isMonthValid && isDayValid && isYearValid
   const isTokenValid = isTokenFieldValid && isTokenDirty && !hasTokenError

   const isStepOneValid = isNameValid && isEmailValid && isBirthDateValid

   const isStepFourValid = isTokenValid

   return { isStepOneValid, isStepFourValid }
}
