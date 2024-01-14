import { PUBLIC_API_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { ApiResponse } from '@/types/api/response'

export const isViperPropAvailable = async (
   field: 'email' | 'username',
   value: string,
): Promise<boolean> => {
   try {
      const res = await fetch(
         `${PUBLIC_API_URL}/i/flow/signup/api/verify?field=${field}&value=${value}`,
         {
            headers: {
               'Content-Type': 'application/json',
               'API-Key': `${PUBLIC_VIPER_API_KEY}`,
            },
            method: 'GET',
         },
      )

      const { data, error }: ApiResponse<boolean> = await res.json()

      if (!res.ok) {
         throw new Error(error)
      }

      return data
   } catch (error) {
      throw new Error(`Unable to check field availability, ${error}`)
   }
}
