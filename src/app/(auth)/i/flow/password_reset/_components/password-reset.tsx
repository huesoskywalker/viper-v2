'use client'
import DialogForm from '@/app/_components/form/dialog-form'
import React, { BaseSyntheticEvent } from 'react'
import { PasswordResetFormValues, usePasswordResetForm } from '../_hooks/use-password-reset-form'
import CreateAccountFormBody from '../../_components/create-account-form-body'
import usePasswordRestSteps from '../_hooks/use-password-reset-steps'
import { useCreateAccountStore } from '../../signup/_stores/create-account-store'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import usePasswordResetButtons from '../_hooks/use-password-reset-buttons'

const PasswordReset = () => {
   const { step } = useCreateAccountStore()

   const { passwordResetForm } = usePasswordResetForm()

   const { control, getFieldState, getValues } = passwordResetForm

   const { renderStep } = usePasswordRestSteps(step, control)

   const { renderButton } = usePasswordResetButtons(step, getFieldState, getValues)

   const onSubmit = async (formData: PasswordResetFormValues, e?: BaseSyntheticEvent) => {
      console.log({ formData })
      if (e) e.preventDefault()
   }

   return (
      <DialogForm formReturn={passwordResetForm} handleSubmit={onSubmit}>
         <CreateAccountFormBody>{renderStep}</CreateAccountFormBody>
         <DialogFormFooter>{renderButton}</DialogFormFooter>
      </DialogForm>
   )
}

export default PasswordReset
