import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { AdmissionFormValues } from '../signup/_hooks/admission/use-admission-form'
import { PasswordResetFormValues } from '../password_reset/_hooks/use-password-reset-form'

const CreateAccountSubmitButton = <T extends AdmissionFormValues | PasswordResetFormValues>({
   label,
}: {
   label: string
}) => {
   const { formState } = useFormContext<T>()
   const { isValid, isSubmitting } = formState

   return (
      <Button type="submit" variant={'default'} size={'lg'} disabled={!isValid || isSubmitting}>
         {label}
      </Button>
   )
}

export default CreateAccountSubmitButton
