import { BASE_URL, VIPER_API_KEY } from '@/config/env'

export const useCheckEmailAvailability = async (email: string): Promise<boolean> => {
   try {
      const res = await fetch(`${BASE_URL}/i/flow/signup/api/verify?email=${email}`, {
         headers: {
            'Content-Type': 'application/json',
            'API-Key': `${VIPER_API_KEY}`,
         },
         method: 'GET',
      })
      if (!res.ok) {
         const { error } = await res.json()
         // This will activate the closest `error.js` Error Boundary
         throw new Error(error)
      }
      const { data } = await res.json()
      return data
   } catch (error) {
      throw new Error(`Unable to fetch verification token, ${error}`)
   }
}
