import { FormDescription, FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import { useCreateAccountStore } from '../../_stores/create-account-store'
import { useBirthDate } from '../../_hooks/admission/use-birth-date'
import FormInput from '@/app/_components/form/form-input'
import { FormControlStep } from '@/types/forms/steps'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'

const AdmissionInfoCheck: React.FC<FormControlStep<AdmissionFormValues>> = ({ formControl }) => {
   const { redirectStep, setFocusElem } = useCreateAccountStore()

   const { dateOfBirth } = useBirthDate()

   const handlePrevState = (event: any) => {
      redirectStep(1)
      setFocusElem(event.target.id)
   }

   return (
      <>
         <FormDescription className="mt-3  text-3xl font-bold text-primary">
            Create your account
         </FormDescription>
         <FormField
            control={formControl}
            name="name"
            render={({ field }) => (
               <FormItem className="relative" onFocus={handlePrevState}>
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'plain'}
                     label="Name"
                     {...field}
                     checkbox={true}
                  />
               </FormItem>
            )}
         />
         <FormField
            control={formControl}
            name="email"
            render={({ field }) => (
               <FormItem className="relative" onFocus={handlePrevState}>
                  <FormInput
                     id={field.name}
                     type="text"
                     variant={'plain'}
                     label="Email"
                     {...field}
                     checkbox={true}
                  />
               </FormItem>
            )}
         />{' '}
         <FormField
            control={formControl}
            name="birthDate"
            render={({ field }) => (
               <FormItem className="relative" onFocus={handlePrevState}>
                  <FormInput
                     {...field}
                     id={'birthDate.month'}
                     type="text"
                     variant={'plain'}
                     label="Date of birth"
                     value={dateOfBirth}
                     checkbox={true}
                  />
               </FormItem>
            )}
         />
      </>
   )
}

export default AdmissionInfoCheck
