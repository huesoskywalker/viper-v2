import { UseFormGetFieldState } from 'react-hook-form'
import { CreateAccountFormValues } from '../_hooks/use-create-account-form'

export const checkFieldStateValidity = (
   getFieldState: UseFormGetFieldState<CreateAccountFormValues>,
) => {
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

   const isNameDirty = nameFieldState.isDirty
   const isEmailDirty = emailFieldState.isDirty
   const isMonthDirty = monthFieldState.isDirty
   const isDayDirty = dayFieldState.isDirty
   const isYearDirty = yearFieldState.isDirty
   const isTokenDirty = tokenFieldState.isDirty

   const isNameValid = isNameFieldValid && isNameDirty
   const isEmailValid = isEmailFieldValid && isEmailDirty
   const isMonthValid = isMonthFieldValid && isMonthDirty
   const isDayValid = isDayFieldValid && isDayDirty
   const isYearValid = isYearFieldValid && isYearDirty
   const isBirthDateValid = isMonthValid && isDayValid && isYearValid
   const isTokenValid = isTokenFieldValid && isTokenDirty

   const isStepOneValid = isNameValid && isEmailValid && isBirthDateValid

   const isStepFourValid = isStepOneValid && isTokenValid

   return { isStepOneValid, isStepFourValid }
}
