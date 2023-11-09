'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import NewFormInput from './NEW-form-input'
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
// import { toast } from '@/components/ui/use-toast'

const FormSchema = z.object({
   name: z
      .string()
      .min(1, {
         message: "What's your name?",
      })
      .max(30, {
         message: 'Name must not be longer than 30 characters.',
      }),

   email: z
      .string({
         required_error: 'Please select an email to display.',
      })
      .email(),
})

export function NewSignUpForm() {
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: '',
         email: '',
      },
      mode: 'onChange',
   })

   function onSubmit(data: z.infer<typeof FormSchema>) {
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
   const [open, setOpen] = useState(false)
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
         <DialogContent className="flex flex-col justify-between items-start max-w-[600px] max-h-[575px] border-none rounded-lg py-4  px-16">
            <DialogHeader>
               <DialogTitle className=" text-primary text-base">Step 1 of 5</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-primary text-3xl font-bold mb-8">
               Create your account
            </DialogDescription>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                  <div className="max-h-[350px] px-5 space-y-8 overflow-y-scroll">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <NewFormInput
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
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <NewFormInput
                                    id="email"
                                    type="email"
                                    variant={'viper'}
                                    label="Email"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage className="absolute" />
                           </FormItem>
                        )}
                     />
                     {/* <FormField
               control={form.control}
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
               control={form.control}
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
                  <DialogFooter className=" w-full p-4">
                     <Button type="submit" variant={'outline'}>
                        Next
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   )
}
