'use client'

import { Form } from '@/components/ui/form'
import { DialogFooter } from '@/components/ui/dialog'
import { useLayoutEffect } from 'react'
import { CreateAccountFormValues, useCreateAccountForm } from '../_hooks/use-create-account-form'
import { FocusElement, useCreateAccountStore } from '../_stores/create-account-store'
import { cn } from '@/lib/utils'
import { useCreateAccountButtons } from '../_hooks/use-create-account-buttons'
import { useCreateAccountSteps } from '../_hooks/use-create-account-steps'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { BASE_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'

// ------------------
// import { toast } from '@/components/ui/use-toast'

export function CreateAccountForm({ step }: { step: number }) {
   const { createAccountForm } = useCreateAccountForm()
   const { formState, setFocus, getFieldState, getValues } = createAccountForm

   const { isValid } = formState

   const { focusElem } = useCreateAccountStore()

   const { renderSteps } = useCreateAccountSteps(step, createAccountForm.control)

   const { renderButtons } = useCreateAccountButtons(step, getFieldState, getValues, isValid)

   const validFocusElem: FocusElement[] = ['email', 'name', 'birthDate.month']

   useLayoutEffect(() => {
      if (focusElem && validFocusElem.includes(focusElem)) {
         setFocus(focusElem)
      }
   }, [focusElem])

   const onSubmit = async (formData: CreateAccountFormValues) => {
      // const updateViper = await fetch(`${BASE_URL}/i/flow/signup/api/verify`, {
      //    headers: {
      //       'Content-Type': 'application/json',
      //       'API-Key': `${PUBLIC_VIPER_API_KEY}`,
      //    },
      //    method: 'PATCH',
      //    body: JSON.stringify({
      //       formData,
      //    }),
      // })
      // if (!updateViper.ok) {
      //    const { error } = await updateViper.json()
      //    throw new Error(error)
      // }
      // // let's see what's happening with redirect
      // // or if we should step 1 and session to route
      // signIn('credentials', {
      //    username: getValues('username'),
      //    password: getValues('password'),
      //    // redirect: true,
      // })
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
                     ` h-[450px] w-full space-y-4 overflow-y-auto scroll-smooth px-[88px]`,
                  )}
               >
                  {renderSteps}
               </div>
               {/* {step === 5 && (
                  <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
                     <Button type="submit" variant={'sign-in'} size={'lg'} />
                  </DialogFooter>
               )} */}
            </form>
         </Form>
         {/* {step <= 6 && ( */}
         <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
            {renderButtons}
         </DialogFooter>
         {/* )} */}
      </>
   )
}
