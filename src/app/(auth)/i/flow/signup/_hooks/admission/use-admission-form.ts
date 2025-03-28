import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormGetFieldState, UseFormGetValues, useForm } from 'react-hook-form'
import { z } from 'zod'

export type AdmissionFormValues = z.infer<typeof admissionSchema>

export type AdmissionFieldState = UseFormGetFieldState<AdmissionFormValues>

export type AdmissionFieldValue = UseFormGetValues<AdmissionFormValues>

let memoizedEmail: string | null = null
let memoizedToken: string | null = null

export const admissionSchema = z.object({
   name: z
      .string({ required_error: 'Please provide a name' })
      .min(1, {
         message: "What's your name?",
      })
      .max(30, {
         message: 'Name must not be longer than 30 characters.',
      }),
   email: z
      .string({
         required_error: 'Please provide an email',
      })
      .email({
         message: 'Please enter a valid email.',
      })
      .refine(
         async (value) => {
            if (!value) return

            const { emailRegex } = await import('../../../_utils/regex')
            if (!emailRegex.test(value)) return

            if (memoizedEmail === value) return true

            const { isViperPropAvailable } = await import('@/app/_utils/is-viper-prop-available')

            const isTaken = await isViperPropAvailable('email', value)

            if (!isTaken) {
               memoizedEmail = value
            }

            return !isTaken
         },
         {
            message: 'Email has already been taken.',
         },
      ),
   birthDate: z
      .object({
         month: z.string({ required_error: 'Please select a month.' }),
         day: z.string({ required_error: 'Please select a day.' }),
         year: z.string({ required_error: 'Please select a year.' }),
      })
      .refine(
         (value) => {
            const { month, day, year } = value

            if (month && day && year) {
               return true
            }
            return false
         },
         {
            message: 'Please select a valid birth date.',
         },
      ),
   contentDiscovery: z.boolean(),
   token: z
      .string({
         required_error: 'Please provide the token',
      })
      .length(6, { message: 'Token must contain 6 digits' })
      .refine(
         async (value) => {
            if (value.length !== 6) return

            if (memoizedToken === value) return true

            try {
               const { isValidVerificationToken } = await import(
                  '../../_utils/is-valid-verification-token'
               )

               const isValid = await isValidVerificationToken(value, memoizedEmail)

               if (isValid) {
                  memoizedToken = value
               }

               return isValid
            } catch (error) {
               throw new Error(
                  error instanceof Error
                     ? error.message
                     : 'Something went wrong. Please try again.',
               )
            }
         },
         {
            message: 'Invalid verification token',
         },
      ),
   password: z
      .string({
         required_error: 'Please provide a password',
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
      }),
})

export const useAdmissionForm = () => {
   const defaultValues = {
      name: '',
      email: '',
      birthDate: {
         month: '',
         day: '',
         year: '',
      },
      contentDiscovery: true,
      token: '',
      password: '',
   }

   const admissionForm = useForm<AdmissionFormValues>({
      resolver: zodResolver(admissionSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { admissionForm }
}
