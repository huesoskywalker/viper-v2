'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const RedirectAuthentication = () => {
   const { push } = useRouter()
   const { status } = useSession()
   useEffect(() => {
      if (status === 'authenticated') {
         push('/home')
      }
   }, [status])
   return <></>
}

export default RedirectAuthentication
