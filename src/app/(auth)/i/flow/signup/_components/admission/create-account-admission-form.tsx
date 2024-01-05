'use client'
import { Form } from '@/components/ui/form'
import { DialogFooter } from '@/components/ui/dialog'
import { BaseSyntheticEvent, useLayoutEffect } from 'react'
import { AdmissionFormValues, useAdmissionForm } from '../../_hooks/admission/use-admission-form'
import { FocusElement, useCreateAccountStore } from '../../_stores/create-account-store'
import { cn } from '@/lib/utils'
import { useAdmissionButtons } from '../../_hooks/admission/use-admission-buttons'
import { useAdmissionSteps } from '../../_hooks/admission/use-admission-steps'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { BASE_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { useRouter } from 'next/navigation'
import { ApiResponse } from '@/types/api/response'

const CreateAccountAdmissionForm = () => {
   const { step, redirectStep } = useCreateAccountStore()

   const { refresh } = useRouter()

   const { admissionForm } = useAdmissionForm()

   const { control, formState, setFocus, getFieldState, getValues } = admissionForm

   const { isValid } = formState

   const { focusElem } = useCreateAccountStore()

   const { renderStep } = useAdmissionSteps(step, control)

   const { renderButton } = useAdmissionButtons(step, getFieldState, getValues)

   const validFocusElem: FocusElement[] = ['email', 'name', 'birthDate.month']

   useLayoutEffect(() => {
      if (focusElem && validFocusElem.includes(focusElem)) {
         setFocus(focusElem)
      }
   }, [focusElem])

   const onSubmit = async (formData: AdmissionFormValues, e?: BaseSyntheticEvent) => {
      if (e) e.preventDefault

      const { token, ...restForm } = formData
      try {
         const updateViper = await fetch(`${BASE_URL}/i/flow/signup/api/verify`, {
            headers: {
               'Content-Type': 'application/json',
               'API-Key': `${PUBLIC_VIPER_API_KEY}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
               restForm,
            }),
         })
         if (!updateViper.ok) {
            const { error }: ApiResponse<{ username: string }> = await updateViper.json()

            throw new Error(error)
         }
         const { data }: ApiResponse<{ username: string }> = await updateViper.json()

         await signIn('credentials', {
            identifier: data.username,
            password: getValues('password'),
            redirect: false,
         }),
            await Promise.all([redirectStep(1), refresh()])
      } catch (error) {
         throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
      }
   }

   return (
      <>
         <Form {...admissionForm}>
            <form
               onSubmit={admissionForm.handleSubmit(onSubmit)}
               className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
            >
               <div
                  className={cn(
                     ` h-[470px] w-full space-y-6 overflow-y-auto scroll-smooth px-[35px] sm:px-[80px]`,
                  )}
               >
                  {renderStep}
               </div>
               {step === 5 && (
                  <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-8 sm:px-16">
                     <Button type="submit" variant={'default'} size={'lg'} disabled={!isValid}>
                        Next
                     </Button>
                  </DialogFooter>
               )}
            </form>
         </Form>
         {step < 5 && (
            <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-8 sm:px-16">
               {renderButton}
            </DialogFooter>
         )}
      </>
   )
}

export default CreateAccountAdmissionForm
