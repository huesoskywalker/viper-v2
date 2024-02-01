'use client'
import DialogForm from '@/app/_components/form/dialog-form'
import { PasswordResetFormValues, usePasswordResetForm } from '../_hooks/use-password-reset-form'
import CreateAccountFormBody from '../../_components/create-account-form-body'
import usePasswordResetSteps from '../_hooks/use-password-reset-steps'
import usePasswordResetButtons from '../_hooks/use-password-reset-buttons'
import useSubmitAdmissionAcc from '../../_hooks/use-submit-admission-acc'
import dynamic from 'next/dynamic'
import { BaseSyntheticEvent } from 'react'

const DialogFormFooter = dynamic(() => import('@/app/_components/form/dialog-form-footer'))

const Toaster = dynamic(() => import('@/components/ui/toaster').then((mod) => mod.Toaster))

const PasswordReset = () => {
   const { passwordResetForm } = usePasswordResetForm()

   const { getFieldState } = passwordResetForm

   const { renderStep } = usePasswordResetSteps()

   const { renderButton } = usePasswordResetButtons(getFieldState)

   const { onSubmit } = useSubmitAdmissionAcc()

   const handleOnSubmit = async (formData: PasswordResetFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault()

      const { findBy, token, confirmPassword, ...restForm } = formData

      try {
         await onSubmit(restForm)
      } catch (error) {
         throw new Error(
            error instanceof Error ? error.message : 'Something went wrong. Please try again.',
         )
      }
   }
   return (
      <>
         <DialogForm formReturn={passwordResetForm} handleSubmit={handleOnSubmit}>
            <CreateAccountFormBody>{renderStep}</CreateAccountFormBody>
            <Toaster />
            <DialogFormFooter>{renderButton}</DialogFormFooter>
         </DialogForm>
      </>
   )
}

export default PasswordReset
