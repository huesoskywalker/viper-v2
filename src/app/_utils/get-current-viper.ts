import { auth } from '@/lib/auth'
import { Session } from 'next-auth/types'
import { redirect } from 'next/navigation'

export const getCurrentSession = async (): Promise<Session> => {
   const session: Session | null = await auth()
   if (!session) {
      return redirect('/i/flow/login')
   }
   return session
}
