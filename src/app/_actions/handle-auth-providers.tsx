'use server'
import { signIn } from '@/lib/auth'
import { z } from 'zod'

const providerSchema = z.object({
   provider: z.string().min(1),
})
export const handleAuthProviders = async (prevState: { success: boolean }, formData: FormData) => {
   const data = providerSchema.parse({
      provider: formData.get('provider'),
   })
   try {
      await signIn(data.provider)
      return { success: true }
   } catch (error) {
      return { success: false, message: error }
   }
}
