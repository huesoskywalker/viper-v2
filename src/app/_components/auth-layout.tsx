'use client'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useEffect } from 'react'
import { GlobalNav } from './nav/global-nav'
import UnauthenticatedLayout from '../_components/unauthenticated-layout'
import { usePathname } from 'next/navigation'

export const AuthLayout = ({ children }: PropsWithChildren) => {
   const { status } = useSession()
   const pathname = usePathname()

   useEffect(() => {
      if (status === 'loading') return
   }, [status])

   if (pathname.endsWith('/logout')) {
      return <>{children}</>
   }
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
