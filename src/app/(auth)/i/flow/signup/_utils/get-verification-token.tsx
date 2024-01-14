import { PUBLIC_API_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { ApiResponse } from '@/types/api/response'
import { ObjectId } from 'mongodb'

export const getVerificationToken = async (
   email: string | null,
): Promise<{
   data: { _id: string; token: string; expires: string } | null
   toDeleteTokens: Array<{ _id: string }> | []
}> => {
   if (!email) throw new Error('Email must be provided')
   try {
      const res = await fetch(`${PUBLIC_API_URL}/i/flow/signup/api/verify/token?email=${email}`, {
         headers: {
            'Content-Type': 'application/json',
            'API-Key': `${PUBLIC_VIPER_API_KEY}`,
         },
         method: 'GET',
      })

      const {
         data,
         toDeleteTokens,
         error,
      }: ApiResponse<{ _id: string; token: string; expires: string } | null> & {
         toDeleteTokens: Array<{ _id: string }> | []
      } = await res.json()

      if (!res.ok) {
         throw new Error(error)
      }

      return { data, toDeleteTokens }
   } catch (error) {
      throw new Error(
         `Unable to fetch verification token, ${
            error instanceof Error ? error.message : 'Unknown error'
         }`,
      )
   }
}
