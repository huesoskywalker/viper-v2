'use client'
import DialogForm from '@/app/_components/form/dialog-form'
import { PasswordResetFormValues, usePasswordResetForm } from '../_hooks/use-password-reset-form'
import CreateAccountFormBody from '../../_components/create-account-form-body'
import usePasswordResetSteps from '../_hooks/use-password-reset-steps'
import { useCreateAccountStore } from '../../signup/_stores/create-account-store'
import usePasswordResetButtons from '../_hooks/use-password-reset-buttons'
import { Toaster } from '@/components/ui/toaster'
import { passwordResetFieldValidity } from '../_utils/password-reset-field-validity'
import { Button } from '@/components/ui/button'
import useSubmitAdmissionAcc from '../../_hooks/use-submit-admission-acc'
import dynamic from 'next/dynamic'
import { BaseSyntheticEvent } from 'react'

const GlobalDialogFooter = dynamic(() => import('@/app/_components/dialog/global-dialog-footer'))
const DialogFormFooter = dynamic(() => import('@/app/_components/form/dialog-form-footer'))
const TokenVerificationForm = dynamic(
   () => import('../../signup/_components/admission/token-verification-form'),
)

const PasswordReset = () => {
   const { step, prevStep } = useCreateAccountStore()

   const { passwordResetForm } = usePasswordResetForm()

   const { getFieldState, getValues, setValue } = passwordResetForm

   const { renderStep } = usePasswordResetSteps(getValues('findBy'), setValue)

   const { renderButton } = usePasswordResetButtons(getFieldState, getValues)

   const { isTokenDirty, isTokenValid } = passwordResetFieldValidity(getFieldState)

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
            {step !== 4 && <DialogFormFooter>{renderButton}</DialogFormFooter>}
         </DialogForm>
         {step === 4 && (
            <GlobalDialogFooter>
               {isTokenDirty ? (
                  <TokenVerificationForm
                     token={getValues('token')}
                     email={getValues('email')}
                     disabled={!isTokenValid}
                  />
               ) : (
                  <Button onClick={prevStep} type="button" variant={'outline'} size={'lg'}>
                     Back
                  </Button>
               )}
            </GlobalDialogFooter>
         )}
      </>
   )
}

export default PasswordReset
