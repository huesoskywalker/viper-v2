'use client'

import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   useFormField,
} from '@/components/ui/form'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import FormInput from './form-input'
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
import { SignUpFormValues, useSignUpForm } from '../_hooks/use-sign-up-form'
// import { toast } from '@/components/ui/use-toast'

export function SignUpForm() {
   const { signUpForm } = useSignUpForm()
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
   const router = useRouter()

   useEffect(() => {
      setOpen(true)
   }, [])

   const handleClose = () => {
      setOpen(false)
      router.push('/')
   }

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent className="flex flex-col justify-center items-start max-w-[600px] w-[600px] h-[650px] border-none rounded-lg py-9  px-16">
            <Form {...signUpForm}>
               <DialogHeader>
                  <DialogTitle className=" text-gray-300 font-semibold text-base">
                     Step 1 of 5
                  </DialogTitle>
               </DialogHeader>
               {/* make this a server action? */}
               <form
                  onSubmit={signUpForm.handleSubmit(onSubmit)}
                  className="flex flex-col justify-between items-start h-full w-full space-y-0 pt-3 px-2"
               >
                  <DialogDescription className="text-primary text-3xl font-bold mb-8">
                     Create your account
                  </DialogDescription>
                  <div className="h-[450px] w-full space-y-8 overflow-y-auto">
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
                              <FormMessage className="absolute" />
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
                              <FormMessage className="absolute" />
                           </FormItem>
                        )}
                     />
                     {/* <FormField
               control={signUpForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="m@example.com">m@example.com</SelectItem>
                           <SelectItem value="m@google.com">m@google.com</SelectItem>
                           <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </SelectContent>
                     </Select>
                     <FormDescription>
                        You can manage email addresses in your{' '}
                        <Link href="/examples/forms">email settings</Link>.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={signUpForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="m@example.com">m@example.com</SelectItem>
                           <SelectItem value="m@google.com">m@google.com</SelectItem>
                           <SelectItem value="m@support.com">m@support.com</SelectItem>
                        </SelectContent>
                     </Select>
                     <FormDescription>
                        You can manage email addresses in your{' '}
                        <Link href="/examples/forms">email settings</Link>.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            /> */}
                  </div>
                  <DialogFooter className=" w-full pb-2">
                     <Button type="submit" variant={'sign-up'}>
                        Next
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   )
}
