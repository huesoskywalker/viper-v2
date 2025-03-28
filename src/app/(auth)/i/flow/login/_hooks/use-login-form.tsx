import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof loginSchema>

const loginSchema = z.object({
   identifier: z.string().min(1),
   password: z.string().min(1),
})

export const useLoginForm = () => {
   const defaultValues = {
      identifier: '',
      password: '',
   }

   const loginForm = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues,
      mode: 'onSubmit',
   })

   return { loginForm }
}
