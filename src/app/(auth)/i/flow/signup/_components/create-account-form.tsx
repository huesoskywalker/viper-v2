'use client'

import { Form } from '@/components/ui/form'
import { DialogFooter } from '@/components/ui/dialog'
import { useLayoutEffect } from 'react'
import { CreateAccountFormValues, useCreateAccountForm } from '../_hooks/use-create-account-form'
import { useSignUpSteps } from '../_hooks/use-sign-up-steps'
import { FocusElement, useCreateAccountStore } from '../_stores/create-account-store'
import { cn } from '@/lib/utils'
import { useSignUpButtons } from '../_hooks/use-sign-up-buttons'

// ------------------
// import { toast } from '@/components/ui/use-toast'

export function CreateAccountForm({ step }: { step: number }) {
   const { createAccountForm } = useCreateAccountForm()
   const { formState, setFocus, getFieldState, getValues } = createAccountForm

   const { isValid } = formState

   const { focusElem } = useCreateAccountStore()

   const { renderSteps } = useSignUpSteps(step, createAccountForm.control)

   const { renderButtons } = useSignUpButtons(step, getFieldState, getValues, isValid)

   const validFocusElem: FocusElement[] = ['email', 'name', 'birthDate.month']

   useLayoutEffect(() => {
      if (focusElem && validFocusElem.includes(focusElem)) {
         setFocus(focusElem)
      }
   }, [focusElem])

   const onSubmit = async (formData: CreateAccountFormValues) => {
      // not a form action data
      const { token, email, ...restForm } = formData

      // -------------------------------
      // const updateViper = await fetch(`${BASE_URL}/api/viper`, {
      //    headers: {
      //       'Content-Type': 'application/json',
      //    },
      //    method: 'PATCH',
      //    body: JSON.stringify({
      //       restForm,
      //    }),
      // })
      // if (!updateViper.ok) {
      //    const { error } = await updateViper.json()
      //    // this should trigger the closest
      //    // create the error.tsx file
      //    throw new Error(error)
      // }
      //   toast({
      //      title: 'You submitted the following values:',
      //      description: (
      //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //         </pre>
      //      ),
      //   })
      // revalidatePath('/')
      //  revalidateTag('posts') // Update cached posts
      //   redirect(`/post/${id}`) // Navigate to new route
   }

   return (
      <>
         <Form {...createAccountForm}>
            <form
               onSubmit={createAccountForm.handleSubmit(onSubmit)}
               className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
            >
               <div
                  className={cn(
                     ` h-[450px] w-full space-y-5 overflow-y-auto scroll-smooth px-[88px]`,
                  )}
               >
                  {renderSteps}
               </div>
            </form>
         </Form>
         <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
            {renderButtons}
         </DialogFooter>
      </>
   )
}
