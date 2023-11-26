import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCreateAccountStore } from '../(auth)/i/flow/signup/_stores/create-account-store'

const useHandleDialog = () => {
   const [openDialog, setOpenDialog] = useState<boolean>(false)
   const { step, prevStep } = useCreateAccountStore()

   const router = useRouter()

   useEffect(() => {
      setOpenDialog(true)
   }, [])

   const closeDialog = (path: string) => {
      // check what will happen in another dialog
      if (step > 1) return prevStep()

      setOpenDialog(false)
      router.push(path)
   }
   return { openDialog, closeDialog }
}

export default useHandleDialog
