'use server'

import { signIn } from '@/lib/auth'
import { z } from 'zod'

const emailSchema = z.object({ email: z.string().email() })

export const requestVerificationEmail = async (
   prevState: { success: boolean },
   formData: FormData,
) => {
   const data = emailSchema.parse({
      email: formData.get('email'),
   })
   try {
      await signIn('email', {
         redirect: false,
         email: data.email,
      })
      return { success: true }
   } catch (error) {
      return { success: false, message: error }
   }
}
