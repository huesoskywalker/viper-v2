'use client'
import { useLayoutEffect } from 'react'
import { useAdmissionForm } from '../../_hooks/admission/use-admission-form'
import { FocusElement, useCreateAccountStore } from '../../_stores/create-account-store'
import { useAdmissionButtons } from '../../_hooks/admission/use-admission-buttons'
import { useAdmissionSteps } from '../../_hooks/admission/use-admission-steps'
import GlobalDialogFooter from '../../../../../../_components/dialog/global-dialog-footer'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import useSubmitAdmissionAcc from '../../../_hooks/use-submit-admission-acc'
import DialogForm from '@/app/_components/form/dialog-form'
import { TokenVerificationForm } from './token-verification-form'
import { admissionFieldValidity } from '../../_utils/admission-field-validity'

const CreateAccountAdmission = () => {
   const { step } = useCreateAccountStore()

   const { admissionForm } = useAdmissionForm()

   const { control, setFocus, getFieldState, getValues } = admissionForm

   const { focusElem } = useCreateAccountStore()

   const { renderStep } = useAdmissionSteps(step, control)

   const { renderButton } = useAdmissionButtons(step, getFieldState)

   const { isVerificationTokenValid } = admissionFieldValidity(getFieldState)

   const validFocusElem: FocusElement[] = ['email', 'name', 'birthDate.month']

   useLayoutEffect(() => {
      if (focusElem && validFocusElem.includes(focusElem)) {
         setFocus(focusElem)
      }
   }, [focusElem])

   const { onSubmit } = useSubmitAdmissionAcc(getValues('password'))

   return (
      <>
         <DialogForm formReturn={admissionForm} handleSubmit={onSubmit}>
            <CreateAccountFormBody>{renderStep}</CreateAccountFormBody>
            <DialogFormFooter>{step !== 4 && renderButton}</DialogFormFooter>
         </DialogForm>
         {step === 4 && (
            <GlobalDialogFooter>
               <TokenVerificationForm
                  token={getValues('token')}
                  email={getValues('email')}
                  disabled={!isVerificationTokenValid}
               />
            </GlobalDialogFooter>
         )}
      </>
   )
}

export default CreateAccountAdmission
