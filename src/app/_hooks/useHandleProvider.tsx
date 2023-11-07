'use server'
import { signIn } from '@/lib/auth'

export const useHandleProvider = async (formData: FormData) => {
   const provider = formData.get('provider') as string
   // const el = document.createElement('div')
   // ReactDOM.createPortal(await signIn(provider), el)
   await signIn(provider)
}
