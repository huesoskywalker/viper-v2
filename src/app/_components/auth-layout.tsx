'use client'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useEffect } from 'react'
import { GlobalNav } from './nav/global-nav'
import UnauthenticatedLayout from '../_components/unauthenticated-layout'

export const AuthLayout = ({ children }: PropsWithChildren) => {
   const { status } = useSession()

   useEffect(() => {
      if (status === 'loading') return
   }, [status])

   if (status === 'authenticated')
      return (
         <>
            <GlobalNav />
            <div className="md:pl-24 xl:pl-72"> {children} </div>
         </>
      )
   else if (status === 'unauthenticated') {
      return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
   }
}
