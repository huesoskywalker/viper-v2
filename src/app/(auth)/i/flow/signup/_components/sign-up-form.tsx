'use client'

import { Button } from '@/components/ui/button'
import { Form, FormDescription } from '@/components/ui/form'
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
import { useSignUpSteps } from '../_hooks/use-sign-up-steps'
import { FocusElement, useSignUpStore } from '../_stores/sign-up-store'
import TermsAndConditions from '@/app/_components/terms-and-conditions'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { handleEmailProvider } from '../_utils/NOT-USING-handle-email-provider'
import { signIn } from 'next-auth/react'
// ------------------
// import { toast } from '@/components/ui/use-toast'

export function SignUpForm() {
   const { signUpForm } = useSignUpForm()
   const { formState, setFocus } = signUpForm
   const { isValid } = formState

   const router = useRouter()

   const [openDialog, setOpenDialog] = useState(false)

   const { step, prevStep, nextStep, redirectStep, focusElem } = useSignUpStore()

   const { renderSteps } = useSignUpSteps(step, signUpForm.control)

   const validFocusElem: FocusElement[] = ['email', 'name', 'birthDate.month']

   useLayoutEffect(() => {
      if (focusElem && validFocusElem.includes(focusElem)) {
         setFocus(focusElem)
      }
   }, [focusElem])

   useEffect(() => {
      setOpenDialog(true)
   }, [])

   const onSubmit = async (data: SignUpFormValues) => {
      console.log(`----on Submit `)
      console.log(data)
      const asdf = await signIn('email', { email: data.email })
      console.log(`---asdfo`)
      console.log(asdf)
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
      if (step !== 1) return prevStep()

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
            className="flex h-[650px] max-w-[610px] flex-col items-start justify-center rounded-lg border-none pt-2 "
         >
            <Form {...signUpForm}>
               <DialogHeader>
                  <DialogTitle className=" pl-16 text-lg font-semibold text-gray-300">
                     Step {step} of 4
                  </DialogTitle>
               </DialogHeader>
               {/* make this a server action? a bit hard to handle react hook form*/}
               <form
                  onSubmit={signUpForm.handleSubmit(onSubmit)}
                  className="flex h-full w-full flex-col items-center justify-between overflow-hidden px-1"
               >
                  <div
                     className={cn(
                        ` h-[450px] w-full space-y-5 overflow-y-auto scroll-smooth px-[88px] 
                        `,
                     )}
                  >
                     {renderSteps}
                  </div>

                  <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-16">
                     {step !== 3 ? (
                        <Button
                           className="text-md h-11 rounded-3xl font-semibold"
                           type="button"
                           onClick={nextStep}
                           variant={'default'}
                           disabled={!isValid}
                        >
                           Next
                        </Button>
                     ) : (
                        <>
                           <TermsAndConditions className="mb-2 text-[14px] leading-4">
                              Twitter may use your contact information, including your email
                              address and phone number for purposes outlined in our Privacy Policy,
                              like keeping your account secure and personalizing our services,
                              including ads.
                              <Link
                                 href="/privacy"
                                 target="_blank"
                                 className="text-viper-dodger-blue hover:underline hover:underline-offset-4 "
                              >
                                 Learn more
                              </Link>{' '}
                              . Others will be able to find you by email or phone number, when
                              provided, unless you choose otherwise{' '}
                              <button
                                 className="text-viper-dodger-blue"
                                 onClick={() => redirectStep(6)}
                              >
                                 here
                              </button>
                              .
                           </TermsAndConditions>
                           <Button
                              className="text-md h-11 rounded-3xl font-semibold"
                              type="submit"
                              // onClick={nextStep}
                              variant={'sign-up'}
                              disabled={!isValid}
                           >
                              Sign up
                           </Button>
                        </>
                     )}
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   )
}
