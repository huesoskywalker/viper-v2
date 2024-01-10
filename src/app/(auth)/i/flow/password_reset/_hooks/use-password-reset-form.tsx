import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormGetFieldState, UseFormGetValues, UseFormSetValue, useForm } from 'react-hook-form'
import { z } from 'zod'

export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>

export type PasswordResetFieldState = UseFormGetFieldState<PasswordResetFormValues>

export type PasswordResetSetValue = UseFormSetValue<PasswordResetFormValues>

export type PasswordResetGetValues = UseFormGetValues<PasswordResetFormValues>

let findBy: string

const passwordResetSchema = z.object({
   findBy: z.string().refine((value) => {
      findBy = value
      return value
   }),
   email: z.string().email(),
   // .refine(async (value) => {
   //    if (!emailRegex.test(value)) return
   //    return value
   // }),
   username: z.string(),
   // .refine((value) => {
   //    return false
   // }),
   // token: z.string(),
   // password: z.string(),
   // confirmPassword: z.string(),
})

export const usePasswordResetForm = () => {
   const defaultValues = {
      findBy: '',
      email: '',
      username: '',
      // token: '',
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
