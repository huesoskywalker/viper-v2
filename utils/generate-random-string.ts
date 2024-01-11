export const generateRandomString = () => {
   const characters = '0123456789abcdefghijklmnopqrstuvwxyz'
   let randomString = ''

   for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomString += characters.charAt(randomIndex)
   }

   return randomString
}
