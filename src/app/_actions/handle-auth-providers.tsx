import { z } from 'zod'
import { popupWindow } from '../(auth)/i/flow/signin/_components/popup-window'

export const handleAuthProvider = async (
   initialState: { success: boolean; message: string | null },
   formData: FormData,
) => {
   const authSignInSchema = z.object({
      provider: z.string().min(0),
   })

   const data = authSignInSchema.parse({
      provider: formData.get('provider'),
   })

   try {
      popupWindow('/i/flow/signin', data.provider)
      return { success: true, message: null }
   } catch (error) {
      return { success: false, message: `${error}` }
   }
}
