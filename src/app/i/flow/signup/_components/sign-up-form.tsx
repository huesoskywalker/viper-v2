'use client'

import { Button } from '@/components/ui/button'
import { Form, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import FormInput from '../../../../_components/form-input'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-hook-form'
import { SignUpFormValues, useSignUpForm } from '../_hooks/use-sign-up-form'
import FormSelect from '@/app/_components/form-select'
import { cn } from '@/lib/utils'
import getMonths from '../_utils/get-months'
import getDays from '../_utils/get-days'
import getYears from '../_utils/get-years'
// ------------------
// import { toast } from '@/components/ui/use-toast'

export function SignUpForm() {
   const { signUpForm } = useSignUpForm()
   const { isValid } = useFormState(signUpForm)

   const { months } = getMonths()
   const { days } = getDays()
   const { years } = getYears()

   const [open, setOpen] = useState(false)

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
   // check this signal, super interesting
   // const open = new Signal(false)

   useEffect(() => {
      setOpen(true)
   }, [])

   const router = useRouter()

   const handleClose = () => {
      setOpen(false)
      router.push('/')
   }
   // -------------------------------

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent className="flex flex-col justify-center items-start w-[600px] h-[650px] border-none rounded-lg pt-4 ">
            <Form {...signUpForm}>
               <DialogHeader>
                  <DialogTitle className=" text-gray-300 font-semibold text-base pl-14">
                     Step 1 of 5
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
                     <DialogDescription className="text-primary  text-3xl font-bold mt-3">
                        Create your account
                     </DialogDescription>
                     <FormField
                        control={signUpForm.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormInput
                                 id="name"
                                 type="text"
                                 variant={'viper'}
                                 label="Name"
                                 {...field}
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={signUpForm.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormInput
                                 id="email"
                                 type="email"
                                 variant={'viper'}
                                 label="Email"
                                 {...field}
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <div className="space-y-4">
                        <FormDescription className="flex flex-col justify-center items-start gap-1">
                           <span className="text-primary text-md font-semibold">
                              Date of birth
                           </span>
                           <span className="text-xs font-normal">
                              Protected in privacy, unveil the secret of your age, whether it's for
                              business, a beloved pet, or any other venture.
                           </span>
                        </FormDescription>
                        <div className="flex flex-row w-full items-start gap-2">
                           <FormField
                              control={signUpForm.control}
                              name="month"
                              render={({ field }) => (
                                 <FormItem className="w-4/5">
                                    <FormSelect
                                       id="month"
                                       label="Month"
                                       options={months}
                                       variant={'viper'}
                                       {...field}
                                    />

                                    <FormMessage />
                                 </FormItem>
                              )}
                           />{' '}
                           <FormField
                              control={signUpForm.control}
                              name="day"
                              render={({ field }) => (
                                 <FormItem className="w-2/6">
                                    <FormSelect
                                       id="day"
                                       label="Day"
                                       options={days}
                                       variant={'viper'}
                                       {...field}
                                    />

                                    <FormMessage />
                                 </FormItem>
                              )}
                           />{' '}
                           <FormField
                              control={signUpForm.control}
                              name="year"
                              render={({ field }) => (
                                 <FormItem className="w-2/5">
                                    <FormSelect
                                       id="year"
                                       label="Year"
                                       options={years}
                                       variant={'viper'}
                                       {...field}
                                    />
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                  </div>
                  <DialogFooter className=" w-full mb-8 px-16">
                     <Button
                        className="rounded-3xl text-md font-semibold"
                        type="submit"
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
