import { BASE_URL } from '@/config/env'

export const useCheckEmailAvailability = async (value: string): Promise<boolean> => {
   try {
      const res = await fetch(`${BASE_URL}/i/flow/signup/api?email=${value}`, {
         headers: {
            'content-type': 'application/json',
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
