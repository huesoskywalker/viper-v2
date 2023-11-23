export const remainingExpirationTime = (expires: Date) => {
   const currentDate = new Date()

   const expirationDifference = Number(expires) - Number(currentDate)

   const hoursDifference = (expirationDifference / 1000) * 60 * 60

   const hoursRemaining = Math.floor(hoursDifference)

   return hoursRemaining
}
