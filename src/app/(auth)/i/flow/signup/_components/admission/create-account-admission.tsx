'use client'
import { BaseSyntheticEvent, useLayoutEffect } from 'react'
import { AdmissionFormValues, useAdmissionForm } from '../../_hooks/admission/use-admission-form'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useAdmissionButtons } from '../../_hooks/admission/use-admission-buttons'
import { useAdmissionSteps } from '../../_hooks/admission/use-admission-steps'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import DialogForm from '@/app/_components/form/dialog-form'
import { admissionFieldValidity } from '../../_utils/admission-field-validity'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import useSubmitAdmissionAcc from '../../../_hooks/use-submit-admission-acc'

const DialogFormFooter = dynamic(() => import('@/app/_components/form/dialog-form-footer'))
const GlobalDialogFooter = dynamic(
   () => import('../../../../../../_components/dialog/global-dialog-footer'),
)
const TokenVerificationForm = dynamic(() => import('./token-verification-form'))

const CreateAccountAdmission = () => {
   const { step, redirectStep } = useCreateAccountStore()

   const { admissionForm } = useAdmissionForm()

   const { setFocus, getFieldState, getValues } = admissionForm

   const { focusElem } = useCreateAccountStore()

   const { renderStep } = useAdmissionSteps(getValues('email'))

   const { renderButton } = useAdmissionButtons(getFieldState)

   const { isVerificationTokenValid } = admissionFieldValidity(getFieldState)

   useLayoutEffect(() => {
      if (focusElem) {
         void setFocus(focusElem)
      }
   }, [focusElem])

   const { onSubmit } = useSubmitAdmissionAcc()
   const { refresh } = useRouter()

   const handleOnSubmit = async (formData: AdmissionFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault
      const { token, ...restForm } = formData

      try {
         await onSubmit(restForm)
         await Promise.all([redirectStep(1), refresh()])
      } catch (error) {
         throw new Error(
            error instanceof Error ? error.message : 'Something went wrong. Please try again.',
         )
      }
   }

   return (
      <>
         <DialogForm formReturn={admissionForm} handleSubmit={handleOnSubmit}>
            <CreateAccountFormBody>{renderStep}</CreateAccountFormBody>
            {step !== 4 && <DialogFormFooter>{renderButton}</DialogFormFooter>}
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
