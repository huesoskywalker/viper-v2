import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import FormInput from './form-input'
import { useFormContext } from 'react-hook-form'
import { AdmissionFormValues } from '@/app/(auth)/i/flow/signup/_hooks/admission/use-admission-form'
import { useBirthDate } from '@/app/(auth)/i/flow/signup/_hooks/admission/use-birth-date'

type FormContextValues = AdmissionFormValues

const FormattedBirthDateFormField = ({
   checkbox,
   itemOnFocus,
}: {
   checkbox?: true
   itemOnFocus?: (e: React.FocusEvent<HTMLDivElement, Element>) => void
}) => {
   const { control } = useFormContext<FormContextValues>()

   const { dateOfBirth } = useBirthDate({
      monthFormat: 'short',
      dayFormat: '2-digit',
      yearFormat: 'numeric',
   })

   return (
      <FormField
         control={control}
         name="birthDate"
         render={({ field }) => (
            <FormItem className="relative" onFocus={itemOnFocus}>
               <FormInput
                  {...field}
                  id={'birthDate.month'}
                  type="text"
                  variant={'plain'}
                  label="Date of birth"
                  value={dateOfBirth}
                  checkbox={checkbox}
               />
            </FormItem>
         )}
      />
   )
}

export default FormattedBirthDateFormField
