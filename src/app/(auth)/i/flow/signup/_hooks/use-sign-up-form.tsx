import { zodResolver } from '@hookform/resolvers/zod'
import { Control, useForm } from 'react-hook-form'
import { z } from 'zod'
import crypto from 'crypto'
import { checkEmailAvailability } from '../_utils/check-email-availability'
import { clientPromise } from '@/services/servicesInitializer'
import { useSearchParams } from 'next/navigation'

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
            const isTaken = await checkEmailAvailability(value)
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
   token: z
      .string({
         required_error: 'Please provide the token',
      })
      .min(6)
      .max(6)
      .refine(async (value) => {
         console.log(`token schema`)
         // const client = await clientPromise
         // const collection = client.db('viperDb').collection('verification_tokens')
         // const request = collection.findOne(
         //    {
         // const searchParams = useSearchParams()
         // console.log(`----use sign up form`)
         // console.log({ searchParams })
         //       email: email,
         //    },
         //    {
         //       projection: {
         //          token: 1,
         //       },
         //    },
         // )
         // console.log(value.length)  const urlToken = '1ccb65e2a1bb6dc35e1da28a3be3f4b745450259f279aaddc156df38012072f8'
         const dbToken = '20bb30ee5c5888b9a793d2fbbb637c013e11cd4494552b67a4ecad1d6d926e46'
         const secret = process.env.AUTH_SECRET

         // Hash the URL token
         const hashedInputToken = crypto
            .createHash('sha256')
            .update(value + secret)
            .digest('hex')

         // Compare hashed tokens

         // const tokensMatch = hashedInputToken === dbToken
         // console.log(`------tokens match`)
         // console.log(tokensMatch)
         return value
      }),
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
