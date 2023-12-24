import FormInput from '@/app/_components/form/form-input'
import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { DialogDescription } from '@radix-ui/react-dialog'
import React from 'react'
import { FormControlSteps } from '@/types/forms/steps'
import ResendTokenButton from './resend-token-button'
import { AdmissionFormControl } from '../../_hooks/admission/use-admission-form'

const AdmissionVerificationToken: React.FC<FormControlSteps<AdmissionFormControl>> = ({
   formControl,
}) => {
   const email = formControl._formValues['email']

   return (
      <>
         <DialogDescription className="mt-3 text-3xl font-bold text-foreground ">
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
                     variant={'plain'}
                     label="Verification token"
                     {...field}
                  />
               </FormItem>
            )}
         />
         <FormMessage className="text-viper-dodger-blue">
            <ResendTokenButton email={email}> Didn&apos;t receive email?</ResendTokenButton>
         </FormMessage>
      </>
   )
}

export default AdmissionVerificationToken
