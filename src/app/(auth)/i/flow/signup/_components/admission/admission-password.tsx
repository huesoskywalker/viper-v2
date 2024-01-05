import FormInput from '@/app/_components/form/form-input'
import { DialogDescription } from '@/components/ui/dialog'
import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import { FormControlStep } from '@/types/forms/steps'
import React from 'react'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'

const AdmissionPassword: React.FC<FormControlStep<AdmissionFormValues>> = ({ formControl }) => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            You&apos;ll need a password
         </DialogDescription>
         <FormDescription>Make sure it&apos;s 8 characters or more.</FormDescription>
         <FormField
            control={formControl}
            name="password"
            render={({ field }) => (
               <FormItem className="relative">
                  <FormInput
                     id={field.name}
                     type={'password'}
                     variant={'plain'}
                     label="Password"
                     {...field}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default AdmissionPassword
