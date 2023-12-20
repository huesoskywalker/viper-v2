'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const RedirectOnAuthentication = () => {
   const { push } = useRouter()
   const { status } = useSession()
   useEffect(() => {
      if (status === 'authenticated') {
         push('/home')
      }
   }, [status])
   return <></>
}

export default RedirectOnAuthentication
