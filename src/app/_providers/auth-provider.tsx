'use client'
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useEffect } from 'react'

export const Auth = ({ children }: PropsWithChildren) => {
   const { status } = useSession()
   useEffect(() => {
      if (status === 'loading') return
   }, [status])

   return <>{children}</>
}

export default function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
   return (
      <SessionProvider>
         <Auth>{children}</Auth>
      </SessionProvider>
   )
}
