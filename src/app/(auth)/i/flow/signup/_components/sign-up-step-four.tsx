import FormInput from '@/app/_components/form-input'
import { Button } from '@/components/ui/button'
import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import React from 'react'
import { CreateAccountFormControl } from '../_hooks/use-create-account-form'

const SignUpStepFour = ({ formControl }: { formControl: CreateAccountFormControl }) => {
   const email = formControl._formValues['email']

   return (
      <>
         <DialogDescription className="mt-3 text-3xl font-bold text-primary ">
            We sent you a code
         </DialogDescription>
         <FormDescription>Enter it below to verify {email}.</FormDescription>
         <FormField
            control={formControl}
            name="token"
            render={({ field }) => (
               <FormItem>
                  <FormInput
                     id={field.name}
                     type="string"
                     variant={'viper'}
                     label="Verification token"
                     {...field}
                  />
               </FormItem>
            )}
         />
         <FormMessage className="text-viper-dodger-blue">
            <Button type="button" variant={'link'} size={'link'} className="text-xs">
               Didn&apos;t receive email?
            </Button>
         </FormMessage>
      </>
   )
}

export default SignUpStepFour
