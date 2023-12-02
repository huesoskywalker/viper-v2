'use client'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const AuthSignIn = () => {
   const params = useSearchParams()
   const provider = params.get('provider') as string

   const { status } = useSession()

   useEffect(() => {
      if (status === 'authenticated') {
         window.close()
      }
      void signIn(provider)
   }, [status])

   return <></>
}

export default AuthSignIn
