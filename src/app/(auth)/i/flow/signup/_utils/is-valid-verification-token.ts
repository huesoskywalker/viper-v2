import crypto from 'crypto'
import { getVerificationToken } from './get-verification-token'
import { deletePrevToken } from './delete-prev-token'

export const isValidVerificationToken = async (value: string) => {
   const searchParams = new URLSearchParams(window.location.search)
   const email = searchParams.get('email')

   const verification = await getVerificationToken(email)

   if (!verification.data) return false

   const toDeleteTokens = verification.toDeleteTokens

   if (toDeleteTokens.length) {
      toDeleteTokens.forEach(async (token) => {
         await deletePrevToken(token._id)
      })
   }

   const expirationDate = new Date(verification.data.expires)
   const currentDate = new Date()

   if (currentDate > expirationDate) {
      await deletePrevToken(verification.data._id)
      return false
   }

   const secret = process.env.NEXT_PUBLIC_SECRET

   const hashedInputToken = crypto
      .createHash('sha256')
      .update(value + secret)
      .digest('hex')

   const tokensMatch = hashedInputToken === verification.data.token

   return tokensMatch
}
