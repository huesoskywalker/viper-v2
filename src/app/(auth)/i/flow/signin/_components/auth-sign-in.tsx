'use client'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const AuthSignIn = () => {
   const params = useSearchParams()
   const provider = useMemo(() => params.get('provider') as string, [params])

   const { status } = useSession()

   useEffect(() => {
      if (status === 'authenticated') {
         window.close()
      }
      void signIn(provider)
   }, [status, params])

   return <></>
}

export default AuthSignIn
