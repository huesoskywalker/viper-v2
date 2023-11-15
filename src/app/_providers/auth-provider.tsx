'use client'
import { SessionProvider } from 'next-auth/react'
import { PageProps } from '@/types/page-props'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const Auth = ({ children }: PageProps) => {
   const { push } = useRouter()
   const { data: session, status } = useSession()
   const isUser = session?.user
   useEffect(() => {
      if (status === 'loading') return
      if (status === 'unauthenticated') {
         // having issues with redirect. check
         // redirect('/')
         push('/')
      }
      if (!isUser) {
         // redirect('/')
         push('/')
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
