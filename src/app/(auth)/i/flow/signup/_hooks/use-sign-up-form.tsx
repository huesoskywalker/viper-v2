import { zodResolver } from '@hookform/resolvers/zod'
import { Control, useForm } from 'react-hook-form'
import { z } from 'zod'
import crypto from 'crypto'
import { useCheckEmailAvailability } from './use-check-email-availability'
import { UseVerificationToken } from './use-verification-token'

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>

export type SignUpFomControl = Control<SignUpFormValues, any>

const SignUpFormSchema = z.object({
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
   token: z
      .string({
         required_error: 'Please provide the token',
      })
      .min(6, { message: 'Token must be at least 6 digits' })
      .max(6, { message: 'Token must be at most 6 digits' })
      .refine(
         async (value) => {
            const searchParams = new URLSearchParams(window.location.search)
            const email = searchParams.get('email')
            if (value.length === 6) {
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
            }
         },
         {
            message: 'Invalid verification token',
         },
      ),
   // we need to manage this in the database
   contentDiscovery: z.boolean(),
})

export const useSignUpForm = () => {
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
   }

   const signUpForm = useForm<SignUpFormValues>({
      resolver: zodResolver(SignUpFormSchema),
      defaultValues,
      mode: 'onChange',
   })

   return { signUpForm }
}
