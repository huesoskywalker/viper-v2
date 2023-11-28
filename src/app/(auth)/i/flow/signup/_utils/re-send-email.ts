import { BASE_URL, PUBLIC_VIPER_API_KEY } from '@/config/env'
import { signIn } from 'next-auth/react'

export const resendEmail = async (email: string) => {
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
      await signIn('email', { redirect: false, email: email })

      const { data } = await res.json()

      return { data }
   } catch (error) {
      throw new Error(`An error occur while re sending the email, ${error}`)
   }
}
