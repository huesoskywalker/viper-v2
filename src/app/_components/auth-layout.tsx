'use client'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useEffect } from 'react'
import { GlobalNav } from './nav/global-nav'
import UnauthenticatedLayout from '../_components/unauthenticated-layout'
import { redirect, usePathname } from 'next/navigation'
import { useCreateAccountStore } from '../(auth)/i/flow/signup/_stores/create-account-store'

export const AuthLayout = ({ children }: PropsWithChildren) => {
   const { data: session, status } = useSession()
   const pathname = usePathname()
   const { redirectStep } = useCreateAccountStore()

   useEffect(() => {
      if (status === 'loading') return
   }, [status])

   if (pathname.endsWith('/i/flow/logout')) {
      return <>{children}</>
   }

   if (
      session?.user.role === 'newViper' &&
      !pathname.endsWith('/i/flow/signin') &&
      !pathname.endsWith('/i/flow/single_sign_on')
   ) {
      redirect('/i/flow/single_sign_on')
   }

   if (session?.user.role === 'needUpdate' && !pathname.endsWith('/i/flow/signup')) {
      redirectStep(1)
      redirect('/i/flow/signup')
   }

   if (status === 'authenticated')
      return (
         <>
            <GlobalNav />
            <div className="sm:pl-24 xl:pl-72"> {children} </div>
         </>
      )
   else if (status === 'unauthenticated') {
      return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
   }
}
