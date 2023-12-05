import { zodResolver } from '@hookform/resolvers/zod'
import { Control, UseFormGetFieldState, UseFormGetValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { isViperPropAvailable } from '../../../../../_utils/is-viper-prop-available'
import { isValidVerificationToken } from '../_utils/is-valid-verification-token'

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>

export type CreateAccountFormControl = Control<CreateAccountFormValues, any>

export type CreateAccountFormFieldState = UseFormGetFieldState<CreateAccountFormValues>

export type CreateAccountFormFieldValues = UseFormGetValues<CreateAccountFormValues>

const createAccountSchema = z.object({
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
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
            if (!emailRegex.test(value)) return
            const isTaken = await isViperPropAvailable('email', value)
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

            const isValid = await isValidVerificationToken(value)

            return isValid
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
   username: z
      .string({
         required_error: 'Username is required',
      })
      .min(3, {
         message: 'Username must be at least 3 characters.',
      })
      .max(22, {
         message: 'Username must not be longer than 22 characters.',
      })
      .regex(/^\S+$/, {
         message: 'Username must not contain spaces.',
      })
      .refine(
         async (value) => {
            if (value.length < 3) return

            const isTaken = await isViperPropAvailable('username', value)

            return !isTaken
         },
         {
            message: 'Username has already been taken.',
         },
      ),
   image: z.string().min(1).optional(),
})

export const useCreateAccountForm = () => {
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
      image: undefined,
   }

   const createAccountForm = useForm<CreateAccountFormValues>({
      resolver: zodResolver(createAccountSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { createAccountForm }
}
