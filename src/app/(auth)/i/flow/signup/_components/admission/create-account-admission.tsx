'use client'
import { BaseSyntheticEvent, useLayoutEffect } from 'react'
import { AdmissionFormValues, useAdmissionForm } from '../../_hooks/admission/use-admission-form'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useAdmissionButtons } from '../../_hooks/admission/use-admission-buttons'
import { useAdmissionSteps } from '../../_hooks/admission/use-admission-steps'
import DialogForm from '@/app/_components/form/dialog-form'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ApiResponse } from '@/types/api/response'

const CreateAccountFormBody = dynamic(
   () => import('../../../_components/create-account-form-body'),
)
const DialogFormFooter = dynamic(() => import('@/app/_components/form/dialog-form-footer'))
const Toaster = dynamic(() => import('@/components/ui/toaster').then((mod) => mod.Toaster))

const CreateAccountAdmission = () => {
   const { redirectStep } = useCreateAccountStore()

   const { admissionForm } = useAdmissionForm()

   const { setFocus, getFieldState, getValues } = admissionForm

   const { focusElem } = useCreateAccountStore()

   const { renderStep } = useAdmissionSteps(getValues('email'))

   const { renderButton } = useAdmissionButtons(getFieldState)

   useLayoutEffect(() => {
      if (focusElem) {
         void setFocus(focusElem)
      }
   }, [focusElem])

   const { refresh } = useRouter()

   type SubmitResponse<> = {
      success: boolean
      error?: string
   }

   const handleOnSubmit = async (formData: AdmissionFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault()

      const { token, ...restForm } = formData

      try {
         const { onSubmit } = await import('../../../_hooks/use-submit-admission-acc').then(
            (module) => module.useSubmitAdmissionAcc(),
         )

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
            <DialogFormFooter>{renderButton}</DialogFormFooter>
         </DialogForm>
         <Toaster />
      </>
   )
}

export default CreateAccountAdmission
