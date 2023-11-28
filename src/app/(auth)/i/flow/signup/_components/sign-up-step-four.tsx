import FormInput from '@/app/_components/form-input'
import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import React from 'react'
import { FormStepsControl } from '@/types/forms/steps'
import ReSendTokenButton from './re-send-token-button'

const SignUpStepFour: React.FC<FormStepsControl> = ({ formControl }) => {
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
            <ReSendTokenButton email={email}> Didn&apos;t receive email?</ReSendTokenButton>
         </FormMessage>
      </>
   )
}

export default SignUpStepFour
