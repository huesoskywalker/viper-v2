import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormGetFieldState, UseFormGetValues, UseFormSetValue, useForm } from 'react-hook-form'
import { z } from 'zod'
import { emailRegex } from '../../_utils/regex'
import { isValidVerificationToken } from '../../signup/_utils/is-valid-verification-token'

export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>

export type PasswordResetFieldState = UseFormGetFieldState<PasswordResetFormValues>

export type PasswordResetSetValue = UseFormSetValue<PasswordResetFormValues>

export type PasswordResetGetValues = UseFormGetValues<PasswordResetFormValues>

let memoizedEmail: string | null = null
let memoizedToken: string | null = null

const passwordResetSchema = z.object({
   findBy: z.string(),
   email: z
      .string()
      .email()
      .refine((value) => {
         if (!emailRegex.test(value)) return
         memoizedEmail = value
         return true
      }),
   username: z.string(),
   token: z
      .string({
         required_error: 'Please provide the token',
      })
      .length(6, { message: 'Token must contain 6 digits' })
      .refine(
         async (value) => {
            if (value.length !== 6) return

            if (memoizedToken === value) return true

            const isValid = await isValidVerificationToken(value, memoizedEmail)

            if (isValid) {
               memoizedToken = value
            }

            return isValid
         },
         {
            message: 'Invalid code.',
         },
      ),
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
