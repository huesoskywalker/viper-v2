import crypto from 'crypto'
import { getVerificationToken } from './get-verification-token'

export const isValidVerificationToken = async (value: string) => {
   const searchParams = new URLSearchParams(window.location.search)
   const email = searchParams.get('email')
   const verification = await getVerificationToken(email)

   const expirationDate = new Date(verification.expires)
   const currentDate = new Date()

   if (currentDate > expirationDate) {
      return false
   }

   const secret = process.env.NEXT_PUBLIC_SECRET

   const hashedInputToken = crypto
      .createHash('sha256')
      .update(value + secret)
      .digest('hex')

   const tokensMatch = hashedInputToken === verification.token

   return tokensMatch
}
