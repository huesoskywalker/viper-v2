import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEmailAvailability } from './use-check-availability'

const { checkEmail } = useEmailAvailability()

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
      .min(1)
      .refine(
         async (value) => {
            if (!value) {
               return false
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
            if (emailRegex.test(value)) {
               const isTaken = await checkEmail(value)
               return !isTaken
            }
         },
         {
            message: 'Email has already been taken.',
         },
      ),
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
