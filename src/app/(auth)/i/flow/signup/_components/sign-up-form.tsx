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
import { useSignUpSteps } from '../_hooks/use-sign-up-steps'
import { FocusElement, useSignUpStore } from '../_stores/sign-up-store'
import TermsAndConditions from '@/app/_components/terms-and-conditions'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { checkFieldStateValidation } from '../_utils/check-field-state-validation'
import { signIn } from 'next-auth/react'
import { BASE_URL } from '@/config/env'
// ------------------
// import { toast } from '@/components/ui/use-toast'

export function SignUpForm() {
   const { signUpForm } = useSignUpForm()
   const { formState, setFocus, getFieldState, getValues } = signUpForm

   const { isValid } = formState

   const { isStepOneValid, isStepFourValid } = checkFieldStateValidation(getFieldState)

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

   const onSubmit = async (formData: SignUpFormValues) => {
      const { token, email, ...restForm } = formData
      const magicLink = await fetch(
         `${BASE_URL}/api/auth/callback/email?callbackUrl=%2F&token=${token}&email=${email}`,
      )
      if (!magicLink.ok) {
         const { error } = await magicLink.json()
         throw new Error(error)
      }

      const updateViper = await fetch(`${BASE_URL}/api/viper`, {
         headers: {
            'content-type': 'application/json',
         },
         method: 'POST',
         body: JSON.stringify({
            restForm,
         }),
      })
      if (!updateViper.ok) {
         const { error } = await updateViper.json()
         // this should trigger the closest error.js
         throw new Error(error)
      }
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

   const disableButton = step <= 3 ? !isStepOneValid : step === 4 ? !isStepFourValid : !isValid

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
                     Step {step} of 5
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
                           // will need to modify this
                           type={step === 6 ? 'submit' : 'button'}
                           onClick={nextStep}
                           variant={'default'}
                           disabled={disableButton}
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
                              <Button
                                 variant={'link'}
                                 size={'link'}
                                 className="text-[14px] font-normal leading-4"
                                 onClick={() => redirectStep(6)}
                              >
                                 {' '}
                                 here
                              </Button>
                              .
                           </TermsAndConditions>
                           <Button
                              className="text-md m-0 h-11 rounded-3xl font-semibold"
                              type={'button'}
                              onClick={() => {
                                 nextStep()
                                 signIn('email', {
                                    redirect: false,
                                    email: getValues('email'),
                                 })
                              }}
                              variant={'sign-up'}
                              disabled={disableButton}
                           >
                              <Link
                                 href={`?${new URLSearchParams({
                                    email: getValues('email'),
                                 })}`}
                                 className="m-0 h-full w-full"
                              >
                                 Sign up
                              </Link>
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
