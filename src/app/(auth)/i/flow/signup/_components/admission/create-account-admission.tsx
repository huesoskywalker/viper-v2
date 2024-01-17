'use client'
import { useLayoutEffect, useMemo } from 'react'
import { AdmissionFormValues, useAdmissionForm } from '../../_hooks/admission/use-admission-form'
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
import { useRouter } from 'next/navigation'

const CreateAccountAdmission = () => {
   const { step, redirectStep } = useCreateAccountStore()

   const { admissionForm } = useAdmissionForm()

   const { control, setFocus, getFieldState, getValues } = admissionForm

   const { focusElem } = useCreateAccountStore()

   const { renderStep } = useAdmissionSteps(step, control)

   const { renderButton } = useAdmissionButtons(step, getFieldState)

   const { isVerificationTokenValid } = admissionFieldValidity(getFieldState)

   const validFocusElem: FocusElement[] = useMemo(() => ['email', 'name', 'birthDate.month'], [])

   useLayoutEffect(() => {
      if (focusElem && validFocusElem.includes(focusElem)) {
         void setFocus(focusElem)
      }
   }, [focusElem, validFocusElem])

   const { onSubmit } = useSubmitAdmissionAcc()

   const { refresh } = useRouter()

   const handleOnSubmit = async (formData: AdmissionFormValues) => {
      const { token, ...restForm } = formData

      await onSubmit(restForm)

      await Promise.all([redirectStep(1), refresh()])
   }

   return (
      <>
         <DialogForm formReturn={admissionForm} handleSubmit={handleOnSubmit}>
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
