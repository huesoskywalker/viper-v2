'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { emailRegex } from '../../_utils/regex'
import dynamic from 'next/dynamic'
import LoadingSpinner from '@/app/_components/loading/loading-spinner'

const PasswordConfirmEmail = dynamic(() => import('../_components/password-confirm-email'), {
   loading: () => <LoadingSpinner className="h-full" />,
})
const PasswordConfirmUsername = dynamic(() => import('../_components/password-confirm-username'), {
   loading: () => <LoadingSpinner className="h-full" />,
})

const PasswordConfirmCredential = () => {
   const { getValues, setValue } = useFormContext<PasswordResetFormValues>()

   const findBy = getValues('findBy')
   const isEmailValue = emailRegex.test(findBy)
   const formField = isEmailValue ? 'email' : 'username'

   setValue(formField, findBy)

   return <>{isEmailValue ? <PasswordConfirmUsername /> : <PasswordConfirmEmail />}</>
}

export default PasswordConfirmCredential
