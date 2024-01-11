import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormGetFieldState, UseFormGetValues, UseFormSetValue, useForm } from 'react-hook-form'
import { z } from 'zod'

export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>

export type PasswordResetFieldState = UseFormGetFieldState<PasswordResetFormValues>

export type PasswordResetSetValue = UseFormSetValue<PasswordResetFormValues>

export type PasswordResetGetValues = UseFormGetValues<PasswordResetFormValues>

const passwordResetSchema = z.object({
   findBy: z.string(),
   email: z.string().email(),
   username: z.string(),
   token: z.string(),
   // password: z.string(),
   // confirmPassword: z.string(),
})

export const usePasswordResetForm = () => {
   const defaultValues = {
      findBy: '',
      email: '',
      username: '',
      token: '',
      // password: '',
      // confirmPassword: '',
   }

   const passwordResetForm = useForm<PasswordResetFormValues>({
      resolver: zodResolver(passwordResetSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { passwordResetForm }
}
