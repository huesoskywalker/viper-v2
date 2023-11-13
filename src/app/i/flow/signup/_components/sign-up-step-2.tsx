import { Checkbox } from '@/components/ui/checkbox'
import { DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import Link from 'next/link'
import React from 'react'
import { Control } from 'react-hook-form'

const SignUpStep2 = ({
   formControl,
}: {
   formControl: Control<
      {
         name: string
         email: string
         month: string
         day: string
         year: string
         contentDiscovery?: boolean
      },
      any
   >
}) => {
   const linkClass = 'text-viper-dodger-blue hover:underline hover:underline-offset-4 '

   return (
      <div className="flex flex-col space-y-8">
         <DialogTitle className="text-primary  text-3xl font-semibold mt-3">
            Customize your experience
         </DialogTitle>
         <div className="space-y-2">
            <FormField
               control={formControl}
               name="contentDiscovery"
               render={({ field }) => (
                  <FormItem className="space-y-2">
                     <FormLabel
                        htmlFor={field.name}
                        className="text-primary text-lg font-semibold"
                     >
                        Discover Viper content across the web.
                     </FormLabel>
                     <div className="flex flex-row gap-6">
                        <FormDescription className="text-gray-200 font-normal text-sm">
                           Viper tailors a personalized experience using this data. This web
                           browsing history will never be stored with your name, email, or phone
                           number.
                        </FormDescription>
                        <FormControl id={field.name}>
                           <Checkbox
                              checked={field.value}
                              defaultChecked={true}
                              onCheckedChange={field.onChange}
                              // should we change this data from the original ?
                              className="data-[state=checked]:bg-viper-dodger-blue data-[state=checked]:text-primary data-[state=checked]:border-none border-accent-foreground"
                           />
                        </FormControl>
                     </div>
                  </FormItem>
               )}
            />
         </div>
         <p className=" text-sm leading-4 text-muted-foreground ">
            By signin up, you agree to our{' '}
            <Link href="/tos" target="_blank" className={linkClass}>
               Terms
            </Link>{' '}
            ,{' '}
            <Link href="/privacy" target="_blank" className={linkClass}>
               Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/rules-and-policies/x-cookies" target="_blank" className={linkClass}>
               Cookie Use
            </Link>
            . Viper may use your contact information, including your email address and phone number
            for purposes outlined in our Privacy Policy.
            <Link href="/privacy" target="_blank" className={linkClass}></Link>
         </p>
      </div>
   )
}

export default SignUpStep2
