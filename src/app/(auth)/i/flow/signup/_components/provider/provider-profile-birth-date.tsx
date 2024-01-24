import React from 'react'
import { FormDescription } from '@/components/ui/form'
import { DialogDescription } from '@/components/ui/dialog'
import BirthDateFormField from '@/app/_components/form/birth-date-form-field'

const ProviderProfileBirthDate = () => {
   return (
      <>
         <DialogDescription className="mt-3 text-2xl font-bold text-foreground sm:text-3xl ">
            What&apos;s your birth date?
         </DialogDescription>
         <FormDescription>This won&apos;t be public.</FormDescription>
         <BirthDateFormField />
      </>
   )
}

export default ProviderProfileBirthDate
