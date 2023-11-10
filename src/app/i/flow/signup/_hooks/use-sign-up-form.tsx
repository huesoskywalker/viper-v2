import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>

const SignUpFormSchema = z.object({
   name: z
      .string()
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
      .email(),
})

export const useSignUpForm = () => {
   const defaultValues = {
      name: '',
      email: '',
   }

   const form = useForm<SignUpFormValues>({
      resolver: zodResolver(SignUpFormSchema),
      defaultValues,
      mode: 'onChange',
   })
   return { form }
}
