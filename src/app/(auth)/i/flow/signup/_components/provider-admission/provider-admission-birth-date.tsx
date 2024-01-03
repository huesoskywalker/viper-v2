import BirthDateSelector from '@/app/_components/form/birth-date-selector'
import { FormControlStep } from '@/types/forms/steps'
import React from 'react'
import { ProviderAdmissionFormValues } from '../../_hooks/provider-admission/use-provider-admission-form'
import { FormDescription } from '@/components/ui/form'
import { DialogDescription } from '@/components/ui/dialog'

const ProviderAdmissionBirthDate = ({
   formControl,
}: FormControlStep<ProviderAdmissionFormValues>) => {
   return (
      <>
         <DialogDescription className="mt-3 text-3xl font-bold text-foreground ">
            What&apos;s your birth date?
         </DialogDescription>
         <FormDescription>This won&apos;t be public.</FormDescription>
         <BirthDateSelector formControl={formControl} />
      </>
   )
}

export default ProviderAdmissionBirthDate
