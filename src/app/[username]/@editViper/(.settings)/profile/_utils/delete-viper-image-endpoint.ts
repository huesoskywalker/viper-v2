import { PUBLIC_API_URL } from '@/config/env'
import { ApiResponse } from '@/types/api/response'

export const deleteViperImageEndpoint = async (profileField: 'image' | 'backgroundImage') => {
   try {
      const deleteImage = await fetch(`${PUBLIC_API_URL}/api/viper/image?field=${profileField}`, {
         headers: {
            'Content-Type': 'application/json',
         },
         method: 'DELETE',
      })

      const { data, error }: ApiResponse<{ success: boolean }> = await deleteImage.json()

      if (!deleteImage.ok) {
         throw new Error(error)
      }

      return { data, error }
   } catch (error: unknown) {
      return {
         data: { success: false },
         error: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      }
   }
}
