'use client'
import { Form } from '@/components/ui/form'
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

const CreateAccountAdmissionForm = () => {
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
         <Form {...admissionForm}>
            <form
               onSubmit={admissionForm.handleSubmit(onSubmit)}
               className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
            >
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
            </form>
         </Form>
         {step < 5 && <GlobalDialogFooter>{renderButton}</GlobalDialogFooter>}
      </>
   )
}

export default CreateAccountAdmissionForm
