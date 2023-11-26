'use server'
import { BASE_URL } from '@/config/env'
import { revalidatePath } from 'next/cache'
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
         `${BASE_URL}/api/auth/callback/email?callbackUrl=%2F&token=${data.token}&email=${data.email}`,
      )
      if (!magicLink.ok) {
         const { error } = await magicLink.json()
         throw new Error(error)
      }
      //   this will fuck up the form?
      // revalidatePath('/', 'layout')
      return { success: true }
   } catch (error) {
      return { success: false, message: error }
   }
}
