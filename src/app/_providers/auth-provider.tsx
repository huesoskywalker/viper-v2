'use client'
import { SessionProvider } from 'next-auth/react'
import { PageProps } from '@/types/page-props'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const Auth = ({ children }: PageProps) => {
   const router = useRouter()
   const { data: session, status } = useSession()
   const isUser = session?.user
   useEffect(() => {
      if (status === 'loading') return
      if (status === 'unauthenticated') {
         router.push('/')
      }
      if (!isUser) {
         router.push('/')
      }
   }, [isUser, status])

   return <>{children}</>
}

export default function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
   return (
      <SessionProvider>
         <Auth>{children}</Auth>
      </SessionProvider>
   )
}
