import React from 'react'
import { PasswordResetFormValues } from '../_hooks/use-password-reset-form'
import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { hideEmail } from '../_utils/hide-email'
import { useFormContext } from 'react-hook-form'

type FormContextValues = PasswordResetFormValues
const PasswordSendVerificationToken = () => {
   const { control } = useFormContext<FormContextValues>()

   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            Where should we send a confirmation code?
         </DialogDescription>
         <FormDescription>
            Before you can change your password, we need to make sure it&apos;s really you.
            <br />
            <br />
            Start by choosing where to send a confirmation code.
         </FormDescription>
         <FormField
            control={control}
            name="email"
            render={({ field }) => (
               <FormItem className="relative">
                  <Input
                     variant={'plain'}
                     value={`Send an email to ${hideEmail(field.value)}`}
                     aria-disabled
                     disabled
                     className="mt-6 p-0 font-semibold text-foreground"
                  />
                  <Checkbox
                     className="absolute bottom-1 right-2 z-20 h-[24px] w-[24px] rounded-full border-none hover:shadow-outer-sky data-[state=checked]:bg-viper-dodger-blue data-[state=checked]:text-2xl data-[state=checked]:text-white"
                     defaultChecked
                     checked={true}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default PasswordSendVerificationToken
