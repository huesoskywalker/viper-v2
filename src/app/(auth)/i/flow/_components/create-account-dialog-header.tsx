'use client'
import { DialogTitle } from '@/components/ui/dialog'
import { useCreateAccountStore } from '../signup/_stores/create-account-store'
import { cn } from '@/lib/utils'
import DialogViperHeader from './dialog-viper-header'

const CreateAccountDialogHeader = () => {
   const { step } = useCreateAccountStore()

   return (
      <DialogViperHeader className={cn('pt-3', step < 5 ? 'pl-16' : 'pl-4')}>
         <DialogTitle className={cn('text-base font-semibold text-foreground sm:text-lg')}>
            Step {step} of 5
         </DialogTitle>
      </DialogViperHeader>
   )
}

export default CreateAccountDialogHeader
