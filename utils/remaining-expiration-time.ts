export const remainingExpirationTime = (expires: Date) => {
   const currentDate = new Date().getTime()
   const expirationTime = expires.getTime()

   const expirationDifference = expirationTime - currentDate
   const hoursDifference = expirationDifference / (1000 * 60 * 60)
   const hoursRemaining = Math.ceil(hoursDifference)

   return hoursRemaining
}
