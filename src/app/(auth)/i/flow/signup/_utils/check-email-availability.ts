import { BASE_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'

export const checkEmailAvailability = async (email: string): Promise<boolean> => {
   try {
      const res = await fetch(`${BASE_URL}/i/flow/signup/api/verify?email=${email}`, {
         headers: {
            'Content-Type': 'application/json',
            'API-Key': `${PUBLIC_VIPER_API_KEY}`,
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
      throw new Error(`Unable to check email availability, ${error}`)
   }
}
