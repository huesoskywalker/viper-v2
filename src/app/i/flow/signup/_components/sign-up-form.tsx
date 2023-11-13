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
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignUpFormValues, useSignUpForm } from '../_hooks/use-sign-up-form'
import { cn } from '@/lib/utils'
import { useSignUpSteps } from '../_hooks/use-sign-up-steps'
// ------------------
// import { toast } from '@/components/ui/use-toast'

export function SignUpForm() {
   const { signUpForm } = useSignUpForm()
   const { formState } = signUpForm
   const { isValid } = formState

   const [open, setOpen] = useState(false)
   const [step, setStep] = useState<number>(1)

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

   // check new Signal from preact
   useEffect(() => {
      setOpen(true)
   }, [])

   const { renderSteps } = useSignUpSteps(step, signUpForm)

   const router = useRouter()

   const handleDialog = () => {
      if (step !== 1) return setStep((prevStep) => prevStep - 1)

      setOpen(false)
      router.push('/')
   }

   const handleStepForward = () => {
      setStep((prevStep) => prevStep + 1)
   }

   return (
      <Dialog open={open} onOpenChange={handleDialog}>
         <DialogContent
            defaultValue={step}
            className="flex flex-col justify-center items-start w-[600px] h-[650px] border-none rounded-lg pt-4 "
         >
            <Form {...signUpForm}>
               <DialogHeader>
                  <DialogTitle className=" text-gray-300 font-semibold text-base pl-14">
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
                  <DialogFooter className=" w-full mb-8 px-16">
                     <Button
                        className="rounded-3xl text-md font-semibold"
                        type="button"
                        onClick={handleStepForward}
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
