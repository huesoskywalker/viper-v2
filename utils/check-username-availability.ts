import { viperService } from '@/services/servicesInitializer'

export const checkUsernameAvailability = async (name: string) => {
   const username = name.trim().toLowerCase().replace(/\s+/g, '')
   const isTaken = await viperService.checkUsernameAvailability(username)
   // we need to figure out in here once it is newUser
   // we have to prompt some options and deliver so he picks one or write one
   // not setting up the username for him
   if (!isTaken) return username
   const randomNumber = Math.floor(Math.random() * 100000)
   return `${username}${randomNumber}`
}
