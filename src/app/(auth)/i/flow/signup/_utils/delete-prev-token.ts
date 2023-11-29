import { BASE_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { DeleteResult } from 'mongodb'

export const deletePrevToken = async (email: string) => {
   try {
      const res = await fetch(`${BASE_URL}/i/flow/signup/api/verify/token?email=${email}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'API-Key': `${PUBLIC_VIPER_API_KEY}`,
         },
      })
      if (!res.ok) {
         const { error } = await res.json()
         throw new Error(error)
      }

      const { data }: { data: DeleteResult } = await res.json()

      return { data }
   } catch (error) {
      throw new Error(
         `Failed to delete the previous verification token, Please try again ${error}`,
      )
   }
}
