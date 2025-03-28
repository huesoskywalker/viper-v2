import crypto from 'crypto'
import { getVerificationToken } from './get-verification-token'
import { deletePrevToken } from './delete-prev-token'

export const isValidVerificationToken = async (token: string, email: string | null) => {
   const verification = await getVerificationToken(email)

   if (!verification.data) return false

   const toDeleteTokens = verification.toDeleteTokens

   if (toDeleteTokens.length) {
      for (const token of toDeleteTokens) {
         await deletePrevToken(token._id)
      }
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
      .update(token + secret)
      .digest('hex')

   const tokensMatch = hashedInputToken === verification.data.token

   return tokensMatch
}
