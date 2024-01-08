import { PUBLIC_API_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'

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
      if (!res.ok) {
         const { error } = await res.json()
         throw new Error(error)
      }
      const { data } = await res.json()
      return data
   } catch (error) {
      throw new Error(`Unable to check field availability, ${error}`)
   }
}
