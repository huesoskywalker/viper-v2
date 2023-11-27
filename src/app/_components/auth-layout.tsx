'use client'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useEffect } from 'react'
import { GlobalNav } from '../_components/global-nav'
import UnauthenticatedLayout from '../_components/unauthenticated-layout'

export const AuthLayout = ({ children }: PropsWithChildren) => {
   const { data: session, status } = useSession()
   useEffect(() => {
      if (status === 'loading') return
   }, [session, status])

   if (status === 'authenticated')
      return (
         <>
            <GlobalNav />
            <div className="lg:pl-44"> {children} </div>
         </>
      )
   else if (status === 'unauthenticated') {
      return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
   }
}
