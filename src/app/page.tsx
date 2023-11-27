'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
   const { push } = useRouter()
   const { data: session } = useSession()
   if (session) {
      push('/home')
   }

   return <></>
}
