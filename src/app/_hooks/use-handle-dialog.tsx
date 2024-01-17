import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCreateAccountStore } from '../(auth)/i/flow/signup/_stores/create-account-store'
import { useSession } from 'next-auth/react'

const useHandleDialog = () => {
   const [openDialog, setOpenDialog] = useState<boolean>(false)
   const { step, redirectStep, prevStep } = useCreateAccountStore()

   const pathname = usePathname()
   const isPathnamePasswordReset = pathname.endsWith('/i/flow/password_reset')

   const { status } = useSession()

   const router = useRouter()

   useEffect(() => {
      if (status === 'unauthenticated') redirectStep(1)
      void setOpenDialog(true)
   }, [status])

   const closeDialog = (path: string, type?: 'error') => {
      if (!type && !isPathnamePasswordReset) {
         if (step > 1) return prevStep()
      }

      setOpenDialog(false)
      router.push(path)
   }
   return { openDialog, closeDialog }
}

export default useHandleDialog
