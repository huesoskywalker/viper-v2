import { PasswordResetFormValues } from '@/app/(auth)/i/flow/password_reset/_hooks/use-password-reset-form'
import { CreateProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/profile/use-create-profile-form'
import { ProviderProfileFormValues } from '@/app/(auth)/i/flow/signup/_hooks/provider/use-provider-profile-form'
import { EditViperFormValues } from '@/app/[username]/profile/_hooks/use-edit-viper-form'
import { Button, ButtonProps } from '@/components/ui/button'
import React from 'react'
import { useFormContext } from 'react-hook-form'

type FormContextValues = CreateProfileFormValues | ProviderProfileFormValues | EditViperFormValues

const SubmitButton: React.FC<ButtonProps & { label: string }> = ({
   className,
   variant,
   size,
   label,
   disabled,
   ...props
}) => {
   const { formState } = useFormContext<FormContextValues>()
   const { isSubmitting } = formState
   const disableButton = disabled ? disabled || isSubmitting : isSubmitting
   return (
      <Button type="submit" variant={variant} size={size} disabled={disableButton} {...props}>
         {label}
      </Button>
   )
}

export default SubmitButton
