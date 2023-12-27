import React from 'react'
import { ProviderAdmissionFieldState } from '../_hooks/provider-admission/use-provier-admission-form'

const providerAdmissionFieldValidity = (getFieldState: ProviderAdmissionFieldState) => {
   const monthFieldState = getFieldState('birthDate.month')
   const dayFieldState = getFieldState('birthDate.day')
   const yearFieldState = getFieldState('birthDate.year')
   const usernameFieldState = getFieldState('username')

   const isMonthFieldValid = !monthFieldState.invalid
   const isDayFieldValid = !dayFieldState.invalid
   const isYearFieldValid = !yearFieldState.invalid
   const isUsernameFieldValid = !usernameFieldState.invalid

   const hasMonthError = monthFieldState.error
   const hasDayError = dayFieldState.error
   const hasYearError = yearFieldState.error
   const hasUsernameError = usernameFieldState.error

   const isMonthDirty = monthFieldState.isDirty
   const isDayDirty = dayFieldState.isDirty
   const isYearDirty = yearFieldState.isDirty

   const isMonthValid = isMonthFieldValid && isMonthDirty && !hasMonthError
   const isDayValid = isDayFieldValid && isDayDirty && !hasDayError
   const isYearValid = isYearFieldValid && isYearDirty && !hasYearError
   const isBirthDateValid = isMonthValid && isDayValid && isYearValid

   const isUsernameValid = isUsernameFieldValid && !hasUsernameError

   return { isBirthDateValid, isUsernameValid }
}

export default providerAdmissionFieldValidity
