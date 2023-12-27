import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCreateAccountStore } from '../(auth)/i/flow/signup/_stores/create-account-store'
import { useSession } from 'next-auth/react'

const useHandleDialog = () => {
   const [openDialog, setOpenDialog] = useState<boolean>(false)
   const { step, redirectStep, prevStep } = useCreateAccountStore()
   const { status } = useSession()

   const router = useRouter()

   useEffect(() => {
      if (status === 'unauthenticated') redirectStep(1)
      setOpenDialog(true)
   }, [])

   const closeDialog = (path: string, type?: 'error') => {
      // check what will happen in another dialog
      // or how do we reset the step after each form
      if (!type) {
         if (step > 1) return prevStep()
      }

      setOpenDialog(false)
      router.push(path)
   }
   return { openDialog, closeDialog }
}

export default useHandleDialog
