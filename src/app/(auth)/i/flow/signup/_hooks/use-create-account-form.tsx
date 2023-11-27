import { zodResolver } from '@hookform/resolvers/zod'
import { Control, useForm } from 'react-hook-form'
import { z } from 'zod'
import crypto from 'crypto'
import { useCheckEmailAvailability } from './use-check-email-availability'
import { UseVerificationToken } from './use-verification-token'

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>

export type CreateAccountFormControl = Control<CreateAccountFormValues, any>

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
            // try {
            const isTaken = await useCheckEmailAvailability(value)
            return !isTaken
            // } catch (error) {
            // throw ner Error ?
            // return error?
            // return false?
            // }
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
   // we need to manage this in the database
   contentDiscovery: z.boolean(),
   token: z
      .string({
         required_error: 'Please provide the token',
      })
      .min(6, { message: 'Token must be at least 6 digits' })
      .max(6, { message: 'Token must be at most 6 digits' })
      .refine(
         async (value) => {
            if (value.length !== 6) return false
            const searchParams = new URLSearchParams(window.location.search)
            const email = searchParams.get('email')
            const verification = await UseVerificationToken(email)

            const expirationDate = new Date(verification.expires)
            const currentDate = new Date()

            if (currentDate > expirationDate) {
               return false
            }

            const secret = process.env.NEXT_PUBLIC_SECRET

            const hashedInputToken = crypto
               .createHash('sha256')
               .update(value + secret)
               .digest('hex')

            const tokensMatch = hashedInputToken === verification.token

            return tokensMatch
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
   }

   const createAccountForm = useForm<CreateAccountFormValues>({
      resolver: zodResolver(createAccountSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { createAccountForm }
}
