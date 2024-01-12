import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { AdmissionFormValues } from '../../_hooks/admission/use-admission-form'

const AdmissionSubmitButton = () => {
   const { formState } = useFormContext<AdmissionFormValues>()
   const { isValid, isSubmitting } = formState

   return (
      <Button type="submit" variant={'default'} size={'lg'} disabled={!isValid || isSubmitting}>
         Next
      </Button>
   )
}

export default AdmissionSubmitButton
