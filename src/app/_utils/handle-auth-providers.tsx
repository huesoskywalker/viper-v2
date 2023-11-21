'use server'
import { signIn } from '@/lib/auth'

export const handleAuthProviders = async (formData: FormData) => {
   const provider = formData.get('provider') as string
   await signIn(provider)
}
