'use client'
import { useLayoutEffect } from 'react'
import { useAdmissionForm } from '../../_hooks/admission/use-admission-form'
import { FocusElement, useCreateAccountStore } from '../../_stores/create-account-store'
import { useAdmissionButtons } from '../../_hooks/admission/use-admission-buttons'
import { useAdmissionSteps } from '../../_hooks/admission/use-admission-steps'
import { Button } from '@/components/ui/button'
import GlobalDialogFooter from '../../../../../../_components/dialog/global-dialog-footer'
import DialogFormFooter from '@/app/_components/form/dialog-form-footer'
import CreateAccountFormBody from '../../../_components/create-account-form-body'
import useSubmitAdmissionAcc from '../../../_hooks/use-submit-admission-acc'
import DialogForm from '@/app/_components/form/dialog-form'

const CreateAccountAdmission = () => {
   const { step } = useCreateAccountStore()

   const { admissionForm } = useAdmissionForm()

   const { control, formState, setFocus, getFieldState, getValues } = admissionForm

   const { isValid, isSubmitting } = formState

   const { focusElem } = useCreateAccountStore()

   const { renderStep } = useAdmissionSteps(step, control)

   const { renderButton } = useAdmissionButtons(step, getFieldState, getValues)

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
            {step === 5 && (
               <DialogFormFooter>
                  <Button
                     type="submit"
                     variant={'default'}
                     size={'lg'}
                     disabled={!isValid || isSubmitting}
                  >
                     Next
                  </Button>
               </DialogFormFooter>
            )}
         </DialogForm>
         {step < 5 && <GlobalDialogFooter>{renderButton}</GlobalDialogFooter>}
      </>
   )
}

export default CreateAccountAdmission
