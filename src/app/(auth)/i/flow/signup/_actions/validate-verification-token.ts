'use server'
import { PUBLIC_API_URL } from '@/config/env'
import { logError } from '@/config/winstonLogger'
import { z } from 'zod'

const validationSchema = z.object({
   email: z.string().email(),
   token: z.string().min(6).max(6),
})
export const validateVerificationToken = async (
   prevState: { success: boolean },
   formData: FormData,
) => {
   const data = validationSchema.parse({
      email: formData.get('email'),
      token: formData.get('token'),
   })

   try {
      const magicLink = await fetch(
         `${PUBLIC_API_URL}/api/auth/callback/email?callbackUrl=%2F&token=${data.token}&email=${data.email}`,
      )
      if (!magicLink.ok) {
         const { error } = await magicLink.json()
         throw new Error(error)
      }
      return { success: true }
   } catch (error) {
      logError({ action: 'Fetch verification token callback', email: data.email }, error)
      return { success: false, message: error }
   }
}
