import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { checkEmailAvailability } from '../_utils/check-email-availability'

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>

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
   month: z.string({ required_error: 'Please select a month.' }),
   day: z.string({ required_error: 'Please select a day.' }),
   year: z.string({ required_error: 'Please select a day.' }),
})

export const useSignUpForm = () => {
   const defaultValues = {
      name: '',
      email: '',
   }

   const signUpForm = useForm<SignUpFormValues>({
      resolver: zodResolver(SignUpFormSchema),
      defaultValues,
      mode: 'onChange',
   })
   return { signUpForm }
}
