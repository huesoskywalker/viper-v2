import { Form } from '@/components/ui/form'
import { DialogFooter } from '@/components/ui/dialog'
import { useLayoutEffect } from 'react'
import { AdmissionFormValues, useAdmissionForm } from '../_hooks/admission/use-admission-form'
import { FocusElement, useCreateAccountStore } from '../_stores/create-account-store'
import { cn } from '@/lib/utils'
import { useAdmissionButtons } from '../_hooks/admission/use-admission-buttons'
import { useAdmissionSteps } from '../_hooks/admission/use-admission-steps'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { BASE_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { WithId } from 'mongodb'
import { Viper } from '@/types/viper'

const CreateAccountStepOne = () => {
   const { step, redirectStep } = useCreateAccountStore()

   const { admissionForm } = useAdmissionForm()

   const { formState, setFocus, getFieldState, getValues } = admissionForm

   const { isValid } = formState

   const { focusElem } = useCreateAccountStore()

   const { renderSteps } = useAdmissionSteps(step, admissionForm.control)

   const { renderButtons } = useAdmissionButtons(step, getFieldState, getValues)

   const validFocusElem: FocusElement[] = ['email', 'name', 'birthDate.month']

   useLayoutEffect(() => {
      if (focusElem && validFocusElem.includes(focusElem)) {
         setFocus(focusElem)
      }
   }, [focusElem])

   const onSubmit = async (formData: AdmissionFormValues) => {
      console.log({ formData })

      const updateViper = await fetch(`${BASE_URL}/i/flow/signup/api/verify`, {
         headers: {
            'Content-Type': 'application/json',
            'API-Key': `${PUBLIC_VIPER_API_KEY}`,
         },
         method: 'PATCH',
         body: JSON.stringify({
            formData,
         }),
      })
      if (!updateViper.ok) {
         const { error } = await updateViper.json()
         throw new Error(`${error.message}`)
      }
      // TODO: Add tRCP
      const { data }: { data: WithId<Viper> } = await updateViper.json()

      signIn('credentials', {
         username: data.username,
         password: getValues('password'),
         redirect: false,
      })

      redirectStep(1)
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
                     ` h-[450px] w-full space-y-4 overflow-y-auto scroll-smooth px-[88px]`,
                  )}
               >
                  {renderSteps}
               </div>
               {step === 5 && (
                  <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
                     <Button type="submit" variant={'default'} size={'lg'} disabled={!isValid}>
                        Next
                     </Button>
                  </DialogFooter>
               )}
            </form>
         </Form>
         {step < 5 && (
            <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
               {renderButtons}
            </DialogFooter>
         )}
      </>
   )
}

export default CreateAccountStepOne
