export const hideEmail = (email: string) => {
   const atIndex = email.indexOf('@')
   const dotIndex = email.lastIndexOf('.')

   const prefix = email.substring(0, atIndex)
   const domain = email.substring(atIndex + 1, dotIndex)
   const tld = email.substring(dotIndex + 1)

   const maskedPrefix = prefix.substring(0, 2) + '*'.repeat(prefix.length - 2)
   const maskedDomain = domain.substring(0, 1) + '*'.repeat(domain.length - 1)
   const maskedTld = '*'.repeat(tld.length)

   const hiddenEmail = maskedPrefix + '@' + maskedDomain + '.' + maskedTld

   return hiddenEmail
}
