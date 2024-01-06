import { ProviderProfileFieldState } from '../_hooks/provider/use-provider-profile-form'

const providerProfileFieldValidity = (getFieldState: ProviderProfileFieldState) => {
   const monthFieldState = getFieldState('birthDate.month')
   const dayFieldState = getFieldState('birthDate.day')
   const yearFieldState = getFieldState('birthDate.year')
   const bioFieldState = getFieldState('bio')
   const usernameFieldState = getFieldState('username')

   const isMonthFieldValid = !monthFieldState.invalid
   const isDayFieldValid = !dayFieldState.invalid
   const isYearFieldValid = !yearFieldState.invalid
   const isBioFieldValid = !bioFieldState.invalid
   const isUsernameFieldValid = !usernameFieldState.invalid

   const hasMonthError = monthFieldState.error
   const hasDayError = dayFieldState.error
   const hasYearError = yearFieldState.error
   const hasBioError = bioFieldState.error
   const hasUsernameError = usernameFieldState.error

   const isMonthDirty = monthFieldState.isDirty
   const isDayDirty = dayFieldState.isDirty
   const isYearDirty = yearFieldState.isDirty
   const isBioDirty = bioFieldState.isDirty
   const isUsernameDirty = usernameFieldState.isDirty

   const isMonthValid = isMonthFieldValid && isMonthDirty && !hasMonthError
   const isDayValid = isDayFieldValid && isDayDirty && !hasDayError
   const isYearValid = isYearFieldValid && isYearDirty && !hasYearError
   const isBirthDateValid = isMonthValid && isDayValid && isYearValid

   const isBioValid = isBioFieldValid && !hasBioError
   const isUsernameValid = isUsernameFieldValid && !hasUsernameError

   return { isBirthDateValid, isBioDirty, isBioValid, isUsernameDirty, isUsernameValid }
}

export default providerProfileFieldValidity
