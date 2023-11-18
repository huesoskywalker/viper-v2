import { viperService } from '@/services/servicesInitializer'

export const checkUsernameAvailability = async (name: string) => {
   const username = name.trim().toLowerCase().replace(/\s+/g, '')
   const isTaken = await viperService.findByUsername(username)
   if (!isTaken) return username
   const randomNumber = Math.floor(Math.random() * 100000)
   return `${username}${randomNumber}`
}
