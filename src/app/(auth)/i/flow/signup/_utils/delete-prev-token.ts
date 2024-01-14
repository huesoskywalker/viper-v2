import { PUBLIC_API_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { ApiResponse } from '@/types/api/response'
import { DeleteResult } from 'mongodb'

export const deletePrevToken = async (_id: string) => {
   try {
      const res = await fetch(`${PUBLIC_API_URL}/i/flow/signup/api/verify/token?_id=${_id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'API-Key': `${PUBLIC_VIPER_API_KEY}`,
         },
      })
      const { data, error }: ApiResponse<DeleteResult> = await res.json()

      if (!res.ok) {
         throw new Error(error)
      }

      return { data }
   } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error')
   }
}
