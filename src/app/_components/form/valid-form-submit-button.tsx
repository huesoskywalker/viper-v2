import { PasswordResetFormValues } from '@/app/(auth)/i/flow/password_reset/_hooks/use-password-reset-form'
import { AdmissionFormValues } from '@/app/(auth)/i/flow/signup/_hooks/admission/use-admission-form'
import { Button, ButtonProps } from '@/components/ui/button'
import React from 'react'
import { useFormContext } from 'react-hook-form'

type FormContextValues = PasswordResetFormValues | AdmissionFormValues

const ValidFormSubmitButton: React.FC<ButtonProps & { label: string }> = ({
   label,
   variant,
   size,
   className,
   ...props
}) => {
   const { formState } = useFormContext<FormContextValues>()
   const { isValid, isSubmitting } = formState

   return (
      <Button
         type="submit"
         variant={'default'}
         size={'lg'}
         disabled={!isValid || isSubmitting}
         {...props}
      >
         {label}
      </Button>
   )
}

export default ValidFormSubmitButton
