import Image from 'next/image'
import { UserAuthForm } from './_components/user-auth-form'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
   const session = await auth()
   if (session) {
      redirect('/home')
   }

   return <></>
}
