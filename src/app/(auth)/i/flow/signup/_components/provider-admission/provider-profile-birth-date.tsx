import BirthDateSelector from '@/app/_components/form/birth-date-selector'
import { FormControlStep } from '@/types/forms/steps'
import React from 'react'
import { ProviderProfileFormValues } from '../../_hooks/provider/use-provider-profile-form'
import { FormDescription } from '@/components/ui/form'
import { DialogDescription } from '@/components/ui/dialog'

const ProviderProfileBirthDate = ({ formControl }: FormControlStep<ProviderProfileFormValues>) => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            What&apos;s your birth date?
         </DialogDescription>
         <FormDescription>This won&apos;t be public.</FormDescription>
         <BirthDateSelector formControl={formControl} />
      </>
   )
}

export default ProviderProfileBirthDate
