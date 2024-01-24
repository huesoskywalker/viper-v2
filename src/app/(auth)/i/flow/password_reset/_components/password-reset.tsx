'use client'
import DialogForm from '@/app/_components/form/dialog-form'
import { PasswordResetFormValues, usePasswordResetForm } from '../_hooks/use-password-reset-form'
import CreateAccountFormBody from '../../_components/create-account-form-body'
import usePasswordRestSteps from '../_hooks/use-password-reset-steps'
import { useCreateAccountStore } from '../../signup/_stores/create-account-store'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import usePasswordResetButtons from '../_hooks/use-password-reset-buttons'
import { Toaster } from '@/components/ui/toaster'
import GlobalDialogFooter from '@/app/_components/dialog/global-dialog-footer'
import { TokenVerificationForm } from '../../signup/_components/admission/token-verification-form'
import { passwordResetFieldValidity } from '../_utils/password-reset-field-validity'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useSubmitAdmissionAcc from '../../_hooks/use-submit-admission-acc'

const PasswordReset = () => {
   const { step, prevStep } = useCreateAccountStore()

   const { passwordResetForm } = usePasswordResetForm()

   const { control, getFieldState, getValues, setValue } = passwordResetForm

   const { renderStep } = usePasswordRestSteps(step, getValues('findBy'), setValue)

   const { renderButton } = usePasswordResetButtons(step, getFieldState, getValues)

   const { isTokenDirty, isTokenValid } = passwordResetFieldValidity(getFieldState)

   const { onSubmit } = useSubmitAdmissionAcc()

   const handleOnSubmit = async (formData: PasswordResetFormValues) => {
      const { findBy, token, confirmPassword, ...restForm } = formData
      await onSubmit(restForm)
   }
   return (
      <>
         <DialogForm
            formReturn={passwordResetForm}
            handleSubmit={handleOnSubmit}
            className={cn(step === 7 && 'justify-stretch pt-5')}
         >
            <CreateAccountFormBody className={cn(step === 7 && 'h-[250px]')}>
               {renderStep}
            </CreateAccountFormBody>
            <Toaster />
            <DialogFormFooter>{step !== 4 && renderButton}</DialogFormFooter>
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
