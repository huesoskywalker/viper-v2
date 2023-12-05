import { viperService } from '@/services/servicesInitializer'

export const buildRandomUsername = async (name: string): Promise<string> => {
   const words = name.split(' ')

   const pickWord = Math.floor(Math.random() * words.length)

   const selectedWord = words[pickWord]

   const randomSlice = Math.floor(Math.random() * selectedWord.length) + 1

   const slicedWord = selectedWord.slice(0, randomSlice)

   words[pickWord] = slicedWord

   const randomNumber = Math.floor(Math.random() * 100000)
   const fullRandomNumber = randomNumber.toString().padStart(5, '0')

   words.push(fullRandomNumber)

   const username = words.join('')

   const isUsernameTaken = await viperService.isPropAvailable({
      field: 'username',
      value: username,
   })

   if (isUsernameTaken) {
      await buildRandomUsername(name)
   }

   return username
}
