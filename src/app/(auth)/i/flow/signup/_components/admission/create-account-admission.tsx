'use client'
import { useLayoutEffect } from 'react'
import { AdmissionFormValues, useAdmissionForm } from '../../_hooks/admission/use-admission-form'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useAdmissionButtons } from '../../_hooks/admission/use-admission-buttons'
import { useAdmissionSteps } from '../../_hooks/admission/use-admission-steps'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import useSubmitAdmissionAcc from '../../../_hooks/use-submit-admission-acc'
import DialogForm from '@/app/_components/form/dialog-form'
import { admissionFieldValidity } from '../../_utils/admission-field-validity'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const GlobalDialogFooter = dynamic(
   () => import('../../../../../../_components/dialog/global-dialog-footer'),
)
const TokenVerificationForm = dynamic(() => import('./token-verification-form'))

const CreateAccountAdmission = () => {
   const { step, redirectStep } = useCreateAccountStore()

   const { admissionForm } = useAdmissionForm()

   const { setFocus, getFieldState, getValues } = admissionForm

   const { focusElem } = useCreateAccountStore()

   const { renderStep } = useAdmissionSteps(step, getValues('email'))

   const { renderButton } = useAdmissionButtons(step, getFieldState)

   const { isVerificationTokenValid } = admissionFieldValidity(getFieldState)

   useLayoutEffect(() => {
      if (focusElem) {
         void setFocus(focusElem)
      }
   }, [focusElem])

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
