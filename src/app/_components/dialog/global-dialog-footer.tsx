import { DialogFooter } from '@/components/ui/dialog'
import React, { PropsWithChildren } from 'react'

const GlobalDialogFooter = ({ children }: PropsWithChildren) => {
   return (
      <DialogFooter className="mb-6 flex w-full flex-col gap-2 px-8 sm:px-16">
         {children}
      </DialogFooter>
   )
}

export default GlobalDialogFooter
