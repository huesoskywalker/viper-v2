import { BASE_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { DeleteResult } from 'mongodb'

export const deletePrevToken = async (_id: string) => {
   try {
      const res = await fetch(`${BASE_URL}/i/flow/signup/api/verify/token?_id=${_id}`, {
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
      throw new Error(error instanceof Error ? error.message : 'Unknown error')
   }
}
