'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignUpFormValues, useSignUpForm } from '../_hooks/use-sign-up-form'
import { cn } from '@/lib/utils'
import { useSignUpSteps } from '../_hooks/use-sign-up-steps'
import useStepsState from '../_hooks/use-steps-state'
import { FocusElement, useFocusElement } from '../_hooks/use-focus-element'
// ------------------
// import { toast } from '@/components/ui/use-toast'

export function SignUpForm() {
   const { signUpForm } = useSignUpForm()
   const { formState, setFocus } = signUpForm
   const { isValid } = formState

   const router = useRouter()

   const [openDialog, setOpenDialog] = useState(false)

   const { step, handlePrevStep, handleNextStep } = useStepsState()

   const { focusElem, handleFocusElement } = useFocusElement()

   const { renderSteps } = useSignUpSteps(step, signUpForm, handlePrevStep, handleFocusElement)

   const validFocusElem: FocusElement[] = ['email', 'name', 'month']

   useLayoutEffect(() => {
      if (focusElem && validFocusElem.includes(focusElem)) {
         setFocus(focusElem)
      }
   }, [focusElem])

   useEffect(() => {
      setOpenDialog(true)
   }, [])

   function onSubmit(data: SignUpFormValues) {
      console.log(`----on submit`)
      console.log(data)
      //   toast({
      //      title: 'You submitted the following values:',
      //      description: (
      //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //         </pre>
      //      ),
      //   })
   }

   const handleDialog = () => {
      if (step !== 1) return handlePrevStep()

      setOpenDialog(false)
      router.push('/')
   }

   const handleAutoFocus = (e: Event) => {
      if (step !== 1) e.preventDefault()
   }

   return (
      <Dialog open={openDialog} onOpenChange={handleDialog}>
         <DialogContent
            onOpenAutoFocus={handleAutoFocus}
            defaultValue={step}
            className="flex flex-col justify-center items-start max-w-[600px] h-[650px] border-none rounded-lg pt-2 "
         >
            <Form {...signUpForm}>
               <DialogHeader>
                  <DialogTitle className=" text-gray-300 font-semibold text-lg pl-16">
                     Step {step} of 5
                  </DialogTitle>
               </DialogHeader>
               {/* make this a server action? */}
               <form
                  onSubmit={signUpForm.handleSubmit(onSubmit)}
                  className="flex flex-col justify-between items-center h-full w-full px-1 overflow-hidden"
               >
                  <div
                     className={cn(
                        ` h-[450px] w-full px-16 space-y-5 overflow-y-auto scroll-smooth 
                        `,
                     )}
                  >
                     {renderSteps}
                  </div>
                  <DialogFooter className=" w-full mb-6 px-16">
                     <Button
                        className="rounded-3xl text-md font-semibold"
                        type="submit"
                        onClick={handleNextStep}
                        variant={'default'}
                        disabled={!isValid}
                     >
                        Next
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   )
}
