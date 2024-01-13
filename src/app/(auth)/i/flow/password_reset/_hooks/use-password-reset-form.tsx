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
let memoizedPassword: string | null = null

const passwordResetSchema = z.object({
   findBy: z.string(),
   email: z
      .string()
      .email()
      .refine((value) => {
         if (!emailRegex.test(value)) return
         memoizedEmail = value
         return !!value
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
   password: z
      .string({
         required_error: 'Please provide a new password.',
      })
      .min(8, {
         message: 'Password must be at least 8 characters',
      })
      .refine((value) => /[A-Z]/.test(value), {
         message: 'Include at least one uppercase letter',
      })
      .refine((value) => /[a-z]/.test(value), {
         message: 'Include at least one lowercase letter',
      })
      .refine((value) => /\d/.test(value), {
         message: 'Include at least one digit',
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
         message: 'Include at least one special character',
      })
      .refine(
         (value) => {
            memoizedPassword = value
            return !!value
         },
         {
            message: 'Please provide a new password',
         },
      ),
   confirmPassword: z.string({ required_error: 'Please confirm the password.' }).refine(
      (value) => {
         return memoizedPassword === value
      },
      {
         message: 'Passwords do not match.',
      },
   ),
})

export const usePasswordResetForm = () => {
   const defaultValues = {
      findBy: '',
      email: '',
      username: '',
      token: '',
      password: '',
      confirmPassword: '',
   }

   const passwordResetForm = useForm<PasswordResetFormValues>({
      resolver: zodResolver(passwordResetSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { passwordResetForm }
}
