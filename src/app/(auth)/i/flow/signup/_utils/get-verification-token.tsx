import { BASE_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'

export const getVerificationToken = async (
   email: string | null,
): Promise<{
   data: { _id: string; token: string; expires: string } | null
   toDeleteTokens: Array<{ _id: string }> | []
}> => {
   if (!email) throw new Error('Email must be provided')
   try {
      const res = await fetch(`${BASE_URL}/i/flow/signup/api/verify/token?email=${email}`, {
         headers: {
            'Content-Type': 'application/json',
            'API-Key': `${PUBLIC_VIPER_API_KEY}`,
         },
         method: 'GET',
      })

      if (!res.ok) {
         const { error } = await res.json()
         throw new Error(error)
      }

      const { data, toDeleteTokens } = await res.json()

      return { data, toDeleteTokens }
   } catch (error) {
      throw new Error(`Unable to fetch verification token, ${error}`)
   }
}
