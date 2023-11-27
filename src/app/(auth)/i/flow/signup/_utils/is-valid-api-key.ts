import { VIPER_API_KEY } from '@/config/env'

export const isValidApiKey = (apiKey: string | null) => {
   if (!apiKey) return
   return apiKey === VIPER_API_KEY
}
