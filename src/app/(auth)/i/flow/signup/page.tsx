import { CreateAccountDialog } from './_components/create-account-dialog'
import { Toaster } from '@/components/ui/toaster'

export default function SignUpPage() {
   return (
      <>
         <CreateAccountDialog />
         <Toaster />
      </>
   )
}
